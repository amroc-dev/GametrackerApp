import React, { useContext, useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  LayoutAnimation,
  // Pressable,
  Animated,
  ScrollView,
} from "react-native";
import { Button as ElemButton } from "react-native-elements";
import { ThemeContext } from "@root/ThemeContext";
import { rgba, transparentize, invert, darken, lighten } from "polished";
import Icon from "react-native-vector-icons/Ionicons";
import { ThemeProvider } from "@react-navigation/native";
import nextFrame from "next-frame";

//////////////////////////////////////////////////////////////////////////////////////////////////////

import { useHeaderHeight } from '@react-navigation/stack';

export function HeaderSpace() {
  const headerHeight = useHeaderHeight();
  return <View style={{ height: headerHeight, opacity: 0 }} />;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

export function Separator({ style }) {
  const { theme } = useContext(ThemeContext);
  const height = StyleSheet.hairlineWidth;

  return (
    <View
      style={[
        {
          height: height,
          backgroundColor: theme.colors.secondary,
        },
        style,
      ]}
    />
  );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

export function Spacer({ size }) {
  const { theme } = useContext(ThemeContext);
  const marginSize = size ? size : 0;
  return <View style={{ marginTop: marginSize }} />;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

export class ControlledLayoutAnimation {
  static animSet = false;

  static configureNext(animObj) {
    if (ControlledLayoutAnimation.animSet) {
      // console.log("ControlledLayoutAnimation: skipping")
      return;
    }

    ControlledLayoutAnimation.animSet = true;
    LayoutAnimation.configureNext(animObj);

    async function unSetNextFrame() {
      await nextFrame();
      ControlledLayoutAnimation.animSet = false;
    }

    unSetNextFrame();
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
// import _RangeSlider from "rn-range-slider";

// export function RangeSlider(props) {
//   const { theme } = useContext(ThemeContext);

//   function Thumb() {
//     const THUMB_RADIUS = 24;
//     const TOUCH_RADIUS = THUMB_RADIUS + theme.rem * 0;

//     const containerView = {
//       width: TOUCH_RADIUS,
//       height: TOUCH_RADIUS,
//       justifyContent: "center",
//       alignItems: "center",
//       alignContent: 'center',
//     };

//     return (
//       <View style={containerView}>
//         <View
//           style={{
//             width: THUMB_RADIUS,
//             height: THUMB_RADIUS,
//             borderRadius: THUMB_RADIUS,
//             borderWidth: 0,
//             backgroundColor: theme.colors.primary,
//           }}
//         />
//       </View>
//     );
//   }
//   const renderThumb = useCallback(() => <Thumb />, []);

//   function RailSelected() {
//     return (
//       <View
//         style={{
//           height: 3,
//           backgroundColor: theme.colors.primary,
//           borderRadius: 2,
//         }}
//       />
//     );
//   }
//   const renderRailSelected = useCallback(() => <RailSelected />, []);

//   function Rail() {
//     return (
//       <View
//         style={{
//           flex: 1,
//           height: 3,
//           borderRadius: 2,
//           backgroundColor: theme.colors.secondary,
//         }}
//       />
//     );
//   }
//   const renderRail = useCallback(() => <Rail />, []);

//   const rootStyle = {
//     marginHorizontal: theme.rem * 0.0,
//     paddingHorizontal: 0,
//   };

//   return (
//     <View style={rootStyle}>
//       <_RangeSlider
//         style={rootStyle}
//         // disableRange={true}
//         min={0}
//         max={100}
//         step={1}
//         renderThumb={renderThumb}
//         renderRail={renderRail}
//         renderRailSelected={renderRailSelected}
//         // renderLabel={renderLabel}
//         // renderNotch={renderNotch}
//         {...props}
//       />
//     </View>
//   );
// }
