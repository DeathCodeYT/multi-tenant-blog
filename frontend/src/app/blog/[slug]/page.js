import CustomError from "@/components/CustomError";
import Image from "next/image";
import React from "react";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import remarkRehype from "remark-rehype";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";
import rehypePrettyCode from "rehype-pretty-code";
import OnThisPage from "./OnThisPage";

async function fetchBlog(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${slug}`, {
      next: { revalidate: 60 * 60 },
      credentials: "include",
    });
    const data = await res.json();
    if (data.success) {
      return { blog: data.data, otherData: data.otherData };
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await fetchBlog(slug);
  if (!data) {
    return {
      title: "Blog not Found",
      description: "Blog not found",
    };
  }
  const blog = data.blog;
  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [{ url: blog.thumbnail, alt: blog.title }],
    },
    twitter: {
      title: blog.title,
      description: blog.description,
      images: [blog.thumbnail],
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const data = await fetchBlog(slug);
  if (!data) {
    return <CustomError message={"Blog not available"} />;
  }
  const blog = data.blog;
  const { content } = matter(blog.content);
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeDocument, { title: `${blog.title} - MyBlog` })
    .use(remarkGfm)
    .use(rehypeRaw)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypePrettyCode, {
      theme: "material-theme-darker",
      transformers: [
        transformerCopyButton({
          visibility: "hover",
          feedbackDuration: 3_000,
        }),
      ],
    });
  const htmlContent = (await processor.process(content)).toString();
  return (
    <>
      <div className="flex w-full">
        <div className="flex-1 flex flex-col items-center w-full p-1 md:p-4 gap-8">
          <div className="overflow-hidden rounded-md shadow-md w-[70%]">
            <Image
              className="object-cover w-full h-full"
              src={blog.thumbnail}
              alt={"Blog Photo"}
              width={1200}
              height={1200}
            />
          </div>
          <div className="flex flex-col gap-2 w-full md:w-[70%]">
            <h1 className="text-3xl font-bold self-start">{blog.title}</h1>
            <p className="italic dark:text-gray-400 text-gray-600 border-l-4 border-black dark:border-gray-400 px-2 py-1 bg-gray-300 dark:bg-gray-700 rounded-sm">
              {blog.description}
            </p>
            <p className="italic dark:text-gray-400 text-gray-600 border-l-4 border-black dark:border-gray-400 px-2 py-1 bg-gray-300 dark:bg-gray-700 rounded-sm w-fit">
              <span>{blog.user.name}</span> -{" "}
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </p>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            className="w-full bg-gray-100 p-1 lg:p-4 rounded-lg dark:bg-gray-900 prose dark:prose-invert max-w-none md:max-w-[70%]"
          ></div>
        </div>
        <div className="hidden lg:flex flex-col sticky top-16 m-4 h-fit w-[20%]">
          <OnThisPage htmlContent={htmlContent} />
        </div>
      </div>
    </>
  );
}
