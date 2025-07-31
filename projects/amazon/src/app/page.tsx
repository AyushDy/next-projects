import ProductCard from "@/components/UI/cards/ProductCard";
import { getAllProducts, getProductsCount } from "@/actions/server-actions";
import { notFound } from "next/navigation";
import PaginationButtons from "@/components/UI/buttons/PaginationButtons";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string }>;
}) {
  const { page: currentPage = "1", limit = "20" } = await searchParams;

  const [products, totalProducts] = await Promise.all([
    await getAllProducts(parseInt(currentPage), parseInt(limit)),
    await getProductsCount(),
  ]);

  if (!Array.isArray(products)) {
    notFound();
  }

  const totalPages = Math.ceil(totalProducts / parseInt(limit));

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-15 px-10 sm:px-20 xs:py-25 w-full">
        {products?.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <PaginationButtons totalPages={totalPages} currentPage={parseInt(currentPage)} />
    </div>
  );
}
