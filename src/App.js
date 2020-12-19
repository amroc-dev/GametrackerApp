import React, { useContext, useRef, useEffect } from "react";
import { StatusBar, StyleSheet, View, Text, Button } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
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

export default function App() {
  return (
    <NetworkContextProvider>
      <CoreContextProvider>
        <SettingsContextProvider>
          <Splash />
          <SearchContextProvider>
            <FilterTagsContextProvider>
              <ThemeContextProvider>
                <StatusBarSettings />
                <SearchResultsContextProvider>
                  <MenuProvider>
                    <NavigationContainer>
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

  useEffect(() => {
    if (settingsLoaded) {
      RNBootSplash.hide({ fade: true });
    }
  }, [settingsLoaded]);

  return null;
}
