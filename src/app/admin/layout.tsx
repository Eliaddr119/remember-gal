import { SessionProvider } from "@/components/admin/SessionProvider";

// Minimal root admin layout — wraps all /admin/* routes including login.
// The nav is added by (panel)/layout.tsx for authenticated pages only.
export const metadata = { title: "ניהול האתר" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
