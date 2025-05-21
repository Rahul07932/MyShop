import React, { useState } from "react";
import cart from "../assets/cart.svg";
import "../App.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = ({ searchTerm, setSearchTerm }) => {
  const cartItems = useSelector((state) => state.cartdata || []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top py-3 custom-navbar bg-dark">
      <div className="container-fluid px-4 d-flex justify-content-between align-items-center flex-wrap">
        <Link to="/" className="navbar-brand fs-4 fw-bold text-white">
          🛍️ MyShop
        </Link>

        {/* Cart Link */}
        <Link
          to="/cart"
          className="position-relative text-white text-decoration-none ms-auto"
          style={{
            backgroundColor: "white",
            borderRadius: "50%",
            padding: "8px",
          }}
        >
          <img
            src={cart}
            alt="cart"
            style={{ width: "35px", height: "35px", display: "block" }}
          />
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            style={{ fontSize: "0.75rem" }}
          >
            {cartItems.length}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Header;

