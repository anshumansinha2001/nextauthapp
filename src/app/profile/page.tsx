"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import defaultDP from "@/assets/Default_pfp.jpg";

export default function ProfilePage() {
  const [data, setData]: any = useState("nothing");

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/profile");
    console.log(res.data);
    setData(res.data.data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center justify-center">
        <Image width={70} src={defaultDP} alt="pfp" />
        <h1 className="my-4">
          {data != "nothing"
            ? "Hi, " + data.username.toUpperCase()
            : `Profile Page `}
        </h1>
      </div>
      <hr />
      <h2 className="p-1 rounded bg-yellow-500">
        {data === "nothing" ? (
          "No data to display :("
        ) : (
          <Link href={`/profile/${data._id}`}>
            {data._id.slice(0, 4) + "***************"}
          </Link>
        )}
      </h2>
      {data != "nothing" && (
        <>
          <p className="mt-2">email: {data.email}</p>
          <p className="mt-2">
            {data.isVerified ? "Verified ✓" : "Not Verified ✗"}
          </p>
          <p className="mt-2">role: {data.isAdmin ? "Admin" : "User"}</p>
        </>
      )}
      <hr />

      <button
        onClick={getUserDetails}
        className="bg-green-800 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        GetUser Details
      </button>

      <Link
        href={"/"}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Back to Home
      </Link>
    </div>
  );
}
