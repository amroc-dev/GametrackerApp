import React, { useEffect, useState, useCallback, useRef } from "react";
import { sortOptions } from "./SortOptions";
import { popularityFilterCategories as popCategories } from "./PopularityFilterCategories";

const SearchContext = React.createContext();

function SearchContextProvider(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchID, setSearchID] = useState(0);
  const [sortOption, setSortOption] = useState(sortOptions.popularity);
  const [searchTags, setSearchTags] = useState([]);
  const [deviceFilter, setDeviceFilter] = useState({
    iPhone: false,
    iPad: false,
    tvOS: false,
    watch: false,
  });
  const [popularityFilter, _setPopularityFilter] = useState({ min: -1, max: -1 });
  const [ratingFilter, _setRatingFilter] = useState(-1);

  function updateSortOption(newSortOption) {
    setSortOption(newSortOption);
  }

  function isSortingByRecentlyUpdated() {
    return sortOption === "Recently updated"
  }

  function submitSearch() {
    setSearchID((prev) => prev + 1);
  }

  function addSearchTag(tag) {
    if (!searchTags.includes(tag)) {
      setSearchTags((prev) => [...prev, tag]);
    }
  }

  function removeSearchTag(tag) {
    if (searchTags.includes(tag)) {
      setSearchTags((prev) => prev.filter((e) => e !== tag));
    }
  }

  function clearSearchTags() {
    setSearchTags([])
  }

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    submitSearch();
  }, [popularityFilter, searchTags, sortOption, deviceFilter, ratingFilter]);

  function clearSearchTerm() {
    setSearchTerm("");
    submitSearch(true);
  }

  function toggleDeviceFilter(deviceName) {
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
  }

  function resetDeviceFilter() {
    const filter = { ...deviceFilter };
    Object.keys(filter).forEach((v) => (filter[v] = false));
    setDeviceFilter(filter);
  }

  function setPopularityFilter(min, max) {
    if (min !== popularityFilter.min || max != popularityFilter.max) {
      _setPopularityFilter({ min: min, max: max });
    }
  }

  function setRatingFilter(val) {
    if (val != ratingFilter)
      _setRatingFilter(val)
  }

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
        clearSearchTags,
        clearSearchTerm,
        deviceFilter,
        toggleDeviceFilter,
        resetDeviceFilter,
        popularityFilter,
        setPopularityFilter,
        ratingFilter,
        setRatingFilter,
        isSortingByRecentlyUpdated,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
}

export { SearchContextProvider, SearchContext };
