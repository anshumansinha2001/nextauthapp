"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  // const router = useRouter();

  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError(false);
    } catch (error: any) {
      setError(true);
      console.log(error.reponse.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];

    // ---- Alternative(Next.js Utilized) ----
    // const { query } = router;
    // const urlToken: any = query.token;

    setToken(urlToken || "");
  }, [token]);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token, verifyUserEmail]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl my-4">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>

      {verified && (
        <div className="text-center">
          <h2 className="text-2xl text-green-500 my-4">Email Verified!</h2>
          <Link
            href="/login"
            className="bg-blue-700 hover:bg-blue-600 p-2 rounded-md"
          >
            Login
          </Link>
        </div>
      )}
      {error && (
        <>
          <h2 className="text-2xl bg-red-500 text-black">Error</h2>
        </>
      )}
    </div>
  );
}
