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
      toast("Please fill the valid details!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/");
      toast.success("New user created!");
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
    <div className="flex flex-col items-center justify-center bg-gradient min-h-screen p-2">
      <div className="flex flex-col w-full sm:w-96 shadow-md  bg-white text-black rounded-xl p-4">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-3xl text-center font-bold">🔐 Auth 2.O</h1>
          <span className="text-sm text-gray-500 text-center leading-10">
            {loading ? "Please wait..." : "Create an account"}
          </span>
        </div>
        <hr />
        <div className="flex flex-col py-4 text-sm font-semibold space-y-2.5">
          <label htmlFor="username">Name</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Anshuman Sinha"
          />
          <label htmlFor="email">Email</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="anshumansinha2001@gmail.com"
          />
          <label htmlFor="password">Password</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="********"
          />
        </div>
        <button
          onClick={onSignup}
          className={`${
            loading ? "hidden" : "display"
          } p-2 border bg-black hover:bg-[#333] text-white border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 disabled:bg-[#333]`}
          disabled={buttonDisabled}
        >
          Signup
        </button>
        <Link
          href="/login"
          className=" text-blue-600 hover:text-blue-500 text-center text-sm"
        >
          already have an account?
        </Link>
      </div>
    </div>
  );
}
