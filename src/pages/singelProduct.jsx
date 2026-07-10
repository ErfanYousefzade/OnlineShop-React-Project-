import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CartContext from "../Contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import useCart from "../Stores/useCart";

export default function SingelProduct() {
  const [data, setData] = useState({});
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlisted, setWishlisted] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const { id } = useParams();
 
  const {cart,add,remove} = useCart()
  const [displaynumber, SetDisplaynumber] = useState(0);

  // fetch main product
  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [id]);

  // fetch related products from same category
  useEffect(() => {
    if (!data.category) return;
    fetch(
      `https://fakestoreapi.com/products/category/${encodeURIComponent(
        data.category
      )}`
    )
      .then((res) => res.json())
      .then((list) => {
        setRelated(list.filter((p) => p.id != id).slice(0, 4));
      });
  }, [data.category, id]);

  useEffect(() => {
    const number = cart.find((item) => item.id == id)?.quantity;
    SetDisplaynumber(number || 0);
  }, [cart, id]);

  const price = Number(data.price || 0);
  const discountPrice = (price - price * 0.1).toFixed(2);
  const discountPercent = 10;

  // deterministic-ish fake meta derived from product id, so it's stable per product
  const seed = Number(id) || 1;
  const rating = (3.6 + ((seed * 7) % 14) / 10).toFixed(1);
  const reviewCount = 40 + ((seed * 53) % 460);
  const sku = `SKU-${1000 + seed * 37}`;
  const brand = ["Norra", "Veld & Co.", "Linea Studio", "Maren House"][
    seed % 4
  ];
  const inStock = seed % 9 !== 0; // mostly in stock

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: data.title, url: window.location.href });
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 1800);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8]">
        <div className="flex items-center gap-3 text-[#1A1A1A]/60">
          <span className="w-2 h-2 rounded-full bg-[#C1440E] animate-pulse" />
          <span className="text-sm tracking-wide">در حال بارگذاری محصول…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1A1A1A]">
      {/* breadcrumb strip */}
      <div className="max-w-6xl mx-auto px-5 md:px-8 pt-6 text-xs text-[#1A1A1A]/50 flex items-center gap-2 tracking-wide">
        <span>فروشگاه</span>
        <span className="text-[#1A1A1A]/30">/</span>
        <span className="capitalize">{data.category}</span>
        <span className="text-[#1A1A1A]/30">/</span>
        <span className="text-[#1A1A1A]/80 line-clamp-1">{data.title}</span>
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14">
          {/* ============ LEFT : GALLERY ============ */}
          <div>
            <div className="relative bg-white border border-[#E8E6E0] rounded-sm overflow-hidden group">
              {/* discount badge */}
              <span className="absolute top-4 left-4 z-10 bg-[#C1440E] text-white text-xs font-semibold tracking-wide px-3 py-1 rounded-sm">
                {discountPercent}% تخفیف
              </span>
              {/* category badge */}
              <span className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm border border-[#E8E6E0] text-[#1A1A1A]/70 text-xs px-3 py-1 rounded-sm capitalize">
                {data.category}
              </span>

              <div className="aspect-square flex items-center justify-center p-10 md:p-14">
                <motion.img
                  key={data.image}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  src={data.image}
                  alt={data.title}
                  className="max-h-full max-w-full object-contain transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
            </div>

            {/* perforated divider — signature motif */}
            <div
              className="mt-6 h-px w-full"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, #D8D5CC 0, #D8D5CC 6px, transparent 6px, transparent 12px)",
              }}
            />

            <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-[#1A1A1A]/60">
              <div className="flex items-center gap-2">
                <TruckIcon />
                <span>ارسال رایگان برای سفارش‌های بالای ۵۰۰ هزار تومان</span>
              </div>
              <div className="flex items-center gap-2">
                <ReturnIcon />
                <span>۷ روز ضمانت بازگشت کالا</span>
              </div>
            </div>
          </div>

          {/* ============ RIGHT : INFO ============ */}
          <div className="flex flex-col">
            <h1
              className="text-3xl md:text-[2.1rem] leading-tight font-semibold"
              style={{ fontFamily: "'Georgia', 'Vazirmatn', serif" }}
            >
              {data.title}
            </h1>

            {/* rating + reviews */}
            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center gap-0.5 text-[#C1440E]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    filled={i < Math.round(rating)}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-[#1A1A1A]/80">
                {rating}
              </span>
              <span className="text-sm text-[#1A1A1A]/40">
                ({reviewCount} نظر)
              </span>
            </div>

            {/* price block */}
            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">
                ${discountPrice}
              </span>
              <span className="text-base text-[#1A1A1A]/40 line-through">
                ${price.toFixed(2)}
              </span>
              <span className="text-sm font-semibold text-[#C1440E]">
                {discountPercent}٪ صرفه‌جویی
              </span>
            </div>

            {/* stock + shipping line */}
            <div className="mt-3 flex items-center gap-4 text-sm">
              <span
                className={`flex items-center gap-1.5 font-medium ${
                  inStock ? "text-[#1F7A4D]" : "text-[#C1440E]"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    inStock ? "bg-[#1F7A4D]" : "bg-[#C1440E]"
                  }`}
                />
                {inStock ? "موجود در انبار" : "ناموجود"}
              </span>
              <span className="text-[#1A1A1A]/40">·</span>
              <span className="text-[#1A1A1A]/60">ارسال رایگان</span>
            </div>

            {/* short description */}
            <p className="mt-5 text-sm leading-relaxed text-[#1A1A1A]/65 line-clamp-3">
              {data.description}
            </p>

            {/* dashed divider */}
            <div
              className="mt-6 h-px w-full"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, #D8D5CC 0, #D8D5CC 6px, transparent 6px, transparent 12px)",
              }}
            />

            {/* cart controls */}
            <div className="mt-6 flex items-stretch gap-3">
              <AnimatePresence mode="wait">
                {displaynumber > 0 ? (
                  <motion.div
                    key="stepper"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-between flex-1 bg-white border border-[#E8E6E0] rounded-sm px-2"
                  >
                    <button
                      aria-label="کاهش تعداد"
                      onClick={() =>
                        remove(+id)
                      }
                      className="w-11 h-12 grid place-items-center text-lg text-[#1A1A1A]/70 hover:text-[#C1440E] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1440E] rounded-sm"
                    >
                      −
                    </button>
                    <span className="font-semibold text-[#1A1A1A]">
                      {displaynumber}
                    </span>
                    <button
                      aria-label="افزایش تعداد"
                      disabled={!inStock}
                      onClick={() => add(id)}
                      className="w-11 h-12 grid place-items-center text-lg text-[#1A1A1A]/70 hover:text-[#C1440E] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1440E] rounded-sm disabled:opacity-30"
                    >
                      +
                    </button>
                  </motion.div>
                ) : (
                  <motion.button
                    key="add"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    disabled={!inStock}
                    onClick={() => add(+id)}
                    className="flex-1 bg-[#1A1A1A] text-white py-3.5 rounded-sm font-semibold tracking-wide hover:bg-[#C1440E] active:scale-[0.98] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1440E] disabled:opacity-30 disabled:hover:bg-[#1A1A1A]"
                  >
                    {inStock ? "افزودن به سبد خرید" : "ناموجود"}
                  </motion.button>
                )}
              </AnimatePresence>

              {/* wishlist */}
              <button
                aria-label="افزودن به علاقه‌مندی‌ها"
                onClick={() => setWishlisted((w) => !w)}
                className="w-12 h-12 grid place-items-center bg-white border border-[#E8E6E0] rounded-sm hover:border-[#C1440E] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1440E]"
              >
                <HeartIcon filled={wishlisted} />
              </button>

              {/* share */}
              <button
                aria-label="اشتراک‌گذاری"
                onClick={handleShare}
                className="w-12 h-12 relative grid place-items-center bg-white border border-[#E8E6E0] rounded-sm hover:border-[#1A1A1A] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1440E]"
              >
                <ShareIcon />
                <AnimatePresence>
                  {shareCopied && (
                    <motion.span
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: -38 }}
                      exit={{ opacity: 0 }}
                      className="absolute whitespace-nowrap text-xs bg-[#1A1A1A] text-white px-2.5 py-1 rounded-sm"
                    >
                      لینک کپی شد
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>

            {/* delivery & return info */}
            <div className="mt-7 space-y-3 text-sm text-[#1A1A1A]/60">
              <div className="flex items-start gap-2.5">
                <TruckIcon className="mt-0.5" />
                <span>تحویل تخمینی: ۳ تا ۵ روز کاری</span>
              </div>
              <div className="flex items-start gap-2.5">
                <ReturnIcon className="mt-0.5" />
                <span>بازگشت رایگان کالا تا ۷ روز پس از تحویل</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============ DESCRIPTION + SPECS ============ */}
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white border border-[#E8E6E0] rounded-sm p-6 md:p-8">
            <h2 className="text-lg font-semibold mb-4">توضیحات محصول</h2>
            <p className="text-sm leading-7 text-[#1A1A1A]/70">
              {data.description}
            </p>
          </div>

          <div className="bg-white border border-[#E8E6E0] rounded-sm p-6 md:p-8">
            <h2 className="text-lg font-semibold mb-4">مشخصات</h2>
            <dl className="text-sm divide-y divide-[#E8E6E0]">
              <div className="flex items-center justify-between py-2.5">
                <dt className="text-[#1A1A1A]/50">دسته‌بندی</dt>
                <dd className="font-medium capitalize">{data.category}</dd>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <dt className="text-[#1A1A1A]/50">برند</dt>
                <dd className="font-medium">{brand}</dd>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <dt className="text-[#1A1A1A]/50">کد کالا</dt>
                <dd className="font-medium">{sku}</dd>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <dt className="text-[#1A1A1A]/50">وضعیت</dt>
                <dd
                  className={`font-medium ${
                    inStock ? "text-[#1F7A4D]" : "text-[#C1440E]"
                  }`}
                >
                  {inStock ? "موجود" : "ناموجود"}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* ============ RELATED PRODUCTS ============ */}
        {related.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">محصولات مشابه</h2>
              <div
                className="flex-1 mx-5 h-px"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to right, #D8D5CC 0, #D8D5CC 6px, transparent 6px, transparent 12px)",
                }}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => {
                const rp = Number(p.price);
                const rDisc = (rp - rp * 0.1).toFixed(2);
                return (
                  <Link
                    to={`/single-product/${p.id}`}
                    key={p.id}
                    className="group bg-white border border-[#E8E6E0] rounded-sm p-4 hover:border-[#C1440E] transition"
                  >
                    <div className="aspect-square flex items-center justify-center mb-3 overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <p className="text-xs text-[#1A1A1A]/80 line-clamp-2 leading-snug">
                      {p.title}
                    </p>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-sm font-bold">${rDisc}</span>
                      <span className="text-xs text-[#1A1A1A]/40 line-through">
                        ${rp.toFixed(2)}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- inline icons (no extra dependency) ---------- */

function StarIcon({ filled }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        d="M12 2.5l3.09 6.26 6.91 1-5 4.87 1.18 6.87L12 18.27l-6.18 3.23L7 14.63l-5-4.87 6.91-1L12 2.5z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartIcon({ filled }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={filled ? "#C1440E" : "none"}
      stroke={filled ? "#C1440E" : "#1A1A1A"}
      strokeWidth="1.6"
    >
      <path
        d="M12 21s-7.5-4.9-10-9.3C.5 8.4 2 4.8 5.6 4.1c2-.4 4 .5 5 2.1.9-1.6 3-2.5 5-2.1C19.2 4.8 20.7 8.4 19 11.7c-2.5 4.4-10 9.3-10 9.3z"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1A1A1A"
      strokeWidth="1.6"
    >
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="17" cy="5" r="2.5" />
      <circle cx="17" cy="19" r="2.5" />
      <path d="M8.2 10.8L14.8 6.2M8.2 13.2l6.6 4.6" strokeLinecap="round" />
    </svg>
  );
}

function TruckIcon({ className = "" }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M2 7h11v9H2z" strokeLinejoin="round" />
      <path d="M13 10h4l4 3v3h-8z" strokeLinejoin="round" />
      <circle cx="6" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </svg>
  );
}

function ReturnIcon({ className = "" }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M4 7v5h5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M4.6 16A8 8 0 1 0 5 8.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
