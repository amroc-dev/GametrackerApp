import React, { useState } from "react";
import { View } from "react-native";
import { State, TapGestureHandler } from "react-native-gesture-handler";
const TouchContext = React.createContext();

function TouchContextProvider(props) {
  const [singleTap, setSingleTap] = useState(false);

  function onTap(event) {
    if (event.nativeEvent.state === State.END) {
    }
  }

  function Test() {
    setSingleTap( t => !t)
  }

  return (
    <TouchContext.Provider
      value={{
        singleTap,
      }}
    >
      <TapGestureHandler numberOfTaps={1}
      onHandlerStateChange={onTap}>
        <View onTouchStart={Test} style={{ flex: 1, zIndex: 100, }}>
          {props.children}
        </View>
      </TapGestureHandler>
    </TouchContext.Provider>
  );
}
export { TouchContextProvider, TouchContext };
