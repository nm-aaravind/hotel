// import { useState } from 'react'
// import './index.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           {/* <img src={viteLogo} className="logo" alt="Vite logo" /> */}
//         </a>
//         <a href="https://react.dev" target="_blank">
//           {/* <img src={reactLogo} className="logo react" alt="React logo" /> */}
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import HotelForm from "./components/forms/HotelForm.jsx";
import ManageHotels from "./components/hotels/ManageHotels.jsx";
import { useAppContext } from "../context/AppContext";
import Home from "./components/Home.jsx";
import HotelDetails from "./components/HotelDetails.jsx";
import BookingDetails from "./components/BookingDetails.jsx";
import EditHotel from "./components/EditHotel.jsx";
import SearchPage from "./components/SearchPage.jsx";
import UserProfile from "./components/UserProfile.jsx";
import Settings from "./components/Settings.jsx";
import Security from "./components/Security.jsx";
import OtherTravellers from "./components/OtherTravellers.jsx";
import SettingsLayout from "./layouts/SettingsLayout.jsx";
import { Elements } from "@stripe/react-stripe-js";
import MyBookings from "./components/MyBookings.jsx";
import Typeahead from "./components/Typeahead.jsx";
const node_ver = import.meta.env.NODE_VERSION;
function App() {
  const { isLoggedIn, stripe } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="hotel/:id" element={<HotelDetails />} />
          {isLoggedIn.value && (
            <>
              <Route path="add-hotel" element={<HotelForm />} />
              <Route path="my-hotels" element={<ManageHotels />} />
              <Route path="mysettings" element={<Settings />} />
              <Route
                path="hotels/booking/:id"
                element={
                  <Elements stripe={stripe}>
                    <BookingDetails />
                  </Elements>
                }
              />
              
              <Route path="my-tripss" element={<Typeahead />} />
              <Route path="my-trips" element={<MyBookings />} />
              <Route path="mysettings" element={<SettingsLayout />}>
                <Route path="profile" element={<UserProfile />} />
                <Route path="security" element={<Security />} />
                <Route path="other-travellers" element={<OtherTravellers />} />
              </Route>
              <Route path="hotel/edit/:hotelid" element={<EditHotel />} />
            </>
          )}
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </Router>
  );
}

export default App;
