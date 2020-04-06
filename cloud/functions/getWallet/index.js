/**
 * 获取未消费课程信息
 *  联合查询wallet/product/user表
 */
// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const tb = db.collection('wallet')
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    let $ = db.command.aggregate
    const ret = await tb.aggregate().
      lookup({
        from: 'user',
        localField: 'openid',
        foreignField: 'openid',
        as: 'users'
      }).replaceRoot({
        newRoot: $.mergeObjects([$.arrayElemAt(['$users', 0]),'$$ROOT'])
      }).project({ users: 0}).project({product_id:1,quantity:1,openid:1,quantity:1,user_name: '$name'}).lookup({ from: 'product', localField: 'product_id', foreignField: '_id', as: 'products' }).replaceRoot({
        newRoot: $.mergeObjects([$.arrayElemAt(['$products', 0]), '$$ROOT'])
      }).project({ products: 0 ,memo:0,weight:0,price:0,real_price:0})
      .end()
    return ret
  } catch (e) {
    console.error(e)
  }

}