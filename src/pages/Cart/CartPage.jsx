import React, { useContext } from "react";
import CartContext from "../../contexts/CartContext";
import CartItem from "../../components/Cart/CartItem";
import CheckoutCard from "../../components/Cart/CheckoutCard";

const CartPage = () => {
  const { cart } = useContext(CartContext);

  return (
    <div>
      {cart.length ? (
        <div>
          <div className="text-center p-12 text-4xl">
            <h1>Your Cart</h1>
          </div>
          <div className="w-12/12 flex">
            <div className="card p-12 flex gap-4 w-8/12">
              {cart.map((item) => (
                <CartItem item={item} key={item._id} />
              ))}
            </div>

            <CheckoutCard />
          </div>
        </div>
      ) : (
        <div className="text-center p-12 text-4xl">
          <h1 className="text-error">No Orders Yet</h1>
        </div>
      )}
    </div>
  );
};

export default CartPage;
