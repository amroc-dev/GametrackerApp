import React, { useContext, useEffect, useState, useLayoutEffect, useRef } from "react";
import { View, Text, TextInput, StyleSheet, LayoutAnimation, Pressable } from "react-native";
import { Button } from "react-native-elements";
import { SearchContext } from "./shared/react/SearchContext";
import { ThemeContext } from "./ThemeContext";
import Icon from "react-native-vector-icons/Ionicons";
import { renderers } from "react-native-popup-menu";
const { Popover } = renderers;
import PopoverMenu_Renderer from "./PopoverMenu_Renderer";
import { Menu, MenuOptions, MenuOption, MenuTrigger, withMenuContext } from "react-native-popup-menu";
import { rgba, transparentize, lighten, darken } from "polished";
import { Separator } from "./Common";
import { HeaderStyleInterpolators } from "@react-navigation/stack";

export default withMenuContext(PopoverMenu);

function PopoverMenu(props) {
  const { theme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const styles = getStyles(theme);

  function MenuButton(menuProps) {
    const iconName = "ios-chevron-down";
    // const iconName = menuOpen ? "ios-chevron-up" : "ios-chevron-down";

    return (
      <Button
        title={props.selected}
        onPress={menuProps.onPress}
        type="clear"
        containerStyle={styles.menuButton}
        // buttonStyle={styles.menuButton}
        titleStyle={[styles.menuTitle, menuOpen ? styles.menuTitle_menuOpen : {}]}
        iconRight={true}
        icon={
          <Icon
            style={{ marginLeft: theme.rem * 0.5, marginRight: theme.rem * 0.2 }}
            name={iconName}
            size={20}
            color={menuOpen ? styles.menuTitle_menuOpen.color : styles.menuTitle.color}
          />
        }
      />
    );
  }

  function onOptionsSelect(item) {
    props.onChange(item);
  }

  const menuOptions = props.menuOptions.map((item, index) => {
    let separator = (
      <View
        key={index}
        style={{
          height: StyleSheet.hairlineWidth,
          width: "80%",
          marginHorizontal: theme.rem * 0.5,
          alignSelf: "center",
          backgroundColor: theme.isDark ? lighten(0.05, theme.colors.secondary) : darken(0.05, theme.colors.secondary),
        }}
      />
    );

    if (index === props.menuOptions.length - 1) separator = null;

    return (
      <View key={item}>
        <Button
          type="clear"
          title={item}
          buttonStyle={{justifyContent: 'flex-start', height: theme.rowHeight - theme.rem * 0.25}}
          titleStyle={styles.optionTextStyle}
          onPress={() => {
            onOptionsSelect(item);
            props.ctx.menuActions.closeMenu();
          }}
        />
        {/* <MenuOption
          onSelect={() => {
            setMenuOpen(false);
            onOptionsSelect(item);
          }}
          text={item}
          customStyles={{
            optionText: [styles.optionTextStyle, item === props.selected ? styles.optionTextStyle_selected : {}],
          }}
        /> */}
        {separator}
      </View>
    );
  });

  return (
    <Menu
      onOpen={() => setMenuOpen(true)}
      onClose={() => setMenuOpen(false)}
      onBackdropPress={() => setMenuOpen(false)}
      renderer={PopoverMenu_Renderer}
      rendererProps={{ placement: "bottom", anchorStyle: styles.anchorStyle }}
      style={styles.menuButtonContainer}
    >
      <MenuTrigger customStyles={{ TriggerTouchableComponent: MenuButton }} />
      <MenuOptions optionsContainerStyle={styles.optionsContainer}>
        {menuOptions}
        <Icon style={styles.arrow} name="caret-up" size={styles.arrowSize} />
      </MenuOptions>
    </Menu>
  );
}

function getStyles(theme) {
  const buttonColor = theme.colors.background2;
  const menuColor = buttonColor; //lighten(0.05, buttonColor);
  const arrowSize = 40;
  const MAGIC = 0.7;

  return StyleSheet.create({
    anchorStyle: {
      opacity: 0,
      marginTop: arrowSize * MAGIC * 0.4,
      //backgroundColor: menuColor,
      // top: 0,
      // height: 18,
      // width: 18,
      // borderRadius: theme.borderRadius * 0.5,
      //zIndex: 10,
      // shadowColor: "black",
      // shadowOpacity: theme.isDark ? 0.5 : 0.25,
      // shadowRadius: 4,
      // shadowOffset: {
      //   width: 0,
      //   height: 0,
      // },
    },
    arrowSize: arrowSize,
    arrow: {
      position: "absolute",
      backgroundColor: "rgba(0,0,0,0)",
      color: buttonColor,
      alignSelf: "center",
      top: arrowSize * -MAGIC,
    },
    shadowStyle: {
      shadowColor: "black",
      shadowOpacity: 0.9,
      shadowRadius: 10,
    },
    menuButton: {
      backgroundColor: buttonColor,
      borderRadius: theme.borderRadius,
      width: "auto",
    },
    menuButtonContainer: {
      shadowColor: theme.shadowColor,
      shadowOpacity: theme.shadowOpacity,
      shadowRadius: theme.shadowRadius,
      shadowOffset: theme.shadowOffset,
    },
    menuTitle: {
      color: theme.fonts.colors.title,
      fontSize: theme.fonts.sizes.primary,
      marginLeft: theme.rem * 0.5,
    },
    menuTitle_menuOpen: {
      color: transparentize(0.75, theme.fonts.colors.title),
    },
    optionTextStyle: {
      color: theme.fonts.colors.title,
      fontSize: theme.fonts.sizes.primary,
      // borderWidth: 1,
      // borderBottomColor: 'white',
      paddingHorizontal: theme.rem * 0.75,
    },
    optionTextStyle_selected: {
      color: theme.fonts.colors.title,
    },
    optionsContainer: {
      backgroundColor: menuColor,
      borderRadius: theme.borderRadius2,
      // borderWidth: StyleSheet.hairlineWidth,
      // borderColor: rgba(255,255,255,0.025),
      // borderWidth:1,
      // borderColor: rgba(0,0,0,0.1),
      // paddingVertical: theme.rem * 0.5,
      shadowColor: "black",
      shadowOpacity: theme.isDark ? 0.5 : 0.2,
      shadowRadius: 75,
      shadowOffset: {
        width: 0,
        height: 0,
      },
    },
  });
}
