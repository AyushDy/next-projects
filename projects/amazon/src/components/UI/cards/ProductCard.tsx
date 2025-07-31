//@ts-nocheck
"use client";
import { categoryColors } from "@/data/data";
import AddToCartButton from "../buttons/AddToCartButton";
import Rating from "../Rating";
import Link from "next/link";
import { useState } from "react";

export default function ProductCard({ product }: any) {
  const [loading, setLoading] = useState<boolean>(true);


  return (
    <div className=" rounded-lg  justify-between flex flex-col p-3 shadow mx-auto">
      <div>
        <Link href={`/product/${encodeURIComponent(product.productId)}`}>
          <div className="bg-gray-200 rounded-md  relative">
            {loading && (
              <div className="absolute top-0 left-0 w-full h-1/2 animate-pulse bg-gray-300 rounded-md z-0" />
            )}

            <img
              className={`mx-auto h-auto w-full transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100" }`}
              src={product.image_url}
              alt={product.title}
              onLoad={()=>setLoading(false)}
              onError={()=>setLoading(false)}
            />
          </div>
        </Link>

        <div className="flex flex-col ">
          <h1 className="text-2xl font-semibold my-1 line-clamp-1">
            {product.title}
          </h1>
          <div className="flex gap-2 text-xs">
            <h4
              className={`product-card text-gray-800 border rounded-full py-0.5 px-1 flex items-center justify-center font-bold hover:text-white`}
              style={{
                opacity: 0.5,
                borderColor: categoryColors[product.category] || "#f0f0f0",
                borderWidth: "2px",
                color: categoryColors[product.category] || "#000",
              }}
            >
              {product.category}
            </h4>
          </div>
          <p className="font-light text-gray-600 leading-4 text-sm my-4 line-clamp-2">
            {product.description}...
          </p>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="">
          <h2 className="text-lg font-semibold">
            <Rating rating={product.rating} />
          </h2>
        </div>
        <h3 className="text-lg font-semibold ">${product.price}</h3>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
