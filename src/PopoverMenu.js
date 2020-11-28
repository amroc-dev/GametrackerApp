import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import { View, Text, TextInput, StyleSheet, LayoutAnimation, Pressable } from "react-native";
import { Button } from "react-native-elements";
import { SearchContext } from "./shared/react/SearchContext";
import { sortOptions } from "./shared/react/SortOptions";
import { ThemeContext } from "./ThemeContext";
import Icon from "react-native-vector-icons/Ionicons";
import { renderers } from "react-native-popup-menu";
const { Popover, ContextMenu } = renderers;
import { Menu, MenuOptions, MenuOption, MenuTrigger, withMenuContext } from "react-native-popup-menu";
import { rgba, transparentize, lighten } from "polished";
import { Separator } from "./Common";
import { HeaderStyleInterpolators } from "@react-navigation/stack";

export default withMenuContext(PopoverMenu);

function PopoverMenu(props) {
  const { theme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const styles = getStyles(theme);

  function MenuButton(menuProps) {
    const iconName = "ios-chevron-down"
    // const iconName = menuOpen ? "ios-chevron-up" : "ios-chevron-down";
    
    return (
      <Button
        title={props.selected}
        onPress={menuProps.onPress}
        containerStyle={{ padding: 0, margin: 0 }}
        buttonStyle={styles.menuButton}
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
          backgroundColor: transparentize(0, theme.colors.secondary),
        }}
      />
    );

    if (index === props.menuOptions.length - 1) separator = null;

    return (
      <View key={item}>
        <MenuOption
          onSelect={() => {setMenuOpen(false); onOptionsSelect(item);}}
          text={item}
          customStyles={{
            optionText: [styles.optionTextStyle, item === props.selected ? styles.optionTextStyle_selected : {}],
          }}
        />
        {separator}
      </View>
    );
  });

  return (
    <Menu
      onOpen={() => setMenuOpen(true)}
      onClose={() => setMenuOpen(false)}
      onBackdropPress={() => setMenuOpen(false)}
      renderer={Popover}
      rendererProps={{ placement: "bottom", anchorStyle: styles.anchorStyle }}
    >
      <MenuTrigger customStyles={{ TriggerTouchableComponent: MenuButton }} />
      <MenuOptions optionsContainerStyle={styles.optionsContainer}>{menuOptions}</MenuOptions>
    </Menu>
  );
}

function getStyles(theme) {
  const buttonColor = theme.colors.background2;
  const menuColor = lighten(0.05, buttonColor);

  return StyleSheet.create({
    root: {},
    anchorStyle: {
      // backgroundColor: menuColor,
      // marginTop: theme.rem * 0.25,
      opacity: 0,
      // zIndex: 10,
      // marginTop: theme.rem * 0.25,
      // top: 0,
      // height: 18,
      // width: 18,
      // borderRadius: theme.borderRadius,
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
    menuTitle: {
      color: theme.fonts.colors.title,
      fontSize: theme.fonts.sizes.primary,
      marginLeft: theme.rem * 0.5,
    },
    menuTitle_menuOpen: {
      color: theme.fonts.colors.secondary,
    },
    optionTextStyle: {
      color: theme.fonts.colors.title,
      fontSize: theme.fonts.sizes.primary,
      // borderWidth: 1,
      // borderBottomColor: 'white',
      paddingHorizontal: theme.rem * 0.75,
      paddingVertical: theme.rem * 0.25,
    },
    optionTextStyle_selected: {
      color: theme.fonts.colors.title,
    },
    optionsContainer: {
      backgroundColor: menuColor,
      borderRadius: theme.borderRadius2,
      // borderWidth: StyleSheet.hairlineWidth,
      // borderColor: rgba(255,255,255,0.1),
      // paddingVertical: theme.rem * 0.5,
      shadowColor: "black",
      shadowOpacity: theme.isDark ? 0.5 : 0.25,
      shadowRadius: 10,
      shadowOffset: {
        width: 0,
        height: 0,
      },
    },
  });
}
