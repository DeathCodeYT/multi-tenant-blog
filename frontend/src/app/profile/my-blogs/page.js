"use client";
import BlogCard from "@/components/BlogCard";
import CustomError from "@/components/CustomError";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import { useUserStore } from "@/stores/userStore";
import { useEffect, useState } from "react";
async function fetchBlogs(page, limit) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog?page=${page}&limit=${limit}`,
      {
        credentials: "include",
        next: { revalidate: 60 * 5 },
      }
    );
    const data = await res.json();
    if (data.success) {
      return { blogs: data.data, otherData: data.otherData };
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
export default function Page() {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    totalPage: 1,
  });
  const { user } = useUserStore();
  const [blogs, setBlogs] = useState([]);
  async function fetchBlogs(page, limit) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blog?page=${page}&limit=${limit}&username=${user.username}`,
        {
          credentials: "include",
          next: { revalidate: 60 * 5 },
        }
      );
      const data = await res.json();
      if (data.success) {
        setPagination((prev) => ({
          ...prev,
          totalPage: data.otherData.totalPage,
        }));
        setBlogs(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if(user.isLoggined){
        fetchBlogs();
    }
  }, [pagination,user.isLoggined]);
  if (!user.isLoggined) {
    return <>Please Login...</>;
  }
  return (
    <div className="container mx-auto p-4">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Latest Blogs
      </h1>

      {/* Blog List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.slug} blog={blog} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8">
        <Pagination>
          <PaginationContent>
            {/* Previous Button */}
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  setPagination((prev) => ({
                    ...prev,
                    page: prev.page >= 1 ? prev.page - 1 : prev.page,
                  }));
                }}
              />
            </PaginationItem>

            {/* Page Numbers */}
            {pagination.page}
            {/* Next Button */}
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  setPagination((prev) => ({
                    ...prev,
                    page:
                      pagination.totalPage < prev.page
                        ? prev.page + 1
                        : prev.page,
                  }));
                }}
                className="cursor-pointer"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
