
function getCommonDate(date: Date){
    const month = date.getUTCMonth() + 1 < 10 ? "" + date.getUTCMonth() + 1 : date.getUTCMonth() + 1
    const day = date.getDate()
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}

function isToday(date: Date){
    const today = new Date()
    today.setMilliseconds(0);
    today.setSeconds(0)
    today.setMinutes(0)
    today.setHours(0)
    return date.getTime() >= today.getTime()
}



export {
    getCommonDate,
    isToday
}
