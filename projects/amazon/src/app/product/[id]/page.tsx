

import { getProductById, searchProducts } from "@/actions/server-actions";
import ProductCard from "@/components/UI/cards/ProductCard";
import { Product } from "@prisma/client";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const {id} = await params;

  const product = await getProductById(parseInt(id)) as Product

  return {
    title: product?.title || "product",
    description: product?.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const product = await getProductById(parseInt(id)) as Product;

  if (!product?.id) {
    notFound();
  }

  return (
    <div>
      <ProductCard product={product} />
    </div>
  );
}
