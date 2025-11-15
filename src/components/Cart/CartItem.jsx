import React, { useContext } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaPlusCircle } from "react-icons/fa";
import { FiMinusCircle } from "react-icons/fi";
import { GoPlusCircle } from "react-icons/go";
import CartContext from "../../contexts/CartContext";

const CartItem = ({ item }) => {
  const { increamentPieceOfItemInCart, decreamentPieceOfItemInCart, deleteItemFromCart } =
    useContext(CartContext);

  const handleIncrementPiece = () => {
    increamentPieceOfItemInCart(item._id);
  };

  const handleDecreamentPiece = () => {
    decreamentPieceOfItemInCart(item._id);
  };

  const handleDeleteItemFromCart = () => {
    deleteItemFromCart(item._id);
  };

  return (
    <div key={item._id} className="border rounded-2xl border-slate-200 p-2">
      <div className="p-2">
        <h3 className="font-bold text-gray-600 text-2xl py-2"> {item.name} </h3>
        <div className="flex gap-4">
          <div className="w-32 h-36">
            <img
              className="w-full h-full object-cover"
              src={item.image}
              alt={item.name}
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <p> {item.description} </p>
            </div>

            <div className="flex ">
              <div className="text-xl font-semibold text-gray-800">
                {" "}
                <p>{item.total_price}tk</p>{" "}
              </div>

              <div className="flex">
                <div>
                  {" "}
                  <button className="btn btn-circle text-xl mx-24" onClick={handleDeleteItemFromCart}>
                    <RiDeleteBin5Line />
                  </button>{" "}
                </div>
                <div>
                  {" "}
                  <button
                    className="btn btn-circle text-xl"
                    onClick={() => handleDecreamentPiece(item)}
                  >
                    <FiMinusCircle />
                  </button>{" "}
                </div>
                <div>
                  {" "}
                  <button className="btn btn-ghost text-xl">
                    {item.piece}
                  </button>{" "}
                </div>

                <div>
                  {" "}
                  <button
                    className="btn btn-circle text-xl"
                    onClick={() => handleIncrementPiece(item)}
                  >
                    <GoPlusCircle />
                  </button>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
