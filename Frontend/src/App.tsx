import React from "react";
import Navbar from "./Components/navbar-5";
import Page1 from "./Pages/Page1";
import Error from "./Pages/Error";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import { Toaster } from "react-hot-toast";
import Analytic from "./Pages/Analytic";

import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="App overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Page1 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/analytics" element={<Analytic />}></Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
