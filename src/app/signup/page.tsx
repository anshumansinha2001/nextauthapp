"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    if (buttonDisabled) {
      alert("Please fill the valid details");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      toast.success("New user created!");
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col w-full sm:w-96 border rounded-xl p-4">
        <h1 className="text-xl text-center leading-10">
          {loading ? "Processing..." : "Create a new account"}
        </h1>
        <hr />
        <div className="flex flex-col py-4">
          <label htmlFor="username">Username*</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="username"
          />
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
            onClick={onSignup}
            className={`${
              loading ? "hidden" : "display"
            } p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600`}
          >
            {buttonDisabled ? "Please Fill Credentails" : "Signup"}
          </button>
        </div>
        <Link
          href="/login"
          className=" text-blue-400 hover:text-blue-500 text-center"
        >
          already have an account?
        </Link>
      </div>
    </div>
  );
}
