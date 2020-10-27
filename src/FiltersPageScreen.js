import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import { Button } from "react-native-elements";
import FiltersPage from "./FiltersPage";
import theme, { headerTitleStyle } from "./Theme";

export default function FiltersPageScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Filters",
    });
  }, [navigation]);

  return <FiltersPage />;
}
