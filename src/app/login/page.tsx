"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    if (buttonDisabled) {
      toast("Please fill the valid credentails");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success!");
      router.push("/");
    } catch (error: any) {
      console.log("Login failed", error);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2">
      <div className="flex flex-col w-full sm:w-96 border rounded-xl p-4">
        <h1 className="text-xl text-center leading-10">
          {loading ? "Processing..." : "Login to the Profile"}
        </h1>
        <hr />
        <div className="flex flex-col py-4">
          <label htmlFor="email">Email*</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="email"
          />
          <label htmlFor="password">Password*</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
          />
          <button
            onClick={onLogin}
            className={`${
              loading ? "hidden" : "display"
            } p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600`}
          >
            {buttonDisabled ? "Fill Your Login Credentials" : "Login"}
          </button>
        </div>
        <Link
          href="/signup"
          className=" text-blue-400 hover:text-blue-500 text-center"
        >
          don&apos;t have an account?
        </Link>
      </div>
    </div>
  );
}
