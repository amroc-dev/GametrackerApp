function getFetchOptions(body) {
  // console.log("Request: " + JSON.stringify(body, null));
  const str_body = JSON.stringify(body);
  return {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: str_body,
  };
}

export const abortCodes = {
  TIMED_OUT: "TimedOut",
};

//////////////////////////////////////////////////////
async function fetchWithTimeout(uri, options = {}, timeOut = 15000) {
  const abortController = new AbortController();
  const config = { ...options, signal: abortController.signal };

  const timeoutId = setTimeout(() => {
    abortController.abort();
  }, timeOut);

  try {
    const response = await fetch(uri, config);
    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      throw abortCodes.TIMED_OUT;
    }
    throw error;
  }
}

// let activeControllers = [];

// function removeFetch(controller) {
//   const idx = activeControllers.indexOf(controller);
//   if (idx !== -1) activeControllers.splice(idx, 1);
// }

// export function abortOngoingFetches() {
//   while (activeControllers.length > 0) {
//     activeControllers[0].abort();
//     activeControllers.shift();
//   }
// }

// export const abortCodes = {
//   TIMED_OUT : "TimedOut",
//   ABORTED : "Aborted",
// }

// //////////////////////////////////////////////////////
// async function fetchWithTimeout(uri, options = {}, abortable = true, timeOut = 15000) {
//   const abortController = new AbortController();
//   let timedOut = false;
//   const config = { ...options, signal: abortController.signal };

//   console.log("ControllerCount: " + activeControllers.length)

//   const timeoutId = setTimeout(() => {
//     timedOut = true;
//     abortController.abort();
//     removeFetch(abortController);
//   }, timeOut);

//   if (abortable) activeControllers.push(abortController);

//   try {
//     const response = await fetch(uri, config);
//     const data = await response.json();
//     removeFetch(abortController);
//     return data;
//   } catch (error) {
//     removeFetch(abortController);
//     if (error.name === "AbortError") {
//       if (timedOut) throw abortCodes.TIMED_OUT;
//       else throw abortCodes.ABORTED;
//     }
//     throw error;
//   }
// }

//////////////////////////////////////////////////////
// function fetchWithTimeout(uri, options = {}, time = 18000) {
//   const controller = new AbortController();
//   const config = { ...options, signal: controller.signal };

//   setTimeout(() => {
//     controller.abort();
//   }, time);

//   return fetch(uri, config)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`${response.status}: ${response.statusText}`);
//       }

//       return response;
//     })
//     .catch((error) => {
//       if (error.name === "AbortError") {
//         throw new Error("Response timed out");
//       }
//       throw new Error(error.message);
//     });
// }

let rateData = {};
export function getRateData() {
  return rateData;
}

// const serverAddr = "http://marcos-macbook-air.local:80/"
// const serverAddr = "http://localhost:80/";
const serverAddr = "https://amroc-gametracker-server.herokuapp.com";

//////////////////////////////////////////////////////
export async function serverFetch(
  searchTerm,
  searchTags,
  sortMethod,
  deviceFilter,
  popularityFilter,
  ratingFilter,
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

  const phrasesArray = searchTerm.split(/(\s+)/).filter((e) => e.trim().length > 0);
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
    popularityFilter: popularityFilter,
    ratingFilter: ratingFilter,
    count,
    offset,
    sortMethod,
  };

  try {
    const results = await fetchWithTimeout(serverAddr, getFetchOptions(body));
    return results;
  } catch (e) {
    if (e === abortCodes.TIMED_OUT) return e;
  }

  return null;

  // try {
  //   const response = await fetchWithAbort(serverAddr, getFetchOptions(body));
  //   const data = await response.json();

  //   // just see if the server is sending rate limiting data and make a record of it if so
  //   if (data.rateData) {
  //     rateData = { ...data.rateData };
  //     delete data.rateData;
  //   }

  //   results = { ...data };
  // } catch (e) {
  //   // console.error("Error:", e);
  //   if (response === "AbortError") {
  //     console.log("OK!")
  //   }
  //   return null;
  // }
  // return results;
}

export async function fetchGamesMeta() {
  const body = {
    requestType: "games_meta",
  };

  try {
    const data = await fetchWithTimeout(serverAddr, getFetchOptions(body));
    return data;
  } catch (e) {}

  return null;
}

// //////////////////////////////////////////////////////
// export async function fetchTags() {
//   const body = {
//     requestType: "tags",
//   };

//   try {
//     const data = await fetchWithTimeout(serverAddr, getFetchOptions(body));
//     return data;
//   } catch (e) {}

//   return null;
// }

// //////////////////////////////////////////////////////
// export async function fetchPopularityIntervals() {
//   const body = {
//     requestType: "popularityIntervals",
//   };

//   try {
//     const data = await fetchWithTimeout(serverAddr, getFetchOptions(body));
//     return data;
//   } catch (e) {}

//   return null;
// }
