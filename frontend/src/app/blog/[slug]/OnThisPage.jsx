"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function OnThisPage({ htmlContent }) {
  const [headings, setHeadings] = useState([]);
  useEffect(() => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    const h2Elements = tempDiv.querySelectorAll("h2");
    const allHeadings = Array.from(h2Elements).map((h2) => ({
      text: h2.textContent,
      id: h2.id,
    }));
    setHeadings(allHeadings);
  }, [htmlContent]);
  return (
    <div className="sticky top-16 w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-y-auto max-h-[80vh]">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">On This Page</h2>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} className="hover:bg-blue-500 hover:text-white p-2 rounded-lg transition-all duration-200">
            <Link className="block text-blue-600 dark:text-blue-400 font-medium hover:text-white" href={`#${heading.id}`}>{heading.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
