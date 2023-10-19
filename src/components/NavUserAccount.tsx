"use client";

import React from "react";
import { User } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import UserAvatar from "./UserAvatar";

type Props = {
  user: User; //get user from nextauth
};

const NavUserAccount = ({ user }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white text-black border shadow-lg">
      <div className="p-4">
          <div className="flex items-center gap-4">
            <div>
              <UserAvatar user={user} />
            </div>
            <div>
              {user?.name && <p className="font-bold text-lg">{user.name}</p>}
              {user?.email && (
                <p className="text-sm text-gray-600">{user.email}</p>
              )}
            </div>
          </div>
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => {
            signOut();
          }}
          className="cursor-pointer text-red-600 "
        >
          Sign out
          <LogOut className="w-4 h-4 ml-2" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavUserAccount;
