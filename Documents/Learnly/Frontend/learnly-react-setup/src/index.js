import ReactDOM from "react-dom";

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import RegistrationPage from "./pages/register/register";
import ProfilePage from "./pages/profile/profile";
const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(<Register />);
root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<RegistrationPage />}></Route>
      <Route exact path="/profile" element={<ProfilePage />}></Route>
    </Routes>
  </BrowserRouter>
);
