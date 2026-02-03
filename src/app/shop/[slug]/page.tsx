import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, getRelatedProducts, getAllSlugs } from '@/lib/products';
import AddToCartButton from '@/components/AddToCartButton';
import ProductImageGallery from '@/components/ProductImageGallery';
import ProductCard from '@/components/ProductCard';

export const revalidate = 60; // Revalidate every 60 seconds

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | Moon & Mud Pottery',
    };
  }

  return {
    title: `${product.name} | Moon & Mud Pottery`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product, 4);

  return (
    <div className="bg-cream min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm text-brown/70">
          <Link href="/" className="hover:text-gold transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-gold transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-brown">{product.name}</span>
        </nav>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <ProductImageGallery images={product.images} productName={product.name} />
            {!product.inStock && (
              <div className="absolute top-4 right-4 bg-brown text-white px-3 py-1 rounded-lg z-10">
                Sold Out
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="text-terracotta font-medium capitalize">
                {product.category}
              </span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-bold text-brown mb-4">
              {product.name}
            </h1>

            <p className="text-3xl font-semibold text-brown mb-6">
              ${product.price.toFixed(2)}
            </p>

            <div className="prose prose-brown mb-8">
              <p className="text-brown/70 leading-relaxed">{product.description}</p>
            </div>

            {/* Add to Cart Section */}
            <div className="mt-auto">
              {product.inStock ? (
                <div className="space-y-4">
                  <AddToCartButton
                    product={product}
                    className="btn-primary w-full text-lg py-4"
                  />
                  <p className="text-sm text-brown/70 text-center">
                    Free shipping on orders over $100
                  </p>
                </div>
              ) : (
                <div className="text-center py-4 bg-cream-muted rounded-lg">
                  <p className="text-brown font-medium">
                    This item is currently sold out
                  </p>
                  <p className="text-sm text-brown/70 mt-1">
                    Check back soon or contact us for availability
                  </p>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="mt-8 pt-8 border-t border-tan/20">
              <h3 className="font-display text-lg font-semibold text-brown mb-4">
                Product Details
              </h3>
              <ul className="space-y-2 text-brown/70">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Handcrafted in St. George, UT
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Food-safe glazes
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Dishwasher & microwave safe
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Each piece is unique
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-brown mb-8">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
