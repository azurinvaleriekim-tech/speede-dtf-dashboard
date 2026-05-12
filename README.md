# DTF Production Dashboard

A modern real-time operations dashboard for DTF and printing production rooms. It is optimized for large TV displays, dark mode, live KPIs, queue visibility, charts, admin controls, and REST integration points.

## Stack

- Next.js App Router
- React
- Tailwind CSS
- Framer Motion
- Recharts
- REST API routes
- MySQL or Supabase-ready schema

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Pages

- `/` - production dashboard
- `/tv` - fullscreen TV mode with auto page cycling
- `/admin` - control panel for cutoff, refresh, TV mode, and queue overrides

## API

- `GET /api/dashboard` - aggregate live KPIs, queue, charts, utilization, leaderboard
- `GET /api/orders` - queue orders
- `POST /api/orders` - create a queue order
- `PATCH /api/orders/[id]` - update status, rush flag, ETA, or assignee
- `GET /api/settings` - dashboard settings
- `POST /api/settings` - update dashboard settings
- `GET /api/integrations/sync` - sample integration sync response

## Database

Schema and sample data live in `database/schema.sql` and `database/sample-data.sql`.

The app runs with sample data out of the box. Replace `lib/data-store.ts` with MySQL or Supabase queries when credentials are available.
