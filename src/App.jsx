import React from "react";
import MainSection from "./Components/MainSection";
import { Route, Routes } from "react-router-dom";
import Cart from "./Components/Cart";
import Header from "./Components/Header"; // ✅ Make sure this file exists
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainSection />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App; // ✅ Now placed correctly outside the return block

