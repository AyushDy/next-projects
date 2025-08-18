import { Users } from "lucide-react";
import AddSupplierButton from "./buttons/AddSupplierButton";
import CollapsibleSuppliers from "./ui/CollapsibleSuppliers";
import gqlClient from "@/lib/services/gql";
import { GET_ALL_SUPPLIERS } from "@/lib/gql/queries";

export default async function StaffPanel() {
  const suppliers = (await gqlClient.request(GET_ALL_SUPPLIERS)) as {
    getAllSuppliers: { id: string; name: string }[];
  };

  return (
    <div className="w-fit flex flex-col space-y-5">
      <div className="flex w-full justify-end">
        <AddSupplierButton />
      </div>
      <CollapsibleSuppliers
        icon={<Users size={16} />}
        label="Suppliers"
        suppliers={suppliers.getAllSuppliers}
      />
    </div>
  );
}
