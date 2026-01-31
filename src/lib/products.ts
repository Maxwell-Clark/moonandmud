import { products, Product, Category, CATEGORIES } from '@/data/products';

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured && product.inStock);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return products;
  return products.filter((product) => product.category === category);
}

export function getRelatedProducts(product: Product, limit: number = 4): Product[] {
  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category || p.featured) &&
        p.inStock
    )
    .slice(0, limit);
}

export function getAllCategories(): string[] {
  return ['all', ...CATEGORIES];
}

export function getAllSlugs(): string[] {
  return products.map((product) => product.slug);
}

export function sortProducts(
  productList: Product[],
  sortBy: 'price-asc' | 'price-desc' | 'name' | 'newest'
): Product[] {
  const sorted = [...productList];

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'newest':
    default:
      return sorted;
  }
}
