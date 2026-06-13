import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Products from "./components/Products";
import SingelProduct from "./pages/SingelProduct";
import ProductsHome from "./components/ProductsHome";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Foter from "./components/Foter";
import Modal from "./components/Modal";
import Midweb from "./components/Midweb";
import Endweb from "./components/Endweb";
import About from "./pages/About";
//import ThemeContext from "./contexts/ThemeContext";
import ThemeContext from "./Contexts/ThemContext";
import Layout from "./Layout";

export default function App() {
  const [data, setData] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved) setDarkMode(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

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
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
          <Layout>
            <Modal />

            <Routes>
              <Route
                path="/"
                element={
                  <div>
                    <Midweb />
                    <Home data={data} />
                    <Endweb />
                  </div>
                }
              />
              <Route path="/Products" element={<ProductsHome data={data} />} />
              <Route path="/single-product/:id" element={<SingelProduct />} />
              <Route path="/Admin" element={<Admin />} />
              <Route path="/About" element={<About />} />
            </Routes>
          </Layout>
        </ThemeContext.Provider>
      </BrowserRouter>
    </>
  );
}
