/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-green-950 text-white ">
      <div className="flex w-full h-[60px] justify-between">
        <div className="flex  items-center p-5">a Board</div>
        <div className="flex items-center justify-end w-100% p-5">
          <img className="flex items-center" src="/menu.png" alt="menu" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
