import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CartContext from "../Contexts/CartContext";
import { motion } from "framer-motion";

export default function SingelProduct() {
  const [data, setData] = useState({});
  const { id } = useParams();
  const { Cart, addToCart } = useContext(CartContext);
  const [displaynumber, SetDisplaynumber] = useState(0);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [id]);

  useEffect(() => {
    const number = Cart.find((item) => item.id == id)?.quantity;
    if (number) {
      SetDisplaynumber(number);
    }
  }, [Cart, id]);

  const price = Number(data.price || 0);
  const discountPrice = (price - price * 0.1).toFixed(2);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          w-full
          md:w-[520px]
          bg-white
          rounded-3xl
          shadow-xl
          p-6
          border border-slate-100
        "
      >
        {/* IMAGE */}
        <div className="bg-slate-50 rounded-2xl p-4">
          <img
            src={data.image}
            alt={data.title}
            className="h-[280px] w-full object-contain hover:scale-105 transition duration-500"
          />
        </div>

        {/* TITLE */}
        <h1 className="font-bold text-lg mt-5 text-slate-800">{data.title}</h1>

        {/* DESCRIPTION */}
        <p className="mt-2 text-sm text-slate-500 line-clamp-2">
          {data.description}
        </p>

        {/* CATEGORY */}
        <p className="mt-2 text-xs text-indigo-500 font-medium">
          {data.category}
        </p>

        {/* PRICE */}
        <div className="mt-4 flex items-center gap-3">
          <span className="text-red-400 line-through text-sm">
            ${price.toFixed(2)}
          </span>

          <span className="text-green-600 font-bold text-lg">
            ${discountPrice}
          </span>
        </div>

        {/* CART CONTROLS */}
        {displaynumber > 0 ? (
          <div className="flex items-center justify-between mt-6 bg-slate-100 rounded-xl p-2">
            <button
              onClick={() => addToCart(id)}
              className="
                bg-green-500
                text-white
                w-10 h-10
                rounded-lg
                hover:bg-green-600
                transition
              "
            >
              +
            </button>

            <span className="font-bold text-slate-700">{displaynumber}</span>

            <button
              className="
                bg-red-500
                text-white
                w-10 h-10
                rounded-lg
                hover:bg-red-600
                transition
              "
            >
              -
            </button>
          </div>
        ) : (
          <button
            onClick={() => addToCart(id)}
            className="
              mt-6
              w-full
              bg-gradient-to-r
              from-indigo-600
              to-violet-600
              text-white
              py-3
              rounded-xl
              font-semibold
              hover:scale-[1.02]
              active:scale-95
              transition
              shadow-md
            "
          >
            Add to Cart
          </button>
        )}
      </motion.div>
    </div>
  );
}
