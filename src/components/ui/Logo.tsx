import Image from "next/image";

// Main App Logo - uses the custom Gal logo
export function Logo({ className = "", size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: { width: 48, height: 48, class: "w-12 h-12" },
    md: { width: 64, height: 64, class: "w-16 h-16" },
    lg: { width: 96, height: 96, class: "w-24 h-24" },
  };

  const sizeConfig = sizes[size];

  return (
    <Image
      src="/gal-logo.svg"
      alt="לוגו לזכותה של גל"
      width={sizeConfig.width}
      height={sizeConfig.height}
      className={`${sizeConfig.class} ${className}`}
      priority
    />
  );
}

// Gal's Signature
export function Signature({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <Image
      src="/gal-signature.svg"
      alt="החתימה של גל"
      width={300}
      height={105}
      className={`${className} ${dark ? "invert brightness-200" : ""}`}
    />
  );
}

// Realistic Sunflower - natural looking with gradients and depth
export function RealisticSunflower({ className = "" }: { className?: string }) {
  const petalAngles = [0, 13, 26, 39, 52, 65, 78, 91, 104, 117, 130, 143, 156, 169, 182, 195, 208, 221, 234, 247, 260, 273, 286, 299, 312, 325, 338, 351];

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        {/* Petal gradients for realistic look */}
        <linearGradient id="petalGrad1" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FFE066" />
          <stop offset="40%" stopColor="#FFD333" />
          <stop offset="100%" stopColor="#E6A800" />
        </linearGradient>
        <linearGradient id="petalGrad2" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FFDB4D" />
          <stop offset="50%" stopColor="#FFCC00" />
          <stop offset="100%" stopColor="#CC9900" />
        </linearGradient>
        <linearGradient id="petalGrad3" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FFE680" />
          <stop offset="60%" stopColor="#FFD94D" />
          <stop offset="100%" stopColor="#D9A300" />
        </linearGradient>
        {/* Center gradient */}
        <radialGradient id="centerGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#8B5A2B" />
          <stop offset="50%" stopColor="#5D3A1A" />
          <stop offset="100%" stopColor="#3D2512" />
        </radialGradient>
        {/* Inner center pattern */}
        <radialGradient id="innerCenterGrad" cx="45%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#6B4423" />
          <stop offset="100%" stopColor="#4A2C17" />
        </radialGradient>
      </defs>

      {/* Back layer petals - slightly darker, offset */}
      {petalAngles.filter((_, i) => i % 2 === 0).map((angle, i) => (
        <ellipse
          key={`back-${angle}`}
          cx="50"
          cy="14"
          rx="5.5"
          ry="21"
          fill={`url(#petalGrad${(i % 3) + 1})`}
          transform={`rotate(${angle + 6.5} 50 50)`}
          opacity="0.85"
        />
      ))}

      {/* Front layer petals - main petals */}
      {petalAngles.map((angle, i) => (
        <ellipse
          key={`front-${angle}`}
          cx="50"
          cy="12"
          rx="6"
          ry="23"
          fill={`url(#petalGrad${(i % 3) + 1})`}
          transform={`rotate(${angle} 50 50)`}
        />
      ))}

      {/* Inner petals - smaller, lighter */}
      {[0, 24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336].map((angle) => (
        <ellipse
          key={`inner-${angle}`}
          cx="50"
          cy="26"
          rx="4"
          ry="12"
          fill="#FFEB99"
          transform={`rotate(${angle + 12} 50 50)`}
          opacity="0.7"
        />
      ))}

      {/* Brown center - outer ring */}
      <circle cx="50" cy="50" r="17" fill="url(#centerGrad)" />

      {/* Center texture - seed pattern */}
      <circle cx="50" cy="50" r="14" fill="url(#innerCenterGrad)" />

      {/* Seed dots - spiral pattern for realism */}
      {[
        { cx: 50, cy: 42, r: 1.3 },
        { cx: 45, cy: 44, r: 1.2 },
        { cx: 55, cy: 44, r: 1.2 },
        { cx: 42, cy: 48, r: 1.3 },
        { cx: 50, cy: 47, r: 1.4 },
        { cx: 58, cy: 48, r: 1.3 },
        { cx: 44, cy: 52, r: 1.2 },
        { cx: 50, cy: 52, r: 1.3 },
        { cx: 56, cy: 52, r: 1.2 },
        { cx: 42, cy: 56, r: 1.3 },
        { cx: 48, cy: 56, r: 1.2 },
        { cx: 54, cy: 56, r: 1.2 },
        { cx: 58, cy: 55, r: 1.3 },
        { cx: 46, cy: 60, r: 1.1 },
        { cx: 52, cy: 59, r: 1.2 },
      ].map((seed, i) => (
        <circle
          key={`seed-${i}`}
          cx={seed.cx}
          cy={seed.cy}
          r={seed.r}
          fill="#2D1A0E"
          opacity="0.8"
        />
      ))}

      {/* Highlight on center for 3D effect */}
      <ellipse cx="46" cy="46" r="4" ry="3" fill="#8B6B3D" opacity="0.3" />
    </svg>
  );
}

