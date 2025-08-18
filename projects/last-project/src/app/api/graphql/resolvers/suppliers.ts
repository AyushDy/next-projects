import prisma from "@/lib/services/prisma";

export type SupplierCreateInput = {
    name: string;
    email: string;
    phone?: string;
    address?: string;
};

export async function createSupplier(_:any, 
 args: SupplierCreateInput
){
    try {
        const supplier = await prisma.supplier.create({
            data: args,
        });
        return supplier? true: false;
    } catch (error: any) {
        console.error("Error creating supplier:", error.message);
        return false;
    }
}


export async function getAllSuppliers() {
    try {
        const suppliers = await prisma.supplier.findMany();
        return  suppliers? suppliers : null;
    } catch (error) {
        console.error("Error fetching suppliers:", error);
        return null;
    }
}