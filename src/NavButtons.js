import React from "react";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Button } from "react-native-elements";
import theme, { navButtonStyle } from "./Theme";

const iconSize = 32;

export function BackButton(props) {
  return (
    <Button
      title="Back"
      type="clear"
      titleStyle={navButtonStyle}
      iconRight={false}
      icon={<Icon style={styles.icon} name="ios-chevron-back" size={iconSize} color={theme.colors.primary} />}
      {...props}
    />
  );
}

export function MenuButton(props) {
  return (
    <Button
      type="clear"
      titleStyle={navButtonStyle}
      iconRight={false}
      icon={<Icon style={styles.icon} name="ios-reorder-three-outline" size={iconSize} color={theme.colors.primary} />}
      {...props}
    />
  );
}

export function ForwardButton(props) {
  return (
    <Button
      title="Forward"
      type="clear"
      titleStyle={navButtonStyle}
      iconRight={true}
      icon={<Icon style={styles.icon} name="ios-chevron-forward" size={iconSize} color={theme.colors.primary} />}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    height: iconSize,
  },
});
