import React, { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";

import LargeLoading from "../../utils/LargeLoading";
import OrdersTableUser from "../../components/Tables/OrdersTableUser";
import { axiosPublic } from "../../axios/axiosPublic";
import { errorAlert, successAlert } from "../../utils/alert";
import { filterKeyWords, tableHeaders } from "../../utils/arrays";
import { useNavigate } from "react-router";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const getAllOrders = useCallback(async (user) => {
    try {
      setLoading(true);
      const { data } = await axiosPublic.get(`orders/${user?.id}`);
      if (data) {
        console.log(data);
        setOrders(data);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllOrders(user);
  }, [user, getAllOrders]);

  const deleteOrder = async (orderId) => {
    const { data, status } = await axiosPublic.delete(`/orders/${orderId}`);
    if (status === 200) {
      console.log(data);
      const id = data.deletedOrder._id;
      setOrders((prevOrders) => prevOrders.filter((item) => item._id !== id));
      successAlert("Order deleted");
    }
  };

  const filterArr = async (status) => {
    try {
      setLoading(true);
      console.log(status);
      if (status === "all") {
        getAllOrders(user);
        return;
      }
      if (status === "latest") {
        setOrders((prev) =>
          [...prev].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
        return;
      }

      if (status === "oldest") {
        setOrders((prev) =>
          [...prev].sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          )
        );
        return;
      }

      const { data } = await axiosPublic.post("orders/filterOrders", {
        userId: user?.id,
        filterValue: status,
      });
      setOrders(data.orders);
    } catch (error) {
      errorAlert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const payOrder = async (order) => {
    try {
      const { data } = await axiosPublic.post("/payments", {
        orderId: order._id,
      });
      if (data?.url) window.location.replace(data.url);
    } catch (error) {
      console.log(error.message);
    }
  };

  const showOrder = (order) =>
    navigate(`/orders/${order._id}`, { state: order });

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
                {tableHeaders.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <OrdersTableUser
                  key={order._id}
                  order={order}
                  deleteOrder={deleteOrder}
                  payOrder={payOrder}
                  showOrder={showOrder}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
