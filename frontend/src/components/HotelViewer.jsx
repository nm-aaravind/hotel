import React from "react";
import Hotel from "../assets/hotel.svg";
import { Link } from "react-router-dom";
import { useQueryClient, useMutation } from "react-query";
import { useAppContext } from "../../context/AppContext";
import * as apiClient from "../../api/api.js";
const HotelViewer = ({ hotel, admin }) => {
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const { mutate: deleteHotel } = useMutation({
    mutationFn: apiClient.deleteHotel,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries("getHotelsByUser");
      await queryClient.invalidateQueries("getBookingsByUser");
      showToast({ message: data.message, type: "SUCCESS" });
    },
    onError: (error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  const facilitiesArray = hotel.facilities.map((facility) => {
    return (
      <span className="border border-gray-400 md:text-md rounded whitespace-nowrap p-2">
        {facility}
      </span>
    );
  });
  return (
    <div className="flex flex-col border border-gray-300 rounded-xl overflow-hidden">
      <div className="relative flex sm:gap-4 md:gap-6 sm:p-2 md:p-4 flex-nowrap sm:h-36 md:h-60 lg:h-72 overflow-hidden">
        <img
          src={
            hotel.imageURLS.length ? hotel.imageURLS[0]["secure_url"] : Hotel
          }
          className={`aspect-square sm:w-24 md:w-auto object-cover ${
            hotel.imageURLS.length ? "h-full" : "h-full p-8"
          } rounded-lg`}
        ></img>
        <div className="flex flex-col md:p-3 lg:p-4 md:gap-2 w-full overflow-hidden">
          <Link
            to={`/hotel/${hotel._id}`}
            className="sm:text-xl sm:mt-1 md:text-2xl lg:text-3xl w-fit font-mukta text-gray-900 hover:text-red-800"
          >
            {hotel.hotelName}
          </Link>
          <span className="sm:text-md md:text-lg lg:text-xl font-extralight text-gray-900 font-mukta underline">
            {toTitleCase(hotel.city)}
          </span>
          <p className="sm:text-sm md:text-lg lg:text-xl h-full block font-mukta font-light text-gray-600">
            <p className="sm:line-clamp-3 md:line-clamp-2 lg:line-clamp-3 w-full"> {hotel.description}</p>
          </p>
          <div className="sm:hidden md:flex gap-3 text-md font-mukta font-light text-gray-500 items-center">
            {facilitiesArray.length > 0 && !admin && (
              <span className="font-bold">Facilities</span>
            )}
            {!admin && facilitiesArray.slice(0, 5)}
            {facilitiesArray.length > 0 &&
              !admin &&
              facilitiesArray.length > 5 && (
                <span>+ {facilitiesArray.length - 5} more</span>
              )}
          </div>
        </div>
      </div>
      <div className="self-center sticky w-full bottom-0">
        {admin && (
          <div className="flex w-full">
           
            <button
              onClick={() => {
                deleteHotel(hotel._id);
              }}
              className="p-2 w-full text-center font-light font-mukta lg:text-xl sm:text-lg bg-red-500 hover:bg-red-600 text-white transition-all"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelViewer;
