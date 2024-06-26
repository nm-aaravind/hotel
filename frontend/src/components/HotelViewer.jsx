import React from "react";
import Hotel from "../assets/hotel.svg";
import { Link } from "react-router-dom";
import { useQueryClient, useMutation } from "react-query";
import { useAppContext } from "../../context/AppContext";
import * as apiClient from "../../api/api.js";
const HotelViewer = ({ hotel, admin }) => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const { mutate: deleteHotel } = useMutation({
    mutationFn: apiClient.deleteHotel,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries("getHotelsByUser");
      showToast({ message: data.message, type: "SUCCESS" });
    },
    onError: (error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  const facilitiesArray = hotel.facilities.map((facility) => {
    return <span className="border border-gray-400 rounded whitespace-nowrap p-2">{facility}</span>;
  })
  return (
    <div className="flex flex-col border rounded-xl overflow-hidden">
      <div className="relative w-full flex gap-6 p-4 flex-nowrap h-72 overflow-hidden">
        <img
          src={
            hotel.imageURLS.length ? hotel.imageURLS[0]["secure_url"] : Hotel
          }
          className={`aspect-square object-cover ${hotel.imageURLS.length ? "h-full" : "h-full p-8"} rounded-lg`}
        ></img>
        <div className="flex flex-col p-5 gap-2 w-full overflow-hidden">
          <Link
            to={`/hotel/${hotel._id}`}
            className="text-3xl w-fit font-mukta text-gray-900 hover:text-red-800"
          >
            {hotel.hotelName}
          </Link>
          <span className="text-xl font-extralight text-gray-900 font-mukta">
            {hotel.city}
          </span>
          <p className="w-full text-xl h-full overflow-hidden inline-block font-mukta font-light text-gray-600 text-ellipsis">
            {hotel.description}
          </p>
          <div className="flex gap-3 text-md font-mukta font-light text-gray-500 items-center">
          {facilitiesArray.length > 0 && <span className="font-bold">Facilities</span>}
          {
            facilitiesArray.slice(0,5)
          }
          {facilitiesArray.length > 0 && facilitiesArray.length > 5 && <span>+ {facilitiesArray.length - 5} more</span>}
          </div>
        </div>
      </div>
      <div className="self-center sticky w-full bottom-0">
        {admin && (
          <div className="flex w-full">
            <Link
              to={`/hotel/edit/${hotel._id}`}
              className="p-2 w-full text-center font-light font-mukta text-xl bg-moonstone hover:bg-moontone-hover text-white transition-all"
            >
              Edit
            </Link>
            <button
              onClick={() => {
                deleteHotel(hotel._id);
              }}
              className="p-2 w-full text-center font-light font-mukta text-xl bg-red-500 hover:bg-red-600 text-white transition-all"
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
