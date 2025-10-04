import { Layout } from '../../components/layout/Layout';
import { Button } from '../../components/ui/Button';
import { useCart } from '../../contexts/CartContext';
import { formatPrice, getProductImages } from '../../lib/services/product-service';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export function CartPage() {
  const { cart, loading, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 mt-4">Loading cart...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some products to get started!</p>
            <a href="/products">
              <Button size="lg">Browse Products</Button>
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  const shipping = cartTotal >= 500 ? 0 : 50;
  const tax = cartTotal * 0.18;
  const total = cartTotal + shipping + tax;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {cart.map((item) => {
                const images = getProductImages(item.product);
                const itemTotal = item.product.price * item.quantity;

                return (
                  <div key={item.id} className="flex gap-4 p-6 border-b last:border-0">
                    <a
                      href={`/products/${item.product.slug}`}
                      className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0"
                    >
                      {images.length > 0 ? (
                        <img
                          src={images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          No Image
                        </div>
                      )}
                    </a>

                    <div className="flex-1 min-w-0">
                      <a
                        href={`/products/${item.product.slug}`}
                        className="text-lg font-semibold text-gray-900 hover:text-blue-600 block mb-1"
                      >
                        {item.product.name}
                      </a>
                      <p className="text-gray-600 text-sm mb-3">{formatPrice(item.product.price)} each</p>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 disabled:opacity-50"
                            disabled={item.quantity >= item.product.stock_quantity}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-700 p-2"
                          title="Remove from cart"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">{formatPrice(itemTotal)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartCount} items)</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (18%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                {cartTotal < 500 && (
                  <p className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
                    Add {formatPrice(500 - cartTotal)} more for free shipping!
                  </p>
                )}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <a href="/checkout">
                <Button className="w-full flex items-center justify-center gap-2" size="lg">
                  Proceed to Checkout
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </a>

              <a
                href="/products"
                className="block text-center text-blue-600 hover:text-blue-700 mt-4"
              >
                Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
