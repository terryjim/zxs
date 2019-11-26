const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command
const $ = db.command.aggregate
/* const table = db.collection('appointment') */
exports.main = async (event) => {

  return await db.collection('appointment').aggregate().match( _.or([{start:_.lte(event.start),end:_.gte(event.end)},{start:_.gte(event.start),start:_.lte(event.end)}])  )
  .group({
    // 按 category 字段分组
    _id: '$desk',   
/*    count: $.sum(1)*/
  })
  .end()
  /*return await db.collection('appointment').field({_id:false,desk:true}).where(
    _.or([{start:_.lte(event.start),end:_.gte(event.end)},{start:_.gte(event.start),start:_.lte(event.end)}])  
  ).get({
    success: function (res) {
      // res.data 是包含以上定义的两条记录的数组
      return res
     // console.log(res.result.data)
    }
  })*/
}

/* 
  startdate1 BETWEEN startdate2 AND enddate2)

or (enddate1 BETWEEN startdate2 AND enddate2)

or (startdate2 BETWEEN startdate1 AND enddate1)

or (enddate2 BETWEEN startdate1 AND enddate1) */