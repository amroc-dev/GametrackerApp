import { popularityFilterCategories } from "./PopularityFilterCategories";

function getFetchOptions(body) {
  console.log("Request: " + JSON.stringify(body, null));
  const str_body = JSON.stringify(body);
  return {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: str_body,
  };
}

//////////////////////////////////////////////////////
function fetchWithTimeout(uri, options = {}, time = 10000) {
  const controller = new AbortController();
  const config = { ...options, signal: controller.signal };

  setTimeout(() => {
    controller.abort();
  }, time);

  return fetch(uri, config)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      return response;
    })
    .catch((error) => {
      if (error.name === "AbortError") {
        throw new Error("Response timed out");
      }
      throw new Error(error.message);
    });
};

let rateData = {}
export function getRateData() {
  return rateData
}

// const serverAddr = "http://marco-macbook.local:80/"
const serverAddr = "https://amroc-gametracker-server.herokuapp.com";

//////////////////////////////////////////////////////
export async function serverFetch(
  searchTerm,
  searchTags,
  sortMethod,
  deviceFilter,
  popularityFilterIndex,
  count,
  offset
) {
  // let combinedSearch = searchTerm;
  // searchTags.map( t => {
  //   const space = combinedSearch.length > 0 ? " " : ""
  //   combinedSearch = combinedSearch + space + t
  //   return null
  // })
  // console.log("Combined: " + combinedSearch)

  const phrasesArray = searchTerm
    .split(/(\s+)/)
    .filter((e) => e.trim().length > 0);
  let phrasesString = "";
  phrasesArray.map((p) => {
    phrasesString = phrasesString + '"' + p + '" ';
    return null;
  });
  searchTags.map((t) => {
    phrasesString = phrasesString + '"' + t + '" ';
    return null;
  });

  const devicesArray = [];
  const deviceFilterCopy = { ...deviceFilter };
  Object.keys(deviceFilterCopy).forEach((key) => {
    if (deviceFilterCopy[key]) {
      devicesArray.push(key.toLowerCase());
    }
  });

  const body = {
    requestType: "search",
    searchTerm: phrasesString,
    deviceFilter: devicesArray,
    popularityFilter: popularityFilterCategories[popularityFilterIndex],
    count,
    offset,
    sortMethod,
  };

  let results = [];

  try {
    const response = await fetchWithTimeout(serverAddr, getFetchOptions(body));
    const data = await response.json();

    // just see if the server is sending rate limiting data and make a record of it if so
    if (data.rateData) {
      rateData = {...data.rateData}
      delete data.rateData
    }

    results = { ...data };
  } catch (e) {
    console.error("Error:", e);
    return null;
  }

  return results;
}

//////////////////////////////////////////////////////
export async function fetchTags() {
  const body = {
    requestType: "tags",
  };

  let results = [];
  try {
    const response = await fetchWithTimeout(serverAddr, getFetchOptions(body));
    const data = await response.json();
    results = [...data];
  } catch (e) {
    console.error("serverFetch() error:", e);
    return null;
  }

  return results;
}
