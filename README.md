# לזכותה של גל חפץ ז״ל

A memorial website built to honor the memory of Gal Hefetz, who passed away at 24 after a long and courageous battle with cancer. The site serves as a living space for family and friends to share stories, view photos, and keep her memory alive.

---

## Features

- **Stories** — personal tributes written by family and friends
- **Posts** — Gal's own words from her social media
- **Events** — memorial gatherings and activities held in her honor
- **Gallery** — photos from her life
- **Traveling Hat** — an interactive map tracking her hat as it travels the world with loved ones
- **Education** — teaching resources created in her memory
- **Admin panel** — password-protected CMS for managing all content

---

## Tech Stack

- [Next.js 14](https://nextjs.org) (App Router)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase](https://supabase.com) — database & file storage
- [NextAuth.js](https://next-auth.js.org) — admin authentication
- [Framer Motion](https://www.framer.com/motion/) — page transitions
- [React Leaflet](https://react-leaflet.js.org) — interactive map
- RTL (Hebrew) throughout

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/your-username/remember-gal.git
cd remember-gal
npm install
```

### 2. Set up environment variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only) |
| `NEXTAUTH_SECRET` | Random secret for NextAuth (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | Full URL of the site (e.g. `http://localhost:3000`) |
| `ADMIN_EMAIL` | Email for the admin login |
| `ADMIN_PASSWORD` | Password for the admin login |

### 3. Set up the database

Run the following in the **Supabase SQL Editor**:

```sql
-- Tables
CREATE TABLE stories (
  id INT PRIMARY KEY,
  author TEXT,
  relation TEXT,
  date TEXT,
  content_markdown TEXT,
  content_html TEXT
);

CREATE TABLE posts (
  id INT PRIMARY KEY,
  image_url TEXT,
  title TEXT,
  content TEXT
);

CREATE TABLE events (
  id TEXT PRIMARY KEY,
  title TEXT,
  date TEXT,
  time TEXT,
  location TEXT,
  description TEXT,
  photos TEXT[],
  videos TEXT[]
);

CREATE TABLE traveling_hat (
  id TEXT PRIMARY KEY,
  title TEXT,
  lat FLOAT,
  lng FLOAT,
  image_urls TEXT[],
  photographer TEXT,
  photographer_relation TEXT,
  description TEXT
);

CREATE TABLE gallery (
  id INT PRIMARY KEY,
  image_url TEXT,
  width INT,
  height INT
);

CREATE TABLE site_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT ''
);
```

### 4. Add site photos

Upload `about-page-photo.jpg` and `main_page_photo.PNG` to **Storage → images → site/** in Supabase, then insert their public URLs:

```sql
INSERT INTO site_config (key, value) VALUES
  ('about_photo_url', 'https://your-project.supabase.co/storage/v1/object/public/images/site/about-page-photo.jpg'),
  ('main_photo_url',  'https://your-project.supabase.co/storage/v1/object/public/images/site/main_page_photo.PNG')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
```

### 5. Seed content

Place your content files in `content/` and images in `public/images/`, then run:

```bash
npx tsx scripts/seed.ts
```

This uploads all images to Supabase storage and populates the database tables.

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── admin/            # Password-protected admin panel
│   ├── api/              # API routes (stories, posts, events, gallery, ...)
│   ├── about/            # About Gal page
│   ├── stories/          # Stories feed
│   ├── events/           # Events listing
│   ├── gallery/          # Photo gallery
│   ├── posts/            # Gal's posts
│   ├── traveling-hat/    # Interactive map
│   └── education/        # Educational resources
├── components/           # Shared UI components
├── lib/                  # Data fetching, Supabase clients, helpers
└── hooks/                # Custom React hooks

public/
├── gal-logo.svg
├── gal-signature.svg
└── education/pdfs/       # Downloadable education materials

scripts/
└── seed.ts               # Seeds DB from local content files

supabase/
└── migrations/           # SQL migration files
```

---

## Content Note

Personal content (stories, photos, videos) is not included in this repository — it lives in Supabase storage and is seeded via `scripts/seed.ts`. Only the site logo, signature, and education PDFs are committed.

---

## Deployment

The site is deployed on [Railway](https://railway.app). Set all environment variables in your Railway project settings. The `railway.toml` config is included.
