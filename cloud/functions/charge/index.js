const config = {
  appid: 'wx8f77fa93cb141527', //小程序Appid
  envName: 'zxs5188', // 小程序云开发环境ID
  mchid: '1568694471', //商户号
  partnerKey: '4f6il6blht67hl5C7GIPsHXFyRIN4BNJ', //此处填商户密钥
  notify_url: 'https://mp.weixin.qq.com', //支付回调网址,这里可以随意填一个网址
  spbill_create_ip: '127.0.0.1'
}
const cloud = require('wx-server-sdk')
const tenpay = require('tenpay')

cloud.init()
const db = cloud.database();
const tb_charge = db.collection('charge')
const tb_product=db.collection('product')
exports.main = async (event) => {
  console.log(event)
  const {productId,quantity}=event
  const { OPENID } = cloud.getWXContext()
 // let { goods_id } = event
  const api = tenpay.init(config);
  console.log('----------------------')
let res=await tb_product.doc(productId).get()
let product=res.data
console.log(product)
console.log(product.real_price*quantity)
  let result = await api.getPayParams({

    out_trade_no: OPENID.slice(10)+'-'+ Date.now(),

    body: product.name,

    total_fee:product.real_price*quantity, //订单金额(分),

    openid: OPENID //付款用户的openid

  });

  return result;

}

