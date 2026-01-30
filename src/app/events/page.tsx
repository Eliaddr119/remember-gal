import { Metadata } from "next";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { SunflowerBackground } from "@/components/ui/SunflowerBackground";

export const metadata: Metadata = {
  title: "אירועים | לזכרה של גל חפץ ז״ל",
  description: "אירועים וטקסים לזכרה של גל",
};

const events = [
  {
    id: 1,
    title: "טקס יום הזיכרון",
    date: "2024-04-15",
    time: "10:00",
    location: "בית העלמין",
    description:
      "טקס אזכרה שנתי לציון יום הזיכרון. המשפחה והחברים מתאספים לזכור ולחלוק.",
    upcoming: false,
  },
  {
    id: 2,
    title: "מפגש שנתי לזכר גל",
    date: "2024-06-20",
    time: "18:00",
    location: "פארק הירקון",
    description:
      "מפגש חברתי שנתי בו נזכור את גל דרך פעילויות שהיא אהבה - מוזיקה, אוכל טוב וצחוק.",
    upcoming: false,
  },
  {
    id: 3,
    title: "פעילות התנדבותית לזכרה",
    date: "2025-03-15",
    time: "09:00",
    location: "עמותת 'יד לילד'",
    description:
      "יום התנדבות בעמותה שגל תמכה בה. הזדמנות להמשיך את דרכה ולתת לקהילה.",
    upcoming: true,
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
          <h1 className="text-3xl md:text-4xl font-bold text-earth-800">
            אירועים
          </h1>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-bold text-earth-700 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sunflower-400 animate-pulse"></span>
                אירועים קרובים
              </h2>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} variant="featured">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-earth-800">
                          {event.title}
                        </h3>
                        <span className="bg-sunflower-500 text-earth-900 px-3 py-1 rounded-full text-xs font-bold">
                          קרוב
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-earth-600 mb-4 text-sm">{event.description}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-earth-500">
                        <span className="flex items-center gap-1 bg-ivory-200 px-2 py-1 rounded">
                          {formatDate(event.date)}
                        </span>
                        <span className="flex items-center gap-1 bg-ivory-200 px-2 py-1 rounded">
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1 bg-ivory-200 px-2 py-1 rounded">
                          {event.location}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Past Events */}
          <section>
            <h2 className="text-xl font-bold text-earth-700 mb-4">
              אירועים שהיו
            </h2>
            <div className="space-y-3">
              {pastEvents.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-earth-700 mb-1">
                      {event.title}
                    </h3>
                    <p className="text-earth-500 text-sm mb-2">{event.description}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-earth-400">
                      <span>{formatDate(event.date)}</span>
                      <span>{event.location}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
