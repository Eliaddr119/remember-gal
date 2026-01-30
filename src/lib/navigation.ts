export interface NavItem {
  href: string;
  label: string;
}

export const navigationItems: NavItem[] = [
  { href: "/about", label: "קצת על גל" },
  { href: "/stories", label: "חברים ומשפחה מספרים" },
  { href: "/events", label: "אירועים" },
  { href: "/gallery", label: "גלריה" },
  { href: "/education", label: "יחידות הדרכה" },
];
