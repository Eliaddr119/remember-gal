// open-nagish ships no type declarations; this describes the bits we use.
declare module "open-nagish" {
  export interface OpenNagishConfig {
    position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
    lang?: "he" | "en" | "ar" | "ru";
    bottomOffset?: number;
    mobileBottomOffset?: number;
    statementUrl?: string;
    statementData?: {
      orgName?: string;
      orgPhone?: string;
      orgEmail?: string;
      coordinatorName?: string;
      lastAuditDate?: string;
    };
  }

  export interface OpenNagishWidget {
    destroy(): void;
  }

  export function init(config?: OpenNagishConfig): OpenNagishWidget;
}
