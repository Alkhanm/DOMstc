import { SafeAreaView } from "react-native-safe-area-context";
import { LoadingContextProvider } from "./context/LoadingContext";
import { ProductCartContextProvider } from "./context/ProductCartContext copy";
import { ProductContextProvider } from "./context/ProductContext";
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
/* 
"react-native-portalize": "1.0.3",
    "react-native-reanimated": "~2.2.0",
    "react-native-tab-view": "2.14.0",
    "react-native-web-webview": "1.0.1",
    "react-native-webview": "11.13.0", 
    */

export default function App() {
  const isLoadingCacheComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingCacheComplete) {
    return null;
  } else {
    return (
      <ProductContextProvider>
        <ProductCartContextProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <LoadingContextProvider>
            <Navigation colorScheme={colorScheme} />
          </LoadingContextProvider>
        </SafeAreaView>
        </ProductCartContextProvider>
      </ProductContextProvider>
    );
  }
}
