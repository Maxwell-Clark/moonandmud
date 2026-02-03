'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from './ImageUpload';

const CATEGORIES = ['mugs', 'bowls', 'vases', 'plates', 'planters', 'decorative'];

interface ProductFormProps {
  product?: {
    id: string;
    name: string;
    slug: string;
    price: number;
    category: string;
    description: string;
    images: string[];
    quantity: number;
    featured: boolean;
    in_stock: boolean;
  };
}

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const isEdit = !!product;

  const [form, setForm] = useState({
    name: product?.name || '',
    slug: product?.slug || '',
    price: product?.price?.toString() || '',
    category: product?.category || CATEGORIES[0],
    description: product?.description || '',
    images: product?.images || [],
    featured: product?.featured || false,
    quantity: product?.quantity?.toString() || '0',
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    setForm((prev) => ({
      ...prev,
      name,
      slug: isEdit ? prev.slug : generateSlug(name),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const url = isEdit ? `/api/products/${product.id}` : '/api/products';
      const method = isEdit ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          quantity: parseInt(form.quantity, 10) || 0,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save product');
      }

      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save product');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Product Name *
          </label>
          <input
            type="text"
            id="name"
            value={form.name}
            onChange={handleNameChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
            URL Slug *
          </label>
          <input
            type="text"
            id="slug"
            value={form.slug}
            onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">$</span>
            <input
              type="number"
              id="price"
              value={form.price}
              onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
              required
              min="0"
              step="0.01"
              className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            id="category"
            value={form.category}
            onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown focus:border-transparent capitalize"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat} className="capitalize">
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={form.description}
          onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Images
        </label>
        <ImageUpload
          images={form.images}
          onChange={(images) => setForm((prev) => ({ ...prev, images }))}
        />
      </div>

      <div className="flex items-center space-x-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm((prev) => ({ ...prev, featured: e.target.checked }))}
            className="h-4 w-4 text-brown border-gray-300 rounded focus:ring-brown"
          />
          <span className="ml-2 text-sm text-gray-700">Featured product</span>
        </label>

        <div className="flex items-center">
          <label htmlFor="quantity" className="text-sm text-gray-700 mr-2">
            Quantity in Stock
          </label>
          <input
            type="number"
            id="quantity"
            value={form.quantity}
            onChange={(e) => setForm((prev) => ({ ...prev, quantity: e.target.value }))}
            min="0"
            className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center justify-end space-x-4 pt-4 border-t">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-brown text-white rounded-md hover:bg-brown/90 transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  );
}
