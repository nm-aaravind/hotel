import React from "react";
import * as apiClient from "../../../api/api";
import Hotel from "../../assets/hotel.svg";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import HotelViewer from "../HotelViewer";
const ManageHotels = () => {
  const { data: hotels, isFetching } = useQuery({
    queryFn: apiClient.getHotelsByUser,
    queryKey: ["getHotelsByUser"],
    onError: (error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  if(isFetching) return <Loader />
  return hotels?.data.length ? (
    <div className="lg:w-3/4 mx-auto flex gap-8 flex-col pt-12 pb-20">
      <div className="mb-3 font-mukta font-semibold tracking-tight text-gray-900 rounded-lg">
        <Link to={'/add-hotel'} className="float-right p-3 text-center rounded-lg text-2xl bg-moonstone hover:bg-moontone-hover text-white transition-all font-light tracking-tight">List a property</Link>
        <p className="text-5xl">Your Hotels</p>
        <p className="text-xl font-light mt-3">Manage your properties</p>
      </div>
      {
        hotels?.data.map((hotel) => {
          return <HotelViewer hotel={hotel} admin key={hotel._id}/>
      })}

    </div>
  ) : (
    <div className="flex justify-center flex-col items-center gap-5 h-full translate-y-1/2 w-full">
      <img src={Hotel} className="" alt="Hotel Not Found icon" />
      <h2 className="font-mukta text-gray-700 font-light text-3xl">No hotels found</h2>
      <Link to={'/add-hotel'} className="p-2 text-center pb-4 w-96 rounded-lg pt-3 font-light text-2xl bg-moonstone hover:bg-moontone-hover text-white transition-all mt-3">List a property</Link>
    </div>
  );
};

export default ManageHotels;
