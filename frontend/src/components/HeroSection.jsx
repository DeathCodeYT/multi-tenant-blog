import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-background text-foreground">
      <div className="container px-6 md:px-12 lg:px-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Welcome to <span className="text-primary">Our Blog</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground">
          Explore insightful articles, tips, and the latest trends.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button className="px-6 py-3 text-lg">Get Started</Button>
          <Button variant="outline" className="px-6 py-3 text-lg">Learn More</Button>
        </div>
      </div>
    </section>
  );
}
