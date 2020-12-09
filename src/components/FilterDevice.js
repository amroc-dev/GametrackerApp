import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { SearchContext } from "@shared/react/SearchContext";
import { ThemeContext } from "@root/ThemeContext";
import { SectionWithHeader } from "@components/common/Section";
import { getFilterStyles } from "@styles/Filter_styles";
import { ToggleButton } from "@components/common/Common";

export default function FilterDevice() {
  const { theme } = useContext(ThemeContext);
  const [elements, setElements] = useState([]);
  const { deviceFilter, toggleDeviceFilter } = useContext(SearchContext);

  const styles = getStyles(theme);
  const filterStyles = getFilterStyles(theme);

  useEffect(() => {
    const filter = { ...deviceFilter };
    const items = [];
    Object.keys(filter).forEach((key) => {
      const buttonTextStyle = [styles.buttonTitle];
      if (filter[key]) buttonTextStyle.push(filterStyles.filterTextSelected);
      items.push(
        <ToggleButton
          style={styles.button}
          active={filter[key]}
          key={items.length}
          onPress={() => toggleDeviceFilter(key)}
        >
          <Text style={buttonTextStyle}>{key}</Text>
        </ToggleButton>
      );
    });

    setElements(items);
  }, [deviceFilter, theme]);

  return (
    <SectionWithHeader title="Device">
      <View style={styles.body}>
        <View style={styles.inner}>{elements}</View>
      </View>
    </SectionWithHeader>
  );
}

function getStyles(theme) {
  const itemSpacing = theme.rem * 0.5;

  return StyleSheet.create({
    outer: {},

    body: {
      paddingVertical: theme.rem * 0.5,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    inner: {
      flexDirection: "row",
      marginRight: -itemSpacing,
    },

    button: {
      marginRight: itemSpacing,
      borderRadius: theme.pillBorderRadius,
      paddingHorizontal: theme.pillHorizontalPadding,
      paddingVertical: theme.pillVerticalPadding,
      // padding: theme.rem * 0.5,
    },
    buttonTitle: {
      color: theme.fonts.colors.title,
      fontSize: theme.fonts.sizes.primary,
      fontWeight: theme.fonts.weights.bold,
    },
  });
}
