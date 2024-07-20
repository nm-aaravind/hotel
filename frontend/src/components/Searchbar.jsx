import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "../assets/calendar.svg";
import Person from "../assets/person.svg";
import Up from "../assets/up-arrow.svg";
import Location from "../assets/location.svg";
import Down from "../assets/down-arrow.svg";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce.jsx";
import { useSearchContext } from "../../context/SearchContext.jsx";
import Typeahead from "./Typeahead.jsx";

const Searchbar = ({ border, homePage, detailsPage }) => {
  const [modalState, setModalState] = useState({
    personModal: false,
    suggestionModal: false,
  });

  const navigate = useNavigate();
  const search = useSearchContext();

  const [destination, setDestination] = useState(
    homePage ? "" : search ? search.destination : ""
  );
  const [counts, setCounts] = useState({
    guests: homePage ? 2 : search.guestCount,
    child: homePage ? 0 : search.childrenCount,
    room: homePage ? 1 : search.roomCount,
  });
  var nextDay = new Date();
  nextDay.setDate(new Date().getDate() + 1);
  const [dateRange, setDateRange] = useState([search.checkIn, search.checkOut]);
  const [startDate, endDate] = dateRange;
  const placeHolder = `${startDate ? startDate : "Select checkin date"} - ${
    endDate ? endDate : "Select checkout date"
  }`;

  // let debouncedValue = useDebounce(destination, 100);

  async function formSubmit(event) {
    event.preventDefault();
    search.searchValueUpdate(
      destination,
      startDate,
      endDate,
      counts.guests,
      counts.room
    );
    if (!detailsPage) navigate("/search");
  }
  return (
    <div
      className={`border-${
        border == "blue" ? "federal" : "white"
      }/85 border border-gray-300 rounded-lg p-2 w-full text-black`}
    >
      <form
        className="flex relative lg:flex-row sm:flex-col h-full gap-2 rounded-lg w-full"
        onSubmit={formSubmit}
      >
        {!detailsPage && (
          <div
            className={`border-${
              border == "blue" ? "federal" : "white"
            }/85 h-12 bg-white relative rounded-sm flex gap-2 items-center text-md font-mukta pl-2 flex-auto`}
          >
            <img src={Location} className="h-5 px-1 mb-1 opacity-70" />
            <Typeahead destination = {destination} setDestination={setDestination}/>
            <div
            // onClick={(e) => e.stopPropagation()}
            // className={`absolute top-[5.8rem] bg-white rounded-md w-full left-0 overflow-hidden ${
            //   debouncedValue?.length <= 0 && `hidden`
            // } justify-center`}
            >
              {/* {
              debouncedValue?.length > 0 && destination.length > 0 && debouncedValue?.map((item) => <div onClick={() => {
                setValue("place",item.city+", "+item.country)
                setDestination(item.city+", "+item.country)
              }} className="hover:bg-slate-300 cursor-pointer p-4 w-full h-full px-8 border-b-slate-700 border">{item.city}, {item.country}</div>)
            } */}
            </div>
          </div>
        )}
        <div
          className={`border-${
            border == "blue" ? "federal" : "white"
          }/85 pt-1 h-12 border bg-white rounded-sm flex items-center relative px-2 flex-auto`}
        >
          <img src={Calendar} className="h-6 px-2 mb-1 opacity-80" />
          <DatePicker
            required
            wrapperClassName="bg-white w-full"
            popperClassName=""
            calendarClassName="bg-white rounded-xl font-mukta text-md"
            placeholderText={placeHolder}
            selectsRange={true}
            dateFormat={" d-MMM-yyyy "}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            className="text-md font-mukta focus-within:outline-none w-full"
          />
        </div>
        <div
          className={`border-${
            border == "blue" ? "federal" : "white"
          }/85 border h-12 sm:w-full rounded-sm bg-white flex gap-2 items-center text-md font-mukta pr-4 pl-2 relative flex-auto cursor-pointer lg:max-w-fit`}
          onClick={() =>
            setModalState((prev) => {
              return {
                ...prev,
                personModal: !prev.personModal,
              };
            })
          }
        >
          <img src={Person} className="h-6 w-8 pl-1" />
          <p className="pt-1">
            {counts.guests == 1
              ? counts.guests + " adult "
              : counts.guests + " adults "}{" "}
            {"   -   "}
            {counts.room == 1
              ? counts.room + " room "
              : counts.room + " rooms "}
          </p>
          <div
            onClick={(e) => e.stopPropagation()}
            className={`border-${
              border == "blue" ? "federal" : "white"
            }/85 text-gray-900 border grid row-span-3 col-span-2 absolute top-[4rem] bg-white rounded-xl lg:w-full sm:w-1/3 sm:left-1/2 sm:-translate-x-1/2 left-0 z-10 ${
              !modalState.personModal && `hidden`
            } justify-center gap-x-8 gap-y-4 py-6`}
          >
            <p className="flex gap-24 items-center row-start-1 col-start-1">
              Adults{" "}
            </p>
            <div className="flex border justify-around items-center border-gray-300 rounded-lg  row-start-1 col-start-2">
              <img
                src={Down}
                className="h-7 w-7 cursor-pointer"
                onClick={() => {
                  document.getElementById("guests").stepDown();
                  document
                    .getElementById("guests")
                    .dispatchEvent(new Event("change", { bubbles: true }));
                }}
              />
              <input
                type="number"
                className="focus-within:outline-none h-10 num-input rounded-lg w-5 indent-1"
                name="guests"
                id="guests"
                value={counts.guests}
                onChange={(event) =>
                  setCounts((prev) => {
                    return {
                      ...prev,
                      guests: event.target.value,
                    };
                  })
                }
                min={1}
              ></input>
              <img
                src={Up}
                className="h-7 w-7 cursor-pointer"
                onClick={() => {
                  document.getElementById("guests").stepUp();
                  document
                    .getElementById("guests")
                    .dispatchEvent(new Event("change", { bubbles: true }));
                }}
              />
            </div>

            <p className="flex items-center row-start-2 col-start-1">Rooms </p>
            <div className="flex border items-center border-gray-300 rounded-lg row-start-2 col-start-2">
              <img
                src={Down}
                className="h-7 w-7 cursor-pointer"
                onClick={() => {
                  document.getElementById("room").stepDown();
                  document
                    .getElementById("room")
                    .dispatchEvent(new Event("change", { bubbles: true }));
                }}
              />
              <input
                type="number"
                className="focus-within:outline-none h-10 num-input rounded-lg w-5 indent-1"
                name="room"
                id="room"
                min={1}
                value={counts.room}
                onChange={(event) =>
                  setCounts((prev) => {
                    return {
                      ...prev,
                      room: event.target.value,
                    };
                  })
                }
              ></input>
              <img
                src={Up}
                className="h-7 w-7 cursor-pointer"
                onClick={() => {
                  document.getElementById("room").stepUp();
                  document
                    .getElementById("room")
                    .dispatchEvent(new Event("change", { bubbles: true }));
                }}
              />
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setModalState((prev) => {
                  return {
                    ...prev,
                    personModal: !prev.personModal,
                  };
                });
              }}
              className="bg-moonstone hover:bg-moontone-hover transition-all rounded-sm font-mukta text-white md:h-10 sm:h-12 col-start-1 col-end-3"
            >
              Done
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="bg-moonstone font-mukta text-md text-white hover:bg-moontone-hover rounded-sm px-10 transition-colors h-12"
        >
          {detailsPage ? "Edit search" : "Search"}
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
