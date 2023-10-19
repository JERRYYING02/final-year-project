import Link from "next/link";
import React from "react";
import { getAuthSession } from "@/lib/auth";
import SignInButton from "./SignInButton";
import NavUserAccount from "./NavUserAccount";
import Image from "next/image";
import logopic from "public/logopic.png";

type Props = {};

const Navbar = async (props:Props) => {
  const session = await getAuthSession();
  return (
    <nav className="top-0 inset-x-0 py-3 fixed bg-gray-800 z-10">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-8">
        <Link href="/home" className="items-center hidden sm:flex">
          <div className="transition-all hover:-translate-x-[3px] md:block dark:text-dark">
            <Image src={logopic} alt="Picture of the author" width={120} height={200} />
          </div>
        </Link>
        <div className="flex items-center">
          <Link href="/home">
            <p className="mr-5 text-gray-300 hover:text-white transition-all">
              Home
            </p>
          </Link>
          {session?.user && (
            <>
              <Link href="/create">
                <p className="text-sm mr-5 text-gray-300 hover:text-white transition-all">
                 Create Content
                </p>
              </Link>
              <Link href="/settings">
                <p className="text-sm mr-5 text-gray-300 hover:text-white transition-all">
                  Settings
                </p>
              </Link>
            </>
          )}

          <div className="flex items-center">
            {session?.user ? (
              <NavUserAccount user={session.user} />
            ) : (
              <SignInButton />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
