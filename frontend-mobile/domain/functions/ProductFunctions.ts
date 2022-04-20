import { eCategory, eCompany, IProduct, tProductProperty } from "../interfaces/IProduct";

function comparatorDescending(property: tProductProperty) {
    return (p1: IProduct, p2: IProduct) => {
        if (p1[property] > p2[property]) return -1;
        if (p1[property] < p2[property]) return 1;
        return 0;
    }
}

function comparatorAscending(property: tProductProperty) {
    return (p1: IProduct, p2: IProduct) => {
        if (p1[property] > p2[property]) return 1;
        if (p1[property] < p2[property]) return -1;
        return 0;
    }
}

function createFilter(property: tProductProperty) {
    return function(value: any) {
        return function (product: IProduct) {
            if (value === product[property]) {
                return product;
            }
        }
    }
}
function getCompany(value: string): eCompany{
    return eCompany[value]
}

function getCategory(value: string): eCategory{
    return eCategory[value]
}

export {
    comparatorAscending,
    comparatorDescending,
    createFilter,
    getCompany,
    getCategory
};

