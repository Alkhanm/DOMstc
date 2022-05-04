export function isEmpty (value: unknown): boolean {
    return value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && String(value).trim().length === 0);
}
