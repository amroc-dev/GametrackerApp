import React, { useState, useEffect, useContext } from "react";
import { makeEnumObject } from "@root/Helpers"

const SettingsContext = React.createContext();

export const themeIDs = makeEnumObject(['LIGHT', 'DARK', 'IOS'])

function SettingsContextProvider(props) {
  const [themeSetting, _setThemeSetting] = useState(themeIDs.LIGHT);

  function setThemeSetting(theme) {
    _setThemeSetting(theme)
  }

  return (
    <SettingsContext.Provider
      value={{
        themeSetting,
        setThemeSetting,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
}
export { SettingsContextProvider, SettingsContext };
