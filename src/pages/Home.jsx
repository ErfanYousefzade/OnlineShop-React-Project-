import { useEffect, useState } from "react";
import Products from "../components/Products";
import Hero from "../components/Hero";
import Timer from "../components/Timer";

export default function Home({ data }) {
  const [page, setPage] = useState(0);
  const [anim, setAnim] = useState(false);

  const productsPerPageDesktop = 4;
  const productsPerPageMobile = 3;

  const randomProducts = [...data].slice(0, 8);

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  const perPage = isMobile
    ? productsPerPageMobile
    : productsPerPageDesktop;

  const start = page * perPage;
  const visibleProducts = randomProducts.slice(start, start + perPage);

  const totalPages = Math.ceil(randomProducts.length / perPage);

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

  useEffect(() => {
    setAnim(true);
  }, []);

  return (
    <>
      {/* HERO (بالای همه) */}
      <Hero />

      {/* TIMER (زیر هیرو) */}
      <div className="mt-10">
        <Timer />
      </div>

      {/* TITLE */}
      <h1 className="text-red-600 font-bold text-[30px] flex justify-end md:px-10 mb-10 text-center pr-5 md:pr-8 mt-12">
        محصولات پر فروش
      </h1>

      {/* PRODUCTS SLIDER */}
      <div className="relative px-6 md:px-9">
        {/* LEFT BUTTON */}
        <button
          onClick={() => changePage("prev")}
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 bg-gray-800 text-white w-10 h-10 rounded-full"
        >
          ‹
        </button>

        {/* GRID */}
        <div
          className={`
            grid gap-6
            grid-cols-3 md:grid-cols-4
            transition-all duration-500 ease-out
            ${anim ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}
          `}
        >
          {visibleProducts.map((item) => (
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

        {/* RIGHT BUTTON */}
        <button
          onClick={() => changePage("next")}
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 bg-gray-800 text-white w-10 h-10 rounded-full"
        >
          ›
        </button>
      </div>
    </>
  );
}