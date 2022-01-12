import { SafeAreaView } from "react-native-safe-area-context";
import { LoadingContextProvider } from "./context/LoadingContext";
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
        <SafeAreaView style={{flex: 1}}>
          <LoadingContextProvider>
            <Navigation colorScheme={colorScheme} />
          </LoadingContextProvider>
        </SafeAreaView>
      </ProductContextProvider>
    );
  }
}
