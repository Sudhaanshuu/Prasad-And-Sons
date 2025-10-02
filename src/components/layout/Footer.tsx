export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Prasad and Sons</h3>
            <p className="text-sm">
              Your trusted online shop for quality products at great prices.
            </p>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/products" className="hover:text-white transition-colors">
                  All Products
                </a>
              </li>
              <li>
                <a href="/categories" className="hover:text-white transition-colors">
                  Categories
                </a>
              </li>
              <li>
                <a href="/deals" className="hover:text-white transition-colors">
                  Special Deals
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/shipping" className="hover:text-white transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="/returns" className="hover:text-white transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Account</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/profile" className="hover:text-white transition-colors">
                  My Profile
                </a>
              </li>
              <li>
                <a href="/orders" className="hover:text-white transition-colors">
                  Order History
                </a>
              </li>
              <li>
                <a href="/wishlist" className="hover:text-white transition-colors">
                  Wishlist
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Prasad and Sons. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
