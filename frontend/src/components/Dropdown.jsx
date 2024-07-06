import React from "react";
import DownArrow from "../assets/down-arrow.svg";
const Dropdown = ({
  setResults,
  currentResults,
  setIsDropdownOpen,
  isDropdownOpen,
}) => {
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="flex font-mukta text-gray-900 whitespace-nowrap text-lg gap-5">
      <label className="pt-2">Results per page</label>
      <div className="relative">
        <button
          className="w-22 mt-1 justify-between rounded border border-gray-400 hover:border-gray-400 cursor-pointer" onClick={toggleDropdown}
        >
          <span className="flex">
            <p className="pt-1 pl-2 font-light">{currentResults}</p>
            <img className="w-6 ml-auto" src={DownArrow}></img>
          </span>
        </button>
        {isDropdownOpen && (
          <div className="text-lg font-light z-30 rounded overflow-hidden bg-cloud absolute mt-3 w-full text-center">
            <ul className="flex text-lg flex-col border-gray-400 border">
              <li className="cursor-pointer py-3 border-b hover:bg-gray-200 border-gray-400" onClick={() =>{
                setResults(5)
                toggleDropdown((prev) => !prev)
              }}>5</li>
              <li className="cursor-pointer py-3 border-b hover:bg-gray-200 border-gray-400" onClick={() =>{
                setResults(10)
                toggleDropdown((prev) => !prev)

              }}>10</li>
              <li className="cursor-pointer py-3 border-b hover:bg-gray-200 border-gray-400" onClick={() =>{
                setResults(20)
                toggleDropdown((prev) => !prev)

              }}>20</li>
              <li className="cursor-pointer py-3 hover:bg-gray-200" onClick={() =>{
                setResults(50)
                toggleDropdown((prev) => !prev)

              }}>50</li>
            </ul>
          </div>
        )} 
      </div>
    </div>
  );
};

export default Dropdown;
