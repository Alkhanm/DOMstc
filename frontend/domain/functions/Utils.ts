function textSizeLimiter(value: string | number, limiter: number) {
    const text = String(value);
    if (text.length > limiter) return `${text.substring(0, limiter)}...`
    return text;
}


export const UTILS = {
    textSizeLimiter
}