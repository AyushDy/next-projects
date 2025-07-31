"use client";

import { updateProduct } from "@/actions/server-actions";
import { categoryList } from "@/data/data";
import { FormEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, X } from "lucide-react";

export interface Product {
  productId: number;
  title: string;
  description: string;
  rating: number;
  price: number;
  image_url: string;
  category: string;
}

export default function EditProductForm({ product }: { product: Product }) {
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [rating, setRating] = useState(product.rating);
  const [url, setUrl] = useState(product.image_url);
  const [category, setCategory] = useState(product.category);
  const [price, setPrice] = useState(product.price);
  const [status, setStatus] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!category) {
      setStatus("Please select a category");
      return;
    }

    const updateData = {
      title,
      description,
      rating,
      price,
      image_url: url,
      category,
    };

    startTransition(async () => {
      const result = await updateProduct(product.productId, updateData);
      setStatus(result);

      if (result === "Product Updated Successfully") {
        setTimeout(() => {
          router.push("/admin");
        }, 1500);
      }
    });
  }

  const handleCancel = () => {
    router.push("/admin");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={handleCancel}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            title="Back to Admin Panel"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Edit Product: {product.title}
            </h2>
            <p className="text-sm text-gray-500">
              Product ID: {product.productId}
            </p>
          </div>
        </div>
      </div>

      {/* Product Preview */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Current Product Preview
        </h3>
        <div className="flex items-center gap-4">
          <img
            src={product.image_url}
            alt={product.title}
            className="w-16 h-16 object-cover rounded-md border"
            onError={(e) => {
              e.currentTarget.src =
                "https://via.placeholder.com/64x64?text=No+Image";
            }}
          />
          <div>
            <p className="font-medium text-gray-800">{product.title}</p>
            <p className="text-sm text-gray-500">
              ${product.price} • {product.category}
            </p>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Product Title *
          </label>
          <input
            id="title"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            name="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter product title..."
            disabled={isPending}
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description *
          </label>
          <textarea
            id="description"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            name="description"
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description..."
            disabled={isPending}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Rating (0-5) *
            </label>
            <input
              id="rating"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              name="rating"
              type="number"
              step="0.1"
              max={5}
              min={0}
              required
              value={rating}
              onChange={(e) => setRating(parseFloat(e.target.value) || 0)}
              placeholder="4.5"
              disabled={isPending}
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Price ($) *
            </label>
            <input
              id="price"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              name="price"
              type="number"
              step="0.01"
              min={0}
              required
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
              placeholder="99.99"
              disabled={isPending}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="image-url"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Image URL *
          </label>
          <input
            id="image-url"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            name="image-url"
            type="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            disabled={isPending}
          />
          {url && (
            <div className="mt-2">
              <img
                src={url}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-md border"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Category *
          </label>
          <select
            id="category"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            name="category"
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
            disabled={isPending}
          >
            <option value="">Select a category</option>
            {categoryList.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, " ")}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6 border-t">
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center"
            disabled={isPending}
          >
            <X size={16} className="mr-2" />
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Updating...
              </>
            ) : (
              <>
                <Save size={16} className="mr-2" />
                Update Product
              </>
            )}
          </button>
        </div>

        {/* Status Message */}
        {status && (
          <div
            className={`mt-4 p-4 rounded-md ${
              status === "Product Updated Successfully"
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-red-100 text-red-700 border border-red-200"
            }`}
          >
            {status === "Product Updated Successfully" ? (
              <div className="flex items-center">
                <Save size={16} className="mr-2" />
                Product updated successfully! Redirecting to admin panel...
              </div>
            ) : (
              status
            )}
          </div>
        )}
      </form>
    </div>
  );
}
