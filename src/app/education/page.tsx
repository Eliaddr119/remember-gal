import { Metadata } from "next";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { SunflowerBackground } from "@/components/ui/SunflowerBackground";

export const metadata: Metadata = {
  title: "יחידות הדרכה | לזכר גל",
  description: "חומרים חינוכיים ויחידות הדרכה לזכרה של גל",
};

const educationResources = [
  {
    id: 1,
    title: "סדנת ערכים - על נתינה וחסד",
    category: "ערכים",
    description:
      "יחידת הדרכה העוסקת בערך הנתינה, בהשראת דרכה של גל. מתאימה לקבוצות נוער ומבוגרים.",
    duration: "90 דקות",
    audience: "נוער ומבוגרים",
  },
  {
    id: 2,
    title: "פעילות זיכרון - לזכור ולהנציח",
    category: "הנצחה",
    description:
      "פעילות קבוצתית על משמעות הזיכרון וההנצחה, עם כלים מעשיים ליצירת מורשת אישית.",
    duration: "60 דקות",
    audience: "כל הגילאים",
  },
  {
    id: 3,
    title: "שיחה על אופטימיות",
    category: "כלי חיים",
    description:
      "יחידה על חשיבות הגישה החיובית לחיים, עם דוגמאות מחייה של גל ותרגילים מעשיים.",
    duration: "45 דקות",
    audience: "נוער",
  },
  {
    id: 4,
    title: "על חברות אמיתית",
    category: "ערכים",
    description:
      "סדנה על משמעות החברות והקשרים האנושיים, בהשראת הקשרים שגל יצרה עם סביבתה.",
    duration: "60 דקות",
    audience: "ילדים ונוער",
  },
];

const categoryColors: Record<string, string> = {
  ערכים: "bg-sunflower-400 text-earth-800",
  הנצחה: "bg-earth-600 text-ivory-50",
  "כלי חיים": "bg-sunflower-200 text-earth-700",
};

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-warm-gradient relative">
      <SunflowerBackground />

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Page Header */}
        <div className="page-header mb-4">
          <h1 className="text-4xl md:text-5xl font-bold text-earth-800">
            יחידות הדרכה
          </h1>
        </div>
        <p className="text-center text-earth-500 mb-10 max-w-2xl mx-auto text-lg">
          חומרים חינוכיים שנוצרו בהשראת דרכה וערכיה של גל
        </p>

        {/* Resource Grid */}
        <section aria-labelledby="resources-heading" className="max-w-5xl mx-auto">
          <h2 id="resources-heading" className="sr-only">רשימת יחידות הדרכה</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="list" aria-label={`${educationResources.length} יחידות הדרכה`}>
            {educationResources.map((resource) => (
              <article key={resource.id} role="listitem">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start gap-3">
                      <h3 className="text-xl font-bold text-earth-700">
                        {resource.title}
                      </h3>
                      <span
                        className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap shadow-sm ${
                          categoryColors[resource.category] ||
                          "bg-ivory-300 text-earth-700"
                        }`}
                        aria-label={`קטגוריה: ${resource.category}`}
                      >
                        {resource.category}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-earth-600 mb-5">{resource.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-earth-500">
                      <span className="flex items-center gap-2 bg-ivory-200 px-3 py-1.5 rounded-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 text-sunflower-600"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                        <span className="sr-only">משך:</span>
                        {resource.duration}
                      </span>
                      <span className="flex items-center gap-2 bg-ivory-200 px-3 py-1.5 rounded-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 text-sunflower-600"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                          />
                        </svg>
                        <span className="sr-only">קהל יעד:</span>
                        {resource.audience}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </article>
            ))}
          </div>
        </section>

        {/* Contact for resources */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="card-warm rounded-2xl p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-earth-800 mb-4">
              מעוניינים בחומרים?
            </h2>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-2 mb-4" aria-hidden="true">
              <span className="w-8 h-px bg-sunflower-400"></span>
              <span className="w-2 h-2 rounded-full bg-sunflower-400"></span>
              <span className="w-8 h-px bg-sunflower-400"></span>
            </div>

            <p className="text-earth-600 mb-3">
              ניתן לקבל את החומרים המלאים ליחידות ההדרכה ללא עלות
            </p>
            <p className="text-sm text-earth-500">
              צרו קשר עם המשפחה לקבלת החומרים
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
