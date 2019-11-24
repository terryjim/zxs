const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command
/* const table = db.collection('appointment') */
exports.main = async (event) => {    
    await db.collection('appointment').where(
      _.or([{start:_.lte(event.start),end:_.gte(event.end)},{start:_.gte(event.start),start:_.lte(event.end)}])
).get({
      success: function(res) {
        console.log(res.data)
      }
    })
  }

/* 
  startdate1 BETWEEN startdate2 AND enddate2)

or (enddate1 BETWEEN startdate2 AND enddate2)

or (startdate2 BETWEEN startdate1 AND enddate1)

or (enddate2 BETWEEN startdate1 AND enddate1) */