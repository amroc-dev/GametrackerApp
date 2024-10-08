import React, { useContext } from "react";
import { View } from "react-native";
import { ThemeContext } from "@root/ThemeContext";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import MenuDrawerContent from "./MenuDrawerContent"
import SearchStackNavigator from "./SearchStackNavigator";
import SettingsStackNavigator from "./SettingsStackNavigator";
import { transparentize } from "polished";

const Drawer = createDrawerNavigator();

export default function MenuDrawerNavigator() {
  const { theme } = useContext(ThemeContext);

  return (
    <Drawer.Navigator
    drawerContent={ (props) => <MenuDrawerContent {...props} />}
    drawerContentOptions={{
      activeBackgroundColor: 'rgba(0,0,0,0)',//transparentize(0.0, theme.colors.background2),
      // labelStyle:{color: theme.fonts.colors.title},
      activeTintColor: theme.fonts.colors.title,
      inactiveTintColor: theme.fonts.colors.secondary,
    }}
    drawerStyle={{
      backgroundColor: theme.isDark ? theme.colors.background : theme.colors.secondary,
      width: 200,
      paddingTop: 44,
    }}
      drawerType="back"
      edgeWidth={0}
    >
      <Drawer.Screen name="Search" component={SearchStackNavigator} />
      <Drawer.Screen name="Settings" component={SettingsStackNavigator} />
    </Drawer.Navigator>
  );
}
