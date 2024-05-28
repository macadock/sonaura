import {
  RealtimePostgresInsertPayload,
  RealtimePostgresUpdatePayload,
} from '@supabase/supabase-js';
import supabase from '@/lib/supabase';
import { useCallback, useMemo } from 'react';
import { Database } from '@/types/supabase';

export type Order = Database['public']['Tables']['orders']['Row'];
export type CreateOrderInput = Database['public']['Tables']['orders']['Insert'];
export type UpdateOrderInput = Database['public']['Tables']['orders']['Update'];

export enum PaymentProvider {
  PAYPLUG = 'PayPlug',
}

export enum OrderStatus {
  NEW = 'new',
  WAITING_PAYMENT = 'waitingPayment',
  PAID = 'paid',
  WAITING_PICKUP = 'waitingPickup',
  DELIVERED = 'delivered',
  CANCELED = 'canceled',
}

export async function getOrderById(id: string) {
  return supabase.from('orders').select('*').eq('id', id).single();
}

export async function getOrders() {
  return supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });
}

export async function createOrder(order: CreateOrderInput) {
  return supabase.from('orders').insert([order]);
}

export async function updateOrder(order: UpdateOrderInput) {
  return supabase
    .from('orders')
    .update({
      ...order,
    })
    .eq('id', order.id);
}

export function useOrdersRealTime() {
  const newOrder = useCallback((handleNewOrder: (order: Order) => void) => {
    supabase
      .channel('track-new-orders')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (payload: RealtimePostgresInsertPayload<Order>) => {
          handleNewOrder(payload.new);
        },
      )
      .subscribe();
  }, []);

  const updatedOrder = useCallback(
    (handleUpdatedOrder: (order: Order) => void) => {
      supabase
        .channel('track-updated-orders')
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'orders' },
          (payload: RealtimePostgresUpdatePayload<Order>) => {
            handleUpdatedOrder(payload.new);
          },
        )
        .subscribe();
    },
    [],
  );

  return useMemo(
    () => ({
      newOrder,
      updatedOrder,
    }),
    [newOrder, updatedOrder],
  );
}
