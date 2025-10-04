import { supabase } from '../supabase';
import type { Order, OrderWithItems, Address } from '../../types';

export interface CreateOrderData {
  userId: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  shippingAddressId: string;
  paymentMethod: string;
  subtotal: number;
  tax: number;
  shippingCost: number;
  total: number;
  notes?: string;
}

export async function createOrder(orderData: CreateOrderData): Promise<Order> {
  const address = await getAddress(orderData.shippingAddressId);
  if (!address) throw new Error('Shipping address not found');

  const orderNumber = await generateOrderNumber();

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: orderData.userId,
      order_number: orderNumber,
      subtotal: orderData.subtotal,
      tax: orderData.tax,
      shipping_cost: orderData.shippingCost,
      total: orderData.total,
      shipping_address_id: orderData.shippingAddressId,
      shipping_address_snapshot: address,
      payment_method: orderData.paymentMethod,
      payment_status: 'pending',
      notes: orderData.notes || '',
      status: 'pending',
    })
    .select()
    .single();

  if (orderError) throw orderError;

  const orderItems = orderData.items.map(item => ({
    order_id: order.id,
    product_id: item.productId,
    product_snapshot: {},
    quantity: item.quantity,
    price_at_purchase: item.price,
    subtotal: item.price * item.quantity,
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) throw itemsError;

  return order;
}

export async function getOrders(userId: string): Promise<OrderWithItems[]> {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        product:products(*)
      ),
      shipping_address:addresses(*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as unknown as OrderWithItems[];
}

export async function getOrderByNumber(orderNumber: string): Promise<OrderWithItems | null> {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        product:products(*)
      ),
      shipping_address:addresses(*)
    `)
    .eq('order_number', orderNumber)
    .maybeSingle();

  if (error) throw error;
  return data as unknown as OrderWithItems | null;
}

export async function updateOrderStatus(orderId: string, status: string): Promise<void> {
  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId);

  if (error) throw error;
}

export async function updatePaymentStatus(orderId: string, paymentStatus: string): Promise<void> {
  const { error } = await supabase
    .from('orders')
    .update({ payment_status: paymentStatus })
    .eq('id', orderId);

  if (error) throw error;
}

async function getAddress(addressId: string): Promise<Address | null> {
  const { data, error } = await supabase
    .from('addresses')
    .select('*')
    .eq('id', addressId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

async function generateOrderNumber(): Promise<string> {
  const { data, error } = await supabase.rpc('generate_order_number');
  if (error) throw error;
  return data;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    processing: 'bg-indigo-100 text-indigo-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
  };
  return labels[status] || status;
}
