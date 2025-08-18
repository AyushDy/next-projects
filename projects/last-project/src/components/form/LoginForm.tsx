"use client";

import { LOGIN_USER } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/gql";
import { Button, Card, Text, TextField } from "@radix-ui/themes";
import Image from "next/image";
import { useContext, useState } from "react";

export default function LoginForm() {
  const [userCred, setUserCred] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{ message: string }>({ message: "" });
  const [loading, setLoading] = useState(false);

  const quickLoginCreds = {
    admin : {
      userCred: "user1",
      password: "password"
    },
    user : {
      userCred: "user2",
      password: "password"
    }
  }

  async function handleLogin() {
    setError({ message: "" });
    setLoading(true);
    try {
      const data = (await gqlClient.request(LOGIN_USER, {
        userCred,
        password,
      })) as { loginUser: boolean };
      if (data.loginUser) {
        window.location.href = "/";
      } else {
        throw Error;
      }
    } catch (error) {
      setError({ message: "Invalid Credentials" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form >
    <Card style={{}}>
      <div className="relative w-15 h-15 flex justify-center items-center mx-auto my-5">
        <Image
          src={"https://cdn-icons-png.flaticon.com/512/12474/12474329.png"}
          alt="Login Image"
          fill
        />
      </div>
      <TextField.Root
        style={{
          height: 36,
        }}
        className="w-96 mb-5"
        placeholder="Username or Email"
        value={userCred}
        onChange={(e) => setUserCred(e.target.value)}
      />
      <TextField.Root
        style={{
          height: 36,
        }}
        className="w-96 "
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        style={{
          width: "100%",
        }}
        disabled={loading}
        onClick={handleLogin}
      >
        <Text>Login</Text>
      </Button>
      <div className="flex justify-between mt-4">
        <button
          type="button"
          className="text-sm text-blue-500"
          onClick={() => {
            setUserCred(quickLoginCreds.admin.userCred);
            setPassword(quickLoginCreds.admin.password);
          }}
        >
          Login as Admin
        </button>
        <button
          type="button"
          className="text-sm text-blue-500"
          onClick={() => {
            setUserCred(quickLoginCreds.user.userCred);
            setPassword(quickLoginCreds.user.password);
          }}
        >
          Login as Staff
        </button>
      </div>
      <p className="text-red-500 h-5 text-sm text-center">{error.message}</p>
    </Card>
    </form>
  );
}
