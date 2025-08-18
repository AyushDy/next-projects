import gqlClient from "@/lib/services/gql";
import AddUserButton from "./buttons/AddUserButton";
import { GET_ALL_SUPPLIERS, GET_ALL_USERS } from "@/lib/gql/queries";

import  { UserListCardProps } from "./cards/AvatarCard";
import CollapsibleSuppliers from "./ui/CollapsibleSuppliers";
import CollapsibleUsers from "./ui/CollapsibleUsers";
import { Users } from "lucide-react";
import AddSupplierButton from "./buttons/AddSupplierButton";

export default async function AdminPanel() {
  const users = (await gqlClient.request(GET_ALL_USERS, { role: "staff" })) as {
    getAllUsers: UserListCardProps[];
  };
  const suppliers = (await gqlClient.request(GET_ALL_SUPPLIERS)) as {
    getAllSuppliers: { id: string; name: string; }[];
  };

  return (
    <div className="w-full flex flex-col">
        <div className="flex justify-end gap-5">
           <AddUserButton />
           <AddSupplierButton />
        </div>
      <div className="w-full h-full flex flex-col">
        <CollapsibleUsers label="Users" users={users.getAllUsers} icon={<Users size={16}  />} />
        <CollapsibleSuppliers icon={<Users size={16} />} label="Suppliers" suppliers={suppliers.getAllSuppliers} />
      </div>
    </div>
  );
}


