"use client";

import { Avatar, Badge, Box, Flex, Text, Card, Button } from "@radix-ui/themes";
import DeleteUserButton from "../buttons/DeleteUserButton";

export interface UserListCardProps {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  avatar?: string;
}

export default function AvatarCard({
  id,
  name,
  username,
  email,
  role,
  avatar,
}: UserListCardProps) {
  return (
    <Card variant="surface" className="w-full" key={id} >
      <Flex align="center" gap="4" justify="between">
        <Avatar
          size="2"
          src={avatar || ""}
          radius="full"
          fallback={name[0]?.toUpperCase()}
        />

        <Box className="flex-1">
          <Flex align="center" gap="2">
            <Text as="div" size="1" color="gray">
            @{username}
            <Badge color={role === "admin" ? "red" : "blue"} size={"1"}>{role}</Badge>
          </Text>
          </Flex>
          <Text as="div" size="1">
            {email}
          </Text>
        </Box>
        <DeleteUserButton userId={id} />
      </Flex>
    </Card>
  );
}
