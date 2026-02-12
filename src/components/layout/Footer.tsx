import { Logo, SunflowerDecoration, Signature } from "../ui/Logo";

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-earth-700 to-earth-800 text-ivory-100 py-6 mt-auto overflow-hidden" role="contentinfo">
      {/* Decorative sunflowers */}
      <div className="absolute top-0 right-0 opacity-5 pointer-events-none" aria-hidden="true">
        <SunflowerDecoration className="w-24 h-24 -translate-y-1/3 translate-x-1/3" />
      </div>
      <div className="absolute bottom-0 left-0 opacity-5 pointer-events-none" aria-hidden="true">
        <SunflowerDecoration className="w-20 h-20 translate-y-1/3 -translate-x-1/3" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
            {/* Logo */}
            <div aria-hidden="true">
              <Logo size="md" />
            </div>

            {/* Title */}
            <p className="text-lg font-bold text-sunflower-300">לזכרה של גל חפץ ז״ל</p>

            {/* Divider - hidden on mobile */}
            <span className="hidden md:block w-px h-6 bg-sunflower-500/30" aria-hidden="true"></span>

            {/* Subtitle */}
            <p className="text-sm md:text-base text-ivory-400">
              נבנה באהבה על ידי המשפחה והחברים
            </p>
          </div>

          {/* Signature - decorative in footer */}
          <div aria-hidden="true">
            <Signature className="w-28 h-auto opacity-70 brightness-0 invert" />
          </div>
        </div>
      </div>
    </footer>
  );
}
