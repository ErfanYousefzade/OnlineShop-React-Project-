export default function Foter() {
  return (
    <footer className="w-full bg-zinc-900 text-zinc-300 py-10 px-6 ">
      
      <div className="container px-20   mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
       
        <div>
          <h3 className="text-white font-bold mb-4">Products</h3>
          <ul className="space-y-3 text-sm">
            <li className="hover:underline cursor-pointer">Laptops</li>
            <li className="hover:underline cursor-pointer">Phones</li>
            <li className="hover:underline cursor-pointer">Tablets</li>
            <li className="hover:underline cursor-pointer">Accessories</li>
            <li className="hover:underline cursor-pointer">New Arrivals</li>
          </ul>
        </div>

   
        <div>
          <h3 className="text-white font-bold mb-4">Customer Service</h3>
          <ul className="space-y-3 text-sm">
            <li className="hover:underline cursor-pointer">Help Center</li>
            <li className="hover:underline cursor-pointer">Returns</li>
            <li className="hover:underline cursor-pointer">Shipping</li>
            <li className="hover:underline cursor-pointer">Order Tracking</li>
            <li className="hover:underline cursor-pointer">Support</li>
          </ul>
        </div>

   
        <div>
          <h3 className="text-white font-bold mb-4">Company</h3>
          <ul className="space-y-3 text-sm">
            <li className="hover:underline cursor-pointer">About Us</li>
            <li className="hover:underline cursor-pointer">Careers</li>
            <li className="hover:underline cursor-pointer">Blog</li>
            <li className="hover:underline cursor-pointer">Press</li>
            <li className="hover:underline cursor-pointer">Contact</li>
          </ul>
        </div>

  
        <div>
          <h3 className="text-white font-bold mb-4">Legal</h3>
          <ul className="space-y-3 text-sm">
            <li className="hover:underline cursor-pointer">Privacy Policy</li>
            <li className="hover:underline cursor-pointer">Terms of Use</li>
            <li className="hover:underline cursor-pointer">Cookies</li>
            <li className="hover:underline cursor-pointer">Security</li>
            <li className="hover:underline cursor-pointer">Licenses</li>
          </ul>
        </div>

      </div>


      <div className="mt-10 text-center text-xs text-zinc-500">
        © 2026 Your Store. All rights reserved.
      </div>

    </footer>
  );
}