import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { Link } from '../ui/Link';
import { useState } from 'react';

export function Header() {
  const { user, profile, signOut } = useAuth();
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-3">
            <div className="text-2xl font-black text-dark-900">
              <span className="text-primary-600">NU</span> REPUBLIC
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-dark-700 hover:text-primary-600 font-semibold transition-colors">
              Products
            </Link>
            <Link href="/categories" className="text-dark-700 hover:text-primary-600 font-semibold transition-colors">
              Categories
            </Link>
            {user && (
              <Link href="/orders" className="text-dark-700 hover:text-primary-600 font-semibold transition-colors">
                My Orders
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {user && (
              <Link href="/cart" className="relative p-2 text-dark-700 hover:text-primary-600 transition-colors">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {user ? (
              <div className="hidden md:flex items-center space-x-3">
                <Link href="/profile" className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <User className="h-5 w-5 text-dark-700" />
                  <span className="text-sm font-semibold text-dark-900">
                    {profile?.full_name || 'Profile'}
                  </span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="p-2 text-dark-700 hover:text-primary-600 transition-colors"
                  title="Sign out"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  href="/login"
                  className="text-dark-700 hover:text-primary-600 font-semibold transition-colors px-4 py-2"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-primary-600 text-white px-6 py-2.5 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-dark-700"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            <Link href="/products" className="block text-dark-700 hover:text-primary-600 font-semibold py-2">
              Products
            </Link>
            <Link href="/categories" className="block text-dark-700 hover:text-primary-600 font-semibold py-2">
              Categories
            </Link>
            {user && (
              <Link href="/orders" className="block text-dark-700 hover:text-primary-600 font-semibold py-2">
                My Orders
              </Link>
            )}
            {user ? (
              <>
                <Link href="/profile" className="block text-dark-700 hover:text-primary-600 font-semibold py-2">
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left text-dark-700 hover:text-primary-600 font-semibold py-2"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block text-dark-700 hover:text-primary-600 font-semibold py-2">
                  Login
                </Link>
                <Link href="/signup" className="block bg-primary-600 text-white text-center px-6 py-2.5 rounded-lg hover:bg-primary-700 transition-colors font-semibold">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
