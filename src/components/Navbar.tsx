import Link from "next/link";
import React from "react";
import { getAuthSession } from "@/lib/auth";
import SignInButton from "./SignInButton";
import NavUserAccount from "./NavUserAccount";
import Image from "next/image";
import logopic from "public/logopic.png";
import { ThemeToggleButton } from "./ThemeToggleButton";

type Props = {};

const Navbar = async (props:Props) => {
  const session = await getAuthSession();
  return (
    <nav className="top-0 inset-x-0 py-3 fixed bg-white dark:bg-gray-800 z-10 ">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-8">
        <Link href="/home" className="items-center hidden sm:flex">
       
          <div className="flex items-center hidden sm:flex hover:-translate-x-[4px]">
        <Image src={logopic} alt="Picture of the author" width={40} height={40} />
          <p className="text-black ml-2 mt-1 text-xl font-bold transition-all md:block dark:text-white">
            IdeaWiz
          </p>
          </div>
        </Link>
        
        <div className="flex items-center">
          
          <Link href="/home">
            <p className="mr-5  text-black hover:text-gray-500 transition-all dark:text-gray-100 dark:hover:text-gray-500 ">
              Home
            </p>
          </Link>
          {session?.user && (
            <>
              <Link href="/create">
                <p className="text-sm mr-5 text-black hover:text-gray-500 transition-all dark:text-gray-100 dark:hover:text-gray-500">
                 Create Content
                </p>
              </Link>
              <Link href="/settings">
                <p className="text-sm mr-5 text-black hover:text-gray-500 transition-all dark:text-gray-100 dark:hover:text-gray-500">
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

          <ThemeToggleButton className='ml-5' />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
