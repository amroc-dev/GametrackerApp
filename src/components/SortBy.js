import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import { View, Text, TextInput, StyleSheet, LayoutAnimation, Pressable } from "react-native";
import { Button } from "react-native-elements";
import { SearchContext } from "@shared/react/SearchContext";
import { sortOptions } from "@shared/react/SortOptions";
import { ThemeContext } from "@root/ThemeContext";
import PopoverMenu from "@components/common/PopoverMenu";
import { renderers } from "react-native-popup-menu";

const { Popover, ContextMenu } = renderers;

import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";

export default function SortBy() {
  const { theme } = useContext(ThemeContext);
  const { sortOption, updateSortOption } = useContext(SearchContext);

  const styles = getStyles(theme);

  function MenuButton(props) {
    return <Button title={sortOption} onPress={props.onPress} buttonStyle={styles.menuButton} titleStyle={styles.menuTitle} />;
  }

  return (
    <View style={styles.root}>
      <Text style={styles.sortByLabel}>Sort</Text>
      <PopoverMenu menuOptions={Object.values(sortOptions)} selected={sortOption} onChange={updateSortOption} />

      {/* <Menu renderer={Popover} rendererProps={{ placement: "bottom" }}>
        <MenuTrigger
          customStyles={{
            TriggerTouchableComponent: MenuButton,
          }}
        />
        <MenuOptions>
          {pickerItems}
        </MenuOptions>
      </Menu> */}
      {/* <View style={styles.dropdownContainer}>
        <ModalDropdown
          defaultValue={sortOption}
          items={pickerItems}
          onChangeItem={(item, index) => updateSortOption(item.value)}
        />
      </View> */}
    </View>
  );
}

function getStyles(theme) {
  const backgroundColor = theme.colors.background2;
  
  return StyleSheet.create({
    root: {
      flexDirection: "row",
      alignSelf: "flex-end",
      marginTop: theme.rem * 0.5,
      zIndex: 10,
    },
    menuButton: {
      backgroundColor: backgroundColor,
      borderRadius: theme.borderRadius,
      width: 130,
      justifyContent: 'flex-start',
    },
    menuTitle: {
      color: theme.fonts.colors.primary,
      fontSize: theme.fonts.sizes.primary,
      marginHorizontal: theme.rem * 0.5,
    },
    dropdownContainer: {
      width: 170,
      shadowColor: theme.shadowColor,
      shadowOpacity: theme.shadowOpacity,
      shadowRadius: theme.shadowRadius,
      shadowOffset: theme.shadowOffset,
      borderRadius: theme.borderRadius,
      borderWidth: theme.borderWidth,
      borderColor: theme.borderColor,
    },
    sortByLabel: {
      color: theme.fonts.colors.secondary,
      fontSize: theme.fonts.sizes.primary2,
      fontWeight: theme.fonts.weights.bold,
      alignSelf: "center",
      marginRight: theme.rem * 0.5,
    },
  });
}


// function getStyles(theme) {
//   return StyleSheet.create({
//     root: {
//       flexDirection: "row",
//       alignSelf: "flex-end",
//       height: theme.rowHeight,
//       marginTop: theme.rem * 0.5,
//       // marginHorizontal: theme.rem * 0.5,
//       zIndex: 10,
//     },
//     dropdownContainer: {
//       width: 170,
//       shadowColor: theme.shadowColor,
//       shadowOpacity: theme.shadowOpacity,
//       shadowRadius: theme.shadowRadius,
//       shadowOffset: theme.shadowOffset,
//       borderRadius: theme.borderRadius,
//       borderWidth: theme.borderWidth,
//       borderColor: theme.borderColor,
//     },
//     sortByLabel: {
//       color: theme.fonts.colors.secondary,
//       fontSize: theme.fonts.sizes.primary2,
//       fontWeight: theme.fonts.weights.bold,
//       alignSelf: "center",
//       marginRight: theme.rem * 0.5,
//     },
//   });
// }
