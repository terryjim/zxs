const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command
/* const table = db.collection('appointment') */
exports.main = async (event) => {    
   try {
   const ret=await db.collection('appointment').where(
      /*_.or([{start:_.lte(event.start),end:_.gte(event.end)},{start:_.gte(event.start),start:_.lte(event.end)}])*/
     /* _.or([{desk:'A06'},{
    start: _.lte('2019-11-25')
 ,end:_.gte('2019-11-26') },{
    start: _.gte('2019-11-25')
 ,start:_.lte('2019-11-26') }])*/
 {desk:'A6'}
)
return ret

  }catch (e) {
    return '预约失败:' + JSON.stringify(e)
  }
}

/* 
  startdate1 BETWEEN startdate2 AND enddate2)

or (enddate1 BETWEEN startdate2 AND enddate2)

or (startdate2 BETWEEN startdate1 AND enddate1)

or (enddate2 BETWEEN startdate1 AND enddate1) */