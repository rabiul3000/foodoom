import React from "react";
import { format } from "timeago.js";
import dateFormat from "../../utils/dateFormat";
import { CiCircleMore } from "react-icons/ci";
import { Link } from "react-router";

const TableRowForAdmin = ({ item }) => {
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
  } = item;

  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={photoURL} alt="avatar" referrerPolicy="no-referrer" />
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
          <Link to={`/order/${_id}`} state={item}>
            {_id}
          </Link>
        </div>
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
            } btn-active`}dateTime
          >
            {orderStatus}
          </button>
        </div>
      </td>

      <td>
        <div>
          <button className="btn btn-circle btn-ghost text-2xl">
            <CiCircleMore />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRowForAdmin;
