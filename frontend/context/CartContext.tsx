import React, { useState } from 'react';
import { IItem } from "../domain/interfaces/IItem";
import { IProduct } from "../domain/interfaces/IProduct";


interface contextType {
  items: IItem[];
  add: (product: IProduct, qnt?: number) => void;
  reduce: (product: IProduct, qnt?: number) => void;
  remove: (product: IProduct) => void;
}

const CartContext = React.createContext({} as contextType);

export const CartContextProvider: React.FC = ({ children }) => {
  const [items, setItems] = useState<IItem[]>([])


  function add(product: IProduct, qnt: number = 1) {
    const itemFound = items.find(p => p.product.code === product.code);
    if (!itemFound) return setItems([...items, { product, quantity: qnt }]);
    const indexOfItemFound = items.indexOf(itemFound);
    const quantity = itemFound.quantity + qnt;
    items[indexOfItemFound] = { ...itemFound, quantity };
    setItems([...items]);
  }

  function reduce(product: IProduct, qnt: number = 1) {
    const itemFound = items.find(p => p.product.code === product.code);
    if (!itemFound) return;
    const quantity = itemFound.quantity - qnt;
    const indexOfItemFound = items.indexOf(itemFound);
    if (quantity <= 0)
      return setItems(items.filter(p => p.product.code !== product.code));
    items[indexOfItemFound] = { ...itemFound, quantity };
    setItems([...items])
  }

  function remove(product: IProduct) {
    const newItems = items.filter((item) => item.product.code !== product.code)
    setItems([...newItems])
  }

  return (
    <CartContext.Provider value={{ items, add, reduce, remove }} >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return React.useContext(CartContext)
};