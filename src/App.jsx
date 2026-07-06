import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { useCallback, useEffect, useReducer, useState } from "react";
import Products from "./components/Products";
import SingelProduct from "./pages/singelProduct";
import ProductsHome from "./components/ProductsHome";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Foter from "./components/Foter";
import Modal from "./components/Modal";
import CartContext from "./Contexts/CartContext";
import Endweb from "./components/Endweb";
import About from "./pages/About";
//import ThemeContext from "./contexts/ThemeContext";
import ThemeContext from "./Contexts/ThemContext";
import Layout from "./Layout";

import CartItem from "./pages/CartItem";
import Helps from "./pages/Help";
import AdminPanel from "./pages/AdminPanel";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Protected from "./Protected/Protected";
import MyReducer from "./Reducer/Reducer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
});
export default function App() {
  const [data, setData] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved) setDarkMode(JSON.parse(saved));
  }, []);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const [cart, Dispatch] = useReducer(MyReducer, []);

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
      <BrowserRouter basename="/OnlineShop-React-Project-">
        <QueryClientProvider client={queryClient}>
          <CartContext.Provider value={{ cart, Dispatch }}>
            <Layout>
              <Modal />

              <Routes>
                <Route
                  path="/"
                  element={
                    <div>
                      <Home data={data} />

                      <Endweb />
                    </div>
                  }
                />
                <Route
                  path="/Products"
                  element={<ProductsHome data={data} />}
                />
                <Route path="/single-product/:id" element={<SingelProduct />} />
                <Route path="/Admin" element={<Admin />} />
                <Route path="/About" element={<About />} />
                <Route path="/Helps" element={<Helps />} />

                <Route path="/CartItem" element={<CartItem />} />

                <Route
                  path="/AdminPanel"
                  element={
                    <Protected>
                      <AdminPanel />
                    </Protected>
                  }
                />
              </Routes>
            </Layout>
          </CartContext.Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}
