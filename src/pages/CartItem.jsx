import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../Contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import Products from "../components/Products";

export default function CartItem() {
  const { cart, Dispatch } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // گرفتن محصولات از API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  // ترکیب Cart با محصولات کامل
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

  // اگر سبد خالی بود
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex flex-col items-center justify-center px-4 text-center">
        <EmptyCartIcon />
        <h1 className="mt-6 text-xl font-semibold text-[#1A1A1A]">
          سبد خرید شما خالی است
        </h1>
        <p className="mt-2 text-sm text-[#1A1A1A]/50 max-w-xs">
          هنوز چیزی به سبد خرید اضافه نکرده‌اید. وقتشه چیزی پیدا کنید که دوست
          دارید.
        </p>
        <Link
          to="/Products"
          className="mt-6 bg-[#1A1A1A] text-white text-sm font-semibold px-6 py-3 rounded-sm hover:bg-[#C1440E] transition"
        >
          مشاهده محصولات
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8]">
        <div className="flex items-center gap-3 text-[#1A1A1A]/60">
          <span className="w-2 h-2 rounded-full bg-[#C1440E] animate-pulse" />
          <span className="text-sm tracking-wide">
            در حال بارگذاری سبد خرید…
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1A1A1A]">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-8">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-2">
          <h1
            className="text-3xl font-semibold"
            style={{ fontFamily: "'Georgia', 'Vazirmatn', serif" }}
          >
            سبد خرید
          </h1>
          <span className="text-sm text-[#1A1A1A]/50">
            {itemCount} {itemCount === 1 ? "کالا" : "کالا"}
          </span>
        </div>

        {/* perforated divider */}
        <div
          className="mt-4 mb-8 h-px w-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, #D8D5CC 0, #D8D5CC 6px, transparent 6px, transparent 12px)",
          }}
        />

        <div className="grid md:grid-cols-3 gap-8">
          {/* ============ ITEM LIST ============ */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <AnimatePresence initial={false}>
              {cartProducts.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20, transition: { duration: 0.25 } }}
                  className="bg-white border border-[#E8E6E0] rounded-sm p-4 flex gap-4 items-center"
                >
                  {/* image */}
                  <Link
                    to={`/single-product/${item.id}`}
                    className="shrink-0 w-20 h-20 md:w-24 md:h-24 bg-[#FAFAF8] border border-[#E8E6E0] rounded-sm grid place-items-center overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-[80%] max-w-[80%] object-contain"
                    />
                  </Link>

                  {/* title + price */}
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.id}`}>
                      <h2 className="font-medium text-sm md:text-base text-[#1A1A1A] line-clamp-2 hover:text-[#C1440E] transition">
                        {item.title}
                      </h2>
                    </Link>
                    <p className="mt-1 text-xs text-[#1A1A1A]/40 capitalize">
                      {item.category}
                    </p>
                    <p className="mt-2 font-bold text-[#1A1A1A]">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* quantity stepper */}
                  <div className="flex items-center bg-[#FAFAF8] border border-[#E8E6E0] rounded-sm">
                    <button
                      aria-label="کاهش تعداد"
                      onClick={() =>
                        Dispatch({ type: "decrease", payload: +item.id })
                      }
                      className="w-9 h-9 grid place-items-center text-base text-[#1A1A1A]/70 hover:text-[#C1440E] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1440E] rounded-sm"
                    >
                      −
                    </button>
                    <span className="w-7 text-center font-semibold text-sm">
                      {item.quantity}
                    </span>
                    <button
                      aria-label="افزایش تعداد"
                      onClick={() =>
                        Dispatch({ type: "add", payload: +item.id })
                      }
                      className="w-9 h-9 grid place-items-center text-base text-[#1A1A1A]/70 hover:text-[#C1440E] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1440E] rounded-sm"
                    >
                      +
                    </button>
                  </div>

                  {/* line total (desktop) */}
                  <p className="hidden md:block w-20 text-right font-semibold text-sm shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  {/* delete */}
                  <button
                    aria-label="حذف از سبد خرید"
                    onClick={() =>
                      Dispatch({ type: "remove", payload: +item.id })
                    }
                    className="shrink-0 w-9 h-9 grid place-items-center text-[#1A1A1A]/40 hover:text-[#C1440E] hover:bg-[#FAFAF8] rounded-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1440E]"
                  >
                    <TrashIcon />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link
              to="/Products"
              className="mt-2 inline-flex items-center gap-2 text-sm text-[#1A1A1A]/60 hover:text-[#C1440E] transition w-fit"
            >
              <span aria-hidden>←</span> ادامه خرید
            </Link>
          </div>

          {/* ============ ORDER SUMMARY ============ */}
          <div className="md:col-span-1">
            <div className="bg-white border border-[#E8E6E0] rounded-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold mb-4">خلاصه سفارش</h2>

              <dl className="text-sm space-y-3">
                <div className="flex items-center justify-between">
                  <dt className="text-[#1A1A1A]/55">
                    جمع جزء ({itemCount} کالا)
                  </dt>
                  <dd className="font-medium">${subtotal.toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-[#1A1A1A]/55">تخفیف (۱۰٪)</dt>
                  <dd className="font-medium text-[#1F7A4D]">
                    −${discount.toFixed(2)}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-[#1A1A1A]/55">هزینه ارسال</dt>
                  <dd className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-[#1F7A4D]">رایگان</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </dd>
                </div>
              </dl>

              {/* dashed divider */}
              <div
                className="my-4 h-px w-full"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to right, #D8D5CC 0, #D8D5CC 6px, transparent 6px, transparent 12px)",
                }}
              />

              <div className="flex items-center justify-between">
                <span className="font-semibold text-base">جمع کل</span>
                <span className="font-bold text-xl">${total.toFixed(2)}</span>
              </div>

              {shipping > 0 && (
                <p className="mt-3 text-xs text-[#1A1A1A]/45 leading-relaxed">
                  با ${(50 - (subtotal - discount)).toFixed(2)} خرید بیشتر،
                  ارسال رایگان می‌شود.
                </p>
              )}
              
                <button className="mt-5 w-full bg-[#1A1A1A] text-white py-3.5 rounded-sm font-semibold tracking-wide hover:bg-[#C1440E] active:scale-[0.98] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1440E]">
                  ادامه فرایند خرید
                </button>
              

              <button
                onClick={() => Dispatch({ type: "clear" })}
                className="mt-3 w-full flex items-center justify-center gap-2 text-sm text-[#1A1A1A]/50 hover:text-[#C1440E] py-2.5 rounded-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1440E]"
              >
                <TrashIcon size={15} />
                پاک کردن سبد
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- inline icons ---------- */

function TrashIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M4 7h16" strokeLinecap="round" />
      <path
        d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 11v6M14 11v6" strokeLinecap="round" />
    </svg>
  );
}

function EmptyCartIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1A1A1A"
      strokeOpacity="0.25"
      strokeWidth="1.4"
    >
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="17" cy="20" r="1.4" />
      <path
        d="M3 4h2l2.2 11.2a1.5 1.5 0 0 0 1.5 1.3h8.2a1.5 1.5 0 0 0 1.5-1.2L20 8H6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
