import React, { useContext, useEffect, useState, useLayoutEffect, useRef } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { SearchContext } from "./shared/react/SearchContext";
import { sortOptions } from "./shared/react/SortOptions";
import { ThemeContext } from "./ThemeContext";
import ModalDropdown from "./ModalDropdown";
import ModalSelector from "react-native-modal-selector";
import { Picker } from "@react-native-picker/picker";
import { ControlledLayoutAnimation } from "./Common";
import { borderRadius } from "polished";
import Modal from "react-native-modal";
import { shallowEqualObjects } from "shallow-equal";
import Icon from "react-native-vector-icons/Ionicons";

export default function ModalDropdown2(props) {
  const { theme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const [selectorFrame, setSelectorFrame] = useState(null);
  const [menuFrame, setMenuFrame] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const selectorRef = useRef();
  const menuRef = useRef();

  const styles = getStyles(theme);

  if (selectorRef.current) {
    selectorRef.current.measureInWindow((x, y, width, height) => {
      frame = {
        x: x,
        y: y,
        width: width,
        height: height,
      };
      if (false === shallowEqualObjects(frame, selectorFrame)) setSelectorFrame(frame);
    });
  }

  function onMenuLayout({ nativeEvent }) {
    setMenuFrame({
      width: nativeEvent.layout.width,
      height: nativeEvent.layout.height,
    });
  }

  const menuPosition =
    selectorFrame && menuFrame
      ? {
          margin: 0,
          // position: "absolute",
          // left: selectorFrame.x - menuFrame.width + selectorFrame.width,
          // top: selectorFrame.y + selectorFrame.height - theme.rem,
        }
      : {};

  const items = props.menuItems.map((item, index) => (
    <Button
      type="clear"
      key={index}
      title={item}
      style={styles.itemButtonStyle}
      titleStyle={styles.itemButtonTitleStyle}
    />
  ));

  function onOpen(set) {
    if (transitioning) return;
    setOpen(set);
    setTransitioning(true);
  }

  return (
    <>
      <View ref={selectorRef} style={styles.selectorRoot}>
        <Button
          title="Popularity"
          onPress={() => onOpen(true)}
          containerStyle={styles.selectorButtonContainer}
          buttonStyle={styles.selectorButton}
          titleStyle={styles.selectorButtonTitle}
        />
      </View>
      <Modal
        style={styles.modalRoot}
        animationIn={{
          from: {
            opacity: 0,
            scale: 0,
            translate: -100,
          },
          to: {
            opacity: 1,
            scale: 1,
            translate: 0,
          },
        }}
        animationOut="fadeOut"
        onBackdropPress={() => onOpen(false)}
        // useNativeDriver={true}
        backdropOpacity={0.1}
        animationInTiming={theme.fadeSpeed * 0.5}
        animationOutTiming={theme.fadeSpeed * 0.5}
        backdropTransitionInTiming={theme.fadeSpeed * 0.5}
        backdropTransitionOutTiming={0}
        onModalHide={() => setTransitioning(false)}
        onModalShow={() => setTransitioning(false)}
        isVisible={open}
      >
        <View style={[menuPosition, styles.shadow]}>
          <Icon
            style={{
              height: 32,
              color: "white",
              top: theme.rem * 0.5,
              right: -80,
            }}
            name="caret-up-sharp"
            size={32}
          />
          <View ref={menuRef} onLayout={onMenuLayout} style={[styles.menuRoot]}>
            {items}
          </View>
        </View>
      </Modal>
    </>
  );
}

function getStyles(theme) {
  const backgroundColor = theme.colors.background2;

  return StyleSheet.create({
    selectorRoot: {
      width: 141,
      margin: 0,
      padding: 0,
    },
    selectorButtonContainer: {
      justifyContent: "flex-start",
    },
    selectorButton: {
      justifyContent: "flex-start",
      backgroundColor: theme.colors.background2,
    },
    selectorButtonTitle: {
      color: theme.fonts.colors.primary,
      fontSize: theme.fonts.sizes.primary,
      fontWeight: theme.fonts.weights.bold,
      padding: theme.rem * 0.5,
      alignItems: "flex-start",
    },
    modalRoot: {
      margin: 0,
      padding: 0,
      // alignSelf: "center",
      right: 0,
      top: -100,
    },
    shadow: {
      shadowColor: "black",
      shadowOpacity: 0.1,
      shadowRadius: 8,
      shadowOffset: theme.shadowOffset,
    },
    menuRoot: {
      backgroundColor: theme.colors.background2,
      borderRadius: theme.borderRadius2,
      padding: theme.rem * 0.5,
      alignItems: "flex-start",
    },
    menuItems: {
      flexDirection: "column",
    },
    itemButtonStyle: { margin: 0, padding: 0 },
    itemButtonTitleStyle: {
      color: theme.fonts.colors.primary,
      fontSize: theme.fonts.sizes.primary,
      fontWeight: theme.fonts.weights.bold,
    },
  });
}

// function getStyles(theme) {
//   const backgroundColor = theme.colors.background2;

//   return StyleSheet.create({
//     dropdownContainer: {
//       borderWidth: 0,
//       flex: 1,
//       flexDirection: "row",
//     },
//     dropdownStyle: {
//       borderTopLeftRadius: theme.borderRadius,
//       borderTopRightRadius: theme.borderRadius,
//       borderBottomLeftRadius: theme.borderRadius,
//       borderBottomRightRadius: theme.borderRadius,
//       backgroundColor: backgroundColor,
//       borderWidth: 0,
//     },
//     dropdown: {
//       flex: 1,
//       borderTopWidth: 0,
//       backgroundColor: backgroundColor,
//       // borderTopLeftRadius: theme.borderRadius,
//       // borderTopRightRadius: theme.borderRadius,
//       borderBottomLeftRadius: theme.borderRadius,
//       borderBottomRightRadius: theme.borderRadius,
//       borderWidth: 0,
//       // borderTopColor: "rgba(255,255,255,0.5)",
//       // borderTopWidth: 1,
//       // marginTop: theme.rem * 0.3,
//       shadowColor: theme.shadowColor,
//       shadowOpacity: theme.isLight ? theme.shadowOpacity_dropdown * 0.7 : theme.shadowOpacity_dropdown,
//       shadowRadius: 5,
//       shadowOffset: theme.shadowOffset,
//       shadowOffset: {
//         width: 0,
//         height: 10,
//       },
//     },
//     itemStyle: {
//       justifyContent: "flex-start",
//       flex: 1,
//     },
//     labelStyle: {
//       color: theme.fonts.colors.primary,
//       flex: 1,
//       fontSize: theme.fonts.sizes.primary,
//       fontWeight: theme.fonts.weights.bold,
//       marginLeft: theme.rem * 0.75,
//     },
//     selectedLabelStyle: {},
//   });
// }
