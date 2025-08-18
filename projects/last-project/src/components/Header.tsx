"use client";

import { UserContext, UserContextType } from "@/contexts/UserContext";
import { Avatar, Badge, Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import { useContext } from "react";
import ProfileMenu from "./cards/ProfileMenu";

export default function Header() {
  const { user } = useContext(UserContext) as UserContextType;

  return (
    <Card variant="classic">
      <div className="w-full flex justify-between">
        <div className="relative w-10 h-10 flex justify-center items-center">
          <Image
            src={"https://cdn-icons-png.flaticon.com/512/12474/12474329.png"}
            alt="Login Image"
            fill
          />
        </div>
        <div className="w-fit">
          {user ? (
            <ProfileMenu user={user} />
          ) : (
            <Button variant="outline" size={"1"}>Login</Button>
          )}
          
        </div>
      </div>
    </Card>
  );
}
