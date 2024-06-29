import React from "react";
import { useQuery } from "react-query";
import * as apiClient from "../../api/api.js";
import {
  Navigate,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import Loader from "./Loader.jsx";
import Person from "../assets/person.svg";
import { useSearchContext } from "../../context/SearchContext.jsx";
import { useAppContext } from "../../context/AppContext.jsx";
import Searchbar from "../components/Searchbar.jsx";
const HotelDetails = () => {
  const { id } = useParams();
  const search = useSearchContext();
  const app = useAppContext();
  const [toggleModalVisible] = useOutletContext();
  const navigate = useNavigate();
  const { data: hotel, isFetching } = useQuery({
    queryFn: () => apiClient.getHotelById(id),
    queryKey: ["getHotelById"],
    enabled: !!id,
    onError: (error) => {
      app.showToast({ message: error.message, type: "ERROR" });
    },
  });
  function handleSubmit(room) {
    if (!app.isLoggedIn.value) toggleModalVisible(true);
    else {
      navigate(`/hotels/booking/${id}`, {
        state: {
          hotel,
          room
        },
      });
    }
  }
  if (isFetching) return <Loader />;
  return (
    <div className="w-full text-gray-900 mb-20">
      <div className="flex flex-col lg:w-3/4 mx-auto pt-10 gap-8">
        <div className="flex justify-between">
          <a
            href="#overview"
            className="transition-all hover:bg-gray-300 border-b-2 py-3 border-federal text-center font-mukta text-xl font-light w-full "
          >
            Overview
          </a>
          <a
            href="#facilities"
            className="transition-all hover:bg-gray-300 text-center py-3 font-mukta text-xl font-light w-full"
          >
            Facilities
          </a>
          <a
            href="#info"
            className="transition-all hover:bg-gray-300 text-center py-3 font-mukta text-xl font-light w-full"
          >
            Info & Prices
          </a>
          <a
            href="#reviews"
            className="transition-all hover:bg-gray-300 text-center py-3 font-mukta text-xl font-light w-full"
          >
            Reviews
          </a>
        </div>
        <div className="flex flex-col gap-6 font-mukta font-light text-xl text-justify">
          <div className="font-mukta">
            {app.isLoggedIn.value ? (
              <a
                href="#info"
                className="float-right bg-moonstone transition-all hover:bg-moontone-hover p-3 font-mukta text-xl rounded-md text-white font-light"
              >
                Reserve
              </a>
            ) : (
              <button
                onClick={() => toggleModalVisible(true)}
                className="float-right bg-moonstone hover:bg-moontone-hover p-3 transition-all font-mukta text-xl rounded-md text-white font-light"
              >
                Log in to reserve
              </button>
            )}
            <h1 className="text-4xl">{hotel?.hotel.hotelName}</h1>
            <p className="text-xl font-light text-gray-800">
              {hotel?.hotel.address +
                "," +
                hotel?.hotel.city +
                "," +
                hotel?.hotel.country}
            </p>
          </div>
          {
            hotel?.hotel.imageURLS.length > 0 && <div className="image-slider flex gap-3 h-96 overflow-y-hidden aspect-square object-cover">
            {hotel?.hotel.imageURLS.map((image) => {
              return (
                <img
                  className="h-96 rounded-md aspect-square object-cover"
                  src={image.secure_url}
                ></img>
              );
            })}
          </div>
          }
          <span className="text-3xl mt-4">About the Property</span>
          {hotel?.hotel.description}
          {hotel?.hotel.facilities.length > 0 && (
            <span id="facilities" className="text-3xl">
              Facilities
            </span>
          )}
          <div className="flex w-full flex-wrap gap-3 text-md font-mukta font-light text-gray-500 items-center">
            {hotel?.hotel.facilities.map((facility) => (
              <p className="border border-gray-500 rounded p-3 whitespace-nowrap">
                {facility}
              </p>
            ))}
          </div>
          <Searchbar detailsPage />
          <span id="info" className="text-3xl mt-4">
            Prices
          </span>
          <div className="flex flex-col gap-3">
            {hotel?.hotel.rooms.map((room) => {
              let guests = [];
              for (let i = 0; i < room.guests; i++) {
                guests.push(<img className="w-6" src={Person}></img>);
              }
              return (
                <div className="flex justify-between w-full h-full rounded border py-4 px-4 border-gray-300">
                  <div className="flex flex-col rounded">
                    <p className="text-2xl font-semibold">{room.roomName}</p>
                    <div className="flex gap-3">
                      <span className="flex items-center font-thin text-md">
                        Guests
                        {guests}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col">
                      <span className="text-sm font-light">
                        for{" "}
                        {(search.checkOut - search.checkIn) /
                          (1000 * 60 * 60 * 24)}{" "}
                        nights, {search.roomCount} rooms:{" "}
                        <span className="font-bold text-lg italic">
                          {"Rs " +
                            (room.price *
                              search.roomCount *
                              (search.checkOut - search.checkIn)) /
                              (1000 * 60 * 60 * 24)}
                        </span>
                      </span>
                      <span className="text-right font-light text-sm">
                        Per night:{" "}
                        <span className="italic text-lg font-bold">
                          {"Rs " + room.price}
                        </span>
                      </span>
                    </div>
                    <button
                      onClick={() => handleSubmit(room)}
                      className="bg-moonstone rounded transition-all hover:bg-moontone-hover p-3 font-mukta text-white"
                    >
                      {app.isLoggedIn.value ? "Book" : "Log in to book"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
