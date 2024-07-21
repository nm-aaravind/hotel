import { useState } from "react";
import LeftArrow from "../assets/left-arrow.svg";
import RightArrow from "../assets/right-arrow.svg";

export default function ImageSlider({ images }) {
  return (
    <div className="lg:flex sm:grid sm:grid-cols-3 image-slider lg:overflow-x-scroll sm:grid-rows-auto gap-7 w-full lg:h-72 sm:my-2 md:my-4">
        {
          images?.map((image) => <img className="rounded-md object-cover aspect-square h-full"
          src={image.secure_url || URL.createObjectURL(image)}
        ></img>)
        }
    </div>
  );
}
