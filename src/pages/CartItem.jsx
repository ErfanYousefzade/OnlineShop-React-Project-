import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../Contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import Products from "../components/Products";
import useCart from "../Stores/useCart";

export default function CartItem() {
  const { cart, add, remove, clear, removepack } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const cartProducts = cart
    .map((cartItem) => {
      const product = products.find((p) => p.id === cartItem.id);
      if (!product) return null;
      return {
        ...product,
        quantity: cartItem.quantity,
      };
    })
    .filter(Boolean);

  const subtotal = cartProducts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount = subtotal * 0.1;
  const shipping = subtotal > 0 && subtotal - discount > 50 ? 0 : 4.99;
  const total = subtotal - discount + shipping;
  const itemCount = cartProducts.reduce((n, item) => n + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F6F3] flex flex-col items-center justify-center px-4 text-center">
        <div className="relative">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-[#E8D5C4] to-[#F0E6D3] rounded-full flex items-center justify-center">
            <span className="text-6xl md:text-7xl opacity-60">🛒</span>
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 md:w-10 md:h-10 bg-[#C4A882] rounded-full flex items-center justify-center text-white text-xs md:text-sm font-light">
            0
          </div>
        </div>
        <h1 className="mt-6 md:mt-8 text-xl md:text-2xl font-light text-[#2D2A24] tracking-wide">
          سبد خرید شما خالی است
        </h1>
        <p className="mt-2 md:mt-3 text-xs md:text-sm text-[#A89F94] max-w-sm leading-relaxed">
          برای شروع خرید، محصولات مورد علاقه‌تان را مرور کنید.
        </p>
        <Link
          to="/Products"
          className="mt-6 md:mt-8 px-8 md:px-10 py-3 md:py-3.5 bg-[#2D2A24] text-[#F8F6F3] text-xs md:text-sm font-light tracking-wide hover:bg-[#C4A882] transition-all duration-300"
        >
          مشاهده محصولات
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F6F3] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 md:w-10 md:h-10 border border-[#C4A882] rounded-full animate-spin border-t-[#2D2A24]"></div>
          <span className="text-xs md:text-sm text-[#A89F94] font-light">
            بارگذاری...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F6F3]">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 md:py-10">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E8E0D8] pb-4 md:pb-6 mb-6 md:mb-10 gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-light text-[#2D2A24] tracking-wide">
              سبد خرید
            </h1>
            <p className="text-xs md:text-sm text-[#A89F94] mt-1 font-light">
              {itemCount} کالا در سبد شما
            </p>
          </div>
          <Link
            to="/Products"
            className="text-xs md:text-sm text-[#A89F94] hover:text-[#2D2A24] transition-colors font-light flex items-center gap-1 md:gap-2 shrink-0"
          >
            <span>ادامه خرید</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="md:w-4 md:h-4"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-10">
          {/* ============ ITEM LIST ============ */}
          <div className="lg:col-span-2 space-y-3 md:space-y-4">
            <AnimatePresence initial={false}>
              {cartProducts.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-3 md:p-5 flex items-center gap-3 md:gap-6 border border-[#F0EAE3]"
                >
                  {/* image */}
                  <Link
                    to={`/single-product/${item.id}`}
                    className="shrink-0 w-16 h-16 md:w-20 md:h-20 bg-[#F8F6F3] rounded-lg grid place-items-center overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-[70%] max-w-[70%] object-contain opacity-80"
                    />
                  </Link>

                  {/* info */}
                  <div className="flex-1 min-w-0">
                    <Link to={`/single-product/${item.id}`}>
                      <h2 className="text-sm md:text-base font-light text-[#2D2A24] line-clamp-1 hover:text-[#C4A882] transition-colors">
                        {item.title}
                      </h2>
                    </Link>
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-1">
                      <span className="text-[10px] md:text-xs text-[#A89F94] bg-[#F8F6F3] px-2 md:px-2.5 py-0.5 rounded">
                        {item.category}
                      </span>
                      <span className="text-xs md:text-sm font-light text-[#2D2A24]">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* quantity controls - responsive */}
                  <div className="flex items-center gap-2 md:gap-4 shrink-0">
                    <div className="flex items-center border border-[#E8E0D8] rounded">
                      <button
                        onClick={() => remove(+item.id)}
                        className="w-6 h-6 md:w-8 md:h-8 grid place-items-center text-[#A89F94] hover:text-[#2D2A24] transition-colors text-base md:text-lg font-light"
                      >
                        −
                      </button>
                      <span className="w-6 md:w-8 text-center text-xs md:text-sm font-light text-[#2D2A24]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => add(+item.id)}
                        className="w-6 h-6 md:w-8 md:h-8 grid place-items-center text-[#A89F94] hover:text-[#2D2A24] transition-colors text-base md:text-lg font-light"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs md:text-sm font-light text-[#2D2A24] min-w-[50px] md:min-w-[70px] text-right hidden sm:block">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>

                    <button
                      onClick={() => removepack(+item.id)}
                      className="text-[#D4CBC2] hover:text-[#C4A882] transition-colors"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="md:w-4 md:h-4"
                      >
                        <path d="M3 6h18" strokeLinecap="round" />
                        <path
                          d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* ============ ORDER SUMMARY ============ */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-lg shadow-sm p-5 md:p-7 border border-[#F0EAE3]">
                <div className="flex items-center gap-3 mb-6 md:mb-7">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#F8F6F3] rounded-full flex items-center justify-center text-[#2D2A24] font-light text-base md:text-lg">
                    {itemCount}
                  </div>
                  <div>
                    <h2 className="text-sm md:text-base font-light text-[#2D2A24]">
                      خلاصه سفارش
                    </h2>
                    <p className="text-[10px] md:text-xs text-[#A89F94] font-light">
                      جزئیات پرداخت
                    </p>
                  </div>
                </div>

                <dl className="space-y-2 md:space-y-3 text-xs md:text-sm">
                  <div className="flex justify-between py-1.5 md:py-2 border-b border-[#F0EAE3]">
                    <dt className="text-[#A89F94] font-light">جمع جزء</dt>
                    <dd className="font-light text-[#2D2A24]">
                      ${subtotal.toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex justify-between py-1.5 md:py-2 border-b border-[#F0EAE3]">
                    <dt className="text-[#A89F94] font-light">تخفیف</dt>
                    <dd className="font-light text-[#C4A882]">
                      −${discount.toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex justify-between py-1.5 md:py-2 border-b border-[#F0EAE3]">
                    <dt className="text-[#A89F94] font-light">هزینه ارسال</dt>
                    <dd className="font-light">
                      {shipping === 0 ? (
                        <span className="text-[#C4A882]">رایگان</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </dd>
                  </div>
                </dl>

                <div className="mt-4 md:mt-5 pt-4 md:pt-5 border-t-2 border-[#F0EAE3]">
                  <div className="flex justify-between items-center">
                    <span className="text-xs md:text-sm font-light text-[#A89F94]">
                      جمع کل
                    </span>
                    <span className="text-xl md:text-2xl font-light text-[#2D2A24] tracking-wide">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {shipping > 0 && (
                  <p className="mt-3 md:mt-4 text-[10px] md:text-xs text-[#A89F94] text-center font-light">
                    ${(50 - (subtotal - discount)).toFixed(2)} تا ارسال رایگان
                  </p>
                )}

                <button className="w-full mt-5 md:mt-6 bg-[#2D2A24] text-[#F8F6F3] py-3 md:py-3.5 text-xs md:text-sm font-light tracking-wide hover:bg-[#C4A882] transition-all duration-300">
                  ادامه فرایند خرید
                </button>

                <button
                  onClick={clear}
                  className="w-full mt-2 md:mt-3 text-[10px] md:text-xs text-[#A89F94] hover:text-[#2D2A24] py-1.5 md:py-2 transition-colors font-light"
                >
                  پاک کردن سبد خرید
                </button>
              </div>

              {/* trust badges */}
              <div className="mt-4 md:mt-5 flex flex-wrap justify-center gap-4 md:gap-6 text-[10px] md:text-xs text-[#A89F94] font-light">
                <span className="flex items-center gap-1 md:gap-1.5">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="md:w-3.5 md:h-3.5"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path
                      d="M9 12l2 2 4-4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  پرداخت امن
                </span>
                <span className="hidden sm:block w-px h-4 bg-[#E8E0D8]"></span>
                <span className="flex items-center gap-1 md:gap-1.5">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="md:w-3.5 md:h-3.5"
                  >
                    <path d="M20 12H4M12 4v16" strokeLinecap="round" />
                  </svg>
                  ضمانت بازگشت
                </span>
                <span className="hidden sm:block w-px h-4 bg-[#E8E0D8]"></span>
                <span className="flex items-center gap-1 md:gap-1.5">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="md:w-3.5 md:h-3.5"
                  >
                    <path
                      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  ارسال سریع
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
