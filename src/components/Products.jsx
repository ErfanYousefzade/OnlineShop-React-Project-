import { useState } from "react";
import { Link } from "react-router";

export default function Products({ title, image, price,id,description}) {
  return (
    <>
      <Link to={`/single-product/${id}`}>
        <div className="box shadow-xl h-[600px] relative">
          <img
            src={image}
            alt=""
            className="aspect-asuare object-contain w-full h-[350px] "
          />
          <h4 className="mt-4 line-clamp-3 font-bold pl-2">{title}</h4>
          <p className="line-clamp-2 pl-2 mt-4">{description}</p>
          

          <a className="text-red-700 absolute bottom-18 left-[2%] line-through pl-2">${price}</a>
          <a className="text-green-300 absolute bottom-12 left-[2%] pl-2">${price-price*0.1}</a>
          <button className="bg-blue-600 absolute bottom-5 left-[35%] rounded text-white w-[25%]">buy now</button>
        </div>
      </Link>
    </>
  );
}
