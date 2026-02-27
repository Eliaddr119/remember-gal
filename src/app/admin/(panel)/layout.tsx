import AdminNav from "@/components/admin/AdminNav";

// Disable Next.js caching for all admin pages so content changes appear immediately
export const dynamic = "force-dynamic";

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100" dir="rtl">
      <AdminNav />
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
