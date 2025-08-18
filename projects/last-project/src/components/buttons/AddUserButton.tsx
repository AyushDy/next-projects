"use client";

import { CREATE_USER } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/gql";
import {
  Button,
  Dialog,
  Flex,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useState } from "react";

export default function AddUserButton() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff");

  async function handleSubmit() {
    try {
      const data = await gqlClient.request(CREATE_USER, {
        role,
        password,
        email,
        username,
        name,
      }) as { createUser: any };
      if(data.createUser){
        alert("User created successfully");
        clearForm();
      }else{
        alert("User creation failed");
      }
    } catch (error) {
        alert("User creation failed");
    }
  }

  function clearForm() {
    setName("");
    setUsername("");
    setEmail("");
    setPassword("");
    setRole("staff");
  }

  return (
    <div className="flex mb-5">
    <Dialog.Root>
      <Dialog.Trigger >
        <Button variant="solid">Add User</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add User</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Fill in the details to add a new user.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Name
            </Text>
            <TextField.Root
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter member's full name"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Username
            </Text>
            <TextField.Root
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter member's username"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Email
            </Text>
            <TextField.Root
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter member's email"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Password
            </Text>
            <TextField.Root
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter member's password"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Member's role
            </Text>
            <Select.Root value={role} onValueChange={setRole}>
              <Select.Trigger />
              <Select.Content>
                <Select.Group>
                  <Select.Label>Member role</Select.Label>
                  <Select.Item value="manager">Manager</Select.Item>
                  <Select.Item value="staff">Staff</Select.Item>
                  <Select.Item value="admin">Admin</Select.Item>
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
