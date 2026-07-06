import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import CartContext from "../Contexts/CartContext";

export default function Products({
  title,
  image,
  price,
  id,
  description,
  category,
}) {
  const { cart, Dispatch } = useContext(CartContext);
  const [displayNumber, setDisplayNumber] = useState(0);

  useEffect(() => {
    const number = cart.find((item) => item.id === id)?.quantity;
    setDisplayNumber(number || 0);
  }, [cart, id]);

  const finalPrice = (price - price * 0.1).toFixed(2);

  return (
    <Link to={`/single-product/${id}`}>
      <div
        className="
          group
          h-full
          flex flex-col
          overflow-hidden
          rounded-xl
          border
          border-gray-200
          bg-white
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
        "
      >
        {/* IMAGE */}
        <div className="relative flex items-center justify-center bg-gray-100 h-36 sm:h-48 lg:h-64 p-2 sm:p-4">
          <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full">
            10% OFF
          </span>

          <img
            src={image}
            alt={title}
            className="
              max-h-full
              max-w-full
              object-contain
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />
        </div>

        {/* CONTENT */}
        <div className="flex flex-col flex-1 p-3 sm:p-4">
          {/* CATEGORY */}
          <span className="w-fit text-[10px] sm:text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded-full capitalize mb-2">
            {category}
          </span>

          {/* TITLE */}
          <h3 className="font-bold text-sm sm:text-base lg:text-[17px] text-gray-800 line-clamp-2 min-h-[42px] sm:min-h-[50px]">
            {title}
          </h3>

          {/* DESCRIPTION */}
          <p className="text-gray-500 text-xs sm:text-sm mt-2 line-clamp-2 min-h-[34px] sm:min-h-[40px]">
            {description}
          </p>

          {/* PRICE */}
          <div className="mt-4">
            <p className="text-xs sm:text-sm text-gray-400 line-through">
              ${price}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-1">
              <p className="text-lg sm:text-2xl font-bold text-green-600">
                ${finalPrice}
              </p>

              <span className="self-start sm:self-auto text-[10px] sm:text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold whitespace-nowrap">
                Save 10%
              </span>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="mt-auto pt-4">
            {displayNumber > 0 ? (
              <div className="flex items-center justify-between">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    Dispatch({
                      type: "decrease",
                      payload: +id,
                    });
                  }}
                  className="
                    w-8 h-8
                    sm:w-11 sm:h-11
                    rounded-full
                    bg-red-500
                    text-white
                    text-lg
                    transition
                    hover:bg-red-600
                  "
                >
                  −
                </button>

                <span className="text-lg sm:text-2xl font-bold">
                  {displayNumber}
                </span>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    Dispatch({
                      type: "add",
                      payload: +id,
                    });
                  }}
                  className="
                    w-8 h-8
                    sm:w-11 sm:h-11
                    rounded-full
                    bg-green-500
                    text-white
                    text-lg
                    transition
                    hover:bg-green-600
                  "
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  Dispatch({
                    type: "add",
                    payload: +id,
                  });
                }}
                className="
                  w-full
                  rounded-lg
                  bg-gradient-to-r
                  from-blue-600
                  to-indigo-600
                  py-2.5
                  text-sm
                  sm:text-base
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  hover:shadow-lg
                "
              >
                Buy Now
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}