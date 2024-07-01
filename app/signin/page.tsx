/* eslint-disable @next/next/no-img-element */
"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import book from "../public/book.png";
import { StaticImageData } from "next/image";
import Link from "next/link";

export interface ILogo {
  //   image: HTMLImageElement;
  src: string | StaticImageData;
  className?: string;
}

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result && result.error) {
        console.error(result.error);
      } else {
        //router.push("/profile");
        console.log("login success");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row-reverse h-dvh justify-center">
      <div className="h-1/2 md:h-full bg-green-950 w-[630px] justify-center content-center">
        <div className=" bg-green-900 w-[630px] h-full rounded-b-3xl justify-center align-middle content-center">
          <div className="flex flex-col justify-center content-center items-center align-middle">
            <div>
              <img className="w-[299.61px]" src="/book.png" alt="book" />
            </div>
            <div className="text-white text-2xl">a Board</div>
          </div>
        </div>
      </div>

      <div className="h-1/2 md:h-full bg-green-950 w-[630px] justify-center content-center">
        <form
          onSubmit={handleSubmit}
          className="bg-green-950 p-6 rounded-md shadow-md"
        >
          <div className="mb-4 text-white">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              //value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded" // Added border
            />
          </div>
          <div className="mb-4 text-white">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              //value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded" // Added border
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded mb-4"
          >
            Sign In
          </button>{" "}
        </form>
        <p className="text-white flex justify-center">
          Already have an account?
          <Link className="text-blue-500 hover:underline" href="/signup">
            Sign up
          </Link>
          Page
        </p>
      </div>
    </div>
  );
}
