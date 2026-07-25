"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import OpenNagish from "@/components/accessibility/OpenNagish";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 pt-20 md:pt-24">
        {children}
      </main>
      <Footer />
      <OpenNagish />
    </>
  );
}
