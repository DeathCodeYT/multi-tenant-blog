"use client"; // Required for client-side interactivity

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import { clientDelete, clientGet } from "@/lib/service";
import { toast } from "react-toastify";

export default function BlogDelete() {
  const [blogs, setBlogs] = useState([]);
  const [pagination, setPagination] = useState({
    totalPage: 1,
    limit: 10,
    page: 1,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all blogs

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const response = await clientGet("/blog", {
          page: pagination.page,
          limit: pagination.limit,
        });
        if (!response.success) {
          throw new Error("Failed to fetch blogs");
        }
        const data = response.data;
        setPagination((prev) => ({ ...prev, totalPage: response.totalPage }));
        setBlogs(data);
      } catch (err) {
        toast.error(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, [pagination.page, pagination.limit]);

  // Filter blogs based on search query
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle delete blog
  const handleDeleteBlog = async (slug) => {
    setIsLoading(true);
    try {
      const response = await clientDelete(`/admin/blog/${slug}`);
      if (!response.success) {
        throw new Error("Failed to delete blog");
      }

      setBlogs((prev) => prev.filter((blog) => blog.slug !== slug));
      toast.success("Blog deleted successfully!");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  return (
    <div className="space-y-4 w-full">
      {/* Search Field */}
      <Input
        type="text"
        placeholder="Search blogs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white"
      />

      {/* Blog List */}
      <ul className="space-y-2">
        {filteredBlogs.map((blog) => (
          <li
            key={blog.slug}
            className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <span>{blog.title}</span>
            <Button
              onClick={() => handleDeleteBlog(blog.slug)}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="cursor-pointer"
            />
          </PaginationItem>
          {Array.from({ length: pagination.totalPage }, (_, i) => i + 1).map(
            (page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={pagination.page === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPage}
              className="cursor-pointer"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
