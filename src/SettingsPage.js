import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, Button } from "react-native";
import { ThemeContext } from "./ThemeContext";
import { MenuButton } from "./components/navigation/NavigationCommon";
import { getHeaderScreenOptions } from "./components/navigation/NavigationCommon";
import { HeaderSpace, Separator, Spacer } from "@components/common/Common";
import { SectionWithHeader } from "@components/common/Section";

export default function SettingsPage({ navigation }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const screenOptions = getHeaderScreenOptions();

  const styles = getStyles(theme);

  useEffect(() => {
    navigation.setOptions(screenOptions);
  }, [navigation, theme]);

  // const sectionStyles = getSectionStyles(theme);

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
        <SectionWithHeader title="Theme">
          <Text>Light</Text>
          <Text>Dark</Text>
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
