'use client';

import { Product } from '@/data/products';

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  className?: string;
}

export default function AddToCartButton({
  product,
  quantity = 1,
  className = 'btn-primary',
}: AddToCartButtonProps) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <button
      className={`snipcart-add-item ${className}`}
      data-item-id={product.id}
      data-item-price={product.price}
      data-item-url={`${baseUrl}/shop/${product.slug}/`}
      data-item-name={product.name}
      data-item-description={product.description}
      data-item-image={product.images[0]}
      data-item-quantity={quantity}
      data-item-max-quantity={product.quantity}
    >
      Add to Cart
    </button>
  );
}
