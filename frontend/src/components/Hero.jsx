import React from "react";
import Searchbar from "./Searchbar";
const Hero = () => {
  return (
      <div className="bg-landingBg flex flex-col items-center gap-4 text-white sm:w-full w-full bg-cover lg:p-32 sm:py-20">
        <h1 className="text-center font-raleway sm:text-3xl md:text-4xl lg:text-5xl">
          Wanderlust days and cozy nights
        </h1>
        <h3 className="text-center font-raleway sm:text-2xl md:text-3xl lg:text-4xl pb-8 font-light">
          Choose from suites, houses and more
        </h3>
        <div className="sm:w-full sm:px-3 md:w-3/4 flex justify-center">
        <Searchbar homePage={true}/>
        </div>
      </div>
  );
};

export default Hero;
