import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import { Button } from "react-native-elements";
import SearchPage from "./SearchPage";
import theme, { headerTitleStyle } from "./Theme";

export default function SearchPageScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Search",
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate("Filters")}
          title="Filters"
          type="clear"
          titleStyle={headerTitleStyle}
        />
      ),
    });
  }, [navigation]);

  return <SearchPage />;
}
