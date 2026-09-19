"use client";

import { useEffect, useId, useRef, useState } from "react";

interface StoryCardProps {
  author: string;
  relation: string;
  contentHtml: string;
  date?: string;
}

export function StoryCard({ author, relation, contentHtml, date }: StoryCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(true);
  const [fullHeight, setFullHeight] = useState<number>();
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentId = useId();
  const expandedRef = useRef(expanded);
  expandedRef.current = expanded;

  // The clamp itself is CSS; JS only decides whether there is anything hidden
  // (so short stories get no "read more") and how far to animate on expand.
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    // Whether the text overflows can only change when the line count changes,
    // i.e. when the width changes. Re-measuring on every resize notification
    // would read clientHeight mid max-height transition, where the box is still
    // its old size — that reports "fits", which hides the toggle and strands
    // the card open. Keyed on width, expand/collapse is skipped entirely.
    let measuredAtWidth = -1;

    const measure = () => {
      setFullHeight(el.scrollHeight);
      if (expandedRef.current || el.clientWidth === measuredAtWidth) return;
      measuredAtWidth = el.clientWidth;
      setOverflows(el.scrollHeight > el.clientHeight + 4);
    };

    measure();
    // Webfonts reflow the text after first paint and change the line count.
    document.fonts?.ready.then(() => {
      measuredAtWidth = -1;
      measure();
    }).catch(() => {});
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [contentHtml]);

  const clamped = !expanded && overflows;

  function toggle() {
    const next = !expanded;
    // Measure now rather than trusting the last observed value: a stale
    // fullHeight that is shorter than the text would clip the end of the story.
    if (next && contentRef.current) setFullHeight(contentRef.current.scrollHeight);
    setExpanded(next);
    // Expanding stays put under your finger. Collapsing would otherwise leave
    // you stranded somewhere below the card, so return to its top.
    if (!next) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      requestAnimationFrame(() =>
        cardRef.current?.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "start",
        })
      );
    }
  }

  return (
    <div
      ref={cardRef}
      className="group relative scroll-mt-24 md:scroll-mt-28 bg-white rounded-2xl border border-earth-200/50 shadow-[0_2px_12px_rgba(204,85,0,0.07)] hover:shadow-warm hover:border-sunflower-300/70 transition-[box-shadow,border-color] duration-300 overflow-hidden"
    >
      {/* Sunflower accent along the top edge */}
      <div className="h-1 bg-gradient-to-l from-sunflower-200 via-sunflower-400 to-sunflower-200" />

      {/* Author header */}
      <div className="bg-gradient-to-l from-sunflower-50 via-ivory-50 to-white border-b border-sunflower-100 px-5 md:px-7 py-4">
        <h3 className="text-lg md:text-xl font-bold text-earth-800">{author}</h3>
        {relation && <p className="text-sm md:text-base text-earth-500">{relation}</p>}
      </div>

      {/* Story content */}
      <div className="px-5 md:px-7 py-5 md:py-6">
        <div className="relative">
          {/* Both ends of the toggle stay real lengths — the clamp class when
              collapsed, a pixel height when expanded. max-height cannot animate
              to or from `none`, which would make the collapse snap. */}
          <div className="relative">
            <div
              id={contentId}
              ref={contentRef}
              className={`story-content overflow-hidden ${
                clamped ? "story-content--clamped" : ""
              }`}
              style={clamped ? undefined : { maxHeight: fullHeight }}
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>

          {(overflows || date) && (
            <div className="mt-4 flex items-center justify-between gap-3">
              {overflows ? (
                <button
                  onClick={toggle}
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
