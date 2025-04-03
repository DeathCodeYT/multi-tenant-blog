import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function BlogCard({blog}) {
  return (
    <Card className="w-full max-w-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Thumbnail */}
      <div className="relative h-48 w-full">
        <Image
          src={blog.thumbnail}
          alt="Blog Thumbnail"
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-700 dark:text-gray-300 line-clamp-3">
          {blog.description}
        </CardDescription>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex justify-between items-center">
        <Link
          href={`/blog/${blog.slug}`}
          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          Read More
        </Link>
      </CardFooter>
    </Card>
  );
}