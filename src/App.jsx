import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Products from "./components/Products";
import SingelProduct from "./pages/SingelProduct";
import ProductsHome from "./components/ProductsHome";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Foter from "./components/Foter";

export default function App() {
  const [data, setData] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  console.log(data);

if (!data) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
}


  return (
    <>
      <BrowserRouter>
        <Header />
       

        <Routes>
          <Route path="/" element={<div>
            
          
            <Home data={data} />
            </div>

            
            } />
          <Route path="/Products" element={<ProductsHome />} />
          <Route path="/single-product/:id" element={<SingelProduct />} />
          <Route path="/Admin" element={<Admin/>}/>
          
          
        </Routes>
        <Foter/>
      </BrowserRouter>
    </>
  );
}
