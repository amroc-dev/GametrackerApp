import React, { useContext, useLayoutEffect } from "react";
import { Platform } from "react-native";
import SearchPage from "./SearchPage";
import { ForwardButton } from "./NavButtons";

export default function SearchPageScreen({ navigation }) {

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

// export default function SearchPageScreen({ navigation }) {

//   useLayoutEffect(() => {
//     const options = {
//       headerTitle: "Search",
//       headerRight: () => <ForwardButton onPress={() => navigation.navigate("Filters")} title="Filters" />,
//     };

//     navigation.setOptions(options);

//   }, [navigation]);

//   const options = {
//     navigationOptions: {
//       headerTitle: "Search",
//       headerRight: () => <ForwardButton onPress={() => navigation.navigate("Filters")} title="Filters" />,
//     },
//     config: {
//       collapsedColor: theme.colors.primary /* Optional */,
//       useNativeDriver: true /* Optional, default: true */,
//       // elevation: 4 /* Optional */,
//     },
//   };

//   const {
//     onScroll,
//     containerPaddingTop,
//     scrollIndicatorInsetTop,
//   } = useCollapsibleHeader(options)

//   return <SearchPage onScroll={onScroll} containerPaddingTop={containerPaddingTop} scrollIndicatorInsetTop={scrollIndicatorInsetTop} />;
// }
