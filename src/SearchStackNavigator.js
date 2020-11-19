import React, { useContext } from "react";
import { StatusBar, StyleSheet, View, Text, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import SearchPageScreen from "./SearchPageScreen";
import FiltersPageScreen from "./FiltersPageScreen";
import { BlurView } from "@react-native-community/blur";
import { ThemeContext } from "./ThemeContext";

const Stack = createStackNavigator();
import { MenuButton } from "./NavButtons";

export default function SearchStackNavigator( {navigation}) {
  const {theme} = useContext(ThemeContext)

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: theme.headerTitleStyle,
        headerTransparent: true,
        headerBackground: () => (
          <BlurView blurType={theme.name} intensity={100} style={{...StyleSheet.absoluteFillObject}} />
        ),
        headerLeft: () => <MenuButton onPress={() => navigation.openDrawer()}  />,
        headerStyle: {
          backgroundColor: theme.colors.header,
          shadowOpacity: 0,
          // borderWidth: 10,
          borderColor: theme.colors.header,
          shadowColor: theme.colors.primary,
          // shadowColor: theme.shadowColor,
          // shadowOpacity: theme.shadowOpacity,
          // shadowRadius: theme.shadowRadius,
          // shadowOffset: theme.shadowOffset,
        },
      }}
    >
      <Stack.Screen name="Search" component={SearchPageScreen} />
      <Stack.Screen name="Filters" component={FiltersPageScreen} />
    </Stack.Navigator>
  );
}
