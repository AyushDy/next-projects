import { UserWithoutPassword } from "@/contexts/UserContext";
import { Avatar, Badge, Box, Flex, Text } from "@radix-ui/themes";

export default function ProfileAvatar({ user }:{user: UserWithoutPassword }) {
  return (
    <Flex gap="3" align="center" className="ml-auto">
      <Avatar
        size="2"
        src={user.avatar || "vercel.svg"}
        radius="full"
        fallback="T"
      />
      <Box>
        <Text as="div" className="text-center" size="1" weight="bold">
          {user.name}
        </Text>
        <Badge>
          <Text as="div" size="2" color="gray">
            {user.role}
          </Text>
        </Badge>
      </Box>
    </Flex>
  );
}