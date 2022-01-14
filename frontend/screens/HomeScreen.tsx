import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from 'react-native';
import { appCss } from "../constants/App.css";
import ColorsCss from "../constants/Colors.css";
import { RootTabScreenProps } from '../types';
import { AlkButton } from "./widgets/AlkButton";
import { AlkCircularProgress } from "./widgets/AlkProgressCircle";
import { Text, View } from './widgets/Themed';


export default function TabHome({ navigation }: RootTabScreenProps<'TabHome'>) {
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
        <AlkCircularProgress percent={55} label="Margem de lucro" />
        <View style={styles.middleSectionValues}>
          <View style={styles.middleSectionProfitValue}>
            <Text style={appCss.infoText4}>Lucro bruto</Text>
            <Text style={appCss.infoText3}>R$00,00</Text>
          </View>
          <View style={styles.middleSectionCostValue}>
            <Text style={appCss.infoText4}>Custo</Text>
            <Text style={appCss.infoText3}>R$00,00</Text>
          </View>
        </View>
      </View>
      <View style={[appCss.card, styles.bottomSection]}>
        <AlkButton
          onPress={() => navigation.navigate("Sale")}
          propStyle={styles.saleButton}
          children={
            <>
              <MaterialCommunityIcons name="sale" size={25} color={"white"} />
              <Text style={appCss.actionText}>Vendas</Text>
            </>
          }
        />
         <AlkButton
          onPress={() => {}}
          propStyle={styles.saleButton}
          children={
            <>
              <MaterialCommunityIcons name="alert-circle-check-outline" size={25} color={"white"} />
              <Text style={appCss.actionText}>Anuncios</Text>
            </>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10
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
  middleSection: {
    flex: 7.5,
    alignItems: "center",
    flexDirection: "row",
  },
  middleSectionValues: {
    flex: 1,
  },
  middleSectionProfitValue: {
    justifyContent: "center",
    height: "15%",
    width: "95%",
    margin: 10,
    padding: 10,
    borderLeftWidth: 5,
    borderLeftColor: ColorsCss.blue.darken2,
    backgroundColor: ColorsCss.grey.darken4,
    borderRadius: 15
  },
  middleSectionCostValue: {
    justifyContent: "center",
    height: "15%",
    width: "95%",
    margin: 10,
    padding: 5,
    borderLeftWidth: 5,
    borderLeftColor: ColorsCss.red.darken,
    backgroundColor: ColorsCss.grey.darken4,
    borderRadius: 15,
  },
  bottomSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  saleButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    width: "40%",
    height: "90%"
  },
});
