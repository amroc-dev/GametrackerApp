import React, { useContext, useRef, useEffect, useState } from "react";
import { StatusBar, StyleSheet, View, Text, Button } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { enableScreens } from 'react-native-screens';
import { CoreContextProvider } from "@shared/react/CoreContext";
import { NetworkContextProvider } from "@shared/react/NetworkContext";
import { SearchContextProvider } from "@shared/react/SearchContext";
import { SearchResultsContextProvider } from "@shared/react/SearchResultsContext";
import { SettingsContextProvider } from "@root/SettingsContext";
import { FilterTagsContextProvider } from "@shared/react/FilterTagsContext";
import { ThemeContextProvider, ThemeContext } from "@root/ThemeContext";
import MenuDrawerNavigator from "@components/navigation/MenuDrawerNavigator";
import { MenuProvider } from "react-native-popup-menu";
import RNBootSplash from "react-native-bootsplash";

function StatusBarSettings() {
  const { theme } = useContext(ThemeContext);
  return <StatusBar barStyle={theme.isDark ? "light-content" : "dark-content"} />;
}

enableScreens();

export default function App(props) {
  return (
    <NetworkContextProvider>
      <CoreContextProvider {...props}>
        <SettingsContextProvider>
          <Splash />
          <SearchContextProvider>
            <FilterTagsContextProvider>
              <ThemeContextProvider>
                <StatusBarSettings />
                <SearchResultsContextProvider>
                  <MenuProvider>
                    <NavigationContainer theme={{ colors: { background: 'rgba(0,0,0,0)'}}}>
                      <MenuDrawerNavigator />
                    </NavigationContainer>
                  </MenuProvider>
                </SearchResultsContextProvider>
              </ThemeContextProvider>
            </FilterTagsContextProvider>
          </SearchContextProvider>
        </SettingsContextProvider>
      </CoreContextProvider>
    </NetworkContextProvider>
  );
}

import { SettingsContext } from "@root/SettingsContext";
function Splash() {
  const { settingsLoaded, setSettings } = useContext(SettingsContext);
  const [waitElapsed, setWaitElapsed] = useState(false);

  function completeCheck() {
    if (settingsLoaded && waitElapsed)
      RNBootSplash.hide({ fade: true });
  }

  useEffect( () => {
    setTimeout( () => setWaitElapsed(true), 1000)
  }, [])

  useEffect(() => {
      completeCheck()
  }, [settingsLoaded]);

  useEffect(() => {
    completeCheck()
}, [waitElapsed]);

  return null;
}
