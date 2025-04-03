"use client"; // Required for client-side interactivity

import { useState } from "react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ListTodo, LogOut, PenBoxIcon, User } from "lucide-react";
import { useUserStore } from "@/stores/userStore";
import { clientPost } from "@/lib/service";
import { toast } from "react-toastify";

export default function UserAuth() {
  const { user, logoutUser } = useUserStore(); // Get user and setUser from Zustand store
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Handle logout
  const handleLogout = async () => {
    const res = await clientPost('/auth/logout')
    if(!res.success){
        toast.error("Try again!")
    }else{
        logoutUser()
    }
  };

  return (
    <div>
      {user.isLoggined ? (
        <DropdownMenu onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <button className="focus:outline-none">
              <Avatar>
                <AvatarImage
                  src={user.photo || "https://github.com/shadcn.png"}
                  title={user.username + " - "+user.roleName}
                  alt="Profile"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48" align="end">
            <DropdownMenuItem>
              <Link href="/profile" className="flex items-center w-full">
                <User className="h-4 w-4 mr-2" />
                My Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/profile/my-blogs" className="flex items-center w-full">
                <ListTodo className="h-4 w-4 mr-2" />
                My Blogs
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/profile/createBlog" className="flex items-center w-full">
                <PenBoxIcon className="h-4 w-4 mr-2" />
                Create Blog
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/auth/login">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Login
          </Button>
        </Link>
      )}
    </div>
  );
}