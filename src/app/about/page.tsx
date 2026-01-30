import { Metadata } from "next";
import { SunflowerBackground } from "@/components/ui/SunflowerBackground";

export const metadata: Metadata = {
  title: "קצת על גל | לזכרה של גל חפץ ז״ל",
  description: "הכירו את גל - סיפור חייה והמורשת שהשאירה",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-warm-gradient relative">
      <SunflowerBackground />

      <div className="container mx-auto px-4 py-10 relative z-10">
        {/* Page Header */}
        <div className="page-header mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-earth-800">
            קצת על גל
          </h1>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Featured Image Placeholder */}
          <div className="relative mb-8">
            <div className="aspect-[16/9] bg-gradient-to-br from-ivory-100 to-ivory-200 rounded-2xl flex items-center justify-center border-2 border-dashed border-earth-300 shadow-warm">
              <div className="text-center text-earth-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="w-16 h-16 mx-auto mb-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                <p>תמונה ראשית</p>
              </div>
            </div>
          </div>

          {/* Biography Card */}
          <article className="card-warm rounded-2xl p-6 md:p-8">
            {/* Opening quote */}
            <div className="quote-sunflower mb-6">
              <p className="text-xl md:text-2xl leading-relaxed text-earth-700">
                גל הייתה אדם מיוחד, מלא אור וחום. היא נגעה בחייהם של רבים והשאירה חותם
                בל יימחה בליבותיהם של כל מי שהכיר אותה.
              </p>
            </div>

            {/* Decorative divider */}
            <div className="sunflower-divider">
              <span className="w-2 h-2 rounded-full bg-sunflower-400"></span>
            </div>

            <div className="space-y-5 text-earth-600 text-base md:text-lg leading-relaxed">
              <p>
                היא אהבה את החיים בכל ליבה - מהרגעים הקטנים ועד להרפתקאות הגדולות.
                החיוך שלה האיר כל חדר שנכנסה אליו, והיא תמיד ידעה לגרום לאחרים להרגיש
                מיוחדים וחשובים.
              </p>

              <p>
                גל האמינה בטוב שבאנשים ותמיד חיפשה דרכים לעזור לאחרים. היא הייתה חברה
                נאמנה, בת משפחה אוהבת, ואדם שהשראה את כל מי שהכיר אותה.
              </p>

              <p>
                האתר הזה נבנה כדי לשמר את זכרה ולחלוק את הסיפורים והרגעים המיוחדים
                שחווינו איתה. כל סיפור, כל תמונה, כל זיכרון - הם חלק מהמורשת היפה
                שהשאירה אחריה.
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
