import { useMemo, useState, useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../Contexts/CartContext";
import useCart from "../Stores/useCart";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();

  const sum = useMemo(() => {
    return cart.reduce((acc, cur) => acc + cur.quantity, 0);
  }, [cart]);

  return (
    <header className="w-full bg-slate-900 text-white shadow-lg border-b border-slate-700 relative">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* ================= DESKTOP ================= */}
        <nav className="hidden md:flex h-16 items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-6">
            <Link
              to="/CartItem"
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition"
            >
              🛒
              <span>Cart</span>
              {sum > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-[11px] font-bold">
                  {sum}
                </span>
              )}
            </Link>

            <Link
              to="/Admin"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:scale-105 hover:shadow-lg transition duration-300"
            >
              Admin
            </Link>
          </div>

          {/* RIGHT SIDE GROUP (MENU + ICON) */}
          <div className="flex items-center gap-14 text-[16px]">
            <ul className="flex items-center gap-10 text-[16px] font-medium">
              <li>
                <Link to="/Products" className="hover:text-blue-400 transition">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/About" className="hover:text-blue-400 transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/Helps">
                  <div className="hover:text-blue-400 transition">Helps</div>
                </Link>
              </li>
            </ul>

            {/* ICON */}
            <Link to="/">
              <div className="flex items-center gap-3 group">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center font-bold text-lg shadow-lg group-hover:rotate-6 transition duration-300">
                  E
                </div>

                <div className="leading-4">
                  <h2 className="font-bold tracking-wide">EYour Shop</h2>
                  <p className="text-xs text-slate-400">Premium Store</p>
                </div>
              </div>
            </Link>
          </div>
        </nav>

        {/* ================= MOBILE TOP BAR ================= */}
        <nav className="md:hidden flex items-center justify-between h-16 relative">
          <button onClick={() => setOpen(!open)} className="text-2xl z-20">
            {open ? "✕" : "☰"}
          </button>
          <Link to="/">
            <h1 className="absolute left-1/2 -translate-x-1/2 font-bold text-lg whitespace-nowrap mt-[-15px]">
              EYour Shop
            </h1>
          </Link>

          <div className="flex items-center gap-3 text-sm">
            <Link to="/CartItem" className="relative  py-1">
              🛒
              {sum > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-xs px-1.5 py-0.5 rounded-full">
                  {sum}
                </span>
              )}
            </Link>

            <Link to="/Admin" className="px-2 py-1 bg-violet-600 rounded">
              Admin
            </Link>
          </div>
        </nav>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {open && (
        <div className="md:hidden border-t border-slate-700 bg-slate-900 px-4 py-5">
          <ul className="flex flex-col gap-4 text-center font-medium">
            <li>
              <Link to="/Products">Products</Link>
            </li>
            <li>
              <Link to="/About">About</Link>
            </li>
            <li>
              <Link to="/Helps">Helps</Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
