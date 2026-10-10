# Build roadmap

## Milestone 1 — Run locally
- [ ] Install Node.js 20+
- [ ] Copy `.env.example` to `.env.local`
- [ ] Configure Supabase URL and anon key
- [ ] Run `npm install` and `npm run dev`
- [ ] Configure OpenRouter key and test the chat widget

## Milestone 2 — Database-driven public content
- [ ] Run `supabase/schema.sql`
- [ ] Seed verified profile, projects, skills, education and certifications
- [ ] Replace `lib/data.ts` reads with Supabase queries
- [ ] Add ISR/revalidation after admin updates

## Milestone 3 — Secure admin CRUD
- [ ] Configure admin user UUID
- [ ] Add admin-only RLS policy based on a trusted server-side role table
- [ ] Implement forms for profile/projects/skills/education/certifications
- [ ] Add upload flows for resume and project media
- [ ] Add publish/unpublish and preview modes

## Milestone 4 — Integrations
- [ ] GitHub: fetch public repositories, map metadata, let admin mark featured repos
- [ ] LinkedIn: confirm product access and granted scopes; implement only documented approved endpoints
- [ ] Add sync run logs and alerting
- [ ] Add manual JSON/CSV import for data not available through LinkedIn API

## Milestone 5 — AI knowledge
- [ ] Read published profile and project records from Supabase in `/api/chat`
- [ ] Add retrieval over published knowledge records
- [ ] Add per-IP/session rate limiting
- [ ] Add moderation, prompt-injection defenses, feedback and evaluation tests
- [ ] Ensure unpublished/private fields never enter model context

## Milestone 6 — Production
- [ ] Configure Vercel environment variables and cron secret
- [ ] Verify scheduled route authentication and cron configuration
- [ ] Add Playwright tests, accessibility checks and monitoring
- [ ] Add privacy notice and data retention settings
