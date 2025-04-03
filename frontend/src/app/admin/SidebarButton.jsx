"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function SidebarButton({ link, title }) {
  const pathname = usePathname();
  const active = pathname === link;
  return (
    <Link
      href={link}
      className={`flex font-medium items-center p-2 text-sm rounded-sm ${
        active ? "bg-blue-500" : "hover:bg-gray-100 dark:hover:bg-gray-700"
      }`}
    >
      {title}
    </Link>
  );
}

export default SidebarButton;
