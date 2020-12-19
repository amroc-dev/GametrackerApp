import React, { useState, useEffect, useContext } from "react";
import { makeEnumObject } from "@root/Helpers"
import AsyncStorage from '@react-native-async-storage/async-storage';
import storageKeys from '@root/StorageKeys';
import nextFrame from "next-frame";

const SettingsContext = React.createContext();

export const themeIDs = makeEnumObject(['LIGHT', 'DARK', 'IOS'])

function SettingsContextProvider(props) {
  const [themeSetting, _setThemeSetting] = useState(null);
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  useEffect( () => {
    if (themeSetting) {
      AsyncStorage.setItem(storageKeys.themeSetting, themeSetting)
      setSettingsLoaded(true)
    }
  }, [themeSetting])

  useEffect( () => {
    AsyncStorage.getItem(storageKeys.themeSetting).then( (val) => {
      _setThemeSetting(val ?? themeIDs.DARK)
    })
  }, [])

  function setThemeSetting(theme) {
    _setThemeSetting(theme)
  }

  return (
    <SettingsContext.Provider
      value={{
        themeSetting,
        setThemeSetting,
        settingsLoaded,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
}
export { SettingsContextProvider, SettingsContext };
