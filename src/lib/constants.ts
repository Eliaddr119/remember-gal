export const SITE_NAME = "לזכר גל";
export const SITE_DESCRIPTION = "אתר הנצחה לזכרה של גל";

export const ACCESSIBILITY_STORAGE_KEY = "gal-memorial-accessibility";

export const FONT_SIZES = {
  small: 0.875,
  normal: 1,
  large: 1.125,
  xlarge: 1.25,
} as const;

export type FontSize = keyof typeof FONT_SIZES;
