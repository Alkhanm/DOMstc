import { eCategory, eCompany, IProduct, tProductProperty } from "../interfaces/IProduct";

const Create = (
    description: string,
    purchaseDate: string,
    brand: string,
    purchasePrice: number,
    salePrice: number,
    barcode: number,
    quantity: number,
    volume: number = 0,
    weight: number = 0,
    unit: number = 0,
    category: eCategory,
    company: eCompany,
):
    IProduct => {
    const product: IProduct = {} as IProduct;
    product.description = description;
    product.purchaseDate = purchaseDate;
    product.brand = brand;
    product.category = category;
    product.company = company;
    product.purchasePrice = Number(purchasePrice);
    product.salePrice = Number(salePrice);
    product.code = Number(barcode);
    product.quantity = Number(quantity);
    product.volume = Number(volume);
    product.weight = Number(weight);
    product.unit = unit;
    return product;
}

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

export {
    Create,
    comparatorAscending,
    comparatorDescending,
    createFilter
};

