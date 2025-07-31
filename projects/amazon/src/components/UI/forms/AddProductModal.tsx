"use client";

import { addProduct } from "@/actions/server-actions";
import { categoryList } from "@/data/data";
import { FormEvent, useState, useTransition } from "react";

export default function AddProductModal({
  toggleModal,
}: {
  toggleModal: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!category) {
      setStatus("Please select a category");
      return;
    }

    const form_data = {
      id: 144,
      title,
      description,
      rating,
      price,
      url,
      category,
    };

    startTransition(async () => {
      const result = await addProduct(form_data);
      setStatus(result);

      if (result === "success") {
        setTimeout(() => {
          toggleModal();
          window.location.reload(); // Refresh to show new product
        }, 1500);
      }
    });
  }

  return (
    <div
      onClick={toggleModal}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <form
        className="flex flex-col space-y-4 w-1/3 bg-white p-8 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Add New Product
        </h2>

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Title
          </label>
          <input
            id="title"
            className="w-full p-3 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            className="w-full p-3 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            name="description"
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description..."
            disabled={isPending}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Rating (0-5)
            </label>
            <input
              id="rating"
              className="w-full p-3 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price ($)
            </label>
            <input
              id="price"
              className="w-full p-3 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Image URL
          </label>
          <input
            id="image-url"
            className="w-full p-3 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            name="image-url"
            type="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            disabled={isPending}
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <select
            id="category"
            className="w-full p-3 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={toggleModal}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            disabled={isPending}
          >
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
                Adding...
              </>
            ) : (
              "Add Product"
            )}
          </button>
        </div>

        {status && (
          <div
            className={`mt-4 p-3 rounded-md ${
              status === "success"
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-red-100 text-red-700 border border-red-200"
            }`}
          >
            {status === "success" ? "Product added successfully!" : status}
          </div>
        )}
      </form>
    </div>
  );
}
