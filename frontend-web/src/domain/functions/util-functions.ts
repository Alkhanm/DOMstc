
function dateFormat(date: Date): string{
    const formated: string = `${date.getDay()}-${date.getMonth()}-${date.getDate()}`;
    return formated;
}



export const UtilFunctions = {
    dateFormat
}