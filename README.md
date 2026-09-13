# Dizanda

Monorepo for the Dizanda bespoke cake atelier, split into three clearly
separated, independently runnable apps:

```
dizanda-frontend/   Public website (React + Vite) — what customers see
dizanda-backend/    Admin API (Node.js + Express + Socket.IO, JSON-file datastore)
dizanda-admin/      Admin dashboard (React + Vite) — content & order management
```

## Quick start

Run all three in separate terminals:

```bash
# 1. Public website — http://localhost:5173
cd dizanda-frontend
cp .env.example .env
npm install
npm run dev

# 2. Admin API — http://localhost:5000
cd dizanda-backend
cp .env.example .env   # set JWT_SECRET and admin credentials
npm install
npm run dev

# 3. Admin dashboard — http://localhost:5174
cd dizanda-admin
cp .env.example .env
npm install
npm run dev
```

The public site works fine with the admin API offline — it falls back to
built-in default content (see `dizanda-frontend/src/pages/*/*.content.js` /
`homeContent.js`, `aboutContent.js`, `galleryContent.js`).

## Folder details

- **`dizanda-frontend/`** — the customer-facing site. Fetches live content
  from the admin API at runtime and renders quote/order forms that POST to
  it.
- **`dizanda-backend/`** — the shared API used by both the public site and
  the admin dashboard. Handles auth (JWT), content for Home/About/Gallery,
  orders, image uploads, and broadcasts live order updates over Socket.IO.
- **`dizanda-admin/`** — the internal dashboard for managing site content
  and viewing/actioning incoming orders in real time. See
  [dizanda-admin/README.md](dizanda-admin/README.md) for details.

## Notes

- Each folder has its own `package.json`, `node_modules`, and `.env` — they
  are independent deployables, not npm workspaces.
- `dizanda-frontend/SUPABASE_SETUP.md` documents optional Supabase usage in
  the public site.
