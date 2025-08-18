"use client";

import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";



export default function CollapsibleSuppliers({
  icon,
  label,
  suppliers,
}: {
  icon: React.ReactNode;
  label: string;
  suppliers: { id: string; name: string; }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger className="flex items-center justify-end w-full px-3 py-2 font-medium rounded-md ">
        <span className="flex items-center gap-2">
          {icon} {label}
        </span>
        <ChevronDownIcon
          size={16}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </Collapsible.Trigger>

      <Collapsible.Content className="mt-1 pl-6 space-y-1">
        {suppliers.map((supplier) => (
          <button
            key={supplier.id}
            className="block w-full px-2 py-1 text-sm  rounded-md"
          >
            {supplier.name}
          </button>
        ))}
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
