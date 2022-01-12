import React, { useState } from 'react';

type contextType = {
  loading: boolean,
  setLoading: (loading: boolean) => void;
}

const LoadingContext = React.createContext({} as contextType);

export const LoadingContextProvider: React.FC = ({ children }) => {

  const [loading, setLoading] = useState(false)


  return (
    <LoadingContext.Provider value={{ loading, setLoading }} >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoadingContext() {
  return React.useContext(LoadingContext)
};