// Design 1: Classic full sunflower with many petals
export function Sunflower1({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345].map((angle, i) => (
        <ellipse
          key={angle}
          cx="50"
          cy="18"
          rx="7"
          ry="20"
          fill={i % 2 === 0 ? "#FBBF24" : "#FCD34D"}
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="16" fill="#92400E" />
      <circle cx="50" cy="50" r="12" fill="#78350F" />
      <circle cx="50" cy="50" r="8" fill="#5D3A1A" />
    </svg>
  );
}

// Design 2: Simpler sunflower with fewer, wider petals
export function Sunflower2({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
        <ellipse
          key={angle}
          cx="50"
          cy="20"
          rx="10"
          ry="22"
          fill={i % 2 === 0 ? "#F59E0B" : "#FBBF24"}
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((angle) => (
        <ellipse
          key={`inner-${angle}`}
          cx="50"
          cy="26"
          rx="6"
          ry="14"
          fill="#FDE68A"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="18" fill="#B45309" />
      <circle cx="50" cy="50" r="13" fill="#92400E" />
    </svg>
  );
}

// Design 3: Small daisy-like sunflower
export function Sunflower3({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <ellipse
          key={angle}
          cx="50"
          cy="22"
          rx="9"
          ry="18"
          fill={i % 2 === 0 ? "#FCD34D" : "#FDE68A"}
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => (
        <ellipse
          key={`mid-${angle}`}
          cx="50"
          cy="28"
          rx="7"
          ry="12"
          fill="#FBBF24"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="15" fill="#D97706" />
      <circle cx="50" cy="50" r="10" fill="#B45309" />
    </svg>
  );
}

// Design 4: Detailed sunflower with gradient effect
export function Sunflower4({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340].map((angle, i) => (
        <ellipse
          key={angle}
          cx="50"
          cy="15"
          rx="6"
          ry="22"
          fill={i % 3 === 0 ? "#F59E0B" : i % 3 === 1 ? "#FBBF24" : "#FCD34D"}
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      {[10, 30, 50, 70, 90, 110, 130, 150, 170, 190, 210, 230, 250, 270, 290, 310, 330, 350].map((angle) => (
        <ellipse
          key={`mid-${angle}`}
          cx="50"
          cy="25"
          rx="5"
          ry="14"
          fill="#FDE68A"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="17" fill="#92400E" />
      <circle cx="50" cy="50" r="12" fill="#78350F" />
      {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle, i) => (
        <circle
          key={`seed-${angle}`}
          cx="50"
          cy={45 + (i % 3) * 3}
          r="1.2"
          fill="#3D2B1F"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
    </svg>
  );
}

// Design 5: Stylized modern sunflower
export function Sunflower5({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((angle, i) => (
        <ellipse
          key={angle}
          cx="50"
          cy="18"
          rx="9"
          ry="22"
          fill={i % 2 === 0 ? "#FBBF24" : "#F59E0B"}
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      {[18, 54, 90, 126, 162, 198, 234, 270, 306, 342].map((angle) => (
        <ellipse
          key={`petal-${angle}`}
          cx="50"
          cy="24"
          rx="6"
          ry="16"
          fill="#FCD34D"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="16" fill="#B45309" />
      <circle cx="50" cy="50" r="11" fill="#92400E" />
      <circle cx="50" cy="50" r="6" fill="#78350F" />
    </svg>
  );
}

// Backwards compatibility
export function SunflowerDecoration({ className = "" }: { className?: string }) {
  return <Sunflower1 className={className} />;
}
