import { ShoppingCart, User, LogOut, LayoutDashboard, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { Link } from '../ui/Link';

export function Header() {
  const { user, profile, signOut, isAdmin } = useAuth();
  const { cartCount } = useCart();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-primary-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-purple p-2 rounded-xl shadow-glow group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-purple bg-clip-text text-transparent">
              Prasad and Sons
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/products" className="px-4 py-2 text-dark-700 hover:text-primary-600 font-medium transition-all duration-300 rounded-lg hover:bg-primary-50">
              Products
            </Link>
            <Link href="/categories" className="px-4 py-2 text-dark-700 hover:text-primary-600 font-medium transition-all duration-300 rounded-lg hover:bg-primary-50">
              Categories
            </Link>
            {user && (
              <Link href="/orders" className="px-4 py-2 text-dark-700 hover:text-primary-600 font-medium transition-all duration-300 rounded-lg hover:bg-primary-50">
                My Orders
              </Link>
            )}
            {isAdmin && (
              <Link href="/admin" className="px-4 py-2 text-dark-700 hover:text-primary-600 font-medium transition-all duration-300 rounded-lg hover:bg-primary-50 flex items-center space-x-2">
                <LayoutDashboard className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-3">
            {user && (
              <Link href="/cart" className="relative p-3 text-dark-700 hover:text-primary-600 transition-all duration-300 rounded-xl hover:bg-primary-50 group">
                <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-purple text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-glow animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {user ? (
              <div className="flex items-center space-x-2">
                <Link href="/profile" className="flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-primary-50 transition-all duration-300 group">
                  <div className="bg-gradient-purple p-1.5 rounded-lg group-hover:scale-110 transition-transform">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-dark-800 hidden md:block">
                    {profile?.full_name || 'Profile'}
                  </span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="p-3 text-dark-600 hover:text-red-600 transition-all duration-300 rounded-xl hover:bg-red-50"
                  title="Sign out"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="text-dark-700 hover:text-primary-600 font-semibold transition-all duration-300 px-4 py-2"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-gradient-purple text-white px-6 py-2.5 rounded-xl hover:shadow-glow transition-all duration-300 font-semibold transform hover:scale-105"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
