import React, { useState } from 'react';
import { ProductsDumb } from "../domain/dumb";
import { IProduct } from "../domain/interfaces/IProduct";

interface contextType {
  products: IProduct[];
  addProducts: (products: IProduct[]) => void;
}

const ProductContext = React.createContext({} as contextType);

export const ProductContextProvider: React.FC = ({ children }) => {

  const [products, setProducts] = useState({} as IProduct[])

  const addProducts = (products: IProduct[]) => {
    setProducts(products)
  }

  useState(() => {
    addProducts(ProductsDumb)
  })

  return (
    <ProductContext.Provider value={{ products, addProducts }} >
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  return React.useContext(ProductContext)
};