"use client";

import { useOptimistic, useState, useTransition } from "react";
import { LayoutDashboard } from "lucide-react";
import AddProductButton from "./UI/buttons/AddProduct";
import AdminProductCard from "./UI/cards/AdminProductCard";
import { deleteProduct } from "@/actions/server-actions";
import { Product } from "./UI/cards/AdminProductCard";

export default function AdminPanel({ products }: { products: Array<any> }) {
  const [tab, setTab] = useState("");
  const [realProducts, setRealProducts] = useState(products);
  const [isPending, startTransition] = useTransition();
  const [status, setStatus ] = useState<string | null>("");

  const [optimisticProducts, setOptimisticProducts] = useOptimistic(
    realProducts,
    (prevProducts: Product[], deleteId: number) =>
      prevProducts.filter((product) => product.productId !== deleteId)
  );

  async function handleDelete(productId: number) {
    const backup = [...optimisticProducts];
    startTransition(async () => {
      setOptimisticProducts(productId);
      setRealProducts((prev) =>
        prev.filter((item) => item.productId !== productId)
      );

      try {
        const res = await deleteProduct(productId);
        if (res?.error) throw new Error(res.error);
        setStatus(res.success || "");
      } catch (err: any) {
        setRealProducts(backup);
        setStatus(err.message)
      }
    });
  }


  return (
    <>
      <div className="p-10 mb-10 border border-black/10 mx-10 sticky h-fit top-36 bg-white">
        <h1 className="text-2xl font-bold mb-10 min-w-40">Ecomm App</h1>
        <button className="flex items-center gap-2 cursor-pointer hover:text-purple-500">
          {" "}
          <LayoutDashboard size={18} /> Products{" "}
        </button>
      </div>
      <div className="px-10 pt-10 flex flex-col bg-white w-full">
        <p className="text-red-500">{status}</p>
        <div className="flex items-center gap-5 justify-between ">
          <h1 className="font-semibold text-gray-800 text-lg">Products List</h1>
          <AddProductButton />
        </div>
        <div className="flex flex-col space-y-3 bg-gray-100/50 my-5 p-3 w-full">
          <ListHeaders />
          {optimisticProducts.length>0 && optimisticProducts?.map((product) => (
            <AdminProductCard
              key={product.id}
              handleDelete={() => handleDelete(product.productId)}
              product={product}
            />
          ))}
          ;
        </div>
      </div>
    </>
  );
}

function ListHeaders() {
  return (
    <>
      <div className="flex gap-5 bg-white rounded shadow p-2">
        <div className="w-1/4  flex gap-1 items-center ">
          <h1 className="font-semibold">Product</h1>
        </div>
        <div className="w-1/5  flex items-center">
          <h1 className="font-semibold">Category</h1>
        </div>
        <div className="w-1/5  flex items-center">
          <h1 className="font-semibold">Price</h1>
        </div>
        <div className="w-1/5 gap-2 flex items-center">
          <h1 className="font-semibold">Rating</h1>
        </div>
        <div className="w-1/5 flex items-center">
          <h1 className="font-semibold">Actions</h1>
        </div>
      </div>
    </>
  );
}
