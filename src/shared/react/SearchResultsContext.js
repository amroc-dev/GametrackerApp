import React, { useContext, useState, useEffect, useRef } from "react";
import { serverFetch, abortOngoingFetches, abortCodes } from "./ServerFetch";
import { SearchContext } from "./SearchContext";

export const statusCodes = {
  None: "none",
  OK : "Ok",
  TimedOut: "TimedOut",
  Failed: "Failed"
}

const SearchResultsContext = React.createContext();

let fetching = false;

function SearchResultsContextProvider(props) {
  const { searchTerm, searchTags, sortOption, deviceFilter, popularityFilter, ratingFilter, searchID, submitSearch } = useContext(
    SearchContext
  );

  // a record of the search term that was used
  const [submittedSearchTerm, setSumittedSearchTerm] = useState("");

  const searchResultsDefault = {
    status : statusCodes.None,
    resultsCount: 0,
    results: []
  }

  // search results is an object that contains two fields:
  // 1. resultCount: total number of results still in the database that match the last query
  // 2. results: an array of the actual result objects for each game that have been retreived
  const [searchResults, setSearchResults] = useState(searchResultsDefault);

  // id record is used to filter out duplicate results that may come back from the database
  const [searchResultsIdRecord, setSearchResultsIdRecord] = useState({});
  const [isFetchingResults, setIsFetchingResults] = useState(false);

  // // internal use, used to queue a new search if the request comes in when a search is already happening
  // const [pendingSearch, setPendingSearch] = useState(false);

  // setting this true allows the search to be held until later set to false,
  // at which point a search will be performed if one was submitted during the deferred period.
  // Useful for any situations where changes to the SearchContext need to be grouped together before performed
  const [holdSearch, setHoldSearch] = useState(false);

  const [currentSearchID, setCurrentSearchID] = useState(0);

  // Set after a new search is submitted and SearchResultsContext is ready to start processing fetchMoreResults calls
  const [newSearchSubmitted, setNewSearchSubmitted] = useState(false);

  const [fetchRequest, setFetchRequest] = useState({ id: 0, count: 0 });

  function fetchMoreResults(count = 10) {
    if (!fetching) setFetchRequest({ id: fetchRequest.id + 1, count: count });
  }

  function setFetching(val) {
    fetching = val
    setIsFetchingResults(val)
  }

  useEffect(() => {
    setFetching(false)
    if (searchID != currentSearchID)
      startSearch()
  }, [searchResults]);

  useEffect(() => {
    if (fetchRequest.id === 0 || fetching) return;

    _fetchMoreResults(fetchRequest.count);

    async function _fetchMoreResults(count) {
      setFetching(true)

      let offset = 0;
      if (searchResults && searchResults.results) offset = searchResults.results.length;

      // // If there is a rating filter, minus 0.05 from it before sending to the server
      // // This is because the user rating stored on the database is much higher precision than 1dp, but this app rounds to nearest 1dp when displayed to the user
      // // So doing this will make sure a query of say 4.2 will not ignore all the ratings between 4.15 and 4.2
      const adjustedRatingFilter = ratingFilter === -1 ? -1 : ratingFilter - 0.05;

      const results = await serverFetch(
        searchTerm,
        [...searchTags],
        sortOption,
        deviceFilter,
        popularityFilter,
        adjustedRatingFilter,
        count,
        offset
      );

      if (currentSearchIDRef.current != searchIDRef.current) {
        setSearchResults( {
          status: statusCodes.None,
          resultsCount: 0,
          results: [],
          unused: new Date().getTime(),
        });
        return
      }

      if (results === null) {
        setSearchResults( prev => {
            let newState = Object.assign({}, prev);
            newState.status = statusCodes.Failed
            return newState
        })
      }
      else if (results === abortCodes.TIMED_OUT) {
        setSearchResults( prev => {
          let newState = Object.assign({}, prev);
          newState.status = statusCodes.TimedOut
          return newState
      })
      } else {
        // console.log("results");
        // This results chunk might contain duplicates from earlier chunks, so use the searchResultsIdRecord to filter them out
        const uniqueResults = results.results.filter((res) => searchResultsIdRecord[res.searchBlob.trackId] !== true);

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
            status: statusCodes.OK,
            resultsCount: offset === 0 ? results.resultsCount : prev.resultsCount,
            results: prev.results.concat(uniqueResults),
          };
        });
      }
    }
  }, [fetchRequest]);

  const searchTermRef = useRef(searchTerm);
  searchTermRef.current = searchTerm;
  const submitSearchRef = useRef(submitSearch);
  submitSearchRef.current = submitSearch;
  const holdSearchRef = useRef(holdSearch);
  holdSearchRef.current = holdSearch;
  const searchIDRef = useRef(searchID);
  searchIDRef.current = searchID;
  const currentSearchIDRef = useRef(currentSearchID);
  currentSearchIDRef.current = currentSearchID;

  // use effect for whenever a new search is trigged
  useEffect(() => {
    if (holdSearchRef.current) {
      return;
    }

    startSearch();
  }, [searchID]);

  function startSearch() {
    if (searchID === currentSearchID || fetching) return;
    setCurrentSearchID(searchID);
    setSearchResultsIdRecord({});
    setSearchResults(searchResultsDefault);
    setSumittedSearchTerm(searchTermRef.current);
    setNewSearchSubmitted((t) => !t);
  }

  useEffect(() => {
    if (holdSearch === false && currentSearchID != searchID) {
      startSearch();
    }
  }, [holdSearch]);

  return (
    <SearchResultsContext.Provider
      value={{
        fetchMoreResults,
        searchResults,
        submittedSearchTerm,
        newSearchSubmitted,
        isFetchingResults,
        setHoldSearch,
      }}
    >
      {props.children}
    </SearchResultsContext.Provider>
  );
}

export { SearchResultsContextProvider, SearchResultsContext };
