import { getProductById } from "@/actions/server-actions";
import { getCurrentUser } from "@/actions/auth-actions";
import { redirect } from "next/navigation";
import EditProductForm from "@/components/UI/forms/EditProductForm";


type props = {
  id : string
} 

export default async function Page({ params }: { params: Promise<{ id: string }>}) {
  const user = await getCurrentUser();
  if (!user || user?.role !== "admin") {
    redirect("/");
  }

  const { id } = await params;
  const product = await getProductById(parseInt(id));

  if (typeof product === "string") {
    return (
      <div className="pt-20 bg-gray-200/40 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-4">{product}</p>
          <a
            href="/admin"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Back to Admin Panel
          </a>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-20 bg-gray-200/40 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The product you're looking for doesn't exist.
          </p>
          <a
            href="/admin"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Back to Admin Panel
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-gray-200/40 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Edit Product
            </h1>
            <p className="text-gray-600">
              Update the product information below
            </p>
          </div>

          <EditProductForm product={product} />
        </div>
      </div>
    </div>
  );
}
