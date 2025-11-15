import { useContext } from "react";
import CartContext from "../../contexts/CartContext";
import { errorAlert } from "../../utils/alert";

const AddToCartButton = ({ food }) => {
  const { cart, setCart } = useContext(CartContext);

  const handleAddToCart = () => {
    const isExist = cart.find((c) => c._id === food._id);
    if (!isExist) {
      setCart((prev) => [...prev, food]);
    } else {
      errorAlert("item already added");
    }
  };

  return (
    <button
      className="btn btn-sm btn-secondary rounded-full px-4"
      onClick={handleAddToCart}
    >
      Add To Cart
    </button>
  );
};

export default AddToCartButton;
