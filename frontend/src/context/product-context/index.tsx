import React, { useState } from "react";
import iProduct from "../../domain/interfaces/iProduct";

interface iProductContext {
    product: iProduct;
}

const ProductContext = React.createContext({} as iProductContext)

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    const [product] = useState({} as iProduct)

    return (
        <ProductContext.Provider value={{ product }}>
            {children}
        </ProductContext.Provider>
    )
}

function useProductContext(){
    return React.useContext(ProductContext)
}

export {
    ProductContext,
    ProductProvider,
    useProductContext
};
