import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import MenuDrawerContent from "./MenuDrawerContent"
import SearchStackNavigator from "./SearchStackNavigator";
import SettingsPage from "./SettingsPage";
import { transparentize } from "polished";

const Drawer = createDrawerNavigator();

export default function MenuDrawerNavigator() {
  const { theme } = useContext(ThemeContext);

  return (
    <Drawer.Navigator
    drawerContentOptions={{
      activeBackgroundColor: 'rgba(0,0,0,0)',//transparentize(0.0, theme.colors.background2),
      // labelStyle:{color: theme.fonts.colors.title},
      activeTintColor: theme.fonts.colors.title,
      inactiveTintColor: theme.fonts.colors.secondary,
    }}
    drawerStyle={{
      backgroundColor: theme.isDark ? theme.colors.background : theme.colors.secondary,
      width: 200,
    }}
      drawerType="back"
      edgeWidth={0}
      // initialRouteName="Search"
      // screenOptions={{ headerShown: true, background: theme.colors.background }}
    >
      <Drawer.Screen name="Search" component={SearchStackNavigator} />
      <Drawer.Screen name="Settings" component={SettingsPage} />
    </Drawer.Navigator>
  );
}
