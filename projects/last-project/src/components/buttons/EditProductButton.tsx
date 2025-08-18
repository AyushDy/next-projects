"use client";

import { ADD_PRODUCT, GET_ALL_SUPPLIERS, UPDATE_PRODUCT } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/gql";
import {
  Button,
  Dialog,
  Flex,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductWithSupplier } from "../cards/ProductCard";
import { ProductCategory } from "@prisma/client";

const productCategories: ProductCategory[] = [
  "electronics",
  "clothing",
  "accessories",
  "others",
  "beauty",
  "food",
  "furniture",
  "decor",
];

export default function EditProductButton({product}: {product: ProductWithSupplier}) {
  const [title, setTitle] = useState(product?.title || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [category, setCategory] = useState<ProductCategory>(product?.category || "others");
  const [stock, setStock] = useState(product?.stock || 0);
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");
  const [supplierId, setSupplierId] = useState(product?.supplierId || "placeholder");
  const [suppliers, setSuppliers] = useState<any[]>([]);

  const router = useRouter();

  useEffect(() => {
    async function getAllSuppliers() {
      const data = (await gqlClient.request(GET_ALL_SUPPLIERS)) as { getAllSuppliers: any[] };
      setSuppliers(data.getAllSuppliers || []);
    }
    getAllSuppliers();
  }, []);

  async function handleSubmit() {
    if(supplierId === "placeholder"){
      alert("Please select a supplier");
      return;
    }
    try {
      const data = (await gqlClient.request(UPDATE_PRODUCT, {
        editProductId: product.id,
        title,
        description,
        price,
        category,
        stock,
        imageUrl,
        supplierId,
      })) as { editProduct: any };
      if (data.editProduct) {
        alert("Product updated successfully");
        router.refresh();
      } else {
        alert("Product update failed");
      }
    } catch (error:any) {
      console.log(error.message)
      alert("Product update failed");
    }
  }


  return (
    <div className="flex">
      <Dialog.Root>
        <Dialog.Trigger>
          <Button size={"1"} variant="solid">Edit Product</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Edit Product</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Fill in the details to edit the product.
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Product Title
              </Text>
              <TextField.Root
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter product title"
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Product Description
              </Text>
              <TextField.Root
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Product Image URL
              </Text>
              <TextField.Root
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter product image URL"
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Product Price
              </Text>
              <TextField.Root
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="Enter product price"
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Product Stock
              </Text>
              <TextField.Root
                type="number"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                placeholder="Enter product stock"
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Product Category
              </Text>
              <Select.Root
                value={category}
                onValueChange={(value) => setCategory(value as ProductCategory)}
              >
                <Select.Trigger />
                <Select.Content>
                  <Select.Group>
                    <Select.Label>Product category</Select.Label>
                    {productCategories.map((_category: ProductCategory) => (
                      <Select.Item key={_category} value={_category}>
                        {_category}
                      </Select.Item>
                    ))}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Product Supplier
              </Text>
              <Select.Root
                value={supplierId}
                onValueChange={(value) => setSupplierId(value)}
              >
                <Select.Trigger />
                <Select.Content>
                  <Select.Group>
                    <Select.Item value="placeholder" disabled>
                      Select a supplier
                    </Select.Item>
                    {suppliers.map((supplier) => (
                      <Select.Item key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </Select.Item>
                    ))}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </label>
          </Flex>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={handleSubmit}>Save</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
