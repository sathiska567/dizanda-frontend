# Dizanda Admin Panel

A self-contained admin panel for managing the Dizanda website's **Home page**,
**About Us**, **Gallery**, and **Orders** content. Lives in its own top-level
folder (`dizanda-admin/`), kept separate from the public site
(`dizanda-frontend/`) and the API (`dizanda-backend/`).

The public site (`dizanda-frontend/src`) fetches content from the admin API
at runtime (`src/hooks/useAdminContent.js`) and falls back to its built-in
default content if the API isn't running, so the site never breaks because
the admin backend is offline.

## 1. Run the admin API

```bash
cd ../dizanda-backend
cp .env.example .env   # adjust JWT_SECRET and admin credentials
npm install
npm run dev             # http://localhost:5000
```

On first run it seeds one admin account from `ADMIN_EMAIL` / `ADMIN_PASSWORD`
in `.env` (defaults: `admin@dizanda.com` / `ChangeMe123!` — change these).

## 2. Run the admin dashboard

```bash
cd dizanda-admin
cp .env.example .env
npm install
npm run dev             # http://localhost:5174
```

Log in with the admin credentials above.

## 3. Point the public site at the API (optional)

The main site already defaults to `http://localhost:5000/api`. To override,
set `VITE_ADMIN_API_URL` in `dizanda-frontend/.env`.

## What you can manage

- **Home Page** — hero banner (background image, headline, subtitle, CTA
  buttons), the featured service card, and the featured products list.
- **About Us** — the brand introduction, the philosophy quote banner, and
  founder/team profiles (photo, role, bio, quote).
- **Gallery** — portfolio categories and individual gallery items (image,
  category, description, available flavors).
- **Orders** — checkout quote requests and custom cake enquiries, updated
  live via Socket.IO as customers submit them.

Images can be uploaded directly (stored in `dizanda-backend/uploads/`) or
supplied as a URL.

## Data storage

Content is stored in `dizanda-backend/src/data/db.json`, created
automatically on first run from the seed data in
`dizanda-backend/src/data/defaultData.js` (which mirrors what's currently
hard-coded on the public site). No external database is required.

## Production notes

- Set a strong `JWT_SECRET` and change the seeded admin password before
  deploying.
- Point `CORS_ORIGIN` (server) and `VITE_ADMIN_API_URL` (both clients) at
  your real domains.
- Put the admin dashboard behind its own access control (e.g. IP allowlist
  or a reverse-proxy auth layer) since it's a separate deployable app from
  the public site.
