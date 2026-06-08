import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState();

  return (
    <header className="w-full bg-slate-900 text-white shadow-lg border-b border-b-slate-600 ">
      {/* desktop*/}
      <nav className="hidden md:flex container  px-46 h-16 items-center justify-between">
        <div className="flex gap-9 font-medium">
          <button className="px-4 py-2 rounded-lg hover:bg-slate-600 transition">
            Cart
          </button>
          <Link to="/Admin">
            <button className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-blue-900 transition">
              Admin
            </button>
          </Link>
        </div>

        <ul className="flex items-center gap-10 font-medium ">
          <li>
            <Link to="/Products" className="hover:text-blue-900 transition">
              Products
            </Link>
          </li>
          <li>
            <Link to="/About" className="hover:text-blue-900 transition">
              About
            </Link>
          </li>

          <li className="hover:text-blue-900 transition ">
            <a href="#">Helps</a>
          </li>
          <li className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xl hover:bg-red-900 transition">
            E
          </li>
        </ul>
      </nav>

      {/* mobile*/}
      <nav className="md:hidden flex items-center justify-between px-4 h-16 r">
        <button
          onClick={() => setOpen(!open)}
          className="text-2xl font-bold z-10"
        >
          {open ? "✕" : "☰"}
        </button>

        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold">
          Easy Net Shop
        </h1>

        <div className="flex gap-3 text-sm z-10">
          <button>Admin</button>
          <button>Cart</button>
        </div>
      </nav>

      {/*menu*/}
      {open && (
        <div className="md:hidden border-t bg-slate-900 p-6">
          <ul className="flex flex-col items-center gap-5 font-medium">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Helps</a>
            </li>
            <div className="flex gap-5 mt-2">
              <button className="text-red-600 pointer cursor-pointer">
                Cart
              </button>
              <button className="text-red-600 pointer cursor-pointer">
                Admin
              </button>
            </div>
          </ul>
        </div>
      )}
    </header>
  );
}
