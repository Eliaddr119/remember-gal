"use client";

import { RealisticSunflower, Sunflower1, Sunflower2, Sunflower3, Sunflower4, Sunflower5 } from "./Logo";

export function SunflowerBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true" role="presentation">
      {/* Left side sunflowers - column 1 (edge) */}
      <div className="absolute top-[3%] left-[0%] opacity-[0.06]">
        <RealisticSunflower className="w-16 h-16 md:w-24 md:h-24" />
      </div>
      <div className="absolute top-[18%] left-[1%] opacity-[0.05]">
        <Sunflower3 className="w-12 h-12 md:w-18 md:h-18" />
      </div>
      <div className="absolute top-[32%] left-[0%] opacity-[0.06]">
        <Sunflower1 className="w-14 h-14 md:w-20 md:h-20" />
      </div>
      <div className="absolute top-[48%] left-[1%] opacity-[0.05]">
        <RealisticSunflower className="w-12 h-12 md:w-16 md:h-16" />
      </div>
      <div className="absolute top-[62%] left-[0%] opacity-[0.06]">
        <Sunflower4 className="w-14 h-14 md:w-20 md:h-20" />
      </div>
      <div className="absolute top-[76%] left-[1%] opacity-[0.05]">
        <Sunflower2 className="w-12 h-12 md:w-18 md:h-18" />
      </div>
      <div className="absolute top-[90%] left-[0%] opacity-[0.06]">
        <RealisticSunflower className="w-14 h-14 md:w-20 md:h-20" />
      </div>

      {/* Left side sunflowers - column 2 (slightly inward) */}
      <div className="absolute top-[10%] left-[6%] opacity-[0.04]">
        <Sunflower5 className="w-10 h-10 md:w-14 md:h-14" />
      </div>
      <div className="absolute top-[38%] left-[5%] opacity-[0.04]">
        <Sunflower2 className="w-10 h-10 md:w-14 md:h-14" />
      </div>
      <div className="absolute top-[68%] left-[6%] opacity-[0.04]">
        <Sunflower3 className="w-10 h-10 md:w-14 md:h-14" />
      </div>

      {/* Center-left scattered sunflowers */}
      <div className="absolute top-[8%] left-[20%] opacity-[0.04]">
        <Sunflower4 className="w-12 h-12 md:w-16 md:h-16" />
      </div>
      <div className="absolute top-[28%] left-[15%] opacity-[0.03]">
        <RealisticSunflower className="w-14 h-14 md:w-20 md:h-20" />
      </div>
      <div className="absolute top-[55%] left-[18%] opacity-[0.04]">
        <Sunflower1 className="w-10 h-10 md:w-14 md:h-14" />
      </div>
      <div className="absolute top-[75%] left-[22%] opacity-[0.03]">
        <Sunflower5 className="w-12 h-12 md:w-16 md:h-16" />
      </div>
      <div className="absolute top-[88%] left-[12%] opacity-[0.04]">
        <Sunflower2 className="w-10 h-10 md:w-14 md:h-14" />
      </div>

      {/* Center sunflowers (sparse, very subtle) */}
      <div className="absolute top-[12%] left-[35%] opacity-[0.03]">
        <Sunflower3 className="w-10 h-10 md:w-14 md:h-14" />
      </div>
      <div className="absolute top-[35%] left-[45%] opacity-[0.025]">
        <RealisticSunflower className="w-16 h-16 md:w-22 md:h-22" />
      </div>
      <div className="absolute top-[58%] left-[38%] opacity-[0.03]">
        <Sunflower4 className="w-10 h-10 md:w-14 md:h-14" />
      </div>
      <div className="absolute top-[82%] left-[42%] opacity-[0.025]">
        <Sunflower1 className="w-12 h-12 md:w-16 md:h-16" />
      </div>
      <div className="absolute top-[22%] left-[55%] opacity-[0.03]">
        <Sunflower5 className="w-10 h-10 md:w-14 md:h-14" />
      </div>
      <div className="absolute top-[48%] left-[52%] opacity-[0.025]">
        <Sunflower2 className="w-14 h-14 md:w-18 md:h-18" />
      </div>
      <div className="absolute top-[70%] left-[58%] opacity-[0.03]">
        <RealisticSunflower className="w-10 h-10 md:w-14 md:h-14" />
      </div>

      {/* Center-right scattered sunflowers */}
      <div className="absolute top-[6%] right-[18%] opacity-[0.04]">
        <Sunflower2 className="w-12 h-12 md:w-16 md:h-16" />
      </div>
      <div className="absolute top-[25%] right-[22%] opacity-[0.03]">
        <Sunflower4 className="w-10 h-10 md:w-14 md:h-14" />
      </div>
      <div className="absolute top-[45%] right-[15%] opacity-[0.04]">
        <RealisticSunflower className="w-14 h-14 md:w-18 md:h-18" />
      </div>
      <div className="absolute top-[65%] right-[20%] opacity-[0.03]">
        <Sunflower1 className="w-12 h-12 md:w-16 md:h-16" />
      </div>
      <div className="absolute top-[85%] right-[16%] opacity-[0.04]">
        <Sunflower3 className="w-10 h-10 md:w-14 md:h-14" />
      </div>

      {/* Right side sunflowers - column 1 (edge) */}
      <div className="absolute top-[5%] right-[0%] opacity-[0.05]">
        <Sunflower2 className="w-14 h-14 md:w-20 md:h-20" />
      </div>
      <div className="absolute top-[20%] right-[1%] opacity-[0.06]">
        <RealisticSunflower className="w-16 h-16 md:w-22 md:h-22" />
      </div>
      <div className="absolute top-[35%] right-[0%] opacity-[0.05]">
        <Sunflower5 className="w-12 h-12 md:w-18 md:h-18" />
      </div>
      <div className="absolute top-[50%] right-[1%] opacity-[0.06]">
        <Sunflower1 className="w-14 h-14 md:w-20 md:h-20" />
      </div>
      <div className="absolute top-[65%] right-[0%] opacity-[0.05]">
        <RealisticSunflower className="w-12 h-12 md:w-18 md:h-18" />
      </div>
      <div className="absolute top-[78%] right-[1%] opacity-[0.06]">
        <Sunflower4 className="w-14 h-14 md:w-20 md:h-20" />
      </div>
      <div className="absolute top-[92%] right-[0%] opacity-[0.05]">
        <Sunflower3 className="w-12 h-12 md:w-16 md:h-16" />
      </div>

      {/* Right side sunflowers - column 2 (slightly inward) */}
      <div className="absolute top-[12%] right-[6%] opacity-[0.04]">
        <Sunflower1 className="w-10 h-10 md:w-14 md:h-14" />
      </div>
      <div className="absolute top-[42%] right-[5%] opacity-[0.04]">
        <RealisticSunflower className="w-10 h-10 md:w-14 md:h-14" />
      </div>
      <div className="absolute top-[72%] right-[6%] opacity-[0.04]">
        <Sunflower5 className="w-10 h-10 md:w-14 md:h-14" />
      </div>

      {/* Very subtle golden glows spread across */}
      <div className="absolute top-0 left-0 w-[100px] h-[300px] bg-sunflower-300/[0.04] rounded-full blur-[40px]"></div>
      <div className="absolute top-1/3 left-0 w-[80px] h-[200px] bg-sunflower-400/[0.03] rounded-full blur-[30px]"></div>
      <div className="absolute bottom-0 left-0 w-[100px] h-[300px] bg-sunflower-300/[0.04] rounded-full blur-[40px]"></div>

      <div className="absolute top-[15%] left-[30%] w-[150px] h-[150px] bg-sunflower-200/[0.03] rounded-full blur-[50px]"></div>
      <div className="absolute top-[50%] left-[50%] w-[200px] h-[200px] bg-sunflower-300/[0.02] rounded-full blur-[60px] -translate-x-1/2"></div>
      <div className="absolute top-[75%] right-[25%] w-[150px] h-[150px] bg-sunflower-200/[0.03] rounded-full blur-[50px]"></div>

      <div className="absolute top-0 right-0 w-[100px] h-[300px] bg-sunflower-300/[0.04] rounded-full blur-[40px]"></div>
      <div className="absolute top-1/2 right-0 w-[80px] h-[200px] bg-sunflower-400/[0.03] rounded-full blur-[30px]"></div>
      <div className="absolute bottom-0 right-0 w-[100px] h-[300px] bg-sunflower-300/[0.04] rounded-full blur-[40px]"></div>
    </div>
  );
}
