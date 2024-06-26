import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import * as apiClient from "../../api/api.js"
import HotelForm from "./forms/HotelForm.jsx";

const EditHotel = () => {
  const { hotelid } = useParams();
  const { data: hotel, isFetching } = useQuery({
    queryFn: () => apiClient.getHotelById(hotelid), 
    queryKey: ["getHotelById"],
    enabled: !!hotelid,
    onError: (error) => {
      // showToast({ message: error.message, type: "ERROR" });
    },
  });
  if(isFetching) return <Loader />
  return <HotelForm hotel = {hotel} edit={true}/>
};

export default EditHotel;
