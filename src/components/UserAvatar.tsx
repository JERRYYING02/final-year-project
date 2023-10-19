import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { User } from "next-auth";
import Image from "next/image";

type Props = {
  user: User;
};

const UserAvatar = ({ user }: Props) => {
  return (
 <Avatar className="w-12 h-12 rounded-full border-2 border-gray-800 hover:border-gray-500">
      {user.image ? (
        <div className="relative w-full h-full rounded-full overflow-hidden">
          <Image
            fill
            src={user.image}
            alt="user profile"
            className="object-cover w-full h-full"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback className="flex items-center justify-center bg-gray-300 text-gray-600 text-xl font-bold">
          {user?.name?.charAt(0)}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
