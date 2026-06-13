import { useEffect, useState } from "react";
import Products from "./Products";

export default function ProductsHome({ data }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div
      className={`
        box grid grid-cols-1 md:grid-cols-5 gap-6 px-9 mt-[40px] pb-16 mb-20
        transition-all duration-700 ease-out
        ${show ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}
      `}
    >
      {data.map((item) => (
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
  );
}