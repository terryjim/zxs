const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const tb = db.collection('appointment')
exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext()
  try {
   
    await tb.add({
      data: {
        openid: OPENID,
        ...event,
        created:db.serverDate(),
      }
    })
    return '预约成功！'
  } catch (e) {
    return '预约失败:' + JSON.stringify(e)
  }
}