import React, { useLayoutEffect } from "react";
import SearchPage from "./SearchPage";
import theme from "./Theme";
import { ForwardButton } from "./NavButtons";

export default function SearchPageScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Search",
      headerRight: () => (
        <ForwardButton onPress={() => navigation.navigate("Filters")} title="Filters"/>
      ),
    });
  }, [navigation]);

  return <SearchPage />;
}
