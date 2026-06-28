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

    if (number) {
      setDisplayNumber(number);
    } else {
      setDisplayNumber(0);
    }
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
          rounded-2xl
          border
          border-gray-200
          bg-white
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-2
          hover:shadow-2xl
        "
      >
        {/* IMAGE */}
        <div className="relative bg-gray-100 h-[260px] flex items-center justify-center p-5">
          {/* Discount Badge */}
          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            10% OFF
          </span>

          <img
            src={image}
            alt={title}
            className="
              h-[200px]
              object-contain
              transition-transform
              duration-500
              group-hover:scale-110
            "
          />
        </div>

        {/* CONTENT */}
        <div className="flex flex-col flex-1 p-4">

          {/* CATEGORY */}
          <span className="w-fit text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full capitalize mb-3">
            {category}
          </span>

          {/* TITLE */}
          <h3 className="font-bold text-[17px] text-gray-800 line-clamp-2 min-h-[55px]">
            {title}
          </h3>

          {/* DESCRIPTION */}
          <p className="text-gray-500 text-sm mt-2 line-clamp-2 min-h-[40px]">
            {description}
          </p>

          {/* PRICE */}
          <div className="mt-5">
            <p className="text-sm text-gray-400 line-through">
              ${price}
            </p>

            <div className="flex items-center justify-between mt-1">
              <p className="text-2xl font-bold text-green-600">
                ${finalPrice}
              </p>

              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                Save 10%
              </span>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="mt-auto pt-5">
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
                    w-11 h-11
                    rounded-full
                    bg-red-500
                    text-white
                    text-xl
                    transition
                    hover:bg-red-600
                  "
                >
                  −
                </button>

                <span className="text-2xl font-bold">
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
                    w-11 h-11
                    rounded-full
                    bg-green-500
                    text-white
                    text-xl
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
                  rounded-xl
                  bg-gradient-to-r
                  from-blue-600
                  to-indigo-600
                  py-3
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:scale-[1.03]
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