import { useState } from "react";
import LeftArrow from "../assets/left-arrow.svg";
import RightArrow from "../assets/right-arrow.svg";

export default function ImageSlider({ images }) {
  const [imageIndex, setImageImdex] = useState(0);  

  return (
    <div className="flex gap-10 w-full h-full my-4">
        {
          images.map((image) => <img className="rounded-md overflow-hidden aspect-square h-full"
          src={image.secure_url || URL.createObjectURL(image)}
        ></img>)
        }
    </div>
  );
}
