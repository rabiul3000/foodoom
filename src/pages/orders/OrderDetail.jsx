import React from "react";
import { useLocation, useNavigate } from "react-router";
import {
  FaMoneyBillWave,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaShoppingBag,
} from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { IoFastFood } from "react-icons/io5";
import { format } from "date-fns";

const OrderDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state;

  if (!order)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-base-200">
        <p className="text-lg text-gray-500">No order data available.</p>
      </div>
    );

  const {
    _id,
    cartItems = [],
    totalAmount,
    paymentStatus,
    orderStatus,
    paymentMethod,
    createdAt,
    expiresAt,
  } = order;

  // Badge color logic
  const orderBadgeClass =
    orderStatus === "pending"
      ? "badge-warning"
      : orderStatus === "completed"
      ? "badge-success"
      : orderStatus === "cancelled"
      ? "badge-error"
      : "badge-info";

  const paymentBadgeClass =
    paymentStatus === "paid"
      ? "badge-success"
      : paymentStatus === "unpaid"
      ? "badge-error"
      : "badge-warning";

  const formatDate = (iso) => {
    try {
      return format(new Date(iso), "PPpp");
    } catch {
      return "—";
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4 sm:px-6 md:px-10">
      <div className="max-w-4xl mx-auto bg-base-100 shadow-xl rounded-2xl p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex items-center gap-3">
            <FaShoppingBag className="text-3xl text-primary" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Order Details</h1>
              <p className="text-sm text-gray-500 mt-1">Order ID: {_id}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
            <div
              className={`badge ${paymentBadgeClass} badge-lg flex items-center gap-2`}
            >
              {paymentStatus === "paid" ? (
                <FaCheckCircle />
              ) : paymentStatus === "unpaid" ? (
                <FaTimesCircle />
              ) : (
                <FaMoneyBillWave />
              )}
              {paymentStatus?.toUpperCase()}
            </div>

            <div
              className={`badge ${orderBadgeClass} badge-lg flex items-center gap-2`}
            >
              {orderStatus === "pending" && <MdPendingActions />}
              {orderStatus === "completed" && <FaCheckCircle />}
              {orderStatus === "cancelled" && <FaTimesCircle />}
              {orderStatus?.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Cart Items */}
        <div className="divider">Ordered Items</div>
        <div className="space-y-4">
          {cartItems.length === 0 && (
            <div className="py-6 text-center text-gray-500">
              No items in this order.
            </div>
          )}

          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-base-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 sm:w-20 sm:h-20 object-cover rounded-lg"
              />
              <div className="flex-1 text-center sm:text-left">
                <h2 className="font-semibold text-lg flex justify-center sm:justify-start items-center gap-2">
                  <IoFastFood className="text-primary" />
                  {item.name}
                </h2>
                <p className="text-sm text-gray-500">
                  Unit Price: ৳{item.unit_price}
                </p>
                <p className="text-sm text-gray-500">
                  Pieces: {item.piece || 1}
                </p>
              </div>
              <div className="font-semibold text-lg text-primary text-center sm:text-right">
                ৳{item.total_price}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="divider">Summary</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <FaMoneyBillWave className="text-xl" />
            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="font-medium">{paymentMethod || "Not Selected"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MdPendingActions className="text-xl" />
            <div>
              <p className="text-sm text-gray-500">Order Status</p>
              <p className="font-medium capitalize">{orderStatus}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FaClock className="text-xl" />
            <div>
              <p className="text-sm text-gray-500">Created At</p>
              <p className="font-medium">{formatDate(createdAt)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FaClock className="text-xl" />
            <div>
              <p className="text-sm text-gray-500">Expires At</p>
              <p className="font-medium">{formatDate(expiresAt)}</p>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="mt-8 border-t border-base-300 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-lg text-gray-600">Total Amount</p>
            <p className="text-sm text-gray-500">
              Including taxes and fees (if any)
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-primary">৳{totalAmount}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
          {paymentStatus === "unpaid" ? (
            <button className="btn btn-primary gap-2 w-full sm:w-auto">
              <FaMoneyBillWave />
              Pay Now
            </button>
          ) : (
            <button className="btn btn-success gap-2 w-full sm:w-auto" disabled>
              <FaCheckCircle />
              Payment Completed
            </button>
          )}

          {orderStatus === "pending" && (
            <button
              className="btn btn-outline btn-error gap-2 w-full sm:w-auto"
              onClick={() => navigate(-1)}
            >
              <FaTimesCircle />
              Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
