const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const tb = db.collection('banners')
exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext()
  try {
    switch (event.action) {
      case 'add': {
        return await tb.add({
          data: {
            //openid: event.userInfo.openId,
            ...event.payload,
            created: db.serverDate(),
          }
        })
      }
      case 'query': {
        let limit = event.num || 100;
        if (event.map)
          return await tb.where(event.map).limit(limit).get();
        else
          return await tb.limit(limit).get();
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

