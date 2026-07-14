export default function Foter() {
  const linkClass =
    "relative w-fit cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full";

  return (
    <footer className="bg-zinc-900 text-zinc-300 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          <div>
            <h3 className="text-white font-bold mb-4 text-center sm:text-left">
              Products
            </h3>
            <ul className="space-y-3 text-sm flex flex-col items-center sm:items-start">
              <li className={linkClass}>Laptops</li>
              <li className={linkClass}>Phones</li>
              <li className={linkClass}>Tablets</li>
              <li className={linkClass}>Accessories</li>
              <li className={linkClass}>New Arrivals</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 text-center sm:text-left">
              Customer Service
            </h3>
            <ul className="space-y-3 text-sm flex flex-col items-center sm:items-start">
              <li className={linkClass}>Help Center</li>
              <li className={linkClass}>Returns</li>
              <li className={linkClass}>Shipping</li>
              <li className={linkClass}>Order Tracking</li>
              <li className={linkClass}>Support</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 text-center sm:text-left">
              Company
            </h3>
            <ul className="space-y-3 text-sm flex flex-col items-center sm:items-start">
              <li className={linkClass}>About Us</li>
              <li className={linkClass}>Careers</li>
              <li className={linkClass}>Blog</li>
              <li className={linkClass}>Press</li>
              <li className={linkClass}>Contact</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 text-center sm:text-left">
              Legal
            </h3>
            <ul className="space-y-3 text-sm flex flex-col items-center sm:items-start">
              <li className={linkClass}>Privacy Policy</li>
              <li className={linkClass}>Terms of Use</li>
              <li className={linkClass}>Cookies</li>
              <li className={linkClass}>Security</li>
              <li className={linkClass}>Licenses</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-zinc-500">
          © 2026 Your Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
}