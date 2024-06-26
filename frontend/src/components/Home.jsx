import React, { useEffect } from "react";
import Hero from "./Hero";
import Footer from "./Footer";
import Searchbar from "./Searchbar";
import { useQuery } from "react-query";
import * as apiClient from "../../api/api.js"
import { useSearchContext } from "../../context/SearchContext.jsx";

const Home = () => {
  // const { data: hotels, isFetching } = useQuery({
  //   queryFn: apiClient.get(searchParams),
  //   queryKey: ["getHotels", searchParams],
  //   onError: (error) => {
  //     showToast({ message: error.message, type: "ERROR" });
  //   },
  // });

  const search = useSearchContext()

  return (
    <div className="bg-cover min-h-screen ">
      <div className="h-full flex flex-col">
        <Hero />
      </div>
    </div>
  );
};

export default Home;
