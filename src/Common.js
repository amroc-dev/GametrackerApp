import React, { useContext, useState, useEffect, useLayoutEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  LayoutAnimation,
  Pressable,
  Animated,
  ScrollView,
} from "react-native";
import { Button as ElemButton } from "react-native-elements";
import { ThemeContext } from "./ThemeContext";
import { rgba, transparentize, invert } from "polished";
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
  const placeholderColor = transparentize(0.6, textColor).toString()

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row-reverse",
      alignItems: "center",
    },
    searchInput: {
      flex: 1,
      height: theme.rowHeight,
      flexDirection: "row",
      backgroundColor: inputBackgroundColor,
      alignItems: "center",
      borderRadius: theme.borderRadius2,
      paddingHorizontal: theme.rem * 0.5,
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


//////////////////////////////////////////////////////////////////////////////////////////////////////
import { getStatusBarHeight } from "react-native-status-bar-height";

export function HeaderSpace() {
  const headerHeight = getStatusBarHeight(true)// useHeaderHeight()
  return <View style={{height:44, opacity:0}} />
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

export function ToggleButton(props) {
  const pressFade = useRef(new Animated.Value(1)).current;
  const { theme } = useContext(ThemeContext);

  const baseStyle = {
    padding: theme.rem * 0.5,
    // height: theme.rowHeight,
    justifyContent: "center",
    backgroundColor: props.style.backgroundColor ? props.style.backgroundColor : theme.colors.primary,
  };

  return (
    <Pressable
      onPressIn={() =>
        Animated.timing(pressFade, {
          toValue: 0.5,
          duration: 100,
          useNativeDriver: true,
        }).start()
      }
      onPressOut={() =>
        Animated.timing(pressFade, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }).start()
      }
      {...props}
      style={[baseStyle, props.style, { backgroundColor: props.active ? baseStyle.backgroundColor : rgba(0, 0, 0, 0) }]}
    >
      <Animated.View style={{ opacity: pressFade }}>{props.children}</Animated.View>
    </Pressable>
  );
}