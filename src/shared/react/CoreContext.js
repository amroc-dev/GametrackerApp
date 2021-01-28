import React, { useState, useEffect, useContext } from "react";
import { fetchGamesMeta } from "./ServerFetch";
const CoreContext = React.createContext();
import {NetworkContext} from "./NetworkContext";

function CoreContextProvider(props) {
  const [tags, setTags] = useState([]);
  const [popularityIntervals, setPopularityIntervals] = useState([])
  const [releaseYears, setReleaseYears] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const {connected} = useContext(NetworkContext);
  const [appVersion, setAppVersion] = useState(props.version);

  useEffect( () => {

    async function doFetchGamesMeta() {
      let data = await fetchGamesMeta();
      if (data) {
        setTags(data.tags)
        setPopularityIntervals(data.popularityIntervals)
        setReleaseYears(data.releaseYears)
      }
    }

    if (tags.length === 0 || popularityIntervals.length === 0 || releaseYears === null) doFetchGamesMeta()
   
  }, [connected])

  function toggleMenu() {
    setMenuOpen( m => !m)
  }

  return (
    <CoreContext.Provider
      value={{
        tags,
        popularityIntervals,
        menuOpen,
        setMenuOpen,
        toggleMenu,
        appVersion
      }}
    >
      {props.children}
    </CoreContext.Provider>
  );
}
export { CoreContextProvider, CoreContext };
