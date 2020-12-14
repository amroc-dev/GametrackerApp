import React, { useContext, useLayoutEffect } from "react";
import { Platform } from "react-native";
import SearchPage from "@components/SearchPage";
import { ForwardButton } from "./NavigationCommon";

export default function SearchScreen({ navigation }) {

  if (Platform.isPad) {
  } else {
    useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: "Search",
        headerRight: () => <ForwardButton onPress={() => navigation.navigate("Filters")} title="Filters" />,
      });
    }, [navigation]);
  }

  return <SearchPage />;
}