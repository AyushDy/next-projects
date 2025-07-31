//@ts-no

import { getCurrentUser } from "@/actions/auth-actions";
import { getAllProducts } from "@/actions/server-actions";
import AdminPanel from "@/components/AdminPanel";
import { redirect } from "next/navigation";


export default async function Page() {
  const user = await getCurrentUser();
  if(!user || user?.role !== "admin"){
    redirect('/');
  }

  const productsResult = await getAllProducts(1,20);
  const products = Array.isArray(productsResult) ? productsResult : [];

  return <div className="pt-20 bg-gray-200/40 min-h-screen flex">
    <AdminPanel products={products}/>
  </div>;
}
