"use client";

import { useState } from "react";

interface StoryCardProps {
  author: string;
  relation: string;
  contentHtml: string;
}

export function StoryCard({ author, relation, contentHtml }: StoryCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-br from-ivory-50 via-white to-ivory-100 rounded-2xl shadow-warm border border-earth-200/60 overflow-hidden">
      {/* Author Header */}
      <div className="bg-gradient-to-l from-sunflower-100/80 to-sunflower-50/40 border-b border-sunflower-200/50 px-6 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-earth-800">{author}</h2>
            <p className="text-sm md:text-base text-earth-500">{relation}</p>
          </div>
        </div>
      </div>

      {/* Story Content */}
      <div className="px-6 md:px-8 py-6 md:py-8">
        <div className="border-r-4 border-sunflower-400 pr-5 md:pr-6">
          <div
            className={`story-content overflow-hidden transition-all duration-500 ease-in-out ${
              expanded ? "" : "max-h-24"
            }`}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {!expanded && (
            <div className="h-12 -mt-12 relative bg-gradient-to-t from-ivory-50 to-transparent pointer-events-none" />
          )}

          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 text-sm md:text-base font-medium text-sunflower-600 hover:text-sunflower-700 transition-colors flex items-center gap-1"
          >
            <span>{expanded ? "הצג פחות" : "קרא עוד"}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
