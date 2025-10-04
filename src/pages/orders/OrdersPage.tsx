import { useEffect, useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';
import { useAuth } from '../../contexts/AuthContext';
import { getOrders, getStatusColor, getStatusLabel } from '../../lib/services/order-service';
import { formatPrice } from '../../lib/services/product-service';
import type { OrderWithItems } from '../../types';
import { Package, Calendar } from 'lucide-react';

export function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const data = await getOrders(user.id);
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600 mt-4">Loading orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No orders yet</h2>
              <p className="text-gray-600 mb-8">Start shopping to see your orders here!</p>
              <a
                href="/products"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Products
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                const address = order.shipping_address_snapshot as any;

                return (
                  <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-4 mb-1">
                          <span className="font-semibold text-gray-900">
                            Order #{order.order_number}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                            {getStatusLabel(order.status)}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(order.created_at)}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Total</p>
                        <p className="text-xl font-bold text-gray-900">{formatPrice(order.total)}</p>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="space-y-4 mb-6">
                        {order.order_items && order.order_items.map((item: any) => (
                          <div key={item.id} className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0"></div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{item.product?.name || 'Product'}</p>
                              <p className="text-sm text-gray-600">
                                Quantity: {item.quantity} × {formatPrice(item.price_at_purchase)}
                              </p>
                            </div>
                            <p className="font-semibold text-gray-900">{formatPrice(item.subtotal)}</p>
                          </div>
                        ))}
                      </div>

                      <div className="border-t pt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Delivery Address</p>
                        <p className="text-sm text-gray-600">
                          {address?.full_name}<br />
                          {address?.street}, {address?.city}<br />
                          {address?.state} - {address?.postal_code}<br />
                          Phone: {address?.phone}
                        </p>
                      </div>

                      {order.notes && (
                        <div className="border-t mt-4 pt-4">
                          <p className="text-sm font-medium text-gray-700 mb-1">Order Notes</p>
                          <p className="text-sm text-gray-600">{order.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
