import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { axiosSecure } from "../../axios/axiosSecure";
import { format } from "date-fns";
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

const OrdersForAdmin = () => {
  const [openRow, setOpenRow] = useState(null);

  const {
    data = [],
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", "all_orders_admin"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("orders/all_orders_admin");
        return res.data;
      } catch (err) {
        console.error("❌ Error fetching all orders for admin:", err);
      }
    },
    refetchOnWindowFocus: false,
  });

  // ---- Action Functions (EMPTY) ----
  const handleApproveOrder = (orderId) => {};
  const handleCancelOrder = (orderId) => {};
  const handleMarkDelivered = (orderId) => {};

  // ---- Loading UI ----
  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-3 mt-16">
        <FiLoader className="animate-spin text-4xl text-primary" />
        <p className="text-lg">Loading Orders...</p>
      </div>
    );
  }

  // ---- Error UI ----
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
      <div className="flex items-center gap-2 mb-5">
        <MdOutlineFastfood className="text-3xl text-primary" />
        <h1 className="text-2xl font-bold">All Orders</h1>

        <button
          className="btn btn-sm btn-primary btn-soft ml-auto"
          onClick={() => refetch()}
        >
          Refresh
        </button>
      </div>
      <div className="p-5 flex gap-2 ">
        <button className="btn btn-sm btn-neutral">Today</button>
        <button className="btn btn-sm btn-neutral">Yesterday</button>
        <button className="btn btn-sm btn-neutral">Pending</button>
        <button className="btn btn-sm btn-neutral">Paid</button>
        <button className="btn btn-sm btn-neutral">Unpaid</button>
        <button className="btn btn-sm btn-neutral">Confirmed</button>
        <button className="btn btn-sm btn-neutral">Delivered</button>
      </div>

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
            {data?.map((order, index) => {
              const totalItems = order?.cartItems?.length || 0;
              const totalPieces = order?.cartItems?.reduce(
                (sum, item) => sum + item.piece,
                0
              );

              return (
                <React.Fragment key={order?._id}>
                  {/* Main Row */}
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

                    <td className="font-semibold">{order?._id}</td>

                    {/* Avatar + Name + Email + Link */}
                    <td>
                      <Link
                        to={`/admin/user/${order?.userId?._id}`}
                        className="flex items-center gap-3 hover:opacity-80 transition"
                      >
                        <div className="avatar">
                          <div className="w-10 rounded-full">
                            <img
                              src={order?.userId?.photoURL}
                              alt={order?.userId?.name}
                            />
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold">{order?.userId?.name}</p>
                          <p className="text-xs text-gray-500">
                            {order?.userId?.email}
                          </p>
                        </div>
                      </Link>
                    </td>

                    {/* Total Items & Pieces */}
                    <td>
                      <p className="font-semibold">{totalItems} items</p>
                      <p className="text-xs text-gray-500">{totalPieces} pcs</p>
                    </td>

                    {/* Amount */}
                    <td className="font-semibold">${order?.totalAmount}</td>

                    {/* Payment Status */}
                    <td>
                      {order?.paymentStatus === "paid" ? (
                        <span className="badge badge-success gap-1">
                          <FiCheckCircle /> Paid
                        </span>
                      ) : (
                        <span className="badge badge-warning gap-1">
                          <FiXCircle /> Unpaid
                        </span>
                      )}
                    </td>

                    {/* Order Status */}
                    <td>
                      <span
                        className={`badge ${
                          order?.orderStatus === "delivered"
                            ? "badge-success"
                            : order?.orderStatus === "processing"
                            ? "badge-info"
                            : order?.orderStatus === "cancelled"
                            ? "badge-error"
                            : "badge-neutral"
                        }`}
                      >
                        {order?.orderStatus}
                      </span>
                    </td>

                    {/* Created Date */}
                    <td className="text-sm">
                      {format(order?.createdAt, "MMM dd, h:mm a")}
                    </td>

                    {/* Action Buttons - PERFECT CENTER ALIGN */}
                    <td>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleApproveOrder(order?._id)}
                          className="btn btn-xs btn-info"
                        >
                          Confirmed
                        </button>
                        <button
                          onClick={() => handleApproveOrder(order?._id)}
                          className="btn btn-xs btn-info"
                        >
                          Cooking
                        </button>

                        <button
                          onClick={() => handleApproveOrder(order?._id)}
                          className="btn btn-xs btn-info"
                        >
                          On way
                        </button>

                        <button
                          onClick={() => handleMarkDelivered(order?._id)}
                          className="btn btn-xs btn-success"
                        >
                          <FiTruck /> Delivered
                        </button>

                        <button
                          onClick={() => handleCancelOrder(order?._id)}
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
                            {order?.cartItems?.map((item) => (
                              <div
                                key={item._id}
                                className="card bg-base-200 shadow-sm p-3"
                              >
                                <figure>
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full rounded-lg"
                                  />
                                </figure>
                                <div className="mt-2">
                                  <h4 className="font-semibold">{item.name}</h4>
                                  <p className="text-sm text-gray-600">
                                    Qty: {item.piece}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    Price: ${item.total_price}
                                  </p>
                                </div>
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

        {/* No Orders */}
        {data?.length === 0 && (
          <div className="text-center py-8 text-gray-600">
            <p>No orders found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersForAdmin;
