import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, Button, Platform } from "react-native";
import { ThemeContext } from "@root/ThemeContext";
import { SettingsContext, themeIDs } from "@root/SettingsContext";
import { MenuButton } from "./navigation/NavigationCommon";
import { getHeaderScreenOptions } from "./navigation/NavigationCommon";
import { HeaderSpace, Separator, Spacer } from "@components/common/Misc";
import { SectionWithHeader } from "@components/common/Section";
import OptionList from "@components/common/OptionList";

export default function SettingsPage({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const { themeSetting, setThemeSetting } = useContext(SettingsContext);

  const screenOptions = getHeaderScreenOptions();

  const styles = getStyles(theme);

  useEffect(() => {
    navigation.setOptions(screenOptions);
  }, [navigation, theme]);

  function onThemeStateChange(state) {
    for ( key in state) {
      if (state[key]) {
        setThemeSetting(key)
        return
      }
    }
  }

  let optionsState = {}
  let optionNames = []
  Object.keys(themeIDs).forEach( key => {
    optionsState[key] = key === themeSetting;
    switch (key) {
      case themeIDs.LIGHT:
        optionNames.push("Light")
        break;

      case themeIDs.DARK:
        optionNames.push("Dark")
        break;

      case themeIDs.IOS:
        optionNames.push("Match " + (Platform.isPad ? 'iPad' : 'iPhone') + " theme")
        break;
      
      default:
        console.log("Warning. SettingsPage missing a name for: " + key)
        break;
    }
  })

  return (
    <View style={styles.root}>
      <ScrollView
        indicatorStyle="white"
        decelerationRate="fast"
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="automatic"
        keyboardDismissMode="on-drag"
        style={styles.scrollView}
      >
        {/* <HeaderSpace /> */}
        <Spacer size={theme.searchPageTopPadding} />
        <SectionWithHeader title="Theme" containerStyle={{ padding: 0 }}>
          <OptionList options={optionsState} optionNames={optionNames} onStateChanged={onThemeStateChange} />
        </SectionWithHeader>

        {/* <Button title="Toggle Theme" onPress={ () => toggleTheme() } /> */}
      </ScrollView>
    </View>
  );
}

function getStyles(theme) {
  return StyleSheet.create({
    root: {
      backgroundColor: theme.colors.background1,
    },
    scrollView: {
      height: "100%",
      paddingHorizontal: theme.pageHorizontalPadding,
    },
  });
}
