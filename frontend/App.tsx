import { SafeAreaView } from "react-native-safe-area-context";
import { CartContextProvider } from "./context/CartContext";
import { ProductContextProvider } from "./context/ProductContext";
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
          <SafeAreaView style={{ flex: 1 }}>
            <Navigation colorScheme={colorScheme} />
          </SafeAreaView>
        </CartContextProvider>
      </ProductContextProvider>
    );
  }
}
