import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import FiltersPage from "./FiltersPage";
import { BackButton } from "./NavButtons";

export default function FiltersPageScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Filters",
      headerLeft: () => (
        <BackButton onPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation]);

  return <FiltersPage />;
}
