import AdminPanel from "@/components/admin-panel";
import AddSupplierButton from "@/components/buttons/AddSupplierButton";
import ProductSaleCharts from "@/components/ProductSaleCharts";
import ProductsManager from "@/components/ProductsManager";
import StaffPanel from "@/components/StaffPanel";
import { UserWithoutPassword } from "@/contexts/UserContext";
import { getUserFromCookies } from "@/lib/helper";

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = (await getUserFromCookies()) as UserWithoutPassword;

  return (
    <main className="flex h-full px-8">
      <div className="w-fit py-8">
        <ProductsManager />
      </div>
      <div className=" mr-auto"></div>
      <div className=" py-8 ">
        {user?.role === "admin" ? <AdminPanel /> : <StaffPanel />}
      </div>
    </main>
  );
}
