import { useNavigate } from "react-router";
import { axiosPublic } from "../axios/axiosPublic";
import { useCallback, useState } from "react";
import { successAlert } from "../utils/alert";

const useOrdersActions = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]); // master copy

  // const getAllOrders = async (user) => {
  //   try {
  //     setLoading(true);
  //     const { data } = await axiosPublic.get(`orders/${user?.id}`);
  //     if (data) {
  //       console.log(data);
  //       setOrders(data);
  //       setAllOrders(data); // store master copy
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getAllOrders = useCallback(async (user) => {
    try {
      setLoading(true);
      const { data } = await axiosPublic.get(`orders/${user?.id}`);
      if (data) {
        console.log(data);
        setOrders(data);
        setAllOrders(data); // store master copy
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const showOrder = (order) =>
    navigate(`/orders/${order._id}`, { state: order });

  const deleteOrder = async (order) => {
    const { data, status } = await axiosPublic.delete(`/orders/${order._id}`);
    if (status === 200) {
      successAlert("Order deleted");
      const id = data.deletedOrder._id;
      setOrders((prev) => prev.filter((item) => item._id !== id));
      setAllOrders((prev) => prev.filter((item) => item._id !== id));
    }
  };

  const payOrder = async (order) => {
    try {
      const { data } = await axiosPublic.post("/payments", {
        orderId: order._id,
      });
      console.log(data)
      if (data) window.location.href = data.url;
    } catch (error) {
      console.log(error.message);
    }
  };

  // Filter function
  const filterArr = (status) => {
    if (status === "all") {
      setOrders(allOrders);
    } else {
      setOrders(allOrders.filter((item) => item.orderStatus === status));
    }
    if (status === "paid" || status === "unpaid")
      setOrders(allOrders.filter((item) => item.paymentStatus === status));
    if (status === "latest")
      setOrders(() =>
        [...allOrders].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
    if (status === "oldest")
      setOrders(() =>
        [...allOrders].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        )
      );
  };

  return {
    deleteOrder,
    payOrder,
    showOrder,
    getAllOrders,
    loading,
    orders,
    setOrders,
    filterArr,
  };
};

export default useOrdersActions;
