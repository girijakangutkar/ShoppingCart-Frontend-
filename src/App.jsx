import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../src/pages/Home";
import Cart from "../src/pages/Cart";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default App;
