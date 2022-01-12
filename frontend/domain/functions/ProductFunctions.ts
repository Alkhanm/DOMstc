import { IProduct } from "../interfaces/IProduct";

const ProductCreator =
    (
        description: string,
        purchaseDate: string,
        brand: string,
        purchasePrice: number,
        salePrice: number,
        barcode: number,
        weight: number,
        volume: number,
        quantity: number,
        unit?: number
    ):
        IProduct => {
        const product: IProduct = {} as IProduct;
        product.description = description;
        product.purchaseDate = purchaseDate;
        product.brand = brand;
        // product.category = category;
        // product.company = company;
        product.purchasePrice = Number(purchasePrice);
        product.salePrice = Number(salePrice);
        product.code = Number(barcode);
        product.quantity = Number(quantity);
        product.volume = Number(volume);
        product.weight = Number(weight);
        product.unit = unit;
        return product;
    }

export {
    ProductCreator
};

