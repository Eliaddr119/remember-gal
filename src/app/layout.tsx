import type { Metadata } from "next";
import { Rubik, Secular_One } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AccessibilityProvider } from "@/components/accessibility/AccessibilityProvider";
import { AccessibilityMenu } from "@/components/accessibility/AccessibilityMenu";
import { SkipLink } from "@/components/accessibility/SkipLink";

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
        <script async src="https://tally.so/widgets/embed.js" />
      </head>
      <body className={`${rubik.variable} ${secularOne.variable} font-rubik antialiased min-h-screen flex flex-col`}>
        <AccessibilityProvider>
          <SkipLink />
          <Header />
          <main id="main-content" className="flex-1 pt-20 md:pt-24">
            {children}
          </main>
          <Footer />
          <AccessibilityMenu />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
