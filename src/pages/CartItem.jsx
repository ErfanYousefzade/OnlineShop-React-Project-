import { useContext, useEffect, useState } from "react";
import CartContext from "../Contexts/CartContext";

export default function CartItem() {
  const { Cart, addToCart, removeFromCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  // گرفتن محصولات از API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // ترکیب Cart با محصولات کامل
  const cartProducts = Cart.map((cartItem) => {
    const product = products.find(
      (p) => p.id === cartItem.id
    );

    return {
      ...product,
      quantity: cartItem.quantity,
    };
  }).filter(Boolean);

  // اگر سبد خالی بود
  if (Cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-500">
            سبد خرید خالی است
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cartProducts.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-lg p-4 flex flex-col"
          >
            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-52 object-contain"
            />

            {/* TITLE */}
            <h2 className="font-bold mt-3 line-clamp-2">
              {item.title}
            </h2>

            {/* PRICE */}
            <p className="text-green-600 font-bold mt-2">
              ${item.price}
            </p>

            {/* QUANTITY CONTROLS */}
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() => addToCart(item.id)}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                +
              </button>

              <span className="font-bold">
                {item.quantity}
              </span>

              <button
                onClick={() => removeFromCart(item.id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                -
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}