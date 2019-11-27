
export function getFormatDateTime(date) {
    let seperator1 = "-"
    let seperator2 = ":"
    let month = date.getMonth() + 1;
    let strDate = date.getDate()
    if (month >= 1 && month <= 9) {
        month = "0" + month
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate
    }
    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds()
    console.log(currentdate)
    return currentdate

}

export function getFormatDate(date) {
    let seperator1 = "-"
    let month = date.getMonth() + 1;
    let strDate = date.getDate()
    if (month >= 1 && month <= 9) {
        month = "0" + month
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate
    }
    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
  
    return currentdate

}


export function DateAdd( date=new Date(),interval='d', number=1,) {
    switch (interval) {
    case "y ": {
        date.setFullYear(date.getFullYear() + number);
        return date;
       
    }
    case "q ": {
        date.setMonth(date.getMonth() + number * 3);
        return date;
      
    }
    case "m ": {
        date.setMonth(date.getMonth() + number);
        return date;
      
    }
    case "w ": {
        date.setDate(date.getDate() + number * 7);
        return date;
      
    }
    case "d ": {
        date.setDate(date.getDate() + number);
        return date;
       
    }
    case "h ": {
        date.setHours(date.getHours() + number);
        return date;
       
    }
    case "M ": {
        date.setMinutes(date.getMinutes() + number);
        return date;
       
    }
    case "s ": {
        date.setSeconds(date.getSeconds() + number);
        return date;
        
    }
    default: {
        date.setDate(date.getDate() + number);
        return date;
        
    }
    }
}

export function strToDate(str){
    //var str1 = "2014-12-31 00:55:55"  yyyy-mm-dd这种格式的字符串转化成日期对象可以用
    return new Date(Date.parse(str.replace(/-/g,"/")));
}