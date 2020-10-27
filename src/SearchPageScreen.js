import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import SearchPage from "./SearchPage";
import theme from "./Theme";
import { ForwardButton } from "./NavButtons";

export default function SearchPageScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Search",

      headerRight: () => (
        <ForwardButton onPress={() => navigation.navigate("Filters")} title="Filters"/>
        // <Button
        //   onPress={() => navigation.navigate("Filters")}
        //   title="Filters"
        //   type="clear"
        //   titleStyle={navButtonStyle}
        //   iconRight={true}
        //   icon={
        //     <Icon
        //       name="ios-chevron-forward"
        //       size={28}
        //       color="white"
        //     />
        //   }
        // />
      ),
    });
  }, [navigation]);

  return <SearchPage />;
}
