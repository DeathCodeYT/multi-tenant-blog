"use client"; // Required for client-side interactivity

import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ModeToggle } from "./ModeToggle";
import { Sheet, SheetTrigger, SheetContent, SheetClose, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useUserStore } from "@/stores/userStore";
import { useEffect } from "react";
import { clientGet, clientPost } from "@/lib/service";
import UserAuth from "./UserAuth";

export default function Navbar() {
  const {user,setUser} = useUserStore()
  useEffect(()=>{
    async function getUserDetails(){
      const res = await clientGet("/user")
      if(!res.success){
        console.log("LOGINERROR")
        const logoutUser = await clientPost('/auth/logout')
      }else{
        setUser({...res.data,isLoggined:true})
      }
    }
    getUserDetails()
  },[])
  return (
    <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 shadow-md">
      {/* Left Side: Logo */}
      <div className="flex items-center">
        <Link href="/">
          <span className="text-xl font-bold text-gray-800 dark:text-white cursor-pointer">
            MyLogo
          </span>
        </Link>
      </div>

      {/* Center: Navigation Links (Visible on Medium Screens and Above) */}
      <div className="hidden md:flex space-x-6">
        <Link href="/">
          <span className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer">
            Home
          </span>
        </Link>
        <Link href="/blog">
          <span className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer">
            Blogs
          </span>
        </Link>
        <Link href="/about">
          <span className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer">
            About
          </span>
        </Link>
      </div>

      {/* Right Side: Profile Avatar and Mode Toggle */}
      <div className="flex items-center gap-3">
        <ModeToggle />
        <UserAuth></UserAuth>
      </div>

      {/* Mobile Menu Button (Hamburger Icon) */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] bg-white dark:bg-gray-900">
            <SheetTitle>Menu</SheetTitle>
            <div className="flex flex-col space-y-4 mt-6">
              <SheetClose asChild>
                <Link href="/">
                  <span className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer">
                    Home
                  </span>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/blog">
                  <span className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer">
                    Blogs
                  </span>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/about">
                  <span className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer">
                    About
                  </span>
                </Link>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}