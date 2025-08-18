"use client";
import { CREATE_SALE } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/gql";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { ProductWithSupplier } from "../cards/ProductCard";

export default function AddSaleProductButton({
  product,

}: {
  product: ProductWithSupplier;
}) {
  const [quantity, setQuantity] = useState<number>(product.stock);

  async function handleSale() {
    if (product.stock < quantity) {
      alert("Insufficient stock");
      return;
    }
    try {
      const res = await gqlClient.request(CREATE_SALE, {
        productId: product.id,
        quantity,
      });
      alert("Sale created successfully");
    } catch (error: any) {
      console.log(error.message);
      alert("Failed to create sale");
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button size={"1"}>Add Sale</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add Sale</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Enter amount to add to sale for {product.title}.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Quantity
            </Text>
            <TextField.Root
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              placeholder="Enter quantity"
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={handleSale}>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
