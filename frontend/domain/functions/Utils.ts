function textSizeLimiter(value: string | number, limiter: number) {
    const text = String(value);
    if (text.length > limiter) return `${text.substring(0, limiter)}...`
    return text;
}

 function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
    return o[propertyName]
}


export {
    textSizeLimiter,
    getProperty
};
