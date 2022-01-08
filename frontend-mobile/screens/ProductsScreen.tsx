import { StyleSheet } from 'react-native';
import EditInfo from './components/EditInfo';
import { Text, View } from './components/Themed';


export default function TabProducts() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produtos</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditInfo path="/screens/TabTwoScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
