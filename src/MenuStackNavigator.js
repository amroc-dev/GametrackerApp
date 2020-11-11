import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import SearchStackNavigator from "./SearchStackNavigator";

const Drawer = createDrawerNavigator();

export default function MenuStackNavigator() {
  return (
    <Drawer.Navigator drawerType="back" edgeWidth={0} screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Search" component={SearchStackNavigator} />
    </Drawer.Navigator>
  );
}
