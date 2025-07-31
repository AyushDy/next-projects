import { searchProducts } from "@/actions/server-actions";
import ProductCard from "@/components/UI/cards/ProductCard";
import { notFound } from "next/navigation";

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}) {
  const {q :query ,category ,minPrice, maxPrice} = await searchParams;

  let results;

  if(query){
    results = await searchProducts(query);
  }

  if (!Array.isArray(results)) {
    notFound();
  }

  const filteredProducts = results?.filter((product: any) => {
    if (category && category !== "all" && product.category !== category) {
      console.log("Category mismatch:", product.category, category);
      return false;
    }
    if (minPrice && parseFloat(product.price) < parseFloat(minPrice)) {
      return false;
    }
    if (maxPrice && parseFloat(product.price) > parseFloat(maxPrice)) {
      return false;
    }
    return true;
  });

  return (
    <div>
      <h1>
        Search Results for: <span className="text-blue-500">{query}</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 px-20 py-25">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-red-500">No results found for "{query}"</p>
        )}
      </div>
    </div>
  );
}
