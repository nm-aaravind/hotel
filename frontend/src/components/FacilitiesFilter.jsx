import React from "react";
import { hotelOptions } from "../../config/hotel-options.jsx";

const FacilitiesFilter = ({ facilities, setFacilities }) => {
  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      if (!facilities.includes(event.target.value)) {
        setFacilities((prevState) => [
          ...prevState,
          event.target.value,
        ]);
      }
    } else {
      setFacilities((prevState) => {
        return prevState.filter((facility) => facility !== event.target.value);
      });
    }
  };
  return (
    <div className="flex flex-col w-full mt-5">
      <p className="text-xl text-gray-900 font-light font-mukta border-b border-gray-300 pb-3">
        Facilities
      </p>
      <div className="flex lg:flex-col sm:overflow-x-scroll image-slider lg:overflow-auto gap-2 py-3">
        {Object.keys(hotelOptions).map((option, index) => {
          return (
            <label
              key={index}
              className="font-light sm:border sm:border-gray-300 lg:border-none text-center PillList-item hover:bg-gray-300 text-gray-900 flex gap-10 cursor-pointer transition-colors items-center rounded-lg sm:text-sm lg:text-lg"
            >
              <input
                type="checkbox"
                className=""
                value={option}
                checked = {facilities.includes(option)}
                onChange={handleCheckboxChange}
              />
              <span className="PillList-label p-2 rounded-lg text-inherit font-mukta sm:text-lg whitespace-nowrap lg:text-lg w-full h-full">
                {option}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default FacilitiesFilter;
