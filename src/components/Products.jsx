import { useState } from "react";
import { Link } from "react-router";

export default function Products({ title, image, price,id }) {
  return (
    <>
      <Link to={`/single-product/${id}`}>
        <div className="box shadow-xl h-[600px]">
          <img
            src={image}
            alt=""
            className="aspect-asuare object-contain w-full h-[400px] "
          />
          <h2 className="mt-9">{title}</h2>

          <a>{price}</a>
        </div>
      </Link>
    </>
  );
}
