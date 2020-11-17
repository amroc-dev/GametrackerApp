import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Button } from "react-native-elements";
import { ThemeContext } from "./ThemeContext"

const iconSize = 32;

export function BackButton(props) {
  const { theme } = useContext(ThemeContext)
  
  return (
    <Button
      title="Back"
      type="clear"
      titleStyle={theme.headerNavButtonStyle}
      iconRight={false}
      icon={<Icon style={styles.icon} name="ios-chevron-back" size={iconSize} color={theme.colors.primary} />}
      {...props}
    />
  );
}

export function MenuButton(props) {
  const { theme }  = useContext(ThemeContext)
  
  return (
    <Button
      type="clear"
      titleStyle={theme.headerNavButtonStyle}
      iconRight={false}
      icon={<Icon style={styles.icon} name="ios-reorder-three-outline" size={iconSize} color={theme.colors.primary} />}
      {...props}
    />
  );
}

export function ForwardButton(props) {
  const { theme }  = useContext(ThemeContext)

  return (
    <Button
      title="Forward"
      type="clear"
      titleStyle={theme.headerNavButtonStyle}
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
