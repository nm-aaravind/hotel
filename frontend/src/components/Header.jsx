import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Burger from "../assets/burger.svg";
import User from "../assets/user.svg";
import { useAppContext } from "../../context/AppContext";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../../api/api";
const Header = ({ toggleModalVisible }) => {
  const { isLoggedIn, showToast } = useAppContext();
  const queryClient = useQueryClient();
  const { mutate: signOut } = useMutation({
    mutationFn: apiClient.logout,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries("validateToken");
    },
    onError: (error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const [dropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="text-white bg-federal py-3 font-raleway sticky z-50 w-full font-extralight">
      <nav className="mx-auto sm:w-full sm:px-9 md:w-[90%]">
        <ul className="flex justify-between items-center gap-5">
          <li>
            <Link
              to="/"
              className="sm:text-2xl sm:hidden md:block md:text-3xl tracking-normal font-title"
            >
              TourVista
            </Link>
          </li>
          {isLoggedIn.fetching ? null : !isLoggedIn.value ? (
            <li className="flex gap-10 -mr-7 sm:hidden md:inline-flex py-[0.35rem]">
              <Link
                onClick={() => toggleModalVisible("signin")}
                className="p-1 relative text-lg font-raleway text-white underline-animation"
              >
                Sign In
              </Link>
              <Link
                onClick={() => toggleModalVisible("signup")}
                className="p-1 relative text-lg font-raleway text-white underline-animation"
              >
                Sign Up
              </Link>
            </li>
          ) : (
            <li className="flex gap-10 -mr-7 sm:hidden md:inline-flex pt-1">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "p-1 relative text-lg font-raleway text-white underline-animation active-link"
                    : "p-1 relative text-lg font-raleway text-white underline-animation"
                }
                to={"/my-trips"}
              >
                Trips
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "p-1 relative text-lg font-raleway text-white underline-animation active-link"
                    : "p-1 relative text-lg font-raleway text-white underline-animation"
                }
                to={"/my-hotels"}
              >
                My Hotels
              </NavLink>
              <div className="w-fit">
                <button
                  className="hover:scale-110 transition-all"
                  onMouseEnter={() => {
                    setIsDropdownOpen(true);
                  }}
                  onMouseLeave={() => {
                    setIsDropdownOpen(false);
                  }}
                >
                  <img className="transition-all h-8 w-8 mt-1" src={User}></img>
                  {dropdownOpen && (
                    <div className="dropdown absolute translate-y-2 -translate-x-1/3 transition-all bg-cloud rounded flex flex-col gap-4 text-md font-mukta text-black font-extralight whitespace-nowrap">
                      <ul>
                        <li
                          onClick={() => {
                            setIsDropdownOpen(false);
                          }}
                          className="transition-all text-center hover:bg-federal/10 cursor-pointer px-5 py-4"
                        >
                          <Link to={"mysettings"} className="">
                            Manage Account
                          </Link>
                        </li>
                        <li
                          onClick={() => {
                            setIsDropdownOpen(false);
                            signOut();
                          }}
                          className="rounded-b text-red-600 transition-all hover:bg-federal/10 cursor-pointer p-4 px-2"
                        >
                          Log out
                        </li>
                      </ul>
                    </div>
                  )}
                </button>
              </div>
            </li>
          )}
        </ul>
        <ul className="md:hidden w-full flex flex-col relative justify-between items-center gap-5">
          <ul className="flex justify-between w-full">
            <Link
              to="/"
              className="sm:text-2xl md:text-3xl tracking-normal font-title"
            >
              TourVista
            </Link>
            <div
              onMouseEnter={() => {
                setIsDropdownOpen(true);
              }}
              onMouseLeave={() => {
                setIsDropdownOpen(false);
              }}
              className=""
            >
              <img className="cursor-pointer" src={Burger}></img>
              {dropdownOpen &&
                (isLoggedIn.fetching ? null : !isLoggedIn.value ? (
                  <li className="dropdown -left-9 absolute w-screen bg-federal top-10 z-50 flex text-center flex-col pt-1">
                    <Link
                      onClick={() => {
                        toggleModalVisible("signin")
                        setIsDropdownOpen(false);
                      }}
                      className="py-3 relative w-full text-lg font-raleway text-white hover:bg-blue-700 transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      onClick={() => {
                        toggleModalVisible("sign")
                        setIsDropdownOpen(false);
                      }}
                      className="py-3 text-lg font-raleway text-white hover:bg-blue-700 transition-colors"
                    >
                      Sign Up
                    </Link>
                  </li>
                ) : (
                  <li className="dropdown -left-9 absolute w-screen bg-federal top-10 z-50 flex text-center flex-col pt-1">
                    <Link
                    onClick={() => {
                      setIsDropdownOpen(false);
                    }}
                      to={"my-trips"}
                      className="py-3 relative w-full text-lg font-raleway text-white hover:bg-blue-700 transition-colors"
                    >
                      Trips
                    </Link>
                    <Link
                    onClick={() => {
                      setIsDropdownOpen(false);
                    }}
                      to={"my-hotels"}
                      className="py-3 text-lg font-raleway text-white hover:bg-blue-700 transition-colors"
                    >
                      My Hotels
                    </Link>
                    <Link
                    onClick={() => {
                      setIsDropdownOpen(false);
                    }}
                      to={"mysettings"}
                      className="py-3 text-lg font-raleway text-white hover:bg-blue-700 transition-colors"
                    >
                      Manage Account
                    </Link>
                    <Link
                    onClick={() => {
                      setIsDropdownOpen(false);
                      signOut()
                    }}
                      className="py-3 text-lg font-raleway text-white hover:bg-red-600 transition-colors"
                    >
                      Log Out
                    </Link>
                  </li>
                ))}
            </div>
          </ul>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
