'use client';

import { useState, useMemo } from 'react';
import ProductGrid from '@/components/ProductGrid';
import CategoryFilter from '@/components/CategoryFilter';
import { getAllProducts, sortProducts } from '@/lib/products';
import { Product } from '@/data/products';

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const allProducts = getAllProducts();

  const filteredAndSortedProducts = useMemo(() => {
    let filtered =
      selectedCategory === 'all'
        ? allProducts
        : allProducts.filter((p) => p.category === selectedCategory);

    return sortProducts(filtered, sortBy);
  }, [allProducts, selectedCategory, sortBy]);

  return (
    <div className="bg-cream min-h-screen">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-cream-dark to-cream py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-brown mb-4">
            Shop Our Collection
          </h1>
          <p className="text-brown/70 max-w-2xl mx-auto">
            Browse our complete collection of handcrafted pottery. Each piece is
            made with care in our Portland studio.
          </p>
        </div>
      </div>

      {/* Filters and Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-brown text-sm">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-2 rounded-lg border border-tan/30 bg-white text-brown focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-brown/70 mb-6">
          Showing {filteredAndSortedProducts.length} product
          {filteredAndSortedProducts.length !== 1 ? 's' : ''}
        </p>

        {/* Product Grid */}
        <ProductGrid products={filteredAndSortedProducts} />
      </div>
    </div>
  );
}
