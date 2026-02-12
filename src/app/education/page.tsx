import { Metadata } from "next";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { SunflowerBackground } from "@/components/ui/SunflowerBackground";

export const metadata: Metadata = {
  title: "יחידות הדרכה | לזכות גל",
  description: "חומרים חינוכיים ויחידות הדרכה לזכותה של גל",
};

const educationResources = [
  {
    id: 1,
    title: "על חברות אמיתית - בעקבות פו הדוב",
    category: "ערכים",
    description:
      "סדנה על משמעות החברות והקשרים האנושיים, בהשראת הקשרים שגל יצרה עם סביבתה.",
    downloadHref: "/education/pdfs/friendship.pdf",
  },
  {
    id: 2,
    title: "לראות את הטוב",
    category: "כלי חיים",
    description:
      "יחידה על חשיבות הגישה החיובית לחיים, עם דוגמאות מחייה של גל ותרגילים מעשיים.",
    downloadHref: "/education/pdfs/seeing-the-good.pdf",
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
                    <p className="text-base md:text-lg text-earth-600 mb-5">{resource.description}</p>
                    <a
                      href={resource.downloadHref}
                      download
                      className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-sunflower-400 hover:bg-sunflower-500 text-earth-800 font-medium rounded-lg transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                        />
                      </svg>
                      הורדת PDF
                    </a>
                  </CardContent>
                </Card>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
