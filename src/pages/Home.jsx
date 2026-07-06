import { useEffect, useState } from "react";
import Products from "../components/Products";
import Hero from "../components/Hero";
import Timer from "../components/Timer";

export default function Home({ data }) {
  const [page, setPage] = useState(0);
  const [anim, setAnim] = useState(false);

  const [expensivePage, setExpensivePage] = useState(0);
  const [expensiveAnim, setExpensiveAnim] = useState(false);

  const productsPerPageDesktop = 4;
  const productsPerPageMobile = 3;

  // محصولات پرفروش (۸ محصول اول)
  const randomProducts = [...data].slice(0, 8);

  // ۸ محصول گران‌قیمت
  const expensiveProducts = [...data]
    .sort((a, b) => b.price - a.price)
    .slice(0, 8);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const perPage = isMobile ? productsPerPageMobile : productsPerPageDesktop;

  // محصولات پرفروش
  const start = page * perPage;
  const visibleProducts = randomProducts.slice(start, start + perPage);
  const totalPages = Math.ceil(randomProducts.length / perPage);

  // محصولات گران‌قیمت
  const expensiveStart = expensivePage * perPage;
  const visibleExpensiveProducts = expensiveProducts.slice(
    expensiveStart,
    expensiveStart + perPage,
  );
  const totalExpensivePages = Math.ceil(expensiveProducts.length / perPage);

  // تغییر صفحه محصولات پرفروش
  const changePage = (dir) => {
    setAnim(false);

    setTimeout(() => {
      setPage((prev) => {
        if (dir === "next") {
          return prev === totalPages - 1 ? 0 : prev + 1;
        } else {
          return prev === 0 ? totalPages - 1 : prev - 1;
        }
      });

      setAnim(true);
    }, 150);
  };

  // تغییر صفحه محصولات گران‌قیمت
  const changeExpensivePage = (dir) => {
    setExpensiveAnim(false);

    setTimeout(() => {
      setExpensivePage((prev) => {
        if (dir === "next") {
          return prev === totalExpensivePages - 1 ? 0 : prev + 1;
        } else {
          return prev === 0 ? totalExpensivePages - 1 : prev - 1;
        }
      });

      setExpensiveAnim(true);
    }, 150);
  };

  useEffect(() => {
    setAnim(true);
    setExpensiveAnim(true);
  }, []);
console.log("a,nb");

  return (
    <>
      {/* HERO */}
      <Hero />

      {/* TIMER */}
      <div className="mt-10">
        <Timer />
      </div>

      {/* محصولات گران‌قیمت */}
      <h1 className="text-red-600 font-bold text-[30px] flex justify-end md:px-10 mb-10 text-center pr-5 md:pr-8 mt-16">
        محصولات گران قیمت
      </h1>

      <div className="relative px-6 md:px-9 ">
        <div className="relative w-full max-w-7xl mx-auto ">
          <button
            onClick={() => changeExpensivePage("prev")}
            className="absolute left-3 md:left-1 top-1/2 -translate-y-1/2 z-10 bg-gray-800 text-white w-10 h-10 rounded-full mx-auto"
          >
            ‹
          </button>

          <div
            className={`
            max-w-7xl
            w-full
            mx-auto
            grid gap-6
            grid-cols-3 md:grid-cols-4
            transition-all duration-500 ease-out m
            ${
              expensiveAnim
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }
          `}
          >
            {visibleExpensiveProducts.map((item) => (
              <Products
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                description={item.description}
              />
            ))}
          </div>

          <button
            onClick={() => changeExpensivePage("next")}
            className="absolute right-3 md:right-1 top-1/2 -translate-y-1/2 z-10 bg-gray-800 text-white w-10 h-10 rounded-full "
          >
            ›
          </button>
        </div>
      </div>
    </>
  );
}
