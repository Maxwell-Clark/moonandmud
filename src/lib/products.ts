import { supabaseAdmin, DbProduct } from '@/lib/supabase/client';
import { products as staticProducts, Product, CATEGORIES } from '@/data/products';

// Check if Supabase is configured
const isSupabaseConfigured = () => {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-project.supabase.co'
  );
};

// Convert database product to app product format
function dbToProduct(dbProduct: DbProduct): Product {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    slug: dbProduct.slug,
    price: dbProduct.price,
    category: dbProduct.category,
    description: dbProduct.description,
    images: dbProduct.images,
    featured: dbProduct.featured,
    inStock: dbProduct.in_stock,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    return staticProducts;
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      return staticProducts;
    }

    return (data || []).map(dbToProduct);
  } catch (error) {
    console.error('Error fetching products:', error);
    return staticProducts;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  if (!isSupabaseConfigured()) {
    return staticProducts.find((product) => product.slug === slug);
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      return staticProducts.find((product) => product.slug === slug);
    }

    return data ? dbToProduct(data) : undefined;
  } catch (error) {
    return staticProducts.find((product) => product.slug === slug);
  }
}

export async function getProductById(id: string): Promise<Product | undefined> {
  if (!isSupabaseConfigured()) {
    return staticProducts.find((product) => product.id === id);
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return staticProducts.find((product) => product.id === id);
    }

    return data ? dbToProduct(data) : undefined;
  } catch (error) {
    return staticProducts.find((product) => product.id === id);
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    return staticProducts.filter((product) => product.featured && product.inStock);
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('featured', true)
      .eq('in_stock', true)
      .order('created_at', { ascending: false });

    if (error) {
      return staticProducts.filter((product) => product.featured && product.inStock);
    }

    return (data || []).map(dbToProduct);
  } catch (error) {
    return staticProducts.filter((product) => product.featured && product.inStock);
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getAllProducts();
  if (category === 'all') return products;
  return products.filter((product) => product.category === category);
}

export async function getRelatedProducts(product: Product, limit: number = 4): Promise<Product[]> {
  const products = await getAllProducts();
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

export async function getAllSlugs(): Promise<string[]> {
  const products = await getAllProducts();
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
