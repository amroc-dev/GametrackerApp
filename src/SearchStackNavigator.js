import React, { useContext } from "react";
import { StatusBar, StyleSheet, View, Text, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import SearchPageScreen from "./SearchPageScreen";
import FiltersPageScreen from "./FiltersPageScreen";
import { BlurView } from "@react-native-community/blur";
import { ThemeContext } from "./ThemeContext";

const Stack = createStackNavigator();
import { MenuButton } from "./NavButtons";

export default function SearchStackNavigator({ navigation }) {
  const { theme } = useContext(ThemeContext);

  // const blurType = theme.name === 'light' ? 'thinMaterialLight' : 'materialDark'

  let screenOptions = {
    headerShown: true,
    headerTitleStyle: theme.headerTitleStyle,
    // headerTransparent: true,
    // headerBackground: () => (
    //   <BlurView blurType={blurType} style={{...StyleSheet.absoluteFillObject}} />
    // ),
    headerLeft: () => <MenuButton onPress={() => navigation.openDrawer()} />,
    headerStyle: {
      backgroundColor: theme.colors.header,
      shadowOpacity: 0,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.isDark ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.15)",
      borderColor: theme.colors.header,
      shadowColor: theme.colors.primary,
      // shadowColor: theme.shadowColor,
      // shadowOpacity: theme.shadowOpacity,
      // shadowRadius: theme.shadowRadius,
      // shadowOffset: theme.shadowOffset,
    },
  };

  // if (theme.isDark) {
  //   screenOptions['headerTransparent'] = true;
  //   screenOptions['headerBackground'] = () => <BlurView blurType="materialDark" style={{ ...StyleSheet.absoluteFillObject }} />;
  // }

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Search" component={SearchPageScreen} />
      <Stack.Screen name="Filters" component={FiltersPageScreen} />
    </Stack.Navigator>
  );
}
