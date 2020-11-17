import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { SearchContext } from "./shared/react/SearchContext";
import { ThemeContext } from "./ThemeContext";
import { getFilterStyles, FilterHeader } from "./Filter_styles";
import { ToggleButton } from "./Common";

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
      
      const buttonTextStyle = [styles.buttonTitle]
      if (filter[key]) buttonTextStyle.push(filterStyles.filterTextSelected)
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
  }, [deviceFilter]);

  return (
    <View style={[filterStyles.outerContainer, styles.outer]}>
      <FilterHeader title={"Device"} />
      <View style={[filterStyles.bodyContainer, styles.body]}>{elements}</View>
    </View>
  );
}

function getStyles(theme) {
  return StyleSheet.create({
    outer: {},

    body: {
      paddingVertical: theme.rem * 0.5,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },

    button: {
      marginRight: theme.rem * 0.5,
      borderRadius: theme.pillBorderRadius,
      // padding: theme.rem * 0.5,
    },
    buttonTitle: {
      color: theme.fonts.colors.title,
      fontSize: theme.fonts.sizes.primary,
      fontWeight: theme.fonts.weights.bold,
    },
  });
}
