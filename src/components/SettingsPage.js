import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, Button } from "react-native";
import { ThemeContext } from "@root/ThemeContext";
import { MenuButton } from "./navigation/NavigationCommon";
import { getHeaderScreenOptions } from "./navigation/NavigationCommon";
import { HeaderSpace, Separator, Spacer } from "@components/common/Misc";
import { SectionWithHeader } from "@components/common/Section";
import OptionList from "@components/common/OptionList";

export default function SettingsPage({ navigation }) {
  const { theme, setLightTheme, setDarkTheme } = useContext(ThemeContext);

  const screenOptions = getHeaderScreenOptions();

  const styles = getStyles(theme);

  useEffect(() => {
    navigation.setOptions(screenOptions);
  }, [navigation, theme]);

  function onThemeStateChange(state) {
    if (state["Light"]) {
      setLightTheme();
    } else if (state["Dark"]) {
      setDarkTheme();
    }
  }

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
          <OptionList options={{ Light: theme.isLight, Dark: theme.isDark }} onStateChanged={onThemeStateChange} />
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
    },
  });
}
