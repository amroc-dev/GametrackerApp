import React from "react";
import { StatusBar, StyleSheet, View, Text, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import SearchPageScreen from "./SearchPageScreen";
import FiltersPageScreen from "./FiltersPageScreen";

import theme, { headerTitleStyle } from "./Theme";

const Stack = createStackNavigator();
import { MenuButton } from "./NavButtons";

export default function SearchStackNavigator( {navigation}) {
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#fff",
        headerTitleStyle: headerTitleStyle,
        // headerTransparent: true,
        // headerBackground: () => (
        //   <BlurView tint="light" intensity={100} style={{...StyleSheet.absoluteFillObject, backgroundColor: "red"}} />
        // ),
        headerLeft: () => <MenuButton onPress={() => navigation.openDrawer()}  />,
        headerStyle: {
          backgroundColor: theme.colors.primary,
          shadowColor: theme.shadowColor,
          shadowOpacity: theme.shadowOpacity,
          shadowRadius: theme.shadowRadius,
          shadowOffset: theme.shadowOffset,
        },
      }}
    >
      <Stack.Screen name="Search" component={SearchPageScreen} />
      <Stack.Screen name="Filters" component={FiltersPageScreen} />
    </Stack.Navigator>
  );
}
