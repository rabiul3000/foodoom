import { useState } from "react";
import CartContext from "../contexts/CartContext";

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const increamentPieceOfItemInCart = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item._id === id) {
          let newPiece = item.piece + 1;

          return {
            ...item,
            piece: newPiece,
            total_price: item.unit_price * newPiece,
          };
        }
        return item;
      })
    );
  };

  const decreamentPieceOfItemInCart = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item._id === id && item.piece > 1) {
          let newPiece = item.piece - 1;
          return {
            ...item,
            piece: newPiece,
            total_price: item.unit_price * newPiece,
          };
        }
        return item;
      })
    );
  };

  const deleteItemFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const emptyCart = () => {
    setCart([]);
  };
  
  const cartInfo = {
    cart,
    setCart,
    increamentPieceOfItemInCart,
    decreamentPieceOfItemInCart,
    deleteItemFromCart,
    emptyCart,
  };

  return (
    <CartContext.Provider value={cartInfo}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
