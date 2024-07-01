/* eslint-disable @next/next/no-img-element */
"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import book from "../public/book.png";
import { StaticImageData } from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";

export interface ILogo {
  //   image: HTMLImageElement;
  src: string | StaticImageData;
  className?: string;
}

export default function SignIn() {
  /*const [email, setEmail] = useState("");
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
  };*/

  return (
    <body className="bg-[#BBC2C0]">
      <Navbar />
      <div className="flex text-white py-14">
        <div className="w-1/3">
          <button>
            <img className="px-5" src="/search.png" alt="search" />
          </button>
        </div>
        <div className="w-1/3">community</div>
        <div className="w-1/3 flex justify-end px-5">
          <button className="bg-[#49A569] w-[105px] h-[50px] px-5 rounded-lg">
            create +
          </button>
        </div>
      </div>
    </body>
  );
}
