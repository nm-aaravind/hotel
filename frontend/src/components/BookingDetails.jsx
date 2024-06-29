import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchContext } from "../../context/SearchContext";
import { useAppContext } from "../../context/AppContext";
import { useMutation, useQuery } from "react-query";
import * as apiClient from "../../api/api.js";
import Loader from "./Loader.jsx";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
const BookingDetails = () => {
  const { state } = useLocation();
  const [numberOfNights, setNumberOfNights] = useState(null);
  const search = useSearchContext();
  const app = useAppContext();
  let travellersObj = {};

  for (let i = 0; i < search.guestCount; i++) {
    travellersObj[i + 1] = {
      name: "",
      age: "",
      gender: "M",
    };
  }
  useEffect(() => {
    setNumberOfNights(
      (search.checkOut - search.checkIn) / (1000 * 60 * 60 * 24)
    );
  }, [search.checkIn, search.checkOut]);

  const [travellers, setTravellers] = useState(travellersObj);
  const stripe = useStripe();
  const elements = useElements();
  const {
    data: paymentData,
    isFetching,
    isError,
  } = useQuery({
    queryFn: apiClient.paymentIntent,
    queryKey: [
      "createPaymentIntent",
      state.hotel.hotel._id,
      state.room._id,
      numberOfNights,
    ],
    onError: (error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
    enabled: !!state.hotel.hotel._id && numberOfNights > 0,
  });
  const navigate = useNavigate()
  const { mutate: bookHotel, isLoading } = useMutation({
    mutationFn: apiClient.bookHotel,
    onSuccess: async (data) => {
      app.showToast({message:"Booked your trip!", type:"SUCCESS"})
      navigate("/mysettings/profile")
    },
    onError: (error) => {
      app.showToast({ message: error.message, type: "ERROR" });
    },
  });
  if (isLoading || !paymentData) {
    return <Loader />;
  }
  if (isError) {
    return <div>Error</div>;
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    const json = []
    let person = {}
    const data = new FormData(e.target);
    data.forEach(function(value, key){
      person[key] = value
      if(person.name && person.age && person.gender){
        json.push(person)
        person = {}
      }
  
  });
    const { paymentIntent } = await stripe.confirmCardPayment(
      paymentData.client,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    );
    if (paymentIntent.status === "succeeded") {
      bookHotel({
        hotelId: state.hotel.hotel._id,
        roomId: state.room._id,
        paymentIntent,
        checkIn: search.checkIn.toDateString(),
        checkOut: search.checkOut.toDateString(),
        roomCount: search.roomCount,
        data: json,
      });
    }
    try {
    } catch (error) {}
  };
  return (
    <div className="w-full mb-10">
      <div className="flex flex-col lg:w-3/4 sm:px-6 mx-auto pt-16 gap-8">
        <div className="font-mukta">
          <h1 className="font-bold text-gray-900 text-5xl mb-3">
            Booking Details
          </h1>
          <p className="text-xl font-light text-gray-800">
            Review your booking
          </p>
        </div>
        <div className="grid grid-cols-[0.5fr_1fr] font-mukta text-gray-900 gap-4">
          <div className="border border-gray-300 row-start-1 row-end-3 rounded-lg p-5">
            <span className="font-bold text-lg">Hotel</span>
            <br></br>
            {state.hotel.hotel.hotelName}
            <hr className="m-2"></hr>
            <div className="grid grid-cols-2 grid-rows-2 row-start-2 gap-3">
              <p className="col-start-1 col-end-3 row-end-1">
                <span className="font-bold text-lg">Your booking details</span>
              </p>
              <p className="col-start-1 col-end-1 border-r border-r-gray-300">
                <span className="font-bold">Check In</span>
                <br></br>
                {search.checkIn.toDateString()}
              </p>
              <p className="col-start-2 col-end-3">
                <span className="font-bold">Check Out</span>
                <br></br>
                {search.checkOut.toDateString()}
              </p>
              <p className="col-start-1 col-end-3 font-bold text-2xl">
                <span>Price summary</span>
                <span className="float-right">
                  &#8377;
                  {paymentData?.totalCost / 100}
                </span>
              </p>
            </div>
          </div>
          <div className="row-start-1 row-end-6 flex flex-col gap-4">
            <div className="col-start-2 row-start-1 row-end-1 p-4 border border-blue-950 bg-blue-700/20 rounded-lg">
              <span className="font-bold">Signed In as </span>
              <span className="font-light">
                {app.user.name}
                <br></br>
                <span className="font-bold">Email Id </span> {app.user.email}
              </span>
            </div>
            {
              <form
                onSubmit={onSubmit}
                className="col-start-2 w-full p-8 col-end-3 row-start-3 rounded-lg border border-gray-300 flex flex-col gap-3"
              >
                <p className="font-bold text-2xl">Enter trip details</p>
                <hr></hr>
                <span className="font-bold text-xl">Traveller Details</span>
                <div className="w-full">
                  {Object.keys(travellers).map((traveller, index) => {
                    return (
                      <div className="grid grid-cols-4 w-full">
                        <span className="font-light">Guest {index + 1}</span>
                        <div
                          className={`border-b mb-4 w-full relative col-start-1 col-end-3 font-mukta text-md whitespace-nowrap flex items-center`}
                        >
                          <span className="min-w-24">Name</span>
                          <input
                            className="font-light focus-within:outline-none bg-inherit w-full"
                            placeholder="Name"
                            autoComplete="off"
                            name="name"
                            value={travellers[traveller].name}
                            onChange={(e) => {
                              setTravellers({
                                ...travellers,
                                [traveller]: {
                                  name: e.target.value,
                                  age: travellers[traveller].age,
                                  gender: travellers[traveller].gender,
                                },
                              });
                            }}
                          />
                        </div>
                        <div
                          className={`p-5 border-b relative col-start-3 col-end-4 font-mukta text-md whitespace-nowrap flex items-center`}
                        >
                          <span className="min-w-24">Age</span>
                          <input
                            type="number"
                            min={3}
                            className="font-light focus-within:outline-none bg-inherit w-full"
                            placeholder="Age"
                            autoComplete="off"
                            name="age"
                            value={travellers[traveller].age}
                            onChange={(e) => {
                              setTravellers({
                                ...travellers,
                                [traveller]: {
                                  name: travellers[traveller].name,
                                  age: e.target.value,
                                  gender: travellers[traveller].gender,
                                },
                              });
                            }}
                          />
                        </div>
                        <div
                          className={`p-5 border-b relative col-start-4 col-end-5  font-mukta text-md whitespace-nowrap flex items-center`}
                        >
                          <span className="min-w-24">Gender</span>
                          <select
                            name="gender"
                            onChange={(e) => {
                              setTravellers({
                                ...travellers,
                                [traveller]: {
                                  name: travellers[traveller].name,
                                  age: travellers[traveller].age,
                                  gender: e.target.value,
                                },
                              });
                            }}
                            className="bg-cloud focus-within:outline-none font-light cursor-pointer"
                          >
                            <option
                              className="bg-cloud font-light rounded-none outline-none transition-all border-none"
                              value="M"
                            >
                              Male
                            </option>
                            <option
                              className="bg-cloud font-light rounded-none outline-none border-none"
                              value="F"
                            >
                              Female
                            </option>
                          </select>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="w-full flex flex-col my-3 gap-9">
                  <p className="font-bold text-2xl">Payment Details</p>
                  <CardElement />
                  <button
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                    className="rounded text-white bg-moonstone hover:bg-moontone-hover transition-all p-2 float-right"
                  >
                    Book Now
                  </button>
                </div>
              </form>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
