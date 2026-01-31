import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';
import ProductTable from '@/components/admin/ProductTable';
import { supabaseAdmin } from '@/lib/supabase/client';

export const dynamic = 'force-dynamic';

async function getProducts() {
  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data || [];
}

export default async function AdminDashboard() {
  const products = await getProducts();

  return (
    <div className="min-h-screen">
      <AdminHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600 mt-1">
              {products.length} product{products.length !== 1 ? 's' : ''} total
            </p>
          </div>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center px-4 py-2 bg-brown text-white rounded-md hover:bg-brown/90 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </Link>
        </div>

        <ProductTable products={products} />
      </main>
    </div>
  );
}
