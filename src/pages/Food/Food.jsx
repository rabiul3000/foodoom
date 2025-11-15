import React from "react";
import { Link } from "react-router";
import { FaStar, FaUtensils, FaLeaf } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import AddToCartButton from "../../components/Cart/AddToCartButton";

const Food = ({ food }) => {
  const {
    _id,
    category,
    description,
    image,
    ingredients,
    name,
    unit_price,
    rating,
  } = food;

  return (
    <article className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border border-base-200 rounded-2xl overflow-hidden">
      {/* Image Section */}
      <figure className="relative aspect-[4/3] bg-base-200 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-primary text-primary-content px-2 py-1 rounded-full text-xs font-semibold uppercase">
          <FaUtensils className="text-sm" />
          {category}
        </div>
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-base-100/80 backdrop-blur-md px-2 py-1 rounded-full">
          <FaStar className="text-yellow-400" />
          <span className="text-sm font-semibold text-gray-700">{rating}</span>
        </div>
      </figure>

      {/* Content Section */}
      <div className="card-body p-4">
        <h2 className="card-title text-lg font-bold text-base-content line-clamp-1">
          {name}
        </h2>
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>

        {/* Ingredients Tags */}
        {ingredients && ingredients.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {ingredients.slice(0, 4).map((item, index) => (
              <span
                key={index}
                className="badge badge-outline badge-sm gap-1 flex items-center"
              >
                <FaLeaf className="text-success text-xs" />
                {item}
              </span>
            ))}
            {ingredients.length > 4 && (
              <span className="badge badge-ghost badge-sm">
                +{ingredients.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Price and Button */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-1 text-primary font-semibold text-lg">
            <FaBangladeshiTakaSign />
            {unit_price?.toFixed(2)}
          </div>
          <div className="flex gap-2">
            <Link
              to={`/foods/${_id}`}
              className="btn btn-sm btn-primary rounded-full px-4"
            >
              View Details
            </Link>

            <AddToCartButton food={food} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default Food;
