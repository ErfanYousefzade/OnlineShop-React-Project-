export default function Foter() {
  return (
    <footer className="bg-zinc-900 text-zinc-300 py-10">
      <div className="max-w-7xl mx-auto px-4 ">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div>
            <h3 className="text-white font-bold mb-4">Products</h3>
            <ul className="space-y-3 text-sm">
              <li>Laptops</li>
              <li>Phones</li>
              <li>Tablets</li>
              <li>Accessories</li>
              <li>New Arrivals</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Customer Service</h3>
            <ul className="space-y-3 text-sm">
              <li>Help Center</li>
              <li>Returns</li>
              <li>Shipping</li>
              <li>Order Tracking</li>
              <li>Support</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>About Us</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>Press</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>Privacy Policy</li>
              <li>Terms of Use</li>
              <li>Cookies</li>
              <li>Security</li>
              <li>Licenses</li>
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