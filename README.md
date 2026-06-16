# לזכותה של גל חפץ ז״ל

A memorial website built to honor the memory of Gal Hefetz, who passed away at 24 after a long and courageous battle with cancer. The site is a living space for family and friends — a place to read her words, share memories, view photos, and keep her presence felt.

---

## The Project

Gal was known for her warmth, her strength, and her ability to make everyone around her feel seen and loved. This site was built by her family as a permanent home for her memory — not a static page, but something alive that grows as people contribute stories, photos, and events in her honor.

The design is built around a sunflower theme: warm yellows, earthy browns, and soft creams. Every interaction — from page transitions to photo viewing — is designed to feel gentle and unhurried.

The site is fully in Hebrew and right-to-left throughout.

---

## Features

- **Stories** — personal tributes written by family and friends, rendered from markdown
- **Posts** — Gal's own words, styled as an Instagram-like feed
- **Events** — memorial gatherings with photos and videos
- **Gallery** — a masonry photo grid with full-screen lightbox view
- **Traveling Hat** — an interactive world map tracking Gal's hat as it travels with loved ones
- **Education** — teaching resources and PDFs created in her memory
- **Admin panel** — a password-protected CMS for adding and editing all content

---

## Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 14](https://nextjs.org) — App Router, Server Components |
| Styling | [Tailwind CSS](https://tailwindcss.com) with a custom sunflower design system |
| Database & Storage | [Supabase](https://supabase.com) — PostgreSQL + file storage (Cloudflare CDN) |
| Auth | [NextAuth.js](https://next-auth.js.org) — credential-based admin login |
| Animations | [Framer Motion](https://www.framer.com/motion/) — page transitions and lightbox |
| Map | [React Leaflet](https://react-leaflet.js.org) + OpenStreetMap |
| Deployment | [Railway](https://railway.app) — persistent Node.js server |

---

## Architecture

### Data flow

All content (stories, posts, gallery, events, traveling-hat pins) lives in Supabase. Server Components fetch data via internal API routes using Next.js's `fetch` cache with a 5-minute revalidation window. When an admin saves a change, `revalidatePath` invalidates the relevant page cache immediately.

Static site assets (logo, signature, education PDFs) are committed to the repo. Personal photos and videos are stored only in Supabase Storage and are never committed.

### Image loading

Images are served through Next.js image optimization (`next/image`), which converts them to AVIF/WebP and caches the optimized versions server-side for 30 days (`minimumCacheTTL`). Supabase Storage is backed by Cloudflare CDN, so origin fetches are fast globally.

The lightbox preloads adjacent images while you view the current one, and shows the raw CDN image as a blurred background while the optimized version loads. Gallery thumbnails use blur placeholders matching the site's warm color palette.

### Admin panel

The admin panel (`/admin`) is a simple credential-protected CMS. It uses the same API routes as the public site, but with `requireAuth` middleware that validates the session on each mutation. Admins can create, edit, and delete all content types, and upload photos and videos directly to Supabase Storage via signed URLs.

### Content seeding

A seed script (`scripts/seed.ts`) reads markdown files from `content/` and images from `public/images/`, uploads the media to Supabase Storage, and populates the database. This was used for the initial data load and can be used to re-seed from local backups.

---

## Project Structure

```
src/
├── app/
│   ├── admin/          # CMS — protected by NextAuth session
│   ├── api/            # REST endpoints for each content type
│   ├── about/          # About Gal
│   ├── stories/        # Stories feed
│   ├── events/         # Events with photo/video grids
│   ├── gallery/        # Masonry gallery with lightbox
│   ├── posts/          # Instagram-style post feed
│   ├── traveling-hat/  # Interactive world map
│   └── education/      # PDFs and teaching resources
├── components/
│   ├── admin/          # Form components for the CMS
│   ├── gallery/        # Masonry grid
│   ├── map/            # Leaflet map wrapper
│   ├── ui/             # Shared: Lightbox, cards, accessibility menu
│   └── layout/         # Header, footer, navigation
└── lib/
    ├── supabase/       # Server and client Supabase instances
    ├── site-config.ts  # Fetches site-wide config (photo URLs etc.)
    └── *.ts            # Per-resource data fetching functions

public/
├── gal-logo.svg
├── gal-signature.svg
└── education/pdfs/

scripts/
└── seed.ts             # One-time seeder from local markdown + images
```

---

## Content

Personal content — stories, photos, videos — is not in this repository. It lives in Supabase and is never committed to git. Only the site logo, signature SVG, and education PDFs are tracked. The `.gitignore` explicitly blocks all personal media directories.
