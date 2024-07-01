"use client";
import React, { useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [error, Seterror] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password || !name || !email) {
      Seterror("please complete all input");
      return;
    }

    try {
      const res = await axios.post("/api/auth/signup", {
        password: `${password}`,
        name: `${name}`,
        email: `${email}`,
      });

      if (res) {
        const form = e.target as HTMLFormElement;
        Seterror("");
        form.reset();
        console.log("sign up success");
        router.push("/");
      } else {
        console.log("user sign up failed");
      }
    } catch (error) {
      console.log("error during sign up", error);
    }
  };

  return (
    <div>
      <div className="container mx-auto py-5">
        <h3>Sign up Page</h3>
        <hr className="my-3" />
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <div className="flex items-center text-xl gap-x-5">
            <div className="px-10 w-64">email :</div>{" "}
            <div>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="block bg-gray-200 p-2 my-2 rounded-md"
                type="email"
                placeholder="email"
              />
            </div>
          </div>

          <div className="flex items-center text-xl gap-x-5">
            <div className="px-10 w-64"> name :</div>{" "}
            <div>
              <input
                onChange={(e) => setName(e.target.value)}
                className="block bg-gray-200 p-2 my-2 rounded-md"
                type="text"
                placeholder="name"
              />
            </div>
          </div>
          <div className="flex items-center text-xl gap-x-5">
            <div className="px-10 w-64">password :</div>
            <div>
              {" "}
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="block bg-gray-200 p-2 my-2 rounded-md"
                type="password"
                placeholder="password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 p-2 rounded-md text-white"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
