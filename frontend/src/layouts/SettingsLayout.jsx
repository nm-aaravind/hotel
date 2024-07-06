import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import User from "../assets/user-gray.svg";
import Lock from "../assets/lock.svg";
import ManyUsers from "../assets/many-users.svg";
const   SettingsLayout = () => {
  return (
    <div className="w-full text-gray-900">
      <div className="lg:grid lg:grid-cols-[300px_1fr] sm:flex sm:flex-col lg:w-3/4 sm:px-4 mx-auto lg:pt-16 sm:pt-10 gap-10">
      <div className="flex justify-between lg:hidden">
          <NavLink
          to={"/mysettings/profile"}
          className={({ isActive }) =>
            isActive
              ? "transition-all hover:bg-gray-300 border-b-2 py-3 border-federal text-center font-mukta sm:text-lg lg:text-xl font-light w-full "
              : "transition-all hover:bg-gray-300 py-3 text-center font-mukta sm:text-lg lg:text-xl font-light w-full "
          }
          >
            Personal Details
          </NavLink>
          <NavLink
          to={"/mysettings/other-travellers"}
            className={({ isActive }) =>
              isActive
                ? "transition-all hover:bg-gray-300 border-b-2 py-3 border-federal text-center font-mukta sm:text-lg lg:text-xl font-light w-full "
                : "transition-all hover:bg-gray-300 py-3 text-center font-mukta sm:text-lg lg:text-xl font-light w-full "
            }
          >
            Master List
          </NavLink>
          <NavLink
          to={"/mysettings/security"}
            href="#info"
            className={({ isActive }) =>
              isActive
                ? "transition-all hover:bg-gray-300 border-b-2 py-3 border-federal text-center font-mukta sm:text-lg lg:text-xl font-light w-full "
                : "transition-all hover:bg-gray-300 py-3 text-center font-mukta sm:text-lg lg:text-xl font-light w-full "
            }          >
            Security
          </NavLink>
        </div>
        <div className="sm:hidden lg:block col-start-1 col-end-1 border border-gray-300 rounded-lg flex flex-col">
          <NavLink
            to={"/mysettings/profile"}
            className={({ isActive }) =>
              isActive
                ? "p-5 flex items-center gap-5 hover:bg-slate-200 font-mukta border-b border-gray-300 bg-slate-200 transition-all"
                : "transition-all p-5 flex items-center gap-5 hover:bg-slate-200 font-mukta border-b border-gray-300"
            }
          >
            <img src={User} className="w-8 h-8"></img>
            Personal Details
          </NavLink>
          <NavLink
            to={"/mysettings/other-travellers"}
            className={({ isActive }) =>
              isActive
                ? "p-5 flex items-center gap-5 hover:bg-slate-200 font-mukta border-b border-gray-300 bg-slate-200 transition-all"
                : "transition-all p-5 flex items-center gap-5 hover:bg-slate-200 font-mukta border-b border-gray-300"
            }
          >
            <img className="w-8 h-8" src={ManyUsers}></img>
            Master List
          </NavLink>
          <NavLink
            to={"/mysettings/security"}
            className={({ isActive }) =>
              isActive
                ? "p-5 flex items-center gap-5 hover:bg-slate-200 font-mukta bg-slate-200 transition-all"
                : "transition-all p-5 flex items-center gap-5 hover:bg-slate-200 font-mukta"
            }
          >
            <img className="w-8 h-8" src={Lock}></img>
            Security
          </NavLink>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsLayout;
