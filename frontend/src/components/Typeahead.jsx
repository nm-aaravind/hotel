import React, { useCallback, useEffect, useState } from "react";
import * as apiClient from "../../api/api.js";
import _, { debounce } from "lodash";
const Typeahead = ({ destination, setDestination }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async () => {
    try {
      setLoading(true);
      console.log(inputValue);
      const result = await apiClient.getPlaces(inputValue);
      setSuggestions(result);
      setLoading(false);
    } catch (error) {}
  };
  console.log(suggestions,"HEYEY")
  const debouncedFetch = _.debounce(fetchSuggestions, 300);
  useEffect(() => {
    if (inputValue.length > 0) {
      debouncedFetch();
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);
  return (
    <div className="w-full">
      <input
        required
        autoComplete="off"
        type="text"
        className={`rounded-sm w-full pt-1 text-md font-mukta focus-within:outline-none`}
        placeholder="Where are you going?"
        value={_.startCase(destination)}
        onChange={(e) => {
          setInputValue(e.target.value);
          setDestination(e.target.value);
        }}
      />
      {suggestions.length > 0 && (
        <div className="w-full absolute z-50 top-12">
          {suggestions.map((city) => {
            return (
              <p
                onClick={(e) => {
                  setDestination(city);
                  setInputValue("");
                  setSuggestions([]);
                }}
                className="font-mukta rounded-sm w-full border border-gray-400 bg-white p-2 px-11 -translate-x-11 cursor-pointer hover:bg-gray-200 transition-all"
              >
                {_.startCase(city)}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Typeahead;
