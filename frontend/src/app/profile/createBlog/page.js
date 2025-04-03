"use client"; // Required for client-side interactivity

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { clientPost } from "@/lib/service";
import { toast } from "react-toastify";

export default function Page() {
  const [formData, setFormData] = useState({
    title: "",
    thumbnail: null,
    description: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, thumbnail: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("thumbnail", formData.thumbnail);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("content", formData.content);

      const response = await clientPost("/blog", null, formDataToSend);
      if (!response.success) {
        throw new Error("Failed to create blog");
      }
      toast.success("Blog created successfully!");
      setFormData({ title: "", thumbnail: null, description: "", content: "" });
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4 bg-background text-foreground shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center">Create a New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <Input
          type="file"
          name="thumbnail"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        <Textarea
          name="description"
          placeholder="Short Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <Textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          className="h-40"
          required
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Submitting..." : "Submit Blog"}
        </Button>
      </form>
    </div>
  );
}