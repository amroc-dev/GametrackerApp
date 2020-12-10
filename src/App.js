import React, { useContext, useRef, useEffect } from "react";
import { StatusBar, StyleSheet, View, Text, Button } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { CoreContextProvider } from "@shared/react/CoreContext";
import { NetworkContextProvider } from "@shared/react/NetworkContext";
import { SearchContextProvider } from "@shared/react/SearchContext";
import { SearchResultsContextProvider } from "@shared/react/SearchResultsContext";
import { FilterTagsContextProvider } from "@shared/react/FilterTagsContext";
import { ThemeContextProvider, ThemeContext } from "@root/ThemeContext";
import MenuDrawerNavigator from "@components/navigation/MenuDrawerNavigator";
import { MenuProvider } from 'react-native-popup-menu';

function StatusBarSettings() {
  const { theme } = useContext(ThemeContext);
  return <StatusBar barStyle={theme.isDark ? "light-content" : "dark-content"} />;
}

export default function App() {
  const navContainerRef = useRef();

  return (
    <NetworkContextProvider>
      <CoreContextProvider>
        <SearchContextProvider>
          <FilterTagsContextProvider>
            <ThemeContextProvider>
              <StatusBarSettings />
              <SearchResultsContextProvider>
              <MenuProvider>
                <NavigationContainer ref={navContainerRef}>
                  <MenuDrawerNavigator />
                </NavigationContainer>
                </MenuProvider>
              </SearchResultsContextProvider>
            </ThemeContextProvider>
          </FilterTagsContextProvider>
        </SearchContextProvider>
      </CoreContextProvider>
    </NetworkContextProvider>
  );
}

// import { abortOngoingFetches, serverFetch } from "@shared/react/ServerFetch";

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
