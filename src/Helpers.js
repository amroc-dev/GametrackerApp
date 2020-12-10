export function Clamp(val, min, max) {
  if (val < min) return min;

  if (val > max) return max;

  return val;
}

////////////////////////////////////////////////////////////////////////////

export function makeEnumObject(entries) {
  const obj = {};
  entries.forEach((e) => (obj[e] = e));
  return Object.freeze(obj);
}

////////////////////////////////////////////////////////////////////////////
