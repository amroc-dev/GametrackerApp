import React, { useContext } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { ThemeContext } from "@root/ThemeContext";
import { CoreContext } from "@shared/react/CoreContext";
import { rgba } from "polished";

export default function MenuDrawerContent(props) {
  const { theme } = useContext(ThemeContext);
  const { appVersion } = useContext(CoreContext);

  return (
    <>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <SafeAreaView>
        <Text
          style={{
            textAlign:'left',
            marginLeft: 20,
            marginBottom: theme.rem * 0.5,
            color: 'rgb(125,125,125)',
            fontSize: theme.fonts.sizes.mini,
            fontWeight: theme.fonts.weights.bold,
          }}
        >
          v{appVersion}
        </Text>
      </SafeAreaView>
    </>
  );
}
