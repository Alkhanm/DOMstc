
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

function acceptOnlyNumber(event: any) {
    const expect = event.target.value.toString() + event.key.toString();
    if (!/^[0-9]*\.?[0-9]*$/.test(expect)) {
        event.preventDefault();
    }
}

function acceptOnlyIntegerNumber(event: any) {
    const expect = event.target.value.toString() + event.key.toString();
    if (!/^[0-9]*$/.test(expect)) {
      event.preventDefault();
    }
}

export const UtilFunctions = {
    dateFormat,
    acceptOnlyNumber,
    acceptOnlyIntegerNumber
}