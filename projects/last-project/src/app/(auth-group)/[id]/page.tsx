import ProductSaleCharts, {
  SaleFormatted,
} from "@/components/ProductSaleCharts";
import { ProductWithSupplier } from "@/components/cards/ProductCard";
import ProductDetailCard from "@/components/cards/ProductDetailsCard";
import { GET_PRODUCT_BY_ID } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/gql";

export const dynamic = "force-dynamic";

export type ProductWithSales = ProductWithSupplier & { sales: SaleFormatted[] };

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = (await gqlClient.request(GET_PRODUCT_BY_ID, { id })) as {
    getProductById: ProductWithSales;
  };
  const product = res.getProductById;
  const sales = product.sales;

  return (
    <div>
      <ProductDetailCard {...product} />
      <div className="h-96 w-3xl">
        <ProductSaleCharts data={sales} />
      </div>
    </div>
  );
}
