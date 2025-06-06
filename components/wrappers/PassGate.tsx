"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Components
import FormInput from "../reusables/inputs/FormInput";

// React Icons
import { IoIosArrowForward } from "react-icons/io";
import { TbLockPassword } from "react-icons/tb";

// Assets
import logo from "@/public/logo.svg";

const PassGate = ({ children }: { children: React.ReactNode }) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const SESSION_KEY = process.env.NEXT_PUBLIC_SESSION_KEY || "gatekeeper";

  useEffect(() => {
    const storedPassword = sessionStorage.getItem(SESSION_KEY);
    if (storedPassword === process.env.NEXT_PUBLIC_SITE_PASSWORD) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [SESSION_KEY]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_SITE_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, password);
      setAuthenticated(true);
    } else {
      setError("Incorrect password");
    }
  };

  if (authenticated === null) {
    return null;
  }

  if (!authenticated) {
    return (
      <div className="w-full h-screen flex items-center justify-center p-8">
        <div className="max-w-96 border border-gray-300 dark:border-white/10 dark:bg-white/10 flex flex-col items-center justify-center gap-3 px-6 py-10 rounded-md shadow-md text-center">
          <Image src={logo} alt="Proptzo" className="w-28" />
          <h3 className="text-base capitalize font-semibold">
            Enter Password Now!
          </h3>
          <p className="text-xs font-semibold text-gray-600">
            Enter the password provided by the admins to gain exclusive access
            to the site.
          </p>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
            <FormInput
              type="password"
              icon={TbLockPassword}
              required
              label="Password"
              value={password}
              onChange={setPassword}
              error={error}
            />
            <button
              type="submit"
              className="w-full px-4 py-2.5 bg-primary text-white rounded-md cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center gap-1 shadow-sm"
            >
              <IoIosArrowForward size={16} className="shrink-0" />
              <h6 className="text-xs font-semibold capitalize">access</h6>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default PassGate;
