import React, { useState } from "react";
import { format } from "timeago.js";
import dateFormat from "../../utils/dateFormat";
import { CiCircleMore } from "react-icons/ci";
import { Link } from "react-router";

import { axiosSecure } from "../../axios/axiosSecure";
import { errorAlert } from "../../utils/alert";

const TableRowForAdmin = ({ item }) => {
  const [data, setData] = useState(item);
  const {
    _id,
    userId: { uid, email, name, photoURL },
    paymentStatus,
    orderStatus,
    createdAt,
    cartItems,
    totalAmount,
    updatedAt,
    bankTranId,
    cardIssuer,
    maskedCard,
    paymentDate,
    paymentMethod,
    riskLevel,
    storeAmount,
    transactionId,
    validationId,
  } = data;

  const [loading, setLoading] = useState(false);

  const handleMarkConfirm = async () => {
    try {
      setLoading(true);
      if (paymentStatus !== "paid") {
        errorAlert("still not paid");
        return;
      }
      const res = await axiosSecure.patch("orders/confirm_order", {
        orderId: _id,
        prevOrderStatus: orderStatus,
      });
      if (res.status === 200) {
        console.log(res);
        setData((prev) => ({
          ...prev,
          orderStatus: "confirmed",
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkCooking = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.patch("orders/cooking_order", {
        orderId: _id,
      });
      if (res.status === 200) {
        console.log(res);
        setData((prev) => ({
          ...prev,
          orderStatus: "cooking",
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleMarkOnway = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.patch("orders/onway_order", {
        orderId: _id,
      });
      if (res.status === 200) {
        console.log(res);
        setData((prev) => ({
          ...prev,
          orderStatus: "onway",
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkDeliverd = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.patch("orders/delivered_order", {
        orderId: _id,
      });
      if (res.status === 200) {
        console.log(res);
        setData((prev) => ({
          ...prev,
          orderStatus: "delivered",
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={photoURL} alt={uid} referrerPolicy="no-referrer" />
            </div>
          </div>
          <div>
            <div className="font-bold"> {name} </div>
            <div className="text-sm opacity-50"> {email} </div>
          </div>
        </div>
      </td>

      <td>
        <div>
          <Link to={`/order/${_id}`} state={data}>
            {_id}
          </Link>
        </div>
      </td>

      <td>
        <div>{transactionId || "-"}</div>
      </td>

      <td>
        <div>{cardIssuer || "-"}</div>
      </td>

      <td>
        <div>
          <button
            className={`btn btn-sm ${
              paymentStatus === "paid" ? "btn-success" : "btn-error"
            } btn-active`}
          >
            {paymentStatus}
          </button>
        </div>
      </td>

      <td>
        <div className="flex items-center font-semibold">
          <time dateTime={createdAt}>{dateFormat(createdAt)}</time>•
          <time dateTime={createdAt} className="text-xs  text-gray-500">
            {format(createdAt)}
          </time>
        </div>
      </td>

      <td>
        <div>
          <button
            className={`btn btn-sm ${
              orderStatus === "delivered"
                ? "btn-success"
                : orderStatus === "pending"
                ? "btn-ghost"
                : "btn-warning"
            } btn-active`}
            dateTime
          >
            {orderStatus}
          </button>
        </div>
      </td>

      <td>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn m-1">
            <CiCircleMore />
          </div>
          <div
            tabIndex="-1"
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm space-y-2"
          >
            {orderStatus === "pending" && (
              <button
                className={`btn btn-sm "btn-primary" btn-soft capitalize`}
                onClick={() => handleMarkConfirm()}
              >
                {loading ? (
                  <span className="loading loading-sm loading-spinner"> </span>
                ) : (
                  "confirmed"
                )}
              </button>
            )}
            {orderStatus === "confirmed" && (
              <button
                className={`btn btn-sm "btn-primary" btn-soft capitalize`}
                onClick={() => handleMarkCooking()}
              >
                {loading ? (
                  <span className="loading loading-sm loading-spinner"> </span>
                ) : (
                  "cooking"
                )}
              </button>
            )}
            {orderStatus === "cooking" && (
              <button
                className={`btn btn-sm "btn-primary" btn-soft capitalize`}
                onClick={() => handleMarkOnway()}
              >
                {loading ? (
                  <span className="loading loading-sm loading-spinner"> </span>
                ) : (
                  "onway"
                )}
              </button>
            )}
            {orderStatus === "onway" && (
              <button
                className={`btn btn-sm "btn-primary" btn-soft capitalize`}
                onClick={() => handleMarkDeliverd()}
              >
                {loading ? (
                  <span className="loading loading-sm loading-spinner"> </span>
                ) : (
                  "Delivered"
                )}
              </button>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default TableRowForAdmin;
