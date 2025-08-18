import { Card, Flex, Box, Text, Badge, Button, Avatar } from "@radix-ui/themes";
import AddSaleProductButton from "../buttons/AddSaleButton";
import Link from "next/link";
import RestockProductButton from "../buttons/RestockProductButton";
import { Product } from "@prisma/client";

export type ProductWithSupplier = Product & {
  supplier: {
    id: string;
    name: string;
  };
};

export default function ProductListCard({
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
    <Card variant="surface" className="w-full">
      <Flex align="center" justify="between" gap="2">
        <Link href={`/${id}`}>
          <Avatar
            src={imageUrl}
            fallback={title[0]?.toUpperCase()}
            radius="small"
            size="5"
          />
        </Link>

        <Box className="flex-1">
          <Flex gap={"1"} align={"center"}>
            <Text size="1" weight="bold">
              {title}
            </Text>
            <Badge color="blue">{category}</Badge>
          </Flex>
          <Flex gap="1" align="center">
            <Badge color={stock > 100 ? "green" : "red"}>
              {`stock: ${stock}`}
            </Badge>
            <Text size="1" weight="bold" color="green">
              ${price.toFixed(2)}
            </Text>
          </Flex>
          <Text size="1" className="text-gray-300">
            {supplier?.name || "No supplier"}
          </Text>
        </Box>

        <Flex gap="1" direction={"column"}>
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
          
        </Flex>
      </Flex>
    </Card>
  );
}
