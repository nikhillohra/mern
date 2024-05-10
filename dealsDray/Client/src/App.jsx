import React from "react";
import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  PageNotFound,
  Password,
  Profile,
  Recovery,
  Register,
  Reset,
  Username,
} from "./Components/index";

/** auth middleware */
import { ProtectRoute } from "./middleware/auth";
import { AuthorizeUser } from "./middleware/auth";


const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Username />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password" element={<ProtectRoute><Password /></ProtectRoute>} />
        <Route path="/profile" element={<AuthorizeUser><Profile /></AuthorizeUser>} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
