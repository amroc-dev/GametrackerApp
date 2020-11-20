import React, { useContext, useRef, useEffect } from "react";
import { StatusBar, StyleSheet, View, Text, Button } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { CoreContextProvider } from "./shared/react/CoreContext";
import { SearchContextProvider } from "./shared/react/SearchContext";
import { SearchResultsContextProvider } from "./shared/react/SearchResultsContext";
import { FilterTagsContextProvider } from "./shared/react/FilterTagsContext";
import { ThemeContextProvider, ThemeContext } from "./ThemeContext";
import MenuDrawerNavigator from "./MenuDrawerNavigator";
import Animated from "react-native-reanimated";

function StatusBarSettings() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const barStyle = theme.name === "dark" ? "light-content" : "dark-content";
  return <StatusBar barStyle={barStyle} />;
}

export default function App() {
  const navContainerRef = useRef();

  return (
    <CoreContextProvider>
      <SearchContextProvider>
        <FilterTagsContextProvider>
          <ThemeContextProvider>
            <StatusBarSettings />
            <SearchResultsContextProvider>
              <NavigationContainer ref={navContainerRef}>
                <MenuDrawerNavigator />
              </NavigationContainer>
            </SearchResultsContextProvider>
          </ThemeContextProvider>
        </FilterTagsContextProvider>
      </SearchContextProvider>
    </CoreContextProvider>
  );
}

// import { abortOngoingFetches, serverFetch } from "./shared/react/ServerFetch";

// async function fetchTest(id) {

//   console.log("Fetching id: " + id)

//   const results = await serverFetch(
//     "indie",
//     [],
//     "Popularity",
//     { iPhone: false, iPad: false, tvOS: false, watch: false},
//     { min: -1, max: -1 },
//     1,
//     0
//   );

//   console.log("Response id: " + id)
//   console.log(results)
// }

// fetchTest(1)

// setTimeout( () => {fetchTest(2)}, 50)

// setTimeout( () => {abortOngoingFetches()}, 1000)
