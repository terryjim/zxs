const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const chargeCollection = db.collection('charge')
exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext()
  try {
   
    await chargeCollection.add({
      data: {
        openid: OPENID,
        ...event,
        created:db.serverDate(),
      }
    })
    return '充值成功！'
  } catch (e) {
    return '充值失败:' + JSON.stringify(e)
  }
}