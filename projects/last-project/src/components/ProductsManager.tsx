import gqlClient from "@/lib/services/gql";
import AddProductButton from "./buttons/AddProductButton";
import { GET_ALL_PRODUCTS } from "@/lib/gql/queries";
import ProductCard, { ProductWithSupplier } from "./cards/ProductCard";

export default async function ProductsManager() {
  const data = (await gqlClient.request(GET_ALL_PRODUCTS)) as {
    getAllProducts: ProductWithSupplier[];
  };
  const products = data.getAllProducts;

  return (
    <div className="w-fit flex flex-col space-y-4">
      <AddProductButton />
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
