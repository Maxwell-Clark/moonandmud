import { Suspense } from 'react';
import { getAllProducts } from '@/lib/products';
import ShopClient from './ShopClient';

export const revalidate = 2;

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <div className="bg-cream min-h-screen">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-cream-dark to-cream py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-brown mb-4">
            Shop My Collection
          </h1>
          <p className="text-brown/70 max-w-2xl mx-auto">
            Browse my complete collection of handcrafted pottery. Each piece is
            made with care in my St. George studio.
          </p>
        </div>
      </div>

      {/* Filters and Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Suspense fallback={<div className="text-center py-8">Loading products...</div>}>
          <ShopClient initialProducts={products} />
        </Suspense>
      </div>
    </div>
  );
}
