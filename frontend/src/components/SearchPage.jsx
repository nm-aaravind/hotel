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
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  const search = useSearchContext();
  const [pageNumber, setPageNumber] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [resultsPerPage, setResultsPerPage] = useState(5)

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn,
    checkOut: search.checkOut,
    guestCount: search.guestCount.toString(),
    roomCount: search.roomCount.toString(),
    page: pageNumber,
    limit: resultsPerPage,
    facilities: search.facilities
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
    <div className="m-10 grid grid-cols-[250px_1fr] gap-x-12 gap-y-10">
      <div className="col-start-2 col-end-5 row-start-1 row-end-2">
        <Searchbar border="blue" homePage={false} />
      </div>
      <div className="sticky top-10 col-start-1 col-end-2 border border-gray-300 rounded-lg flex flex-col p-7 gap-5 row-start-1 row-end-7">
        <div className="border-b border-gray-300 pb-2">
          <button onClick={() => {
            search.setFacilities([])
          }} className="text-lg font-mukta pt-1 underline font-extralight text-gray-900 transition-colors rounded-md float-right">Clear</button>
          <p className="float-left font-mukta text-gray-900 text-2xl">Filters</p>
        </div>
        <FacilitiesFilter facilities={search.facilities} setFacilities={search.setFacilities}/>
      </div>
      <div className="col-start-2 col-end-5 flex flex-col gap-8 row-start-2 row-end-4">
        <div className="float-left items-center">
          <div className="float-right">
            <Dropdown
              isDropdownOpen={isDropdownOpen}
              setIsDropdownOpen={setIsDropdownOpen}
              currentResults={resultsPerPage}
              setResults={setResultsPerPage}
            />
          </div>
          <p className="font-mukta text-3xl text-gray-900">
            {hotels?.pagination.totalDocuments}{" "}
            {hotels?.pagination.totalDocuments <= 1 ? "hotel" : "hotels"} found in{" "}
            {toTitleCase(search.destination)}
          </p>
        </div>
        {hotels?.data.map((hotel) => (
          <HotelViewer hotel={hotel} key={hotel._id} />
        ))}
      </div>
      {!hotels?.length && (
        <div className="col-start-2 col-end-5 w-full flex justify-center row-start-6 ">
          <Pagination
            totalPages={hotels?.pagination.totalPages}
            page={hotels?.pagination.page}
            onPageChange={setPageNumber}
          />
        </div>
      )}
      <div></div>
    </div>
  );
};

export default SearchPage;
