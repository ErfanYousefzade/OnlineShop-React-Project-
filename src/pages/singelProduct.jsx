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
      
        <div className="box w-[30%] mx-auto mt-20   shadow-xl ">
          <img src={data.image} alt="" className="h-[400px] aspect-asuare object-contain w-full mx-auto" />
          <h1 className="font-bold">{data.title}</h1>
          <a>${data.price}</a>
        </div>
      
    </>
  );
}
