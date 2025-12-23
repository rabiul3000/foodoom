import React from "react";
import { useLocation, useNavigate } from "react-router";
import dateFormat from "../../utils/dateFormat";
import { format } from "timeago.js";

const OrderDetailForAdmin = () => {
  const navigate = useNavigate();
  const { state: item } = useLocation();

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
    <div className="flex justify-center items-center w-11/12 mx-auto h-full flex-col gap-4">
      <div className="flex justify-center items-center w-11/12 flex-col">
        <div className="font-bold text-xl py-4 text-left w-full">
          <h1> OrderDetails </h1>
        </div>
        <div className="border border-gray-300 w-full rounded-xl">
          <div className="p-4 flex justify-between">
            <div>
              <p className="font-semibold">OrderId: {_id}</p>
              <div>
                <p className="text-gray-500"> {dateFormat(createdAt)} </p>
                <p className="text-gray-500 text-sm"> {format(createdAt)} </p>
                <button className="btn btn-xs btn-active my-2"> {orderStatus} </button>
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <div className="w-16 h-16 rounded-full">
                <img
                  src={photoURL}
                  className="object-contain w-full h-full rounded"
                  referrerPolicy="no-referrer"
                  alt="user"
                />
              </div>
              <div>
                <p>{name}</p>
                <p>{email}</p>
              </div>
            </div>
          </div>
          <div className="m-4 border-t border-gray-400"></div>
          <div className="p-4 flex flex-col gap-4">
            <h1 className="text-xl font-semibold">Order Menu</h1>
            <div className="flex flex-col gap-4">
              {cartItems.map(
                ({
                  foodId,
                  name,
                  piece,
                  unit_price,
                  total_price,
                  image,
                  _id,
                }) => (
                  <div
                    key={_id}
                    className="flex gap-4 items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-32 rounded-xl border border-orange-400 p-2">
                        <img
                          className="w-full h-full rounded-xl object-cover"
                          src={image}
                          alt={foodId}
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-lg font-semibold">{name}</p>
                        <p className="text-sm text-gray-500"> {piece} piece </p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-orange-400">
                        ৳{unit_price}
                      </h3>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="m-4 border-t border-gray-400"></div>
          <div className="px-4 pb-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">Total</h1>
            </div>
            <div>
              <h3 className="text-xl font-bold text-orange-400">
                ৳{totalAmount}
              </h3>
            </div>
          </div>
        </div>
        <div className="flex py-8 justify-start w-full gap-6">
          <button className="btn btn-outline btn-success" onClick={() => navigate(-1)}>Back</button>          
        </div>
      </div>
    </div>
  );
};

export default OrderDetailForAdmin;
