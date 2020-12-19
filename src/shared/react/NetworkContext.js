import React, { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
const NetworkContext = React.createContext();

function NetworkContextProvider(props) {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnected(state.isConnected);
    });
    return unsubscribe;
  }, []);

  return (
    <NetworkContext.Provider
      value={{
        connected,
      }}
    >
      {props.children}
    </NetworkContext.Provider>
  );
}
export { NetworkContextProvider, NetworkContext };
