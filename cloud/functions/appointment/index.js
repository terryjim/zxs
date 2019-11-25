const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const tb = db.collection('appointment')
exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext()
  try {
<<<<<<< HEAD
     
=======
   
>>>>>>> 2f986efea87d06812686016512fa82934fbad2fa
    await tb.add({
      data: {
        openid: OPENID,
        ...event,
        created:db.serverDate(),
      }
    })
<<<<<<< HEAD
    return JSON.stringify(event)+'预约成功！'
=======
    return '预约成功！'
>>>>>>> 2f986efea87d06812686016512fa82934fbad2fa
  } catch (e) {
    return '预约失败:' + JSON.stringify(e)
  }
}