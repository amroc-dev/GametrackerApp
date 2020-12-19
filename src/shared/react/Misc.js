//////////
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//////////
// helper function to map a string dot representation of an object's key to the actual object's key
// eg: KeyFromDotString(obj, "field1.anotherField") will return obj.field1.anotherfield
export function objectKeyFromDotString(obj, key) {
  return key.split(".").reduce((o, i) => o[i], obj);
}

export function formatRatingCount(rating) {
  let val = rating;

  if (val >= 10000) {
    val = parseInt(val / 1000) + "k";
  } else if (val >= 1000) {
    val = numberWithCommas(val);
  } else if (val < 1) val = "";

  return val;
}

export const monthMap = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "June",
  7: "July",
  8: "Aug",
  9: "Sept",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

export function extractRGB(rgbString) {
  strVals = rgbString.substring(4, rgbString.length - 1).replace(/ /g, "").split(",");
  return ([parseInt(strVals[0]), parseInt(strVals[1]), parseInt(strVals[2])])
}
