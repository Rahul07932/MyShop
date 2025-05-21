import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/action";
import { productList } from "../redux/ProductAction";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

function MainSection() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.productData);
  const cartData = useSelector((state) => state.cartdata);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortByName, setSortByName] = useState("none");
  const [showLoader, setShowLoader] = useState(loading);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 1000);
    dispatch(productList());
    return () => clearTimeout(timer);
  }, [dispatch]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handlePriceChange = (e) => setSelectedPrice(e.target.value);
  const handleRatingChange = (e) => setSelectedRating(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handleSortChange = (e) => setSortByName(e.target.value);

  const showNotification = (message) => {
    toast(message, {
      position: "top-right",
      autoClose: 3000,
      pauseOnHover: true,
    });
  };

  const isInCart = (id) => cartData.some((item) => item.id === id);

  let filteredProducts = data
    ?.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) => {
      const price = parseFloat(item.price);
      if (selectedPrice === "Below 10000") return price < 10000;
      if (selectedPrice === "10000to50000")
        return price >= 10000 && price <= 50000;
      if (selectedPrice === "Above50000") return price > 50000;
      return true;
    })
    .filter((item) => {
      const rate = parseFloat(item.rate);
      if (selectedRating === "4plus") return rate >= 4;
      if (selectedRating === "3plus") return rate >= 3;
      if (selectedRating === "2plus") return rate <= 2;
      return true;
    })
    .filter((item) => {
      if (selectedCategory === "All") return true;
      return item.category === selectedCategory;
    });

  if (sortByName === "asc") {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else if (sortByName === "desc") {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  return (
    <>
      {/* Filters Section */}
      <div className="container-fluid my-3 px-4">
        <div className="row g-3 align-items-center">
          <div className="col-12 col-md-4">
            <div className="input-group input-group-lg">
              <input
                className="form-control"
                type="search"
                placeholder="Search for products"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <span className="input-group-text bg-white">
                <i className="fas fa-search text-secondary"></i>
              </span>
            </div>
          </div>

          <div className="col-6 col-md-2">
            <select
              className="form-select form-select-lg"
              value={selectedPrice}
              onChange={handlePriceChange}
            >
              <option value="All">All Prices</option>
              <option value="Below10000">Below ₹10,000</option>
              <option value="10000to50000">₹10,000–₹50,000</option>
              <option value="Above50000">Above ₹50,000</option>
            </select>
          </div>

          <div className="col-6 col-md-2">
            <select
              className="form-select form-select-lg"
              value={selectedRating}
              onChange={handleRatingChange}
            >
              <option value="All">All Ratings</option>
              <option value="4plus">4 ★ & Above</option>
              <option value="3plus">3 ★ & Above</option>
              <option value="2plus">2 ★ & Below</option>
            </select>
          </div>

          <div className="col-6 col-md-2">
            <select
              className="form-select form-select-lg"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="All">All Categories</option>
              {[...new Set(data?.map((item) => item.category))].map(
                (cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="col-6 col-md-2">
            <select
              className="form-select form-select-lg"
              value={sortByName}
              onChange={handleSortChange}
            >
              <option value="none">Sort: None</option>
              <option value="asc">Name: A-Z</option>
              <option value="desc">Name: Z-A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Section */}
      {showLoader || loading ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="text-danger text-center fs-5">{error}</div>
      ) : (
        <div className="container-fluid py-4 px-4">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {filteredProducts?.map((item, index) => {
              const alreadyInCart = isInCart(item.id);
              return (
                <div key={index} className="col">
                  <div className="card h-100 shadow-sm border rounded-4">
                    <div
                      className="bg-white d-flex align-items-center justify-content-center p-3"
                      style={{ height: "220px" }}
                    >
                      <img
                        src={item.photo}
                        alt={item.name || "product"}
                        className="img-fluid"
                        style={{
                          maxHeight: "100%",
                          maxWidth: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>

                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title fw-bold text-primary fs-4">
                        {item.name}
                      </h5>
                      <p className="text-danger fw-bold mb-2 fs-3">
                        ₹{item.price}
                      </p>
                      <p className="text-muted fs-5 mb-1">Model: {item.model}</p>
                      <p className="text-warning fs-5 mb-1">
                        Rating: {item.rate} ★
                      </p>
                      <p className="text-secondary fs-5 mb-3">
                        Category: {item.category}
                      </p>

                      <div className="mt-auto d-flex gap-2">
                        <button
                          className="btn btn-lg btn-success flex-fill"
                          style={{ backgroundColor: "orange", border: "none" }}
                          onClick={() => {
                            if (!alreadyInCart) {
                              dispatch(addToCart(item));
                              showNotification(`${item.name} added to cart`);
                            }
                          }}
                          disabled={alreadyInCart}
                        >
                          {alreadyInCart ? "In Cart" : "Add to Cart"}
                        </button>
                        <button
                          className="btn btn-lg btn-danger flex-fill"
                          onClick={() => {
                            dispatch(removeFromCart(item.id));
                            showNotification(`${item.name} removed from cart`);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredProducts?.length === 0 && (
              <div className="text-center text-secondary mt-5 fs-4">
                No products found.
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default MainSection;


