import React, { useContext, useState } from "react";
import CartContext from "../../contexts/CartContext";
import { errorAlert } from "../../utils/alert";
import { axiosSecure } from "../../axios/axiosSecure";

const CheckoutCard = () => {
  const { cart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      const { data } = await axiosSecure.post(`/orders`, { cart });
      if (data) window.location.href = "/foods";
    } catch (error) {
      errorAlert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-200 w-4/12 m-12 p-4 rounded-3xl h-fit">
      <h1 className="py-2 border-b border-slate-200">Order Summary</h1>
      {cart.map((c) => (
        <div
          className="border-b border-b-slate-100 py-2 flex justify-between"
          key={c._id}
        >
          <p>
            {c.name}{" "}
            <span className="text-sm text-gray-500">( {c.piece} )</span>{" "}
          </p>
          <p>{c.total_price} </p>
        </div>
      ))}

      <div className="py-2 flex justify-between font-semibold">
        <p>
          Total{" "}
          <span className="text-sm text-gray-500">
            {cart.reduce((sum, { piece }) => sum + piece, 0)}
          </span>
        </p>
        <p className="text-xl">
          {cart.reduce((sum, { total_price }) => sum + total_price, 0)}
        </p>
      </div>
      <button
        className="btn btn-secondary w-full mt-12"
        onClick={handlePlaceOrder}
        disabled={loading}
      >
        {loading ? "Please wait..." : "Place order"}
      </button>
    </div>
  );
};

export default CheckoutCard;
