import React from "react";
import { Link } from "react-router-dom";
import User from "../assets/user-gray.svg";
import Lock from "../assets/lock.svg";
import ManyUsers from "../assets/many-users.svg";
import { useQuery } from "react-query";
import * as apiClient from "../../api/api.js"
import Loader from "./Loader.jsx";
// import jwt from "jsonwebtoken"
const Settings = () => {
  return (
    <div className="w-full text-gray-950">
      <div className="flex flex-col sm:w-full sm:px-4 lg:w-3/4 mx-auto pt-12 gap-8">
        <div className="font-mukta">
          <h1 className="font-bold sm:text-3xl lg:text-5xl lg:mb-3">Account Settings</h1>
          <p className="md:text-lg lg:text-xl font-light text-gray-800">
            Manage your Tourvista experience
          </p>
        </div>
        <Link
          to={"profile"}
          className="border border-gray-400 rounded-lg grid grid-cols-[100px_1fr] hover:bg-slate-200 transition-all"
        >
          <div className="row-start-1 row-end-3 flex items-center justify-center">
            <img className="w-14 h-14" src={User}></img>
          </div>
          <p className="col-start-2 col-end-2 sm:text-xl lg:text-2xl font-bold mt-3">
            Personal Details
          </p>
          <p className="col-start-2 sm:text-md lg:text-lg mb-4">
            Update your info and find how it's used
          </p>
        </Link>
        <Link
          to={"other-travellers"}
          className="border border-gray-400 rounded-lg grid grid-cols-[100px_1fr] hover:bg-slate-200 transition-all"
        >
          <div className="row-start-1 row-end-3 flex items-center justify-center">
            <img className="w-14 h-14" src={ManyUsers}></img>
          </div>
          <p className="col-start-2 col-end-2 sm:text-xl lg:text-2xl font-bold mt-3">
            Master List
          </p>
          <p className="col-start-2 sm:text-md lg:text-lg mb-4">
            Add or edit info about the people you're traveling with.
          </p>
        </Link>
        <Link
          to={"security"}
          className="border border-gray-400 rounded-lg grid grid-cols-[100px_1fr] hover:bg-slate-200 transition-all"
        >
          <div className="row-start-1 row-end-3 flex items-center justify-center">
            <img className="w-14 h-14" src={Lock}></img>
          </div>
          <p className="col-start-2 col-end-2 sm:text-xl lg:text-2xl font-bold mt-3">
            Security
          </p>
          <p className="col-start-2 sm:text-md lg:text-lg mb-4">
            Change your security settings, or delete your account
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Settings;
