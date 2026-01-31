'use client';

import { CATEGORIES } from '@/data/products';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onCategoryChange('all')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedCategory === 'all'
            ? 'bg-gold text-white'
            : 'bg-cream-muted text-brown hover:bg-gold/20'
        }`}
      >
        All
      </button>
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
            selectedCategory === category
              ? 'bg-gold text-white'
              : 'bg-cream-muted text-brown hover:bg-gold/20'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
