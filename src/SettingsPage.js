import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, Button } from "react-native";
import { ThemeContext } from  "./ThemeContext";
import { MenuButton } from "./NavButtons";

export default function SettingsPage({ navigation }) {
  const {theme, toggleTheme} = useContext(ThemeContext)

  const styles = getStyles(theme)

  useEffect(() => {
    let screenOptions = {
      headerShown: true,
      headerTitleStyle: theme.headerTitleStyle,
      headerLeft: () => <MenuButton onPress={() => navigation.openDrawer()} />,
      headerStyle: {
        backgroundColor: theme.colors.header,
        shadowOpacity: 0,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: theme.isDark ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.15)",
        borderColor: theme.colors.header,
        shadowColor: theme.colors.primary,
      },
    };

    navigation.setOptions(screenOptions);
  }, [navigation, theme]);
  
  return (
    <View style={styles.root} >
      <ScrollView
      indicatorStyle="white"
      decelerationRate="fast"
      keyboardShouldPersistTaps="handled"
      contentInsetAdjustmentBehavior="automatic"
      keyboardDismissMode="on-drag" style={styles.scrollView}>
        <View>
          <Button title="Toggle Theme" onPress={ () => toggleTheme() } />
        </View>
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
