import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import User from "../assets/user-gray.svg";
import Lock from "../assets/lock.svg";
import ManyUsers from "../assets/many-users.svg";
const SettingsLayout = () => {
  return (
    <div className="w-full text-gray-900">
      <div className="grid grid-cols-[300px_1fr] lg:w-3/4 mx-auto pt-16 gap-10">
        <div className="col-start-1 col-end-1 border border-gray-300 rounded-lg flex flex-col">
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
