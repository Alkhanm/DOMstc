
function dateFormat(date: Date): string {
    const formated: string = `${date.getDay()}-${date.getMonth()}-${date.getDate()}`;
    return formated;
}

function getValues(obj: object, route: string, path = "") {
    Object.values(obj).forEach((value) => {
        if (value["name"] === route) {
            return `${path}`;
        }
        if (typeof value === "object") {
            getValues(value, route, path.length ? path + " - " + value["name"] : value["name"]);
        }
    });
}

export const UtilFunctions = {
    dateFormat
}