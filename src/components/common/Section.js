import { rgba, readableColor } from "polished";
import React, { useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import { ThemeContext } from "@root/ThemeContext";
import Icon from "react-native-vector-icons/Ionicons";

export function SectionHeader({ title, textChildren }) {
  const { theme } = useContext(ThemeContext);

  const sectionStyles = getSectionStyles(theme);

  return (
    <View style={sectionStyles.headerView}>
      <Text style={sectionStyles.headerText}>
        {title} {textChildren ? textChildren : null}
      </Text>
    </View>
  );
}

export function SectionWithHeader(props) {
  const { theme } = useContext(ThemeContext);
  const {title, children, containerStyle} = props;

  const sectionStyles = getSectionStyles(theme);

  return(
    <View>
      <SectionHeader title={title ?? "Title"} />
      <View style={[sectionStyles.container, containerStyle ?? null]}>
        {children ?? null}
      </View>
    </View>
  )
}

export function getSectionStyles(theme) {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background2,
      padding: theme.rem * 0.25,
      borderRadius: theme.borderRadius,
      shadowColor: theme.shadowColor,
      shadowOpacity: theme.shadowOpacity,
      shadowRadius: theme.shadowRadius,
      shadowOffset: theme.shadowOffset,
      borderWidth: theme.borderWidth,
      borderColor: theme.borderColor,
      // borderTopLeftRadius: 0,
    },
    headerView: {
      flexDirection: "row",
      alignSelf: "flex-start",
      alignItems: "center",
      backgroundColor: rgba(0, 0, 0, 0), // theme.colors.primary, //
      // marginLeft: theme.rem * 0.5,
      borderTopLeftRadius: theme.borderRadius,
      borderTopRightRadius: theme.borderRadius,
      marginBottom: theme.rem * 0.35,
    },
    headerText: {
      color: theme.fonts.colors.secondary,
      fontSize: theme.fonts.sizes.primary2,
      fontWeight: theme.fonts.weights.bold,
      paddingHorizontal: theme.rem * 0.25,
    },
    // filterTextSelected: {
    //   color: theme.name === "light" ? readableColor(theme.fonts.colors.title) : theme.fonts.colors.title,
    // },
    // multiSliderParentContainer: {
    //   marginHorizontal: theme.rem,
    //   marginTop: -theme.rem * 0.25,
    //   marginBottom: theme.rem * 0.25,
    // },
  });
}
