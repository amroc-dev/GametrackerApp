import React, {useContext} from "react";
import { ThemeContext } from "./ThemeContext";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import SearchStackNavigator from "./SearchStackNavigator";

const Drawer = createDrawerNavigator();

export default function MenuStackNavigator() {
  const {theme} = useContext(ThemeContext);
  
  return (
    <Drawer.Navigator drawerType="back" edgeWidth={0} screenOptions={{ headerShown: false, background: theme.colors.background1 }}>
      <Drawer.Screen name="Search" component={SearchStackNavigator} />
    </Drawer.Navigator>
  );
}
