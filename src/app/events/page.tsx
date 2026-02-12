import { Metadata } from "next";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { EventPhotoGrid } from "@/components/ui/EventPhotoGrid";
import { SunflowerBackground } from "@/components/ui/SunflowerBackground";

export const metadata: Metadata = {
  title: "אירועים | לזכותה של גל חפץ ז״ל",
  description: "אירועים וטקסים לזכותה של גל",
};

const events = [
  {
    id: 1,
    title: "מארון הבגדים של גל",
    date: "2025-10-24",
    time: "10:00",
    location: "",
    description:
      "לגל תמיד הייתה חיבה ואהבה גדולה לבגדים, לאקססוריז, תכשיטים, נעליים ועוד… ועוד…\nעם היופי, הגובה והתעוזה גם הבגדים אהבו אותה.\nשהבגד מיצה את עצמו עבורה או סתם שנמאס לה ממנו היא הייתה נוהגת לרענן את המלתחה ולהכריז: ״בנות, מוזמנות להתחדש ולקחת מה שאתן רוצות….״\nומה שהיה נשאר לאחר בחירתן והולך לתרומה.",
    upcoming: false,
    photos: [                                                                                                                                                                                                                                                
    "/images/events/closet/closet-1.jpg",                                                                                                                                                                                                                         
    "/images/events/closet/closet-2.JPG",
    "/images/events/closet/closet-3.JPG",
    "/images/events/closet/closet-4.JPG",
  ]as string[],
  },
  {
    id: 2,
    title: "יריד תחפושות לזכותה",
    date: "2024-02-13",
    time: "16:00",
    location: "שבט המושבה",
    description:
      "גל נולדה בחודש מרץ, ואהבתה לפורים הייתה יוצאת דופן. מדי שנה הייתה משקיעה ומכינה את התחפושות הכי מגניבות, מקוריות ומיוחדות.\nבנוסף, לגל הייתה אהבה גדולה לבגדים, אקססוריז ותכשיטים.\n\nמתוך החיבור המיוחד בין שתי האהבות האלו, בחרנו להקים יריד תחפושות לזכרה.\nאת האירוע עשינו בשיתוף שבט המושבה- השבט באם המושבות פתח תקווה, בו גדלה גל, התחנכה, ובילתה את רוב שעות היום שלה בתקופת התיכון.\nלאחר שגל נפטרה, השבט העניק לגדוד בשכבת ז׳ את השם ׳גדוד גל׳ על שמה של גל, שיוביל את כל האירועים לזכרה במהלך השנה, את יריד התחפושות הגדוד וצוות המדריכים מובילים ביחד, מנחילים את הערכים של גל לשאר השבט והקהילה של השכונה, בעזרת תחנות נלוות אשר מדברות על הערכים של גל, עמדת תרומות שיער ומשפטים שמקשטים את השבט עם הדברים שגל האמינה בהם.\nאתם מוזמנים להסתובב, לבחור תחפושות שאהבתם –\nויחד איתנו, להמשיך ולהפיץ את האור של גל ✨",
    upcoming: true,
    photos: [] as string[],
  },
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("he-IL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function EventsPage() {
  const upcomingEvents = events.filter((e) => e.upcoming);
  const pastEvents = events.filter((e) => !e.upcoming);

  return (
    <div className="min-h-screen bg-warm-gradient relative">
      <SunflowerBackground />

      <div className="container mx-auto px-4 py-10 relative z-10">
        {/* Page Header */}
        <div className="page-header mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-earth-800">
            אירועים
          </h1>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <section className="mb-10" aria-labelledby="upcoming-events-heading">
              <h2 id="upcoming-events-heading" className="text-xl md:text-2xl font-bold text-earth-700 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sunflower-400 animate-pulse" aria-hidden="true"></span>
                אירועים קרובים
              </h2>
              <div className="space-y-4" role="list" aria-label="רשימת אירועים קרובים">
                {upcomingEvents.map((event) => (
                  <article key={event.id} role="listitem">
                    <Card variant="featured">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg md:text-xl font-bold text-earth-800">
                            {event.title}
                          </h3>
                          <span
                            className="bg-sunflower-500 text-earth-900 px-3 py-1 rounded-full text-xs md:text-sm font-bold"
                            role="status"
                            aria-label="אירוע קרוב"
                          >
                            קרוב
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {event.description.split("\n").map((line, i) => (
                          <p key={i} className="text-earth-600 text-sm md:text-base mb-1 last:mb-4">{line}</p>
                        ))}
                        <EventPhotoGrid photos={event.photos} eventTitle={event.title} />
                        <div className="flex flex-wrap gap-3 text-xs md:text-sm text-earth-500">
                          <time
                            dateTime={event.date}
                            className="flex items-center gap-1 bg-ivory-200 px-2 py-1 rounded"
                          >
                            <span className="sr-only">תאריך:</span>
                            {formatDate(event.date)}
                          </time>
                          <span className="flex items-center gap-1 bg-ivory-200 px-2 py-1 rounded">
                            <span className="sr-only">שעה:</span>
                            {event.time}
                          </span>
                          <span className="flex items-center gap-1 bg-ivory-200 px-2 py-1 rounded">
                            <span className="sr-only">מיקום:</span>
                            {event.location}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Past Events */}
          <section aria-labelledby="past-events-heading">
            <h2 id="past-events-heading" className="text-xl md:text-2xl font-bold text-earth-700 mb-4">
              אירועים שהיו
            </h2>
            <div className="space-y-3" role="list" aria-label="רשימת אירועים שעברו">
              {pastEvents.map((event) => (
                <article key={event.id} role="listitem">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="text-base md:text-lg font-bold text-earth-700 mb-1">
                        {event.title}
                      </h3>
                      {event.description.split("\n").map((line, i) => (
                        <p key={i} className="text-earth-500 text-sm md:text-base mb-1 last:mb-2">{line}</p>
                      ))}
                      <EventPhotoGrid photos={event.photos} eventTitle={event.title} />
                      <div className="flex flex-wrap gap-3 text-xs md:text-sm text-earth-400">
                        <time dateTime={event.date}>
                          <span className="sr-only">תאריך:</span>
                          {formatDate(event.date)}
                        </time>
                        <span>
                          <span className="sr-only">מיקום:</span>
                          {event.location}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
