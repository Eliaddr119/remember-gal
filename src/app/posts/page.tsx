import { Metadata } from "next";
import { SunflowerBackground } from "@/components/ui/SunflowerBackground";
import { InstagramPost } from "@/components/ui/InstagramPost";
import { getPosts } from "@/lib/posts";
import { getSiteConfig } from "@/lib/site-config";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "במילים של גל | לזכותה של גל חפץ ז״ל",
  description: "פוסטים ששיתפה גל",
};

export default async function PostsPage() {
  const [posts, { instagram_profile_photo_url }] = await Promise.all([
    getPosts(),
    getSiteConfig(),
  ]);
  

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

        {/* Instagram-style feed */}
        <div className="max-w-md sm:max-w-lg md:max-w-xl mx-auto space-y-6">
          {posts.map((post) => (
            <InstagramPost key={post.id} post={post} profilePhotoUrl={instagram_profile_photo_url} />
          ))}
        </div>
      </div>
    </div>
  );
}
