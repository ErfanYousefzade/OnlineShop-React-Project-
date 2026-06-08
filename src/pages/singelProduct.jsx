import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function SingelProduct() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  return (
    <>
      <div className="box w-[90%] md:w-[50%] mx-auto mt-20   shadow-xl relative h-[600px]  mb-20">
        <img
          src={data.image}
          alt=""
          className="h-[400px] aspect-asuare object-contain w-full mx-auto mb-[-40px] md:mb-0"
        />
        <h1 className="font-bold mt-[20px]">{data.title}</h1>
        <p className="mt-3 pl-2 line-clamp-2">{data.description}</p>
       <p className="mt-2 pl-2 text-zinc-200">{data.category}</p>
        <a className="text-red-700 pt-10 line-through pl-2">
          ${data.price}
        </a>
        <a className="text-green-300  pl-2">
          ${data.price - data.price * 0.1}
        </a>
      </div>
    </>
  );
}
