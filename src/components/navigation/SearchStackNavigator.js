import React, { useContext } from "react";
import { StatusBar, StyleSheet, View, Text, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import SearchPageScreen from "./SearchPageScreen";
import FiltersPageScreen from "./FiltersPageScreen";
import { BlurView } from "@react-native-community/blur";
import { ThemeContext } from "@root/ThemeContext";
import { getHeaderScreenOptions } from "./NavigationCommon" 

const Stack = createStackNavigator();
import { MenuButton } from "./NavigationCommon";

export default function SearchStackNavigator({ navigation }) {
  const { theme } = useContext(ThemeContext);
  
  const screenOptions = getHeaderScreenOptions()

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Search" component={SearchPageScreen} />
      <Stack.Screen name="Filters" component={FiltersPageScreen} />
    </Stack.Navigator>
  );
}
