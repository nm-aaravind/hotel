import React from "react";
import { hotelOptions } from "../../config/hotel-options.jsx";
import { useFormContext } from "react-hook-form";

const Facilities = () => {
  const { register } = useFormContext();
  const capsules = Object.keys(hotelOptions).map((option) => {
    return (
      <label className="PillList-item hover:bg-federal/60 text-gray-900 flex gap-10 cursor-pointer bg-federal/40 transition-colors items-center rounded-md text-xl">
        <input type="checkbox" className="" value={option} {...register('facilities')} />
        {/* <span class="PillList-label text-federal h-10 w-10">{hotelOptions[option]}</span> */}
        <span className="PillList-label p-2 text-center rounded-md text-inherit font-mukta text-xl w-full h-full">{option}</span>
      </label>
    );
  });
  return (
    <div className="flex flex-col gap-10 my-5">
      <p className="text-4xl w-full text-center font-mukta text-gray-900">Ameneties</p>
      <div className="grid  sm:grid-cols-4 lg:grid-cols-6 gap-6 font-mukta text-white">
        {capsules}
      </div>
    </div>
  );
};
export default Facilities;
