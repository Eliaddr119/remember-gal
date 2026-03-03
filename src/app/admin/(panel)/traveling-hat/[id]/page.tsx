import { apiFetch } from "@/lib/api-fetch";
import TravelingHatForm from "@/components/admin/TravelingHatForm";
import type { PinRow } from "@/lib/traveling-hat";

export default async function TravelingHatEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  const pin = isNew ? null : await apiFetch<PinRow>(`/api/traveling-hat/${params.id}`);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {isNew ? "מסע חדש" : "עריכת מסע"}
      </h1>
      <TravelingHatForm pin={pin} isNew={isNew} pinId={params.id} />
    </div>
  );
}
