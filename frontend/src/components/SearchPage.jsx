import React, { useEffect, useState } from "react";
import { useSearchContext } from "../../context/SearchContext";
import { useQuery } from "react-query";
import * as apiClient from "../../api/api.js";
import Searchbar from "./Searchbar.jsx";
import Loader from "./Loader.jsx";
import HotelViewer from "./HotelViewer.jsx";
import Pagination from "./Pagination.jsx";
import Dropdown from "./Dropdown.jsx";
import FacilitiesFilter from "./FacilitiesFilter.jsx";
const SearchPage = () => {
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  const search = useSearchContext();
  const [pageNumber, setPageNumber] = useState(1);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [resultsPerPage, setResultsPerPage] = useState(5);

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn,
    checkOut: search.checkOut,
    guestCount: search.guestCount.toString(),
    roomCount: search.roomCount.toString(),
    page: pageNumber,
    limit: resultsPerPage,
    facilities: search.facilities,
  };
  const { data: hotels, isFetching } = useQuery({
    queryFn: apiClient.searchHotels,
    queryKey: ["getHotels", searchParams],
    onError: (error) => {
      // showToast({ message: error.message, type: "ERROR" });
    },
  });

  // if(hotels?.pagination.totalPages < hotels?.pagination.page){
  //   setPageNumber(1)
  // }

  if (isFetching) return <Loader />;

  return (
    <div className="md:m-10 sm:m-6 grid sm:grid-cols-1 lg:grid-cols-[250px_1fr] gap-x-12 lg:gap-y-14 sm:gap-y-8 lg:grid-rows-[50px_1fr]">
      <div className="lg:hidden col-start-1 row-start-1 md:col-end-5 cursor-pointer flex flex-col">
        <span
          onMouseLeave={() => setIsSearchDropdownOpen(false)}
          onMouseEnter={() => setIsSearchDropdownOpen(true)}
          className="font-mukta flex flex-col gap-4 justify-between"
        >
          <div className="flex justify-between items-center">
            <span className="text-3xl">Search Results </span>
            <span className="italic  text-md text-gray-800 underline underline-offset-2">
              Edit Search / Apply Filters
            </span>
          </div>
          <div
            className={`${
              !isSearchDropdownOpen && "hidden"
            } flex flex-col sm:text-md`}
          >
            <Searchbar border="blue" homePage={false} />
            <FacilitiesFilter
              facilities={search.facilities}
              setFacilities={search.setFacilities}
            />
          </div>
        </span>
      </div>
      <div className="sm:hidden lg:block md:col-start-1 lg:col-start-2 col-end-5 row-start-1 row-end-1">
        <Searchbar border="blue" homePage={false} />
      </div>
      <div className="sm:hidden lg:block col-start-1 col-end-2 border border-gray-300 rounded-lg flex flex-col p-7 gap-5 lg:row-start-1 lg:row-end-3">
        <div className="">
          <button
            onClick={() => {
              search.setFacilities([]);
            }}
            className="text-lg font-mukta pt-1 underline font-extralight text-gray-900 transition-colors rounded-md float-right"
          >
            Clear
          </button>
          <p className="float-left font-mukta text-gray-900 mb-2 text-2xl">
            Filters
          </p>
        </div>
        <FacilitiesFilter
          facilities={search.facilities}
          setFacilities={search.setFacilities}
        />
      </div>
      {hotels?.data.length > 0 ? (
        <div className="lg:col-start-2 md:col-end-5 sm:col-start-1 sm:row-start-2 lg:row-start-2 flex flex-col gap-7 md:row-end-3">
          <div className="float-left items-center">
            <div className="float-right">
              <Dropdown
                isDropdownOpen={isDropdownOpen}
                setIsDropdownOpen={setIsDropdownOpen}
                currentResults={resultsPerPage}
                setResults={setResultsPerPage}
              />
            </div>
            <p className="font-mukta sm:text-2xl lg:text-3xl text-gray-900">
              {hotels?.pagination.totalDocuments}{" "}
              {hotels?.pagination.totalDocuments <= 1 ? "hotel" : "hotels"}{" "}
              found in {toTitleCase(search.destination)}
            </p>
          </div>
          {hotels?.data.map((hotel) => (
            <HotelViewer hotel={hotel} key={hotel._id} />
          ))}
        </div>
      ) : (
        <div className="font-mukta text-3xl">
          No hotels found matching your search, try editing your search
        </div>
      )}
      {!hotels?.length && (
        <div className="md:col-start-1 md:col-end-5 sm:col-start-1 sm:col-end-1 w-full flex justify-center row-start-3">
          <Pagination
            totalPages={hotels?.pagination.totalPages}
            page={hotels?.pagination.page}
            onPageChange={setPageNumber}
          />
        </div>
      )}
    </div>
  );
};

export default SearchPage;
