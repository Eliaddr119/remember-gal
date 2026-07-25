import type { Metadata } from "next";
import { Rubik, Secular_One } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/layout/SiteChrome";
import { AccessibilityProvider } from "@/components/accessibility/AccessibilityProvider";
import { SkipLink } from "@/components/accessibility/SkipLink";

// Origin that serves gallery images. Derived from env in prod; falls back to the
// known project host so the preconnect is still correct in local/dev builds.
const SUPABASE_ORIGIN = (
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ilylmlusnqyqdhywnmhk.supabase.co"
).replace(/\/+$/, "");

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  variable: "--font-rubik",
  display: "swap",
});

const secularOne = Secular_One({
  weight: "400",
  subsets: ["hebrew", "latin"],
  variable: "--font-secular",
  display: "swap",
});

export const metadata: Metadata = {
  title: "לזכותה של גל חפץ ז״ל",
  description: "אתר הנצחה לזכותה של גל חפץ ז״ל",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        {/* Preconnect to the exact origin that serves our images so the first
            photo doesn't pay DNS + TLS setup. No crossOrigin: our <img> loads
            are non-CORS, so a plain preconnect matches the connection they use. */}
        <link rel="preconnect" href={SUPABASE_ORIGIN} />
        <link rel="dns-prefetch" href={SUPABASE_ORIGIN} />
      </head>
      <body className={`${rubik.variable} ${secularOne.variable} font-rubik antialiased min-h-screen flex flex-col`}>
        <AccessibilityProvider>
          <SkipLink />
          <SiteChrome>{children}</SiteChrome>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
