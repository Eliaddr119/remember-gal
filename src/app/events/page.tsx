import { Metadata } from "next";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { EventPhotoGrid } from "@/components/ui/EventPhotoGrid";
import { SunflowerBackground } from "@/components/ui/SunflowerBackground";
import { getEvents } from "@/lib/events";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "אירועים | לזכותה של גל חפץ ז״ל",
  description: "אירועים וטקסים לזכותה של גל",
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("he-IL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function EventsPage() {
  const events = await getEvents();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingEvents = events.filter((e) => new Date(e.date) >= today);
  const pastEvents = events.filter((e) => new Date(e.date) < today);

  return (
    <div className="min-h-screen bg-warm-gradient relative">
      <SunflowerBackground />

      <div className="container mx-auto px-4 py-10 relative z-10">
        {/* Page Header */}
        <div className="page-header mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-earth-800">
             אירועים לזכותה
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
                        <EventPhotoGrid photos={event.photos} videos={event.videos} eventTitle={event.title} />
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
                      <EventPhotoGrid photos={event.photos} videos={event.videos} eventTitle={event.title} />
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
