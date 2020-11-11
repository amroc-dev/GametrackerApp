import React, { useContext, useState, useEffect, useRef } from "react";
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
// import { Button } from "react-native-elements";
import theme from "./Theme";
import { rgba } from "polished";
import Icon from "react-native-vector-icons/Ionicons";

const iconSize = 22;

export function SearchInput(props) {
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [showClearButton, setShowClearButton] = useState(true);
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
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut, () => setShowClearButton(true));
    setShowClearButton(false);
  }

  const cancelButton = showCancelButton ? (
    <Button onPress={ () => {textInputRef.current.clear(); textInputRef.current.blur()}} title="Cancel" type="clear" color="white" />
  ) : null;

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.searchInput}>
        <Icon style={styles.icon} name="search" size={iconSize} />
        <TextInput
          clearButtonMode={showClearButton ? "always" : "never"}
          ref={textInputRef}
          {...props}
          style={styles.textInput}
          onFocus={props.useCancelButton ? onTextFocus : null}
          onEndEditing={props.useCancelButton ? onEndEditing : null}
          autoCompleteType="off"
          autoCorrect={false}
        />
      </View>
      {cancelButton}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    height: theme.rowHeight,
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: theme.borderRadius,
    paddingHorizontal: theme.rem * 0.5,
  },
  textInput: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 0,
    borderTopRightRadius: theme.borderRadius,
    borderBottomRightRadius: theme.borderRadius,
    fontSize: theme.fonts.sizes.header,
    paddingHorizontal: theme.rem * 0.5,
  },
  icon: {
    height: iconSize,
    color: theme.fonts.colors.secondary,
  },
});

export function ToggleButton(props) {
  const pressFade = useRef(new Animated.Value(1)).current;

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

export function FatSlider(props) {
  const ref = useRef(null);

  const baseStyle = {
    margin: theme.rem * 0.5,

    // justifyContent: 'center',
    // backgroundColor: props.style && props.style.backgroundColor ? props.style.backgroundColor : theme.colors.primary,
    borderRadius: theme.borderRadius * 4,
  };

  const barStyle = {
    backgroundColor: theme.colors.primary,
    flex: 1,
  };

  const containerViewStyle = {
    flexDirection: "row",
    width: 760,
  };
  return (
    <Pressable style={{ flex: 1 }}>
      <View
      // onStartShouldSetResponderCapture={() => {
      //   console.log("re");
      //   return true;
      // }}
      // onResponderGrant={ () => console.log("grant")}
      // style={barStyle}
      ></View>
    </Pressable>
    // <ScrollView
    //   {...props}
    //   horizontal
    //   bounces={false}
    //   showsHorizontalScrollIndicator={false}
    //   // onTouchMove={ ( {nativeEvent}) => console.log(nativeEvent) }
    //   style={[baseStyle, props.style]}
    //   // value={props.value}
    //   ref = {ref}
    //   // onMomentumScrollBegin={({nativeEvent}) => ref.current.scrollTo({ x: nativeEvent.contentOffset.x, animated: false }) }
    //   // onScrollEndDrag={ ({nativeEvent}) => ref.current.scrollTo({ x: nativeEvent.contentOffset.x, animated: false })  }
    //   // onMomentumScrollBegin={() => console.log("onMomentumScrollBegin")}
    //   onScrollEndDrag={ (e) => {setHalt(-1); setHalt(e.nativeEvent.contentOffset.x)}}
    //   // onTouchEndCapture={ () => console.log("end")}
    //   >
    //     <View style={containerViewStyle}>
    //       <View style={barStyle}/>
    //       <View style={{opacity: 0, flex: 1}}/>
    //     </View>

    // </ScrollView>
  );
}

const fatSliderStyles = StyleSheet.create({});
