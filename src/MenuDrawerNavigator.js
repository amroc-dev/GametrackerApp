import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import MenuDrawerContent from "./MenuDrawerContent"
import SearchStackNavigator from "./SearchStackNavigator";
import SettingsPage from "./SettingsPage";

const Drawer = createDrawerNavigator();

export default function MenuDrawerNavigator() {
  const { theme } = useContext(ThemeContext);

  return (
    <Drawer.Navigator
    // drawerContent={(props) => <MenuDrawerContent {...props} />}
    drawerStyle={{
      backgroundColor: theme.colors.background,
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
