import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "./SearchScreen";
import FiltersScreen from "./FiltersScreen";
import { getHeaderScreenOptions } from "./NavigationCommon" 

const Stack = createStackNavigator();

export default function SearchStackNavigator({ navigation }) {
  const screenOptions = getHeaderScreenOptions()

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Filters" component={FiltersScreen} />
    </Stack.Navigator>
  );
}
