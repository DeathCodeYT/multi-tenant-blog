import { FeaturedPosts } from "@/components/FeaturedBlog";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <HeroSection></HeroSection>
    <FeaturedPosts/>
    </>
  );
}
