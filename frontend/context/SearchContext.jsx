import React, { useContext, createContext, useState } from "react";

const SearchContext = createContext(undefined);

export const SearchContextProvider = ({ children }) => {
  const [destination, setDestination] = useState(localStorage.getItem('destination') ? localStorage.getItem('destination') : "");
  const [checkIn, setCheckIn] = useState(new Date());
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guestCount, setGuestCount] = useState(2);
  const [roomCount, setRoomCount] = useState(1);
  const [facilities, setFacilities] = useState([]);

  const searchValueUpdate = (
    destination,
    checkIn,
    checkOut,
    guestCount,
    roomCount
  ) => {
    setDestination(destination);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setGuestCount(guestCount);
    setRoomCount(roomCount);
    localStorage.setItem('destination', destination)
  };

  const clearSearchContext = () => {
    setDestination("");
    setCheckIn(null);
    setCheckOut(null);
    setGuestCount(2);
    setRoomCount(1);
    setFacilities([]);
  };
  return (
    <SearchContext.Provider
      value={{
        destination,
        checkIn,
        checkOut,
        guestCount,
        roomCount,
        searchValueUpdate,
        clearSearchContext,
        facilities,
        setFacilities,
      }}  
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context;
};
