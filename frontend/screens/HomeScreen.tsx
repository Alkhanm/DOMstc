import { StyleSheet } from 'react-native';
import { appCss } from "../constants/App.css";
import ColorsCss from "../constants/Colors.css";
import { RootTabScreenProps } from '../types';
import { Text, View } from './widgets/Themed';


export default function TabHome({ }: RootTabScreenProps<'TabHome'>) {
  return (
    <View style={styles.container}>
      <View style={[appCss.card, styles.topSection]}>
        <View style={styles.topSectionSub}>
          <Text style={appCss.title}>Hoje</Text>
          <Text style={appCss.infoText4}>{new Date().toDateString()}</Text>
        </View>
        <View style={styles.topSectionSub}>
          <View style={styles.topSectionSubInfo}>
            <Text style={appCss.infoText2}>Vendas</Text>
            <Text>0</Text>
          </View>
          <View style={styles.topSectionSubInfo}>
            <Text style={appCss.infoText2}>Saldo</Text>
            <Text>R$ 00,00</Text>
          </View>
        </View>
      </View>
      <View style={[appCss.card, styles.middleSection]}>
        <Text>Card</Text>
      </View>
      <View style={[appCss.card, styles.bottomSection]}>
        <Text>Card</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleSection: {
    flex: 7.5
  },
  topSection: {
    flex: 1.5,
    justifyContent: "space-around",
    alignItems: "stretch"
  },
  topSectionSub: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  topSectionSubInfo: {
    flex: 1,
    margin: 2,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorsCss.grey.darken4
  },
  topSectionSubInfoText: {
    fontSize: 15,
    opacity: 0.7
  },
  bottomSection: {
    flex: 1
  },
});
