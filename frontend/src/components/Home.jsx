import React, { useEffect } from "react";
import Hero from "./Hero";
import { useSearchContext } from "../../context/SearchContext.jsx";

const Home = () => {

  return (
    <div className="bg-cover bg-yellow-500">
      <div className="flex flex-col bg-slate-800">
        <Hero />
      </div>
    </div>
  );
};

export default Home;
