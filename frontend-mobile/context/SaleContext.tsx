import React, { useState } from 'react';
import { ISale } from "../domain/interfaces/ISale";

interface contextType {
  sales: ISale[];
  addSales: (sales: ISale[]) => void;
}

const SaleContext = React.createContext({} as contextType);

export const SaleContextProvider: React.FC = ({ children }) => {

  const [sales, setSales] = useState<ISale[]>([])

  const addSales = (newSales: ISale[]) => {
    setSales([...sales, ...newSales])
  }


  return (
    <SaleContext.Provider value={{ sales, addSales }} >
      {children}
    </SaleContext.Provider>
  );
}

export function useSaleContext() {
  return React.useContext(SaleContext)
};