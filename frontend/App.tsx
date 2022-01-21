import { SafeAreaView } from "react-native-safe-area-context";
import { CartContextProvider } from "./context/CartContext";
import { ProductContextProvider } from "./context/ProductContext";
import { SaleContextProvider } from "./context/SaleContext";
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const isLoadingCacheComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingCacheComplete) {
    return null;
  } else {
    return (
      <ProductContextProvider>
        <CartContextProvider>
          <SaleContextProvider>
            <SafeAreaView style={{ flex: 1 }}>
              <Navigation colorScheme={colorScheme} />
            </SafeAreaView>
          </SaleContextProvider>
        </CartContextProvider>
      </ProductContextProvider>
    );
  }
}
