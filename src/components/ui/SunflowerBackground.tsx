import { Sunflower1, Sunflower2, Sunflower3 } from "./Logo";

export function SunflowerBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true" role="presentation">
      {/* Left edge */}
      <div className="absolute top-[3%] left-[0%] opacity-[0.06]">
        <Sunflower1 className="w-16 h-16 md:w-24 md:h-24" />
      </div>
      <div className="absolute top-[32%] left-[0%] opacity-[0.06]">
        <Sunflower2 className="w-14 h-14 md:w-20 md:h-20" />
      </div>
      <div className="absolute top-[62%] left-[0%] opacity-[0.06]">
        <Sunflower3 className="w-14 h-14 md:w-20 md:h-20" />
      </div>
      <div className="absolute top-[90%] left-[0%] opacity-[0.06]">
        <Sunflower1 className="w-14 h-14 md:w-20 md:h-20" />
      </div>

      {/* Right edge */}
      <div className="absolute top-[5%] right-[0%] opacity-[0.05]">
        <Sunflower2 className="w-14 h-14 md:w-20 md:h-20" />
      </div>
      <div className="absolute top-[35%] right-[0%] opacity-[0.05]">
        <Sunflower3 className="w-12 h-12 md:w-18 md:h-18" />
      </div>
      <div className="absolute top-[65%] right-[0%] opacity-[0.05]">
        <Sunflower1 className="w-14 h-14 md:w-20 md:h-20" />
      </div>
      <div className="absolute top-[92%] right-[0%] opacity-[0.05]">
        <Sunflower2 className="w-12 h-12 md:w-16 md:h-16" />
      </div>

      {/* Desktop only — inner scattered sunflowers */}
      <div className="hidden md:block">
        <div className="absolute top-[10%] left-[6%] opacity-[0.04]">
          <Sunflower3 className="w-14 h-14" />
        </div>
        <div className="absolute top-[48%] left-[5%] opacity-[0.04]">
          <Sunflower1 className="w-14 h-14" />
        </div>
        <div className="absolute top-[78%] left-[6%] opacity-[0.04]">
          <Sunflower2 className="w-14 h-14" />
        </div>
        <div className="absolute top-[15%] right-[6%] opacity-[0.04]">
          <Sunflower1 className="w-14 h-14" />
        </div>
        <div className="absolute top-[45%] right-[5%] opacity-[0.04]">
          <Sunflower3 className="w-14 h-14" />
        </div>
        <div className="absolute top-[75%] right-[6%] opacity-[0.04]">
          <Sunflower2 className="w-14 h-14" />
        </div>
        <div className="absolute top-[25%] left-[18%] opacity-[0.03]">
          <Sunflower2 className="w-16 h-16" />
        </div>
        <div className="absolute top-[55%] right-[18%] opacity-[0.03]">
          <Sunflower1 className="w-16 h-16" />
        </div>
      </div>

      {/* Subtle golden glows — no blur, use large radial gradients instead */}
      <div className="absolute top-0 left-0 w-[120px] h-[300px] bg-sunflower-300/[0.04] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[120px] h-[300px] bg-sunflower-300/[0.04] rounded-full"></div>
    </div>
  );
}
