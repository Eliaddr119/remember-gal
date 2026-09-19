"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { StoryCard } from "@/components/ui/StoryCard";
import type { Story, StoryCategory } from "@/lib/stories";

const UNCATEGORIZED = "none";

interface Props {
  stories: Story[];
  categories: StoryCategory[];
}

interface Group {
  key: string;
  label: string;
  stories: Story[];
}

export default function StoriesFeed({ stories, categories }: Props) {
  const groups = useMemo<Group[]>(() => {
    const known = new Set(categories.map((c) => c.id));
    const byKey = new Map<string, Story[]>();

    for (const story of stories) {
      const key =
        story.categoryId && known.has(story.categoryId)
          ? String(story.categoryId)
          : UNCATEGORIZED;
      const bucket = byKey.get(key);
      if (bucket) bucket.push(story);
      else byKey.set(key, [story]);
    }

    // Categories keep the order set in the admin; anything unassigned trails behind.
    const ordered: Group[] = categories
      .filter((c) => byKey.has(String(c.id)))
      .map((c) => ({ key: String(c.id), label: c.name, stories: byKey.get(String(c.id))! }));

    const loose = byKey.get(UNCATEGORIZED);
    if (loose) {
      ordered.push({
        key: UNCATEGORIZED,
        label: ordered.length > 0 ? "אחר" : "סיפורים",
        stories: loose,
      });
    }

    return ordered;
  }, [stories, categories]);

  // With a single group there is nothing to navigate between — show a plain list.
  const grouped = groups.length > 1;
  const [openKey, setOpenKey] = useState(() => groups[0]?.key ?? "");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const openGroup = useCallback((key: string, scroll: boolean) => {
    setOpenKey((current) => (current === key && !scroll ? "" : key));
    if (scroll) {
      // Wait for the section to expand before scrolling to its heading.
      requestAnimationFrame(() =>
        sectionRefs.current[key]?.scrollIntoView({ behavior: "smooth", block: "start" })
      );
    }
  }, []);

  if (!grouped) {
    return (
      <div className="max-w-3xl lg:max-w-4xl mx-auto space-y-8" role="list">
        {stories.map((story) => (
          <article key={story.id} role="listitem">
            <StoryCard
              author={story.author}
              relation={story.relation}
              contentHtml={story.contentHtml}
              date={story.date}
            />
          </article>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-3xl lg:max-w-4xl mx-auto">
      {/* Category navigation */}
      <nav aria-label="ניווט בין קטגוריות" className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8">
        {groups.map((group) => {
          const isOpen = group.key === openKey;
          return (
            <button
              key={group.key}
              type="button"
              onClick={() => openGroup(group.key, true)}
              aria-current={isOpen ? "true" : undefined}
              className={`rounded-full px-4 md:px-5 py-2 text-sm md:text-base font-medium border transition-all duration-200 ${
                isOpen
                  ? "bg-sunflower-400 border-sunflower-500 text-earth-900 shadow-warm"
                  : "bg-white/80 border-earth-200 text-earth-600 hover:border-sunflower-300 hover:text-earth-800"
              }`}
            >
              {group.label}
              <span className={`mr-1.5 text-xs ${isOpen ? "text-earth-800/70" : "text-earth-400"}`}>
                {group.stories.length}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="space-y-4">
        {groups.map((group) => {
          const isOpen = group.key === openKey;
          const panelId = `story-group-${group.key}`;
          return (
            <section
              key={group.key}
              ref={(el) => {
                sectionRefs.current[group.key] = el;
              }}
              aria-labelledby={`${panelId}-heading`}
              className="scroll-mt-24 md:scroll-mt-28"
            >
              <h2 id={`${panelId}-heading`}>
                <button
                  type="button"
                  onClick={() => openGroup(group.key, false)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className={`w-full flex items-center gap-3 rounded-xl border px-5 md:px-6 py-4 text-right transition-colors duration-200 ${
                    isOpen
                      ? "bg-gradient-to-l from-sunflower-100 to-sunflower-50 border-sunflower-300"
                      : "bg-white/70 border-earth-200/70 hover:border-sunflower-300 hover:bg-white"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className={`w-5 h-5 shrink-0 text-sunflower-600 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>

                  <span className="flex-1 text-xl md:text-2xl font-bold text-earth-800">
                    {group.label}
                  </span>

                  <span className="text-sm text-earth-500">
                    {group.stories.length} סיפורים
                  </span>
                </button>
              </h2>

              {isOpen && (
                <div
                  id={panelId}
                  className="space-y-8 pt-6 pb-4 animate-fade-in"
                  role="list"
                  aria-label={`${group.stories.length} סיפורים בקטגוריה ${group.label}`}
                >
                  {group.stories.map((story) => (
                    <article key={story.id} role="listitem">
                      <StoryCard
                        author={story.author}
                        relation={story.relation}
                        contentHtml={story.contentHtml}
                        date={story.date}
                      />
                    </article>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
