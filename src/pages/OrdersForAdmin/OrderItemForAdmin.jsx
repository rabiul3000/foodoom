const OrderItemForAdmin = ({ item }) => {
  const {
    userEmail,
    orderId,
    transactionId,
    paymentMethod,
    paymentStatus,
    orderStatus,
    createdAt,
  } = item;

  return (
    <div className="card bg-base-100 border shadow-sm">
      <div className="card-body p-4 text-sm space-y-3">

        {/* User */}
        <div className="flex justify-between gap-2">
          <span className="font-semibold">User</span>
          <span className="text-right break-all">{userEmail}</span>
        </div>

        {/* Order ID */}
        <div className="flex justify-between gap-2">
          <span className="font-semibold">Order ID</span>
          <span className="text-right">{orderId}</span>
        </div>

        {/* Transaction ID */}
        <div className="flex justify-between gap-2">
          <span className="font-semibold">Txn ID</span>
          <span className="text-right break-all">{transactionId}</span>
        </div>

        {/* Payment Method */}
        <div className="flex justify-between items-center">
          <span className="font-semibold">Payment</span>
          <span className="badge badge-info badge-sm">
            {paymentMethod}
          </span>
        </div>

        {/* Payment Status */}
        <div className="flex justify-between items-center">
          <span className="font-semibold">Payment Status</span>
          <span
            className={`badge badge-sm ${
              paymentStatus === "paid"
                ? "badge-success"
                : "badge-error"
            }`}
          >
            {paymentStatus}
          </span>
        </div>

        {/* Order Status */}
        <div className="flex justify-between items-center">
          <span className="font-semibold">Order Status</span>
          <span
            className={`badge badge-sm ${
              orderStatus === "pending"
                ? "badge-warning"
                : orderStatus === "delivered"
                ? "badge-success"
                : "badge-neutral"
            }`}
          >
            {orderStatus}
          </span>
        </div>

        {/* Time */}
        <div className="flex justify-between gap-2">
          <span className="font-semibold">Time</span>
          <span className="text-right">
            {new Date(createdAt).toLocaleString()}
          </span>
        </div>

        {/* Actions (same as table row) */}
        <div className="pt-2">
          <button className="btn btn-primary btn-sm w-full">
            Manage Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderItemForAdmin;
