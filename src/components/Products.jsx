import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import CartContext from "../Contexts/CartContext";

export default function Products({
  title,
  image,
  price,
  id,
  description,
}) {
  const { Cart, addToCart } = useContext(CartContext);
  const [displayNumber, setDisplayNumber] = useState(0);

  useEffect(() => {
    const number = Cart.find((item) => item.id === id)?.quantity;

    if (number) {
      setDisplayNumber(number);
    } 
  }, [Cart, id]);

  return (
    <Link to={`/single-product/${id}`}>
      <div
        className="
        group
        bg-white text-black
        shadow-xl
        rounded-xl
        overflow-hidden
        flex flex-col
        h-full
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-2xl
      "
      >
        {/* IMAGE */}
        <div className="overflow-hidden">
          <img
            src={image}
            alt={title}
            className="
              w-full h-[250px] md:h-[300px]
              object-contain
              bg-white
              p-3
              transition-transform duration-300
              group-hover:scale-105
            "
          />
        </div>

        {/* TITLE */}
        <h4 className="mt-3 px-3 font-bold line-clamp-2 text-sm md:text-base">
          {title}
        </h4>

        {/* DESCRIPTION */}
        <p className="px-3 mt-2 text-gray-600 text-sm line-clamp-2">
          {description}
        </p>

        {/* PRICES */}
        <div className="mt-auto px-3 pb-2">
          <p className="text-red-500 line-through text-sm">${price}</p>

          <p className="text-green-500 font-bold text-base">
            ${(price - price * 0.1).toFixed(2)}
          </p>
        </div>

        {/* BUTTONS */}
        <div className="px-3 pb-4">
          {displayNumber > 0 ? (
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(id);
                }}
                className="border bg-green-400 px-4 py-2"
              >
                +
              </button>

              <span>{displayNumber}</span>

              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="border bg-red-400 px-4 py-2"
              >
                -
              </button>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(id);
              }}
              className="
                w-full
                bg-blue-600
                text-white
                py-2
                rounded-lg
                transition-all duration-300
                hover:bg-blue-700
                hover:scale-[1.02]
                active:scale-95
              "
            >
              buy now
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}