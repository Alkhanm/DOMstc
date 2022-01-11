/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors.css';
import useColorScheme from '../hooks/useColorScheme';
import NotFoundScreen from '../screens/components/NotFound';
import { ProductDetail } from "../screens/components/ProductDetail";
import { ProductEdit } from "../screens/components/ProductEdit";
import ProductNew from '../screens/components/ProductNew';
import Home from '../screens/HomeScreen';
import { ProductsScreen } from '../screens/ProductsScreen';
import { Text } from "../screens/widgets/Themed";
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="ProductNew" component={ProductNew} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="ProductEdit" component={ProductEdit} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabHome"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="TabHome"
        component={Home}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabProducts"
        component={ProductsScreen}
        options={({ navigation }: RootTabScreenProps<'TabProducts'>) => ({
          title: 'Produtos',
          tabBarIcon: ({ color }) => <TabBarIcon name="cart-arrow-down" color={color}></TabBarIcon>,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ProductNew')}
              style={styles.newProduct}
            >
              <Text>Novo</Text>
              <MaterialCommunityIcons
                name="plus"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>
          )
        })}
      />
    </BottomTab.Navigator >
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
}) {
  return <MaterialCommunityIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const styles = StyleSheet.create({
  newProduct: {
    flex: 1,
    padding: "5%",
    flexDirection: "row",

  }
})
