import Link from "next/link";
import Image from "next/image";
import { Logo, Signature } from "@/components/ui/Logo";
import { SunflowerBackground } from "@/components/ui/SunflowerBackground";

export default function Home() {
  return (
    <div className="min-h-screen bg-warm-gradient relative overflow-hidden">
      <SunflowerBackground />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto text-center">
          {/* Logo */}
          <div className="flex justify-center -mb-2">
            <Logo size="lg" className="w-44 h-35 md:w-60 md:h-35 lg:w-80 lg:h-40" />
          </div>

          {/* Main Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-earth-800 mb-4 leading-tight">
            לזכרה של
          </h1>

          {/* Gal's Signature as name */}
          <div className="flex justify-center my-4">
            <Signature className="w-56 md:w-72 lg:w-80 h-auto" />
          </div>

          <p className="text-2xl md:text-3xl lg:text-4xl text-earth-600 font-bold">ז״ל</p>

          {/* Simple decorative divider */}
          <div className="flex items-center justify-center gap-2 my-5" role="presentation" aria-hidden="true">
            <span className="w-12 h-0.5 bg-gradient-to-r from-transparent to-sunflower-400 rounded-full"></span>
            <span className="w-2 h-2 bg-sunflower-400 rounded-full"></span>
            <span className="w-12 h-0.5 bg-gradient-to-l from-transparent to-sunflower-400 rounded-full"></span>
          </div>

          {/* Hero Image */}
          <figure className="relative mx-auto max-w-md mb-8" role="img" aria-label="תמונה של גל">
            <div className="aspect-[4/3] rounded-2xl shadow-warm-lg border-4 border-sunflower-300/50 overflow-hidden relative">
              <Image
                src="/images/main_page_photo.PNG"
                alt="תמונה של גל"
                fill
                className="object-cover"
                priority
              />
            </div>
          </figure>

          {/* Subtitle */}
          <p className="text-base md:text-lg lg:text-xl text-earth-600 mb-8 max-w-lg mx-auto leading-relaxed">
           &ldquo;השמיים הם הגבול והדרך דרך ארץ&rdquo;
          </p>

          {/* CTA Button */}
          <Link
            href="/about"
            className="inline-flex items-center gap-3 btn-sunflower text-base px-6 py-3 rounded-xl"
          >
            <span>להכיר את גל</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 rtl:rotate-180"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </Link>

          {/* Quick Links */}
          <nav aria-label="קישורים מהירים" className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-xl mx-auto">
            {[
              { href: "/stories", label: "סיפורים", description: "קראו סיפורים וזיכרונות מחברים ומשפחה", icon: "M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" },
              { href: "/events", label: "אירועים", description: "צפו באירועים וטקסים לזכרה של גל", icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" },
              { href: "/gallery", label: "גלריה", description: "צפו בתמונות ורגעים מיוחדים", icon: "m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" },
              { href: "/education", label: "הדרכה", description: "חומרי הדרכה וחינוך לזכרה של גל", icon: "M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-label={`${link.label} - ${link.description}`}
                className="group flex flex-col items-center gap-2 p-3 rounded-xl bg-ivory-50/90 hover:bg-sunflower-100 border border-earth-200 hover:border-sunflower-300 transition-all duration-300 shadow-warm hover:shadow-warm-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-earth-500 group-hover:text-sunflower-600 transition-colors"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
                </svg>
                <span className="text-sm md:text-base text-earth-700 group-hover:text-earth-800 font-medium">
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
