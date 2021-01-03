import React, { useContext, useState, useEffect, useRef } from "react";
import { View, TextInput, StyleSheet, Button, LayoutAnimation } from "react-native";
import { Button as ElemButton } from "react-native-elements";
import { ThemeContext } from "@root/ThemeContext";
import { rgba, transparentize, invert, darken, lighten } from "polished";
import Icon from "react-native-vector-icons/Ionicons";

const iconSize = 22;

export function SearchInput(props) {
  const { theme } = useContext(ThemeContext);
  const [showCancelButton, setShowCancelButton] = useState(false);
  const textInputRef = useRef(null);

  function onTextFocus() {
    Animate();
    setShowCancelButton(true);
  }

  function onEndEditing() {
    Animate();
    setShowCancelButton(false);
  }

  function Animate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  const inputBackgroundColor = theme.colors.secondary;
  const textColor = theme.fonts.colors.title;
  const placeholderColor = transparentize(0.6, textColor).toString();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row-reverse",
      alignItems: "center",
      // marginHorizontal: theme.rem * 0.5,
    },
    searchInput: {
      flex: 1,
      borderWidth: 0,//StyleSheet.hairlineWidth,
      borderColor: transparentize(theme.isDark ? 0.1 : 0.35, placeholderColor),
      height: theme.rowHeight,
      flexDirection: "row",
      backgroundColor: inputBackgroundColor,
      alignItems: "center",
      borderRadius: theme.borderRadius2,
      paddingHorizontal: theme.rem * 0.5,

      // shadowColor: theme.shadowColor,
      // shadowOpacity: theme.shadowOpacity,
      // shadowRadius: theme.shadowRadius,
      // shadowOffset: theme.shadowOffset,
    },
    textInput: {
      flex: 1,
      color: textColor,
      backgroundColor: inputBackgroundColor,
      borderRadius: 0,
      borderTopRightRadius: theme.borderRadius,
      borderBottomRightRadius: theme.borderRadius,
      fontSize: theme.fonts.sizes.header,
      paddingHorizontal: theme.rem * 0.5,
    },
    icon: {
      height: iconSize,
      color: placeholderColor,
    },
  });

  const cancelButton = showCancelButton ? (
    <Button
      onPress={() => {
        textInputRef.current.clear();
        textInputRef.current.blur();
        onChangeText("");
      }}
      title="Cancel"
      type="clear"
      color={theme.fonts.colors.primary}
    />
  ) : null;

  useEffect(() => {}, [props.value]);

  function onChangeText(text) {
    if (props.onChangeText) {
      props.onChangeText(text);
    }
  }

  return (
    <View style={[styles.container, props.style]}>
      {cancelButton}
      <View style={styles.searchInput}>
        <Icon style={styles.icon} name="search" size={iconSize} />
        <TextInput
          clearButtonMode={"never"}
          placeholderTextColor={placeholderColor}
          ref={textInputRef}
          {...props}
          style={styles.textInput}
          onFocus={props.useCancelButton ? onTextFocus : null}
          onEndEditing={props.useCancelButton ? onEndEditing : null}
          autoCompleteType="off"
          autoCorrect={false}
          keyboardAppearance={theme.name}
        />
        {props.value.length > 0 ? (
          <ElemButton
            type="clear"
            icon={<Icon name="close-circle" size={iconSize} color={placeholderColor} />}
            onPress={() => onChangeText("")}
          />
        ) : null}
      </View>
    </View>
  );
}
