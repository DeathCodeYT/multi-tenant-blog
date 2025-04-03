import BlogCard from "./BlogCard";
import CustomError from "./CustomError";
import { Button } from "./ui/button";
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
export async function FeaturedPosts() {
  const data = await fetchBlogs(1, 3);
  if (!data) {
    return <CustomError message={"Something went wrong"} />;
  }
  return (
    <section className="w-full py-16 bg-secondary text-foreground flex items-center justify-center">
      <div className="container px-4 sm:px-6 md:px-12 lg:px-16 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Featured Posts
        </h2>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground">
          Discover our most popular and trending articles.
        </p>
        <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {data.blogs.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}
