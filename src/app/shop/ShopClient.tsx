'use client';

import { useState, useMemo } from 'react';
import ProductGrid from '@/components/ProductGrid';
import CategoryFilter from '@/components/CategoryFilter';
import { sortProducts } from '@/lib/products';
import { Product } from '@/data/products';

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name';

interface ShopClientProps {
  initialProducts: Product[];
}

export default function ShopClient({ initialProducts }: ShopClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const filteredAndSortedProducts = useMemo(() => {
    let filtered =
      selectedCategory === 'all'
        ? initialProducts
        : initialProducts.filter((p) => p.category === selectedCategory);

    return sortProducts(filtered, sortBy);
  }, [initialProducts, selectedCategory, sortBy]);

  return (
    <>
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
    </>
  );
}
