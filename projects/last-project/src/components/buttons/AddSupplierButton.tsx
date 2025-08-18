"use client";

import { CREATE_SUPPLIER } from "@/lib/gql/queries";
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

export default function AddSupplierButton() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  async function handleSubmit() {
    console.log("Submitting supplier creation:", { name, email, phone, address });
    try {
      const data = await gqlClient.request(CREATE_SUPPLIER, {
        name,
        email,
        phone,
        address,
      }) as { createSupplier: any };
      console.log("Supplier creation response:", data);
      if(data.createSupplier){
        alert("Supplier created successfully");
        clearForm();
      }else{
        alert("Supplier creation failed");
      }
    } catch (error) {
        alert("Supplier creation failed");
    }
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
  }

  return (
    <div className="flex mb-5">
    <Dialog.Root>
      <Dialog.Trigger >
        <Button variant="solid">Add Supplier</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add Supplier</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Fill in the details to add a new supplier.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Name
            </Text>
            <TextField.Root
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter supplier's name"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Email
            </Text>
            <TextField.Root
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter supplier's email"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Phone
            </Text>
            <TextField.Root
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter supplier's phone"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Address
            </Text>
            <TextField.Root
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter supplier's address"
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
            <Button onClick={handleSubmit}>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
    </div>
  );
}
