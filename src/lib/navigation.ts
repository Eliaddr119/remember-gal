export interface NavItem {
  href: string;
  label: string;
}

export const navigationItems: NavItem[] = [
  { href: "/about", label: "קצת על גל" },
  { href: "/stories", label: "חברים ומשפחה מספרים" },
  { href: "/posts", label: "במילים של גל" },
  { href: "/gallery", label: "גלריה" },
  { href: "/traveling-hat", label: "הכובע מטייל" },
  { href: "/events", label: "אירועים" },
  { href: "/education", label: "יחידות הדרכה" },
];
