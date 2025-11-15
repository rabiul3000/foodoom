import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";

import useOrdersActions from "../../hooks/useOrdersAction";
import LargeLoading from "../../utils/LargeLoading";
import OrdersTableUser from "../../components/Tables/OrdersTableUser";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [selectedButton, setSelectedButton] = useState(null);
  const filterKeyWords = [
    "oldest",
    "latest",
    "pending",
    "confirmed",
    "delivered",
    "cancelled",
    "paid",
    "unpaid",
    "all",
  ];

  const { getAllOrders, orders, loading, filterArr } = useOrdersActions();

  useEffect(() => {
    getAllOrders(user);
  }, [user, getAllOrders]);

  return (
    <div className="w-11/12 mx-auto flex flex-col gap-8">
      <div className="text-center">
        <header className="text-2xl">All Orders</header>
      </div>

      <div className="flex flex-col gap-2">
        <div>
          <h1 className="font-bold text-gray-800">Filters</h1>
        </div>

        <div className="flex gap-2">
          {filterKeyWords.map((item) => (
            <button
              key={item}
              className={`btn capitalize btn-xs btn-neutral ${
                selectedButton === item ? "btn-active" : "btn-outline"
              }`}
              onClick={() => {
                filterArr(item);
                setSelectedButton(item);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <LargeLoading />
      ) : (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 lg:mb-24">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Trans.ID</th>
                <th>Total Amount</th>
                <th>Payment Status</th>
                <th>Payment Method</th>
                <th>Order Status</th>
                <th>Order At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <OrdersTableUser key={order._id} order={order} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
