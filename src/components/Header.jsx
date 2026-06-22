import { useMemo, useState, useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../Contexts/CartContext";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { Cart } = useContext(CartContext);

  const sum = useMemo(() => {
    return Cart.reduce((acc, cur) => acc + cur.quantity, 0);
  }, [Cart]);

  return (
    <header className="w-full bg-slate-900 text-white shadow-lg border-b border-slate-700 relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* ================= DESKTOP ================= */}
        <nav className="hidden md:flex h-16 items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-6">
            <Link
              to="/CartItem"
              className="relative px-4 py-2 rounded-lg hover:bg-slate-700 transition"
            >
              Cart
              {sum > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-xs px-2 py-0.5 rounded-full">
                  {sum}
                </span>
              )}
            </Link>

            <Link
              to="/Admin"
              className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 transition"
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
                  <a href="#" className="hover:text-blue-400 transition">
                    Helps
                  </a>
                </Link>
              </li>
            </ul>

            {/* ICON */}
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
              E
            </div>
          </div>
        </nav>

        {/* ================= MOBILE TOP BAR ================= */}
        <nav className="md:hidden flex items-center justify-between h-16 relative">
          <button onClick={() => setOpen(!open)} className="text-2xl z-20">
            {open ? "✕" : "☰"}
          </button>

          <h1 className="absolute left-1/2 -translate-x-1/2 font-bold text-lg whitespace-nowrap">
            EYour Shop
          </h1>

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
              <a href="#">Helps</a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
