import { useQuery } from "@tanstack/react-query";
import React from "react";
import { axiosSecure } from "../../axios/axiosSecure";
import { FiLoader, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { MdOutlineFastfood } from "react-icons/md";

const OrdersForAdmin = () => {
  const {
    data = [],
    error,
    isLoading,
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

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-3 mt-16">
        <FiLoader className="animate-spin text-4xl text-primary" />
        <p className="text-lg font-medium text-gray-600">Loading Orders...</p>
      </div>
    );
  }

  // Error UI
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
        <h1 className="text-2xl font-bold">All Orders (Admin View)</h1>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((order, index) => (
              <tr key={order?._id}>
                <th>{index + 1}</th>
                <td className="font-semibold">{order?._id}</td>
                <td>{order?.customerName || "N/A"}</td>
                <td className="font-semibold">${order?.amount || 0}</td>

                <td>
                  {order?.paymentStatus === "paid" ? (
                    <span className="badge badge-success gap-1">
                      <FiCheckCircle /> Paid
                    </span>
                  ) : (
                    <span className="badge badge-warning">Pending</span>
                  )}
                </td>

                <td>
                  <span
                    className={`badge ${
                      order?.status === "delivered"
                        ? "badge-success"
                        : order?.status === "processing"
                        ? "badge-info"
                        : order?.status === "cancelled"
                        ? "badge-error"
                        : "badge-neutral"
                    }`}
                  >
                    {order?.status || "Unknown"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
