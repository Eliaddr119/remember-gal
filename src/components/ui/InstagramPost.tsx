"use client";

import { useState } from "react";
import Image from "next/image";
import { Post } from "@/lib/posts";

interface InstagramPostProps {
  post: Post;
}

export function InstagramPost({ post }: InstagramPostProps) {
  const [expanded, setExpanded] = useState(false);
  const hasCaption = post.title || post.caption;
  const isLongCaption = post.caption.length > 150;

  return (
    <div className="bg-gradient-to-br from-ivory-50 via-white to-ivory-100 rounded-2xl shadow-warm border border-earth-200/60 overflow-hidden">
      {/* Header */}
      <div dir="ltr" className="flex items-center gap-3 px-4 py-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sunflower-400 via-sunflower-500 to-earth-500 p-[2px]">
          <Image src="/images/posts/instagram-profile.jpg" alt="גל" width={36} height={36} className="w-full h-full rounded-full object-cover" />
        </div>
        <span className="font-bold text-sm text-earth-800">gal_hefez</span>
      </div>

      {/* Image */}
      {post.imageUrl && (
        <div className="relative bg-gradient-to-br from-sunflower-100 via-ivory-100 to-earth-100">
          <Image
            src={post.imageUrl}
            alt={post.title || "פוסט של גל"}
            width={800}
            height={800}
            className="w-full h-auto"
          />
        </div>
      )}

      {/* Caption */}
      {hasCaption && (
        <div className="px-4 py-3">
          <div
            className={`relative overflow-hidden transition-all duration-500 ease-in-out ${
              !expanded && isLongCaption ? "max-h-24" : ""
            }`}
          >
            {post.title && (
              <p className="font-bold text-sm text-earth-800 mb-1">
                {post.title}
              </p>
            )}
            {post.caption && (
              <span className="text-sm text-earth-600 whitespace-pre-line">
                {post.caption}
              </span>
            )}
          </div>

          {!expanded && isLongCaption && (
            <div className="h-8 -mt-8 relative bg-gradient-to-t from-ivory-50 to-transparent pointer-events-none" />
          )}

          {isLongCaption && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-1 text-sm font-medium text-earth-400 hover:text-earth-600 transition-colors"
            >
              {expanded ? "פחות" : "עוד..."}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
