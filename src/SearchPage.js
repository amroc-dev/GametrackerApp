import React, { useState, useEffect, useContext, useRef } from "react";
import { Button, SafeAreaView, View, StyleSheet, StatusBar } from "react-native";
import CardListFlat from "./CardListFlat";
import CardListScroll from "./CardListScroll";
import { SearchContext } from "./shared/react/SearchContext";
import theme from "./Theme";

export default function SearchPage({ navigation }) {
  const { submitSearch } = useContext(SearchContext);

  function onSearchPressed() {
    submitSearch();
  }

  return (
    <View style={styles.root}>
      <CardListScroll />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.colors.background1,
  },
});





// export default function SearchPage({ navigation, onScroll, containerPaddingTop, scrollIndicatorInsetTop }) {
//   const { submitSearch } = useContext(SearchContext);

//   function onSearchPressed() {
//     submitSearch();
//   }

//   return (
//     <View style={styles.root}>
//       <CardListScroll
//         onScroll={onScroll}
//         containerPaddingTop={containerPaddingTop}
//         scrollIndicatorInsetTop={scrollIndicatorInsetTop}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   root: {
//     backgroundColor: theme.colors.background1,
//   },
// });
