import React from "react";
import { State, TapGestureHandler } from "react-native-gesture-handler";

export default function Tappable({ children, onTap }) {
  function tapped(event) {
    if (event.nativeEvent.state === State.END && onTap) {
      onTap();
    }
  }
  return (
    <TapGestureHandler numberOfTaps={1} onHandlerStateChange={tapped}>
      {children}
    </TapGestureHandler>
  );
}
