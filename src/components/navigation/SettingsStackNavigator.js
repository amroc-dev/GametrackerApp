import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "./SettingsScreen";
import { getHeaderScreenOptions } from "./NavigationCommon" 

const Stack = createStackNavigator();

export default function SettingsStackNavigator({ navigation }) {
  const screenOptions = getHeaderScreenOptions()

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
