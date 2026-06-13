import { Link } from "react-router-dom";

export default function Products({
  title,
  image,
  price,
  id,
  description,
}) {
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
        <p className="px-3 mt-2 text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
          {description}
        </p>

        {/* PRICES */}
        <div className="mt-auto px-3 pb-2">
          <p className="text-red-500 line-through text-sm">
            ${price}
          </p>

          <p className="text-green-500 font-bold text-base">
            ${(price - price * 0.1).toFixed(2)}
          </p>
        </div>

        {/* BUTTON */}
        <div className="px-3 pb-4">
          <button
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
            Buy Now
          </button>
        </div>
      </div>
    </Link>
  );
}