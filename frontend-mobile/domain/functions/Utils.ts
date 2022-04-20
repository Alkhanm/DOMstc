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

function formatMonetaryValue(value: string): number {
    const formated = value.replace(/[^0-9]/g, "")
    if (formated.length < 2) return Number(formated)
    const lastTwoDigitsIndex = formated.length < 3 ? formated.length - 1 : formated.length - 2;
    const subarray = formated.substring(0, lastTwoDigitsIndex)
    const lastTwoDigits = "." + formated.substring(lastTwoDigitsIndex)
    return Number(subarray.concat(lastTwoDigits))
  }

export {
    textSizeLimiter,
    getProperty,
    formatMonetaryValue,
    getCommonDate,
};

