import React, { useEffect, useState, useCallback } from "react";
import { sortOptions } from "./SortOptions";
import { popularityFilterCategories as popCategories } from "./PopularityFilterCategories";

const SearchContext = React.createContext();

function SearchContextProvider(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchID, setSearchID] = useState(0);
  const [sortOption, setSortOption] = useState(sortOptions[0]);
  const [searchTags, setSearchTags] = useState([]);
  const [deviceFilter, setDeviceFilter] = useState({
    iPhone: false,
    iPad: false,
    tvOS: false,
    watch: false,
  });
  const [popularityFilterIndex, _setPopularityFilterIndex] = useState(
    popCategories.length - 1
  );

  function updateSortOption(newSortOption) {
    setSortOption(newSortOption);
  }

  function submitSearch() {
    setSearchID((prev) => prev + 1);
  }

  const addSearchTag = useCallback(
    (tag) => {
      if (!searchTags.includes(tag)) {
        setSearchTags((prev) => [...prev, tag]);
      }
    },
    [searchTags]
  );

  const removeSearchTag = useCallback(
    (tag) => {
      if (searchTags.includes(tag)) {
        setSearchTags((prev) => prev.filter((e) => e !== tag));
      }
    },
    [searchTags]
  );

  useEffect(() => {
    submitSearch();
  }, [popularityFilterIndex, searchTags, sortOption, deviceFilter]);

  function clearSearchTerm() {
    setSearchTerm("")
    submitSearch(true);
  }

  const toggleDeviceFilter = useCallback(
    (deviceName) => {
      const filter = { ...deviceFilter };
      let changeMade = false;
      Object.keys(filter).forEach((key) => {
        if (key === deviceName) {
          changeMade = true;
          filter[key] = !filter[key];
        }
      });

      if (changeMade) {
        setDeviceFilter(filter);
      }
    },
    [deviceFilter]
  );

  function resetDeviceFilter() {
    const filter = { ...deviceFilter };
    Object.keys(filter).forEach((v) => (filter[v] = false));
    setDeviceFilter(filter);
  }

  const setPopularityFilterIndex = useCallback(
    (idx) => {
      if (popularityFilterIndex !== idx) _setPopularityFilterIndex(idx);
    },
    [popularityFilterIndex]
  );

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        submitSearch,
        searchID,
        sortOption,
        updateSortOption,
        searchTags,
        addSearchTag,
        removeSearchTag,
        clearSearchTerm,
        deviceFilter,
        toggleDeviceFilter,
        resetDeviceFilter,
        popularityFilterIndex,
        setPopularityFilterIndex,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
}

export { SearchContextProvider, SearchContext };
