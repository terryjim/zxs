/**
 * 获取充值记录
 */
// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const tb=db.collection('charge')
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    const ret = await tb.aggregate().
    lookup({
      from: 'user', 
      localField: 'openid',
      foreignField: 'openid',
      as:'user'
      })
      .end()
    return ret
  } catch (e) {
    console.error(e)
  }
  
}