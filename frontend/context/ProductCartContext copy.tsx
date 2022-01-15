import React, { useState } from 'react';
import { IProduct } from "../domain/interfaces/IProduct";

interface Item {
  quantity: number;
  product: IProduct;
}

interface contextType {
  items: Item[];
  add: (product: IProduct, qnt?: number) => void;
  remove: (product: IProduct, qnt?: number) => void;
}

const ProductCartContext = React.createContext({} as contextType);

export const ProductCartContextProvider: React.FC = ({ children }) => {
  const [items, setItems] = useState<Item[]>([])


  function add(product: IProduct, qnt: number = 1) {
    const itemFound = items.find(p => p.product.code === product.code);
    if (!itemFound) return setItems([...items, { product, quantity: qnt }]);
    const indexOfItemFound = items.indexOf(itemFound);
    const quantity = itemFound.quantity + qnt;
    items[indexOfItemFound] = { ...itemFound, quantity };
    setItems([...items])
  }

  function remove(product: IProduct, qnt: number = 1) {
    const itemFound = items.find(p => p.product.code === product.code);
    if (!itemFound) return;
    const quantity = itemFound.quantity - qnt;
    const indexOfItemFound = items.indexOf(itemFound);
    if (quantity <= 0)
      return setItems(items.filter(p => p.product.code !== product.code));
    items[indexOfItemFound] = { ...itemFound, quantity };
    setItems([...items])
  }

  return (
    <ProductCartContext.Provider value={{ items, add, remove }} >
      {children}
    </ProductCartContext.Provider>
  );
}

export function useProductCartContext() {
  return React.useContext(ProductCartContext)
};