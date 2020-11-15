import React, { useState, useEffect } from "react";
import { StyleSheet, Pressable } from "react-native";
import theme from "./Theme";
import DropDownPicker from "react-native-dropdown-picker";
import { useFocusEffect } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { lighten, darken } from "polished";

export default function ModalDropdown(props) {
  const [overlay, setOverlay] = useState(null);
  const isFocused = useIsFocused();
  let controller;

  function onOpen() {
    const HACKY_SIZE = 10000;
    setOverlay(
      <Pressable
        onPress={() => controller.close()}
        style={{
          position: "absolute",
          top: -HACKY_SIZE,
          left: -HACKY_SIZE,
          width: HACKY_SIZE * 2,
          height: HACKY_SIZE * 2,
          backgroundColor: "rgba(0,0,0,0.0)",
        }}
      />
    );
  }

  function onClose() {
    setOverlay(null)
  }

  useEffect(() => {
    if (!isFocused) {
      controller.close();
    }
  }, [isFocused]);

  return (
    <>
        {overlay}
      <DropDownPicker
        controller={(instance) => (controller = instance)}
        style={styles.dropdownStyle}
        containerStyle={styles.dropdownContainer}
        dropDownStyle={styles.dropdown}
        itemStyle={styles.itemStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholder}
        onOpen={onOpen}
        onClose={onClose}
        arrowColor={theme.fonts.colors.primary}
        arrowSize={20}
        dropDownMaxHeight={500}
        {...props}
      />
    </>
  );
}

const backgroundColor = theme.colors.secondary

const styles = StyleSheet.create({
  dropdownContainer: {
    borderWidth: 0,
    flex: 1,
    flexDirection: "row",
  },
  dropdownStyle: {
    borderTopLeftRadius: theme.borderRadius,
    borderTopRightRadius: theme.borderRadius,
    borderBottomLeftRadius: theme.borderRadius,
    borderBottomRightRadius: theme.borderRadius,
    backgroundColor: backgroundColor,
    borderWidth: 0,
  },
  dropdown: {
    flex: 1,
    borderTopWidth: 0,
    backgroundColor: backgroundColor,
    // borderTopLeftRadius: theme.borderRadius,
    // borderTopRightRadius: theme.borderRadius,
    borderBottomLeftRadius: theme.borderRadius,
    borderBottomRightRadius: theme.borderRadius,
    borderWidth: 0,
    // borderTopColor: "rgba(255,255,255,0.5)",
    // borderTopWidth: 1,
    // marginTop: theme.rem * 0.3,
    shadowColor: theme.shadowColor,
    shadowOpacity: theme.shadowOpacity * 1,
    shadowRadius: theme.shadowRadius,
    shadowOffset: theme.shadowOffset,
    shadowOffset: {
      width: 0,
      height: theme.shadowRadius * 2,
    },
  },
  itemStyle: {
    justifyContent: "flex-start",
    flex: 1,
  },
  labelStyle: {
    color: theme.fonts.colors.primary,
    flex: 1,
    fontSize: theme.fonts.sizes.primary,
    fontWeight: theme.fonts.weights.bold,
    marginLeft: theme.rem * 0.75,
  },
  selectedLabelStyle: {},
});
