const config={
  appid: 'wx8f77fa93cb141527', //小程序Appid
      envName: 'zf-shcud', // 小程序云开发环境ID
      mchid: '1568694471', //商户号
      partnerKey: '4f6il6blht67hl5C7GIPsHXFyRIN4BNJ', //此处填商户密钥
      notify_url: 'https://mp.weixin.qq.com', //支付回调网址,这里可以随意填一个网址
      spbill_create_ip: '127.0.0.1'
}
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