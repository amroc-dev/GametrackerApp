import React, { useContext, useState, useEffect, useRef } from "react";
import { serverFetch } from "./ServerFetch";
import { SearchContext } from "./SearchContext";

const SearchResultsContext = React.createContext();

function SearchResultsContextProvider(props) {
  const {
    searchTerm,
    searchTags,
    sortOption,
    deviceFilter,
    popularityFilterIndex,
    searchID,
    submitSearch,
  } = useContext(SearchContext);

  // a record of the search term that was used
  const [submittedSearchTerm, setSumittedSearchTerm] = useState("");
 
  // search results is an object that contains two fields:
  // 1. resultCount: total number of results still in the database that match the last query
  // 2. results: an array of the actual result objects for each game that have been retreived
  const [searchResults, setSearchResults] = useState({});

  // id record is used to filter out duplicate results that may come back from the database
  const [searchResultsIdRecord, setSearchResultsIdRecord] = useState({});
  const [isFetchingResults, setIsFetchingResults] = useState(false);

  const [pendingSearch, setPendingSearch] = useState(false);

  async function fetchMoreResults(count) {
    if (isFetchingResults) return;
    setIsFetchingResults(true);

    let offset = 0;
    if (searchResults && searchResults.results)
      offset = searchResults.results.length;

    const results = await serverFetch(
      searchTerm,
      [...searchTags],
      sortOption,
      deviceFilter,
      popularityFilterIndex,
      count,
      offset
    );

    if (results === null) {
      // set to null instead of 0 to reflect that results couldn't be obtained, as opposed to the search returning no results
      setSearchResults(null);
    } else {
      // This results chunk might contain duplicates from earlier chunks, so use the searchResultsIdRecord to filter them out
      const uniqueResults = results.results.filter(
        (res) => searchResultsIdRecord[res.searchBlob.trackId] !== true
      );

      // update the searchResultsIdRecord with the newIDs
      setSearchResultsIdRecord((prev) => {
        const newIds = {};
        uniqueResults.map((res) => {
          newIds[res.searchBlob.trackId] = true;
          return null;
        });
        return { ...prev, ...newIds };
      });

      // finally, update the search results state with the new unique list
      setSearchResults((prev) => {
        return {
          // mongo only gives you the full count of the query if the offset is 0, otherwise it always returns 0
          // so just set this if the offset is actually 0
          resultsCount: offset === 0 ? results.resultsCount : prev.resultsCount,
          results: prev.results
            ? prev.results.concat(uniqueResults)
            : uniqueResults,
        };
      });
    }

    setIsFetchingResults(false);
  }

  const searchTermRef = useRef(searchTerm);
  searchTermRef.current = searchTerm;
  const isFetchingResultsRef = useRef(isFetchingResults);
  isFetchingResultsRef.current = isFetchingResults;
  const pendingSearchRef = useRef(pendingSearch);
  pendingSearchRef.current = pendingSearch;
  const submitSearchRef = useRef(submitSearch);
  submitSearchRef.current = submitSearch;

  // if there was a new search requested while the old one was being fetched,
  // then tell the search context to search again
  useEffect(() => {
    if (!isFetchingResults.current && pendingSearchRef.current) {
      submitSearchRef.current()
    }
  }, [isFetchingResults])

  // use effect for whenever a new search is trigged
  useEffect(() => {
    // if last search is still happening, queue it
    if (isFetchingResultsRef.current) {
      setPendingSearch(true)
      return
    }
    setPendingSearch(false)
    setSearchResultsIdRecord({});
    setSearchResults([]);
    setSumittedSearchTerm(searchTermRef.current);
  }, [searchID]);

  return (
    <SearchResultsContext.Provider
      value={{
        fetchMoreResults,
        searchResults,
        submittedSearchTerm,
      }}
    >
      {props.children}
    </SearchResultsContext.Provider>
  );
}

export { SearchResultsContextProvider, SearchResultsContext };
