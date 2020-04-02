const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()


 /*  return {  
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  } */


exports.main = async (event) => {
  const wxContext = cloud.getWXContext()
  const tb=db.collection(event.tbl)
  let openid=event.needOpenid? wxContext.OPENID:''  
  try {
    switch (event.action) {
      case 'insert': {
        return await tb.add({
          data: {
            openid,           
            ...event.payload,
            created: db.serverDate(),
          }
        })
      }
      case 'update':{

      }
      case 'query': {
        let limit = event.num || 100;
        if (event.needOpenid)
          return await tb.where({ openid: event.userInfo.openId, ...event.map }).limit(limit).get();
        else {
          if (event.map)
            return await tb.where(event.map).limit(limit).get();
          else
            return await tb.limit(limit).get();
        }
      }
      case 'delete':{
        
      }
      default: {
        return '方法不存在'
      }
    }
  } catch (e) {
    return e
  }
}
   /*  await tb.add({
data: {
openid: OPENID,
...event,
created:db.serverDate(),
}
})
return '预约成功！' */

