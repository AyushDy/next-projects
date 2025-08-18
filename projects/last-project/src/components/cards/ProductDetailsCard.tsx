"use client";

import { Card, Flex, Box, Text, Badge, Button, Avatar } from "@radix-ui/themes";
import AddSaleProductButton from "../buttons/AddSaleButton";
import RestockProductButton from "../buttons/RestockProductButton";
import EditProductButton from "../buttons/EditProductButton";
import { ProductWithSupplier } from "./ProductCard";

export default function ProductDetailCard({
  id,
  title,
  category,
  description,
  price,
  stock,
  imageUrl,
  supplier,
  supplierId,
}: ProductWithSupplier) {
  return (
    <Card variant="classic" className="w-fit max-w-4xl mx-20 shadow-lg p-6">
      <Flex direction="row" gap="6" align="start">
        <Box className="w-1/3">
          <Avatar
            src={imageUrl}
            fallback={title[0]?.toUpperCase()}
            radius="large"
            size="9"
            className="w-full h-auto rounded-2xl shadow-md"
          />
        </Box>

        <Box className="flex-1 space-y-3">
          <Flex direction={"column"} gap="2" align={"start"}>
            <Text size="5" weight="bold">
              {title}
            </Text>
          <Badge color="blue" size="2">
            {category}
          </Badge>

          <Text size="4" weight="bold" color="green">
            ${price.toFixed(2)}
          </Text>

          <Badge color={stock > 100 ? "green" : "red"} size="2">
            {`Stock: ${stock}`}
          </Badge>

          <Text size="2" className="text-gray-500">
            {description}
          </Text>

          <Text size="2" className="italic font-bold text-gray-400">
            {supplier?.name || "No supplier"}
          </Text>
          </Flex>

          <Flex gap="2" mt="3">
            <AddSaleProductButton
              product={{
                id,
                title,
                category,
                price,
                stock,
                supplierId,
                supplier,
                imageUrl,
                description,
              }}
            />
            <RestockProductButton stock={stock} id={id} title={title} />
            <EditProductButton
              product={{
                id,
                title,
                category,
                price,
                stock,
                supplierId,
                supplier,
                imageUrl,
                description,
              }}
            />
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
}
