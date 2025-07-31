"use client";
import { categoryColors } from "@/data/data";
import { FaStar } from "react-icons/fa";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ConfirmationModal from "../ConfirmationModal";

type Category = keyof typeof categoryColors;

export interface Product {
  image_url: string;
  title: string;
  category: Category;
  price: number;
  rating: number;
  productId: string | number;
}

export default function AdminProductCard({ product, handleDelete }: { product: Product, handleDelete: ()=>void }) {
  const [modal, setModal] = useState<boolean>(false);

  

  return (
    <div className="flex gap-5 bg-white rounded shadow p-2">
      {modal && <ConfirmationModal confirm="Delete" onCancel={()=>setModal(false)} onConfirm={handleDelete}/>}
      <div className="w-1/4  flex gap-1 items-center ">
        <Image
          src={product.image_url}
          height={50}
          width={70}
          alt={product.title.substring(0, 10)}
        />
        <h1 className="line-clamp-1">{product.title}</h1>
      </div>
      <div className="w-1/5  flex items-center">
        <span
          className="px-2 py-1 rounded-full text-xs font-medium text-white"
          style={{
            backgroundColor: (categoryColors[product.category] as string) || "#666",
          }}
        >
          {product.category}
        </span>
      </div>
      <div className="w-1/5  flex items-center">$ {product.price}</div>
      <div className="w-1/5 gap-2 flex items-center">
        {product.rating} <FaStar className="text-yellow-500 " />
      </div>
      <div className="w-1/5 flex gap-2 items-center">
        <Link
          href={`/admin/edit/${product.productId}`}
          className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
          title="Edit Product"
        >
          <Edit size={16} />
        </Link>
        <button
          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
          title="Delete Product"
          onClick={() => {
            setModal(true);
          }}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
