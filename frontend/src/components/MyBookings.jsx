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
  console.log(bookings, "Booking da mavane");
  if (isFetching) {
    return <Loader />;
  }
  return (
    <div className="w-full text-gray-950">
      <div className="flex flex-col lg:w-3/4 mx-auto pt-12 gap-8">
        <div className="font-mukta">
          <h1 className="font-bold  text-5xl mb-3">Your trips</h1>
          <p className="text-xl font-light text-gray-800">
            Your trips live here
          </p>
        </div>
        {bookings?.map((booking) => {
          return (
            <div className="flex flex-col border border-gray-300 rounded-xl overflow-hidden">
              <div className="relative w-full flex gap-6 p-4 flex-nowrap h-72 overflow-hidden">
                <img
                  src={
                    booking?.hotelId?.imageURLS.length
                      ? booking?.hotelId?.imageURLS[0]["secure_url"]
                      : Hotel
                  }
                  className={`aspect-square object-cover ${
                    booking?.hotelId?.imageURLS.length ? "h-full" : "h-full p-8"
                  } rounded-lg`}
                ></img>
                <div className="flex flex-col p-5 gap-2 w-full overflow-hidden">
                  <Link
                    to={`/bookings/${booking?._id}`}
                    className="text-3xl w-fit font-mukta text-gray-900 hover:text-red-800"
                  >
                    {booking?.hotelId?.hotelName + ", "}
                    <span className="font-light">{booking?.hotelId?.city}</span>
                  </Link>
                  <p className="font-bold">
                    Booking ID{" "}
                    <span className="font-extralight">{booking._id}</span>
                  </p>
                  <span className="font-bold">
                    Number of rooms{" "}
                    <span className="font-extralight">
                      {booking?.roomCount}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyBookings;
