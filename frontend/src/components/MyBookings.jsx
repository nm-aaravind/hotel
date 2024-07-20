import React from "react";
import { useQuery } from "react-query";
import Loader from "./Loader";
import * as apiClient from "../../api/api.js";
import Hotel from "../assets/hotel.svg";
import { Link } from "react-router-dom";
const MyBookings = () => {
  const { data: bookings, isFetching } = useQuery({
    queryFn: apiClient.getBookingsByUser,
    queryKey: ["getBookingsByUser"],
    onError: (error) => {
      //   showToast({ message: error.message, type: "ERROR" });
    },
  });
  if (isFetching) {
    return <Loader />;
  }
  console.log(bookings);
  return (
    <div className="w-full text-gray-950">
      <div className="flex flex-col lg:w-3/4 sm:w-full sm:px-4 mx-auto pt-12 gap-8">
        <div className="font-mukta">
          <h1 className="font-bold sm:text-3xl lg:text-5xl lg:mb-3">
            Your trips
          </h1>
          <p className="sm:text-lg lg:text-xl font-light text-gray-800">
            Your trips live here
          </p>
        </div>
        {bookings?.length > 0 ? (
          bookings?.map((booking) => {
            return (
              <div className="flex w-full flex-col border border-gray-300 rounded-xl ">
                <div className="relative w-full flex gap-5 p-4 flex-nowrap sm:h-60 md:h-60 lg:h-72">
                  <img
                    src={
                      booking?.hotelId?.imageURLS.length
                        ? booking?.hotelId?.imageURLS[0]["secure_url"]
                        : Hotel
                    }
                    className={`aspect-square object-cover ${
                      booking?.hotelId?.imageURLS.length
                        ? "h-full"
                        : "h-full p-8"
                    } rounded-lg`}
                  ></img>
                  <div className="flex flex-col p-2 gap-2 w-full relative">
                    <p className="sm:text-2xl lg:text-3xl w-fit font-mukta text-gray-900">
                      {booking?.hotelId?.hotelName}
                    </p>
                    <p className="sm:hidden md:block font-mukta text-lg -mt-2 font-light">
                      {booking?.hotelId?.city}
                    </p>
                    <div className="flex justify-between">
                      <p className="font-bold">
                        Guests -{" "}
                        <span className="font-extralight">
                          {booking.travellers.length}
                        </span>
                      </p>
                      <span className="font-bold">
                        Rooms -{" "}
                        <span className="font-extralight">
                          {booking?.roomCount}
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-bold">
                        Check In -{" "}
                        <span className="font-extralight">
                          {booking.checkIn}
                        </span>
                      </p>
                      <p className="font-bold">
                        Check Out -{" "}
                        <span className="font-extralight">
                          {booking.checkOut}
                        </span>
                      </p>
                    </div>
                    <p className="sm:hidden lg:block font-mukta text-lg font">
                      <span className="font-bold">Travelers - </span>
                      <div className="inline-flex gap-2">{booking?.travellers.map((traveller) => (
                        <p className="font-extralight">{traveller.name}</p>
                      ))}</div>
                    </p>
                    <span className="absolute bottom-2 w-full">
                      {new Date(booking?.checkIn) > new Date() ? (
                        <div className="w-full flex justify-between">
                          <span className="p-2 text-center font-mukta rounded bg-green-600 text-white">
                            Upcoming
                          </span>
                          <button className="mr-5 p-2 hover:bg-red-600 transition-all font-mukta rounded bg-red-500 text-white">
                            Cancel trip
                          </button>
                        </div>
                      ) : (
                        <span className="p-1 font-mukta rounded bg-red-500 text-white">
                          Completed
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <span className="font-mukta sm:text-2xl lg:text-5xl font-bold">
            No bookings found
          </span>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
