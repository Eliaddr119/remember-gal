import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AccessibilityProvider } from "@/components/accessibility/AccessibilityProvider";
import { AccessibilityMenu } from "@/components/accessibility/AccessibilityMenu";
import { SkipLink } from "@/components/accessibility/SkipLink";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "לזכרה של גל חפץ ז״ל",
  description: "אתר הנצחה לזכרה של גל חפץ ז״ל",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${heebo.variable} font-heebo antialiased min-h-screen flex flex-col`}>
        <AccessibilityProvider>
          <SkipLink />
          <Header />
          <main id="main-content" className="flex-1 pt-14 md:pt-16">
            {children}
          </main>
          <Footer />
          <AccessibilityMenu />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
