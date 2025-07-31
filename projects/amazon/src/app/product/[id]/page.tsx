//@ts-nocheck

import { getProductById, searchProducts } from "@/actions/server-actions";
import ProductCard from "@/components/UI/cards/ProductCard";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const id = parseInt(params.id);

  const product = await getProductById(id)

  return {
    title: product?.title || "product",
    description: product?.description,
  };
}

export default async function ProductPage({ params }) {
  const id = (await parseInt(params?.id)) || 1

  const product = await getProductById(id);

  if (!product?.id) {
    notFound();
  }

  return (
    <div>
      <ProductCard product={product} />
    </div>
  );
}
