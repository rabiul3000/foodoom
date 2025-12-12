import React from "react";

const OrderItemForAdmin = ({
  item: {
    _id,
    userId: { uid, email, name, photoURL },
    cartItems,
    totalAmount,
    paymentStatus,
    orderStatus,
    createdAt,
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
  },
}) => {
  return (
    <div className="p-4 border-t border-gray-200 items-center grid grid-cols-5">
      <div>{_id}</div>
      <div className="flex">
        <div className="rounded-full flex items-center">
          <img
            className="w-full rounded-full object-contain"
            src={photoURL}
            alt="user"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        </div>
        <div>
          <p>{email}</p>
        </div>
      </div>
      <div>
        <p>{paymentStatus}</p>
      </div>
      <div>
        <p> {createdAt} </p>
      </div>
    </div>
  );
};

export default OrderItemForAdmin;
