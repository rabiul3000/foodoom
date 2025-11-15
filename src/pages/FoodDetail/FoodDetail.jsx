// import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { FaStar, FaUtensils, FaLeaf } from "react-icons/fa";
import AddToCartButton from "../../components/Cart/AddToCartButton";
import { useEffect, useState } from "react";
import { axiosPublic } from "../../axios/axiosPublic";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const FoodDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [foodData, setFoodData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSingleFood = async () => {
      try {
        setLoading(true);
        const { data } = await axiosPublic(`/foods/${id}`);
        setFoodData(data);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    getSingleFood();
  }, [id]);

  // const handleSSLCommerzPayment = async () => {
  //   const res = await axios.post("http://localhost:3030/order", {
  //     amount: state?.price,
  //   });
  //   window.location.replace(res?.data?.url);
  // };

  console.log(foodData);

  return (
    <div className="flex justify-center items-center py-12">
      {loading ? (
        <div className="flex w-1/3 flex-col gap-4">
          <div className="skeleton h-96 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      ) : (
        <article className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border border-base-200 rounded-2xl overflow-hidden">
          {/* Image Section */}
          <figure className="relative h-96 w-full bg-base-200 overflow-hidden">
            <img
              src={foodData?.image}
              alt={foodData?.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {/* Category Badge */}
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-primary text-primary-content px-2 py-1 rounded-full text-xs font-semibold uppercase">
              <FaUtensils className="text-sm" />
              {foodData?.category}
            </div>
            {/* Rating Badge */}
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-base-100/80 backdrop-blur-md px-2 py-1 rounded-full">
              <FaStar className="text-yellow-400" />
              <span className="text-sm font-semibold text-gray-700">
                {foodData?.rating}
              </span>
            </div>
          </figure>

          {/* Content Section */}
          <div className="card-body p-4">
            <h2 className="card-title text-lg font-bold text-base-content line-clamp-1">
              {foodData?.name}
            </h2>
            <p className="text-sm text-gray-500 line-clamp-2">
              {foodData?.description}
            </p>

            {/* Ingredients Tags */}
            {foodData?.ingredients && foodData?.ingredients.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {foodData?.ingredients.map((item, index) => (
                  <span
                    key={index}
                    className="badge badge-outline badge-sm gap-1 flex items-center"
                  >
                    <FaLeaf className="text-success text-xs" />
                    {item}
                  </span>
                ))}
              </div>
            )}

            {/* Price and Button */}
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-1 text-primary font-semibold text-lg">
                <FaBangladeshiTakaSign />
                {foodData?.unit_price?.toFixed(2)}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(-1)}
                  className="btn btn-sm btn-ghost btn-soft rounded-full px-4"
                >
                  Back
                </button>
                <AddToCartButton food={foodData} />
              </div>
            </div>
          </div>
        </article>
      )}
    </div>
  );
};

export default FoodDetail;
