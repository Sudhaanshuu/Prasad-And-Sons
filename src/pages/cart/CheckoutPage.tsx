import { useState, useEffect } from 'react';
import { Layout } from '../../components/layout/Layout';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { createOrder } from '../../lib/services/order-service';
import { formatPrice } from '../../lib/services/product-service';
import { supabase } from '../../lib/supabase';
import type { Address } from '../../types';
import { CheckCircle } from 'lucide-react';

export function CheckoutPage() {
  const { user } = useAuth();
  const { cart, cartTotal, clearCart } = useCart();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const [newAddress, setNewAddress] = useState({
    label: 'Home',
    full_name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'India',
  });

  useEffect(() => {
    if (user) {
      loadAddresses();
    }
  }, [user]);

  const loadAddresses = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false });

    if (!error && data) {
      setAddresses(data);
      if (data.length > 0) {
        setSelectedAddress(data[0].id);
      }
    }
  };

  const handleSaveAddress = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('addresses')
      .insert({
        user_id: user.id,
        ...newAddress,
      })
      .select()
      .single();

    if (!error && data) {
      setAddresses([...addresses, data]);
      setSelectedAddress(data.id);
      setShowNewAddress(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!user || !selectedAddress || cart.length === 0) return;

    setLoading(true);
    try {
      const subtotal = cartTotal;
      const shipping = subtotal >= 500 ? 0 : 50;
      const tax = subtotal * 0.18;
      const total = subtotal + shipping + tax;

      const order = await createOrder({
        userId: user.id,
        items: cart.map(item => ({
          productId: item.product_id,
          quantity: item.quantity,
          price: item.product.price,
        })),
        shippingAddressId: selectedAddress,
        paymentMethod: 'Cash on Delivery',
        subtotal,
        tax,
        shippingCost: shipping,
        total,
      });

      await clearCart();
      setOrderNumber(order.order_number);
      setSuccess(true);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to checkout</h2>
            <a href="/login">
              <Button>Sign In</Button>
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  if (cart.length === 0 && !success) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <a href="/products">
              <Button>Browse Products</Button>
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  if (success) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your order number is <strong>{orderNumber}</strong>
            </p>
            <div className="flex gap-4 justify-center">
              <a href="/orders">
                <Button>View Orders</Button>
              </a>
              <a href="/products">
                <Button variant="outline">Continue Shopping</Button>
              </a>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const subtotal = cartTotal;
  const shipping = subtotal >= 500 ? 0 : 50;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Delivery Address</h2>

            {addresses.length > 0 ? (
              <div className="space-y-3 mb-4">
                {addresses.map((address) => (
                  <label
                    key={address.id}
                    className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedAddress === address.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      value={address.id}
                      checked={selectedAddress === address.id}
                      onChange={() => setSelectedAddress(address.id)}
                      className="sr-only"
                    />
                    <div className="flex justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{address.full_name}</p>
                        <p className="text-gray-600 text-sm mt-1">
                          {address.street}, {address.city}, {address.state} - {address.postal_code}
                        </p>
                        <p className="text-gray-600 text-sm">{address.phone}</p>
                      </div>
                      {address.is_default && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded h-fit">
                          Default
                        </span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            ) : null}

            {!showNewAddress ? (
              <Button variant="outline" onClick={() => setShowNewAddress(true)} className="w-full">
                Add New Address
              </Button>
            ) : (
              <div className="space-y-4 border-t pt-4">
                <h3 className="font-semibold text-gray-900">New Address</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    value={newAddress.full_name}
                    onChange={(e) => setNewAddress({ ...newAddress, full_name: e.target.value })}
                    required
                  />
                  <Input
                    label="Phone"
                    value={newAddress.phone}
                    onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                    required
                  />
                </div>
                <Input
                  label="Street Address"
                  value={newAddress.street}
                  onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="City"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    required
                  />
                  <Input
                    label="State"
                    value={newAddress.state}
                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                    required
                  />
                </div>
                <Input
                  label="Postal Code"
                  value={newAddress.postal_code}
                  onChange={(e) => setNewAddress({ ...newAddress, postal_code: e.target.value })}
                  required
                />
                <div className="flex gap-2">
                  <Button onClick={handleSaveAddress}>Save Address</Button>
                  <Button variant="outline" onClick={() => setShowNewAddress(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (18%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          <Button
            onClick={handlePlaceOrder}
            disabled={loading || !selectedAddress}
            className="w-full"
            size="lg"
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </Button>
        </div>
      </div>
    </Layout>
  );
}
