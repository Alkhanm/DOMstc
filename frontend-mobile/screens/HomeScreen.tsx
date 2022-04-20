import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useMemo } from "react";
import { StyleSheet } from 'react-native';
import { appCss } from "../constants/App.css";
import ColorsCss from "../constants/Colors.css";
import { useSaleContext } from "../context/SaleContext";
import { isToday } from "../domain/functions/DateFunctions";
import { RootTabScreenProps } from '../navigation/types';
import { AlkButton } from "./widgets/AlkButton";
import { AlkCircularProgress } from "./widgets/AlkProgressCircle";
import { Text, View } from './widgets/Themed';


export default function TabHome({ navigation }: RootTabScreenProps<'TabHome'>) {
  const SaleContext = useSaleContext();

  const currentSales = useMemo(() => {
    return SaleContext.sales
      .filter(({ date }) => isToday(date))
  }, [SaleContext.sales])

  const balance = useMemo(() => {
    return currentSales
      .map(s => s.product.salePrice * s.quantity)
      .reduce((s1, s2) => s1 + s2, 0)
  }, [currentSales])

  const salesQnt = useMemo(() => {
    return currentSales
      .map(({ quantity }) => quantity)
      .reduce((s1, s2) => s1 + s2, 0)
  }, [currentSales])

  const cost = useMemo(() => {
    return currentSales
      .map(s => s.product.purchasePrice * s.quantity)
      .reduce((s1, s2) => s1 + s2, 0)
  }, [currentSales]);

  const profit = useMemo(() => balance - cost, [currentSales])

  const profitPorcent = useMemo(() => (profit / balance * 100 || 0), [currentSales])

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
            <Text>{salesQnt}</Text>
          </View>
          <View style={styles.topSectionSubInfo}>
            <Text style={appCss.infoText2}>Saldo</Text>
            <Text>R$ {balance.toFixed(2)}</Text>
          </View>
        </View>
      </View>
      <View style={[appCss.card, styles.middleSection]}>
        <AlkCircularProgress percent={Number.parseFloat(profitPorcent.toFixed(2))} label="Margem de lucro" />
        <View style={styles.middleSectionValues}>
          <View style={styles.middleSectionGrossProfit}>
            <Text style={appCss.infoText4}>Lucro</Text>
            <Text style={appCss.infoText3}>R$ {profit.toFixed(2)}</Text>
          </View>
          <View style={styles.middleSectionCost}>
            <Text style={appCss.infoText4}>Custo</Text>
            <Text style={appCss.infoText3}>R$ {cost.toFixed(2)}</Text>
          </View>
        </View>
      </View>
      <View style={[appCss.card, styles.bottomSection]}>
        <AlkButton onPress={() => navigation.navigate("Sale")} style={styles.saleButton}>
          <MaterialCommunityIcons name="sale" size={25} color={"white"} />
          <Text style={appCss.actionText}>Vendas</Text>
        </AlkButton>
        <AlkButton style={styles.saleButton}>
          <MaterialCommunityIcons name="alert-circle-check-outline" size={25} color={"white"} />
          <Text style={appCss.actionText}>Anuncios</Text>
        </AlkButton>
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
    paddingHorizontal: 15,
  },
  middleSectionValues: {
    flex: 1,
  },
  middleSectionGrossProfit: {
    justifyContent: "center",
    height: "15%",
    width: "95%",
    margin: 10,
    padding: 10,
    borderLeftWidth: 8,
    borderLeftColor: ColorsCss.blue.darken2,
    backgroundColor: ColorsCss.grey.darken4,
    borderRadius: 15
  },
  middleSectionCost: {
    justifyContent: "center",
    height: "15%",
    width: "95%",
    margin: 10,
    padding: 5,
    borderLeftWidth: 8,
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
