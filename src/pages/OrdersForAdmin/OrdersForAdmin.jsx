import { useQuery } from "@tanstack/react-query";
import React, { useState, useMemo } from "react";
import { axiosSecure } from "../../axios/axiosSecure";
import { format, isToday, isYesterday } from "date-fns";
import {
  FiLoader,
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle,
  FiTruck,
  FiChevronDown,
} from "react-icons/fi";
import { MdOutlineFastfood } from "react-icons/md";
import { Link } from "react-router";
import { errorAlert, successAlert } from "../../utils/alert";

const OrdersForAdmin = () => {
  const [openRow, setOpenRow] = useState(null);

  // Centralized action loading state
  const [actionLoading, setActionLoading] = useState(false);

  // Filter state
  const [filters, setFilters] = useState({
    status: null,
    payment: null,
    date: null,
  });

  // Fetch ALl Orders - Auto refresh
  const {
    data: orders = [],
    error,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["orders_admin"],
    queryFn: async () => {
      const res = await axiosSecure.get("orders/all_orders_admin");
      return res.data;
    },

    refetchInterval: 10000, // 🔥 Auto-refresh every 4 seconds
    refetchOnWindowFocus: false, // ❌ No refresh when tab becomes active
    refetchOnReconnect: false, // ❌ No refresh when internet reconnects
    refetchOnMount: false, // ❌ No refresh on component re-mount
  });

  // ---------------------------
  // FILTERING LOGIC (CLIENT SIDE)
  // ---------------------------
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      let valid = true;

      // Status filter
      if (filters.status) {
        valid = valid && order.orderStatus === filters.status;
      }

      // Payment filter
      if (filters.payment) {
        valid = valid && order.paymentStatus === filters.payment;
      }

      // Date filters
      if (filters.date === "today") {
        valid = valid && isToday(new Date(order.createdAt));
      }
      if (filters.date === "yesterday") {
        valid = valid && isYesterday(new Date(order.createdAt));
      }

      return valid;
    });
  }, [orders, filters]);

  // ---------------------------
  // Action Handlers
  // ---------------------------
  const updateStatus = async (url, payload, successMessage) => {
    try {
      setActionLoading(true);
      const { data } = await axiosSecure.patch(url, payload);
      if (data) {
        successAlert(successMessage);
        refetch();
      }
    } catch (err) {
      console.log(err);
      errorAlert("Failed to update order.");
    } finally {
      setActionLoading(false);
    }
  };

  // ---------------------------
  // Loading UI
  // ---------------------------
  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-3 mt-16">
        <FiLoader className="animate-spin text-4xl text-primary" />
        <p className="text-lg">Loading Orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-3 mt-16 text-red-600">
        <FiAlertCircle className="text-4xl" />
        <p className="text-lg font-semibold">Failed to load orders</p>
        <p className="text-sm">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-6 w-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <MdOutlineFastfood className="text-3xl text-primary" />
        <h1 className="text-2xl font-bold">All Orders</h1>
        <button className="btn btn-sm btn-primary ml-auto" onClick={refetch}>
          {isFetching ? "Refreshing" : "Refresh"}
        </button>
      </div>

      {/* Filters */}
      <div className="p-4 flex gap-2 flex-wrap">
        <button
          className="btn btn-sm"
          onClick={() => setFilters({ ...filters, date: "today" })}
        >
          Today
        </button>
        <button
          className="btn btn-sm"
          onClick={() => setFilters({ ...filters, date: "yesterday" })}
        >
          Yesterday
        </button>

        <button
          className="btn btn-sm"
          onClick={() => setFilters({ ...filters, status: "pending" })}
        >
          Pending
        </button>
        <button
          className="btn btn-sm"
          onClick={() => setFilters({ ...filters, status: "confirmed" })}
        >
          Confirmed
        </button>
        <button
          className="btn btn-sm"
          onClick={() => setFilters({ ...filters, status: "delivered" })}
        >
          Delivered
        </button>

        <button
          className="btn btn-sm"
          onClick={() => setFilters({ ...filters, payment: "paid" })}
        >
          Paid
        </button>
        <button
          className="btn btn-sm"
          onClick={() => setFilters({ ...filters, payment: "unpaid" })}
        >
          Unpaid
        </button>

        {/* Reset filters */}
        <button
          className="btn btn-sm btn-outline"
          onClick={() =>
            setFilters({ status: null, payment: null, date: null })
          }
        >
          Clear Filters
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th></th>
              <th>#</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Created</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order, index) => {
              const totalItems = order.cartItems?.length || 0;
              const totalPieces = order.cartItems?.reduce(
                (sum, item) => sum + item.piece,
                0
              );

              return (
                <React.Fragment key={order._id}>
                  <tr>
                    <td>
                      <button
                        className="btn btn-xs"
                        onClick={() =>
                          setOpenRow(openRow === order._id ? null : order._id)
                        }
                      >
                        <FiChevronDown
                          className={`transition-transform ${
                            openRow === order._id ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </td>

                    <th>{index + 1}</th>

                    <td className="font-semibold">{order._id}</td>

                    {/* Customer */}
                    <td>
                      <Link
                        to={`/auth/profile/${order.userId?.uid}`}
                        className="flex items-center gap-3 hover:opacity-80 transition"
                      >
                        <div className="avatar">
                          <div className="w-10 rounded-full">
                            <img
                              src={order.userId?.photoURL}
                              alt={order.userId?.name}
                            />
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold">{order.userId?.name}</p>
                          <p className="text-xs text-gray-500">
                            {order.userId?.email}
                          </p>
                        </div>
                      </Link>
                    </td>

                    {/* Items */}
                    <td>
                      <p>{totalItems} items</p>
                      <p className="text-xs">{totalPieces} pcs</p>
                    </td>

                    {/* Amount */}
                    <td className="font-semibold">{order.totalAmount}</td>

                    {/* Payment */}
                    <td>
                      {order.paymentStatus === "paid" ? (
                        <span className="badge badge-success gap-1">
                          <FiCheckCircle /> Paid
                        </span>
                      ) : (
                        <span className="badge badge-warning gap-1">
                          <FiXCircle /> Unpaid
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td>
                      <span
                        className={`badge ${
                          order.orderStatus === "delivered"
                            ? "badge-success"
                            : order.orderStatus === "processing"
                            ? "badge-info"
                            : order.orderStatus === "cancelled"
                            ? "badge-error"
                            : "badge-neutral"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>

                    {/* Created */}
                    <td className="text-sm">
                      {format(order.createdAt, "MMM dd, h:mm a")}
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() =>
                            updateStatus(
                              "orders/confirm_order",
                              {
                                orderId: order._id,
                                prevOrderStatus: order.orderStatus,
                              },
                              "Order confirmed"
                            )
                          }
                          disabled={
                            order.orderStatus !== "pending" || actionLoading
                          }
                          className="btn btn-xs btn-primary"
                        >
                          Confirm
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(
                              "orders/cooking_order",
                              { orderId: order._id },
                              "Order cooking"
                            )
                          }
                          disabled={
                            order.orderStatus !== "confirmed" || actionLoading
                          }
                          className="btn btn-xs btn-secondary"
                        >
                          Cooking
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(
                              "orders/onway_order",
                              { orderId: order._id },
                              "On the way"
                            )
                          }
                          disabled={
                            order.orderStatus !== "cooking" || actionLoading
                          }
                          className="btn btn-xs btn-warning"
                        >
                          On Way
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(
                              "orders/delivered_order",
                              { orderId: order._id },
                              "Delivered successfully"
                            )
                          }
                          disabled={
                            order.orderStatus !== "onway" || actionLoading
                          }
                          className="btn btn-xs btn-success"
                        >
                          Delivered
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(
                              "orders/cancel_order",
                              { orderId: order._id },
                              "Order cancelled"
                            )
                          }
                          disabled={
                            ["cooking", "onway", "delivered"].includes(
                              order.orderStatus
                            ) || actionLoading
                          }
                          className="btn btn-xs btn-error"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Expandable Row */}
                  {openRow === order._id && (
                    <tr>
                      <td colSpan="10">
                        <div className="p-4 bg-base-100 rounded-lg shadow-inner">
                          <h3 className="font-semibold text-lg mb-2">
                            Order Items
                          </h3>

                          <div className="grid md:grid-cols-3 gap-4">
                            {order.cartItems?.map((item) => (
                              <div
                                key={item._id}
                                className="card bg-base-200 p-3"
                              >
                                <img src={item.image} className="rounded-lg" />
                                <h4 className="font-semibold mt-2">
                                  {item.name}
                                </h4>
                                <p className="text-sm">Qty: {item.piece}</p>
                                <p className="text-sm">
                                  Price: ৳{item.total_price}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <div className="text-center py-8 text-gray-600">No orders found.</div>
        )}
      </div>
    </div>
  );
};

export default OrdersForAdmin;
