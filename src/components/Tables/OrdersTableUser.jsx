import { format } from "date-fns";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";

const OrdersTableUser = ({ order, deleteOrder, showOrder, payOrder }) => {
  const {
    _id,
    transactionId,
    totalAmount,
    paymentStatus,
    cardIssuer,
    orderStatus,
    createdAt,
  } = order;

  return (
    <tr>
      <td className="text-gray-500 font-semibold"> {_id} </td>
      <td className="text-gray-500 font-semibold">{transactionId || "-"}</td>
      <td className="font-bold">{totalAmount}</td>
      <td>
        <button
          className={`btn btn-${
            paymentStatus !== "paid" ? "error" : "success"
          } btn-soft btn-sm`}
        >
          {paymentStatus}
        </button>
      </td>
      <td>
        <button className="btn btn-ghost btn-soft btn-sm">
          {cardIssuer || "-"}
        </button>
      </td>
      <td>
        <button className="btn btn-sm btn-warning btn-soft">
          {orderStatus}
        </button>
      </td>
      <td>
        <span className="font-semibold">
          {format(new Date(createdAt), "MMM dd, yy")}
        </span>
        <span className="text-xs text-gray-500">
          {format(new Date(createdAt), " hh:mm a")}{" "}
        </span>
      </td>
      <td className="flex gap-1">
        <button
          className="btn pay_order btn-sm btn-soft btn-neutral"
          disabled={paymentStatus === "paid"}
          onClick={() => {
            payOrder(order);
          }}
        >
          Pay Now
        </button>
        <button
          className="btn show_order btn-sm text-lg btn-square text-neutral"
          onClick={() => showOrder(order)}
        >
          <IoEyeOutline />
        </button>
        <button
          className="btn delete_order btn-sm text-lg btn-square text-error"
          onClick={() => deleteOrder(order._id)}
        >
          <RiDeleteBinLine />
        </button>
      </td>
    </tr>
  );
};

export default OrdersTableUser;
