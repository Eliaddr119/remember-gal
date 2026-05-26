import { Metadata } from "next";
import Script from "next/script";
import { SunflowerBackground } from "@/components/ui/SunflowerBackground";
import { StoryCard } from "@/components/ui/StoryCard";
import { getStories } from "@/lib/stories";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "חברים ומשפחה מספרים | לזכותה של גל חפץ ז״ל",
  description: "סיפורים וזיכרונות מחברים ומשפחה על גל",
};

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <div className="min-h-screen bg-warm-gradient relative">
      <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />
      <SunflowerBackground />

      <div className="container mx-auto px-4 py-10 relative z-10">
        {/* Page Header */}
        <div className="page-header mb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-earth-800">
            חברים ומשפחה מספרים
          </h1>
        </div>
        <p className="text-center text-earth-500 mb-10 max-w-2xl mx-auto md:text-lg">
          סיפורים וזיכרונות מאנשים שחייהם נגעו בגל
        </p>

        <section aria-label="סיפורים וזיכרונות">
          <div className="max-w-3xl lg:max-w-4xl mx-auto space-y-8" role="list" aria-label={`${stories.length} סיפורים`}>
            {stories.map((story) => (
              <article key={story.id} role="listitem" className="relative">
                <StoryCard
                  author={story.author}
                  relation={story.relation}
                  contentHtml={story.contentHtml}
                />
              </article>
            ))}
          </div>
        </section>

        {/* Form popup button */}
        <div className="mt-12 max-w-lg mx-auto">
          <div className="bg-sunflower-gradient rounded-xl p-6 text-center shadow-warm">
            <h2 className="text-xl md:text-2xl font-bold text-earth-800 mb-2">
              יש לכם סיפור לשתף?
            </h2>
            <p className="text-earth-600 text-sm md:text-base mb-4">
              מוזמנים לשתף אותנו בסיפור שלכם עם גל
            </p>
            <button
              type="button"
              data-tally-open="2EeaBb"
              data-tally-layout="modal"
              data-tally-align-left="1"
              className="inline-block bg-earth-700 text-ivory-50 px-6 py-2.5 rounded-lg font-bold text-sm md:text-base hover:bg-earth-800 active:bg-earth-900 transition-colors shadow-warm"
            >
              לשיתוף סיפור
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
