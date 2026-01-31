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
    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible">
      <div className="flex gap-2 pb-2 sm:pb-0 sm:flex-wrap min-w-max sm:min-w-0">
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-3 py-2 sm:px-4 rounded-full text-sm font-medium transition-colors whitespace-nowrap min-h-[44px] flex items-center ${
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
            className={`px-3 py-2 sm:px-4 rounded-full text-sm font-medium transition-colors capitalize whitespace-nowrap min-h-[44px] flex items-center ${
              selectedCategory === category
                ? 'bg-gold text-white'
                : 'bg-cream-muted text-brown hover:bg-gold/20'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
