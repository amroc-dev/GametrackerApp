
import React, { useContext, useLayoutEffect, useEffect } from "react";
import { Platform } from "react-native";
import SettingsPage from "@components/SettingsPage";
import { ForwardButton } from "./NavigationCommon";
import { getHeaderScreenOptions } from "./NavigationCommon";

export default function SettingsScreen({ navigation }) {
  // const screenOptions = getHeaderScreenOptions();
  
  // useEffect(() => {
  //   console.log("init")
  //   navigation.setOptions(screenOptions);
  // }, [navigation]);

  return <SettingsPage />;
}
