import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/action";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import handleCheckout from "./Checkout";

function Cart() {
  const cartData = useSelector((state) => state.cartdata);

  //jjjjjj
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalAmount = cartData.reduce((total, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = item.quantity || 1;
    return total + price * quantity;
  }, 0);

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
    // toast.success("Item removed from cart!");
  };

  const handleQuantityChange = (itemId, increment) => {
    const item = cartData.find((item) => item.id === itemId);
    if (!item) return;

    const newQuantity = (item.quantity || 1) + increment;
    if (newQuantity < 1) return;

    dispatch(updateQuantity(itemId, increment));
    // toast.info("Quantity updated!");
  };

  const totalItems = cartData.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  return (
    <div className="container mt-5">
      {/* Back Button */}
      <div className="mb-4">
        <button
          className="btn btn-outline-primary d-flex align-items-center gap-2 px-3 py-2 shadow-sm rounded-pill"
          onClick={() => navigate(-1)}
          style={{
            fontWeight: "500",
            fontSize: "1rem",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <span style={{ fontSize: "1.2rem" }}>←</span>
          Back to Shop
        </button>
      </div>

      <h2 className="text-center mb-4">🛒 Your Cart</h2>

      {cartData.length === 0 ? (
        <div className="alert alert-info text-center">Your cart is empty!</div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-striped table-bordered shadow-sm">
              <thead className="table-primary">
                <tr>
                  <th>Product Name</th>
                  <th>Price (₹)</th>
                  <th>Model</th>
                  <th>Rate</th>
                  <th>Product Image</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartData.map((item, index) => (
                  <tr key={index} className="hover-effect">
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.model}</td>
                    <td>{item.rate}</td>
                    <td>
                      <img
                        src={item.photo}
                        alt={item.name}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "contain",
                        }}
                      />
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-sm btn-outline-secondary me-2"
                          onClick={() => handleQuantityChange(item.id, -1)}
                          disabled={item.quantity === 1}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-outline-secondary ms-2"
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove Item
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Price Details */}
          <div className="row justify-content-end mt-4">
            <div className="col-md-4">
              <div className="card shadow-lg p-4 bg-light">
                <h5 className="mb-3 text-center text-primary">Price Details</h5>
                <div className="d-flex justify-content-between mt-3">
                  <span className="font-weight-bold">Total Items:</span>
                  <span>{totalItems}</span>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <span className="font-weight-bold">Total Amount:</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-center mt-4">
                  <button
                    className="btn btn-success w-100"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
