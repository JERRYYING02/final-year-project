"use client";
import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa"; // Import the Google icon from react-icons

type Props = {};

const SignInButton = (props: Props) => {
  return (
    <Button
      variant="ghost"
      onClick={() => {
        signIn("google");
      }}
      className="bg-teal-600 text-dark py-2 px-4 rounded hover:bg-gray-100 text-white focus:outline-none focus:ring-2 focus:ring-white-500 flex items-center space-x-2"
    >
      <FaGoogle className="text-xl mr-2" /> {/* Google icon */}
      Sign In with Google
    </Button>
  );
};

export default SignInButton;
