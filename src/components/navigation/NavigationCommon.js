import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Button } from "react-native-elements";
import { ThemeContext } from "@root/ThemeContext"
import { useNavigation } from '@react-navigation/native';
import { transparentize } from "polished";

const iconSize = 32;

const styles = StyleSheet.create({
  icon: {
    height: iconSize,
  },
});


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

import { BlurView } from "@react-native-community/blur";

export function getHeaderScreenOptions()
{
  const { theme }  = useContext(ThemeContext)
  const navigation = useNavigation();

  const blurType = theme.name === "light" ? "thinMaterialLight" : "materialDark";
  const borderColor = transparentize(theme.isDark ? 0.6 : 0.875, 'black');

  return {
    headerShown: true,
    headerTitleStyle: theme.headerTitleStyle,
    headerTransparent: true,
    headerBackground: () => (
      <>
        <BlurView
          blurType={blurType}
          style={{ ...StyleSheet.absoluteFillObject, borderWidth: StyleSheet.hairlineWidth, borderColor: borderColor }}
        ></BlurView>
      </>
    ),
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
}

