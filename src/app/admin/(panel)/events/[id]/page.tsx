import { apiFetch } from "@/lib/api-fetch";
import EventForm from "@/components/admin/EventForm";
import type { EventRow } from "@/lib/events";

export default async function EventEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  const event = isNew ? null : await apiFetch<EventRow>(`/api/events/${params.id}`);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {isNew ? "אירוע חדש" : "עריכת אירוע"}
      </h1>
      <EventForm event={event} isNew={isNew} eventId={params.id} />
    </div>
  );
}
