import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Home } from "../components/home";
import { NewProduct } from "../components/new-product";


const Tab = createBottomTabNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
        <Tab.Screen name="Início" component={Home} options={{
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="home" size={size} color={color} />
        }} />
        <Tab.Screen name="Cadastrar" component={NewProduct} options={{
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="box" size={size} color={color} />
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
