"use client";

import { useEffect, useId, useRef, useState } from "react";

interface StoryCardProps {
  author: string;
  relation: string;
  contentHtml: string;
  date?: string;
}

const COLLAPSED_HEIGHT = 150;

export function StoryCard({ author, relation, contentHtml, date }: StoryCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(true);
  const [fullHeight, setFullHeight] = useState<number>();
  const contentRef = useRef<HTMLDivElement>(null);
  const contentId = useId();

  // Measure the text so short stories get no "read more" affordance at all,
  // and so expanding animates to the real height instead of a magic number.
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const measure = () => {
      setFullHeight(el.scrollHeight);
      setOverflows(el.scrollHeight > COLLAPSED_HEIGHT + 24);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [contentHtml]);

  const clamped = !expanded && overflows;

  return (
    <div className="group relative bg-white rounded-2xl border border-earth-200/50 shadow-[0_2px_12px_rgba(204,85,0,0.07)] hover:shadow-warm hover:border-sunflower-300/70 transition-all duration-300 overflow-hidden">
      {/* Sunflower accent along the top edge */}
      <div className="h-1 bg-gradient-to-l from-sunflower-200 via-sunflower-400 to-sunflower-200" />

      {/* Author header */}
      <div className="bg-gradient-to-l from-sunflower-50 via-ivory-50 to-white border-b border-sunflower-100 px-5 md:px-7 py-4">
        <h3 className="text-lg md:text-xl font-bold text-earth-800">{author}</h3>
        {relation && <p className="text-sm md:text-base text-earth-500">{relation}</p>}
      </div>

      {/* Story content */}
      <div className="px-5 md:px-7 py-5 md:py-6">
        <div className="relative border-r-[3px] border-sunflower-300 pr-4 md:pr-6">
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute -top-4 left-0 text-6xl leading-none text-sunflower-100 font-serif"
          >
            &rdquo;
          </span>

          <div className="relative">
            <div
              id={contentId}
              ref={contentRef}
              className="story-content overflow-hidden transition-[max-height] duration-500 ease-in-out"
              style={{ maxHeight: clamped ? COLLAPSED_HEIGHT : fullHeight }}
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
            {clamped && (
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/85 to-transparent pointer-events-none" />
            )}
          </div>

          {(overflows || date) && (
            <div className="mt-4 flex items-center justify-between gap-3">
              {overflows ? (
                <button
                  onClick={() => setExpanded(!expanded)}
                  aria-expanded={expanded}
                  aria-controls={contentId}
                  className="inline-flex items-center gap-1.5 text-sm md:text-base font-medium text-sunflower-700 bg-sunflower-50 hover:bg-sunflower-100 border border-sunflower-200 rounded-full px-4 py-1.5 transition-colors"
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
              ) : (
                <span />
              )}

              {date && <span className="text-xs md:text-sm text-earth-400">{date}</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
