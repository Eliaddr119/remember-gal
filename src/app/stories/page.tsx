import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/Card";
import { SunflowerBackground } from "@/components/ui/SunflowerBackground";

export const metadata: Metadata = {
  title: "חברים ומשפחה מספרים | לזכרה של גל חפץ ז״ל",
  description: "סיפורים וזיכרונות מחברים ומשפחה על גל",
};

const stories = [
  {
    id: 1,
    author: "רחל, חברה קרובה",
    content:
      "גל הייתה תמיד שם בשבילי. בכל רגע קשה, בכל שמחה - היא ידעה להיות שם בדיוק ברגע הנכון עם המילים הנכונות.",
    date: "2024",
  },
  {
    id: 2,
    author: "דני, אח",
    content:
      "האחות הכי טובה שיכולתי לבקש. היא לימדה אותי מה זה אומר להיות אכפתי, להקשיב, ולתת מכל הלב.",
    date: "2024",
  },
  {
    id: 3,
    author: "מיכל, חברה מהעבודה",
    content:
      "גל הפכה כל יום עבודה לחוויה. הצחוק שלה היה מדבק, והאופטימיות שלה השפיעה על כל הצוות.",
    date: "2024",
  },
  {
    id: 4,
    author: "יוסי, חבר ילדות",
    content:
      "אני זוכר את גל מהגן. גם אז היא הייתה מיוחדת - תמיד דאגה שלכולם יהיה כיף, שאף אחד לא ירגיש לבד.",
    date: "2024",
  },
];

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-warm-gradient relative">
      <SunflowerBackground />

      <div className="container mx-auto px-4 py-10 relative z-10">
        {/* Page Header */}
        <div className="page-header mb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-earth-800">
            חברים ומשפחה מספרים
          </h1>
        </div>
        <p className="text-center text-earth-500 mb-8 max-w-2xl mx-auto">
          סיפורים וזיכרונות מאנשים שחייהם נגעו בגל
        </p>

        <div className="max-w-2xl mx-auto space-y-5">
          {stories.map((story) => (
            <Card key={story.id}>
              <CardContent className="p-5 md:p-6">
                <div className="quote-sunflower">
                  <blockquote className="text-base md:text-lg text-earth-700 mb-4 leading-relaxed">
                    {story.content}
                  </blockquote>
                </div>
                <footer className="flex justify-between items-center pt-3 border-t border-earth-200">
                  <cite className="font-medium text-earth-500 not-italic text-sm">
                    — {story.author}
                  </cite>
                  <time className="text-earth-400 text-sm">{story.date}</time>
                </footer>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-12 max-w-lg mx-auto">
          <div className="bg-sunflower-gradient rounded-xl p-6 text-center shadow-warm">
            <h2 className="text-xl font-bold text-earth-800 mb-2">
              יש לכם סיפור לשתף?
            </h2>
            <p className="text-earth-600 text-sm">
              צרו קשר עם המשפחה לשיתוף סיפורים נוספים
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
