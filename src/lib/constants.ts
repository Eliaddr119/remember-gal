export const SITE_NAME = "לזכר גל";
export const SITE_DESCRIPTION = "אתר הנצחה לזכרה של גל";

export const ACCESSIBILITY_STORAGE_KEY = "gal-memorial-accessibility";

export const FONT_SIZES = {
  small: 0.875,
  normal: 1.0625,
  large: 1.25,
  xlarge: 1.5,
} as const;

export type FontSize = keyof typeof FONT_SIZES;
