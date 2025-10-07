export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-dark-900 via-primary-950 to-dark-950 text-gray-300 mt-auto relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnpNNiA2YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02eiIgc3Ryb2tlPSIjOTMzM2VhIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-xl font-bold bg-gradient-purple bg-clip-text text-transparent mb-4">Prasad and Sons</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your trusted online shop for quality products at great prices.
            </p>
          </div>

          <div>
            <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/products" className="hover:text-primary-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  All Products
                </a>
              </li>
              <li>
                <a href="/categories" className="hover:text-primary-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  Categories
                </a>
              </li>
              <li>
                <a href="/deals" className="hover:text-primary-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  Special Deals
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">Customer Service</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/contact" className="hover:text-primary-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/shipping" className="hover:text-primary-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="/returns" className="hover:text-primary-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  Returns
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-primary-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">Account</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/profile" className="hover:text-primary-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  My Profile
                </a>
              </li>
              <li>
                <a href="/orders" className="hover:text-primary-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  Order History
                </a>
              </li>
              <li>
                <a href="/wishlist" className="hover:text-primary-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  Wishlist
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-900/30 mt-8 pt-8 text-sm text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Prasad and Sons. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
