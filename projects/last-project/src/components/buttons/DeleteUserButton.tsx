"use client";
import {  DELETE_USER } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/gql";
import { Button, Dialog, Flex, } from "@radix-ui/themes";

export default function DeleteUserButton({
  userId,

}: {
  userId: string;
}) {

  async function handleDelete() {
    try {
      await gqlClient.request(DELETE_USER, { userId });
      alert("User deleted successfully");
    } catch (error: any) {
      console.log(error.message);
      alert("Failed to delete user");
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="soft" color="red" size={"1"}>Delete</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Delete User</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Are you sure you want to delete this user?
        </Dialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button color="red" onClick={handleDelete}>Delete</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}