import React, { useContext } from "react";
import { FiShoppingCart } from "react-icons/fi";
import CartContext from "../../contexts/CartContext";
import { useNavigate } from "react-router";

const CartIndicatorInNavbar = () => {

  const {cart} = useContext(CartContext);
  const navigate = useNavigate()

  return (
    cart.length > 0 && <div className="dropdown dropdown-end"  onClick={() => navigate('/cart')}>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-wide navbar-end" >
        <div className="indicator">
          <FiShoppingCart size={24} />
          <span className="badge badge-xs indicator-item badge-success">{cart.length}</span> 
        </div>
      </div>
    </div>
  );
};

export default CartIndicatorInNavbar;
