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
export default async function Page({ searchParams }) {
  let { page, limit } = await searchParams;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 9;
  const data = await fetchBlogs(page, limit);
  if (!data) {
    return <CustomError message={"Something went wrong"}/>;
  }
  return (
    <div className="container mx-auto p-4">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Latest Blogs
      </h1>

      {/* Blog List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.blogs.map((blog) => (
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
                href={page > 1 ? `/blog?page=${page - 1}&limit=${limit}` : `#`}
              />
            </PaginationItem>

            {/* Page Numbers */}
            {page}
            {/* Next Button */}
            <PaginationItem>
              <PaginationNext
                href={
                  page < data.otherData.totalPage
                    ? `/blog?page=${page + 1}&limit=${limit}`
                    : `#`
                }
                className="cursor-pointer"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
