function textSizeLimiter(value: string | number, limiter: number) {
    const text = String(value);
    if (text.length > limiter) return `${text.substring(0, limiter)}...`
    return text;
}

function getCommonDate(date: Date){
    const month = "" + date.getUTCMonth() + 1
    const day = date.getDate()
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}
 function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
    return o[propertyName]
}


export {
    textSizeLimiter,
    getProperty,
    getCommonDate
};
