const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const tb = db.collection('user')
exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext()
  try {
   const ret=await tb.where({ openid: OPENID}).limit(1).get()

   /* await chargeCollection.add({
      data: {
        openid: OPENID,
        ...event,
        created:db.serverDate(),
      }
    })*/
    //return '充值成功！'
    return ret
  } catch (e) {
    return '注册失败:' + JSON.stringify(e)
  }
}