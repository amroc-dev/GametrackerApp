import React, { useState } from "react";
const FilterTagsContext = React.createContext();

function FilterTagsContextProvider(props) {
  const [tagSearchField, setTagSearchField] = useState("");

  return (
    <FilterTagsContext.Provider
      value={{
        tagSearchField,
        setTagSearchField
      }}
    >
      {props.children}
    </FilterTagsContext.Provider>
  );
}
export { FilterTagsContextProvider, FilterTagsContext };
