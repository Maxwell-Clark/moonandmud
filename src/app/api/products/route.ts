import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, DbProduct } from '@/lib/supabase/client';
import { getSession } from '@/lib/auth';

// GET all products
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST new product
export async function POST(request: NextRequest) {
  try {
    const isAuthenticated = await getSession();
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, slug, price, category, description, images, featured, quantity } = body;

    // Validate required fields
    if (!name || !slug || !price || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('products')
      .insert({
        name,
        slug,
        price: parseFloat(price),
        category,
        description: description || '',
        images: images || [],
        featured: featured || false,
        quantity: parseInt(quantity, 10) || 0,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
