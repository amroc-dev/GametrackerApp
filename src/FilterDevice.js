import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { SearchContext } from "./shared/react/SearchContext";
import theme from "./Theme";
import { filterStyles, FilterHeader } from "./Filter_styles";
import { ToggleButton } from "./Common";

export default function FilterDevice() {
  const [elements, setElements] = useState([]);
  const { deviceFilter, toggleDeviceFilter } = useContext(SearchContext);

  useEffect(() => {
    const filter = { ...deviceFilter };
    const items = [];
    Object.keys(filter).forEach((key) => {
      items.push(
        <ToggleButton
          style={styles.button}
          active={filter[key]}
          key={items.length}
          onPress={() => toggleDeviceFilter(key)}
        >
          <Text style={styles.buttonTitle}>{key}</Text>
        </ToggleButton>

        // <Button
        //   buttonStyle = {styles.button}
        //   titleStyle = {styles.buttonTitle}
        //   type={filter[key] ? "solid" : "clear"}
        //   onPress={() => toggleDeviceFilter(key)}
        //   key={items.length}
        //   title={key}
        // />
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

const styles = StyleSheet.create({
  outer: {},

  body: {
    paddingVertical: theme.rem * 0.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    marginRight: theme.rem * 0.5,
    borderRadius: theme.borderRadius,
    padding: theme.rem * 0.5,
  },
  buttonTitle: {
    color: theme.fonts.colors.title,
    fontSize: theme.fonts.sizes.primary,
    fontWeight: theme.fonts.weights.bold,
  },
});
