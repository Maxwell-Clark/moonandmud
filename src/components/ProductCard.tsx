import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/data/products';
import AddToCartButton from './AddToCartButton';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-tan/10">
      <Link href={`/shop/${product.slug}`} className="block relative aspect-square">
        <div className="absolute inset-0 bg-cream-muted">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gold/10 to-terracotta/10">
              <svg
                className="w-16 h-16 text-tan/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </div>
          )}
        </div>
        {!product.inStock && (
          <div className="absolute top-3 right-3 bg-brown text-white text-xs px-2 py-1 rounded">
            Sold Out
          </div>
        )}
        {product.featured && product.inStock && (
          <div className="absolute top-3 left-3 bg-gold text-white text-xs px-2 py-1 rounded">
            Featured
          </div>
        )}
      </Link>

      <div className="p-4">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-display text-lg font-semibold text-brown hover:text-gold transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-terracotta text-sm mt-1 capitalize">{product.category}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-semibold text-brown">
            ${product.price.toFixed(2)}
          </span>
          {product.inStock ? (
            <AddToCartButton
              product={product}
              className="btn-primary text-sm py-2 px-4"
            />
          ) : (
            <span className="text-brown/60 text-sm">Out of stock</span>
          )}
        </div>
      </div>
    </div>
  );
}
