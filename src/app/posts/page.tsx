import { Metadata } from "next";
import { SunflowerBackground } from "@/components/ui/SunflowerBackground";
import { InstagramPost } from "@/components/ui/InstagramPost";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "במילים של גל | לזכותה של גל חפץ ז״ל",
  description: "פוסטים ששיתפה גל",
};

export default function PostsPage() {
  const posts = getPosts();

  return (
    <div className="min-h-screen bg-warm-gradient relative">
      <SunflowerBackground />

      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 relative z-10">
        {/* Page Header */}
        <div className="page-header mb-3 sm:mb-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-earth-800">
            במילים של גל
          </h1>
        </div>
        <p className="text-center text-earth-500 mb-6 sm:mb-10 max-w-2xl mx-auto text-base sm:text-lg px-2">
          פוסטים ששיתפה גל
        </p>

        {/* Instagram-style feed */}
        <div className="max-w-md sm:max-w-lg md:max-w-xl mx-auto space-y-6">
          {posts.map((post) => (
            <InstagramPost key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
