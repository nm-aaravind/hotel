import React from "react";
import Searchbar from "./Searchbar";
const Hero = () => {
  return (
    <div className="grid place-items-center bg-landingBg items-center h-[calc(100vh-71px)] text-white sm:w-full w-full bg-cover">
      <div className="w-full flex flex-col items-center -translate-y-[60px]">
        <h1 className="text-center font-raleway sm:text-3xl md:text-4xl lg:text-5xl">
          Wanderlust days and cozy nights
        </h1>
        <h3 className="text-center font-raleway sm:text-2xl md:text-3xl lg:text-4xl pb-8 font-light">
          Choose from suites, houses and more
        </h3>
        <div className="sm:w-full sm:px-3 md:w-3/4 flex flex-col gap-3">
          <Searchbar homePage={true} />
          <span className="font-mukta font-extralight text-center italic">
            Get started by searching for your destination, such as Chennai,
            Bengaluru, Mumbai, Delhi
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
