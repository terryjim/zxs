const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const tb = db.collection('user')
exports.main = async (event) => {
  let openid = cloud.getWXContext().OPENID
  try {
    const ret = await tb.where({ openid }).limit(1).get()
  
    if (ret.data && ret.data.length > 0)//老用户不用注册
      return ({ retCode:2})  //老用户
    //注册用户并赠送课时   
    await tb.add({
      data: {
        openid,
        lessons: 18,
        created: db.serverDate(),
      }
    })
    return ({ retCode:1})   //注册成功
    /* await chargeCollection.add({
       data: {
         openid: OPENID,
         ...event,
         created:db.serverDate(),
       }
     })*/
    //return '充值成功！'
    // return ret
  } catch (e) {
    return e
  }
}