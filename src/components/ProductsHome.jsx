import { useState, useEffect } from "react";
import Header from "./Header";
import Products from "./Products";
export default function ProductsHome() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  return (
    <>
    
      <div className="box grid grid-cols-1 md:grid-cols-5 gap-6 px-9 mt-[40px] pb-16 mb-20">
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
    </>
  );
}
