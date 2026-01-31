import AdminHeader from '@/components/admin/AdminHeader';
import ProductForm from '@/components/admin/ProductForm';

export default function NewProductPage() {
  return (
    <div className="min-h-screen">
      <AdminHeader />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-gray-600 mt-1">Create a new product for your store</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <ProductForm />
        </div>
      </main>
    </div>
  );
}
