"use client";

import { useEffect } from "react";
import type { OpenNagishConfig, OpenNagishWidget } from "open-nagish";

// OpenNagish accessibility widget (Israeli Standard SI 5568 / WCAG 2.1).
// It's a browser-only DOM overlay that auto-initialises on import, so we load
// it dynamically inside an effect to keep it out of server rendering and to get
// a handle we can tear down on unmount (e.g. when navigating into /admin).
const CONFIG: OpenNagishConfig = {
  lang: "he",
  position: "bottom-left",
};

// The widget renders inside a shadow root (#opennagish-widget) with hard-coded
// blue accents. We can't reach it with global CSS, so we inject an override
// sheet that recolours it to the site's warm sunflower/earth palette and font.
// Darker gold tones (sunflower-600/700) keep the white glyph/text >=3:1 contrast.
const THEME_CSS = `
  :host { font-family: var(--font-rubik), Rubik, sans-serif !important; }
  .anid-trigger {
    background: linear-gradient(135deg, #D97706 0%, #B45309 100%) !important;
    box-shadow: 0 8px 24px rgba(255, 119, 0, 0.35) !important;
  }
  .anid-panel { box-shadow: 0 12px 40px rgba(255, 119, 0, 0.22) !important; }
  .anid-panel-header {
    background: linear-gradient(135deg, #D97706 0%, #B45309 100%) !important;
  }
  .anid-btn.anid-active {
    background: #B45309 !important;
    border-color: #B45309 !important;
    color: #fff !important;
  }
  .anid-toggle input:checked + .anid-toggle-slider { background: #D97706 !important; }
  .anid-slider::-webkit-slider-thumb { background: #B45309 !important; }
  .anid-slider::-moz-range-thumb { background: #B45309 !important; }
  .anid-heading-list button,
  .anid-landmark-list button { color: #B45309 !important; }
  .anid-trigger:focus-visible,
  .anid-close-btn:focus-visible,
  .anid-category-header:focus-visible,
  .anid-btn:focus-visible,
  .anid-slider:focus-visible,
  .anid-reset-btn:focus-visible,
  .anid-heading-list button:focus-visible,
  .anid-landmark-list button:focus-visible,
  .anid-toggle input:focus-visible + .anid-toggle-slider {
    outline-color: #92400E !important;
  }
`;

const THEME_STYLE_ID = "anid-site-theme";

function applySiteTheme(attempt = 0) {
  const host = document.getElementById("opennagish-widget");
  const root = host?.shadowRoot;
  if (!root) {
    // init() builds synchronously, but retry a few frames just in case.
    if (attempt < 10) requestAnimationFrame(() => applySiteTheme(attempt + 1));
    return;
  }
  if (root.getElementById(THEME_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = THEME_STYLE_ID;
  style.textContent = THEME_CSS;
  root.appendChild(style);
}

export default function OpenNagish() {
  useEffect(() => {
    let widget: OpenNagishWidget | undefined;
    let cancelled = false;

    // Set config before the module evaluates so its auto-init uses it too.
    (window as unknown as { OpenNagishConfig?: OpenNagishConfig }).OpenNagishConfig =
      CONFIG;

    import("open-nagish")
      .then(({ init }) => {
        if (cancelled) return;
        widget = init(CONFIG);
        applySiteTheme();
      })
      .catch(() => {
        // The widget is a non-critical enhancement; ignore load failures.
      });

    return () => {
      cancelled = true;
      widget?.destroy();
    };
  }, []);

  return null;
}
