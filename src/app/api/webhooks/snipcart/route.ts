import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.eventName !== 'order.completed') {
      return NextResponse.json({ ok: true });
    }

    const token = body.content?.token;
    if (!token) {
      return NextResponse.json({ error: 'Missing order token' }, { status: 400 });
    }

    // Validate the order with Snipcart API
    const snipcartSecret = process.env.SNIPCART_SECRET_API_KEY;
    if (!snipcartSecret) {
      console.error('SNIPCART_SECRET_API_KEY is not configured');
      return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
    }

    const orderRes = await fetch(`https://app.snipcart.com/api/v3/orders/${token}`, {
      headers: {
        Authorization: `Bearer ${snipcartSecret}`,
        Accept: 'application/json',
      },
    });

    if (!orderRes.ok) {
      const errorBody = await orderRes.text();
      console.error('Failed to validate order with Snipcart:', orderRes.status, errorBody);
      console.error('Token used:', token);
      return NextResponse.json({ error: 'Order validation failed' }, { status: 400 });
    }

    const order = await orderRes.json();
    const items: { id: string; quantity: number }[] = order.items || [];

    // Decrement quantity for each item in the order
    for (const item of items) {
      const { data: product } = await supabaseAdmin
        .from('products')
        .select('quantity')
        .eq('id', item.id)
        .single();

      if (product) {
        const newQuantity = Math.max(0, product.quantity - item.quantity);
        await supabaseAdmin
          .from('products')
          .update({ quantity: newQuantity, updated_at: new Date().toISOString() })
          .eq('id', item.id);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
