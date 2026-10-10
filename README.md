# Costas AI Portfolio

A new full-stack portfolio starter built with Next.js App Router, TypeScript, Tailwind CSS, Supabase, and OpenRouter.

## Features included in this starter
- Public portfolio homepage with profile, skills, projects, experience, and contact sections
- First-person "Ask Costas" AI chat endpoint using OpenRouter
- Supabase server/client helpers
- Supabase SQL schema with RLS policies
- Admin login page starter and protected admin layout pattern
- GitHub repository sync endpoint starter
- LinkedIn sync endpoint designed for official/authorized API access only
- Vercel cron configuration for scheduled sync jobs
- Environment variable template

## Important LinkedIn limitation
LinkedIn does not provide unrestricted API access to every member profile field or post. The LinkedIn connector here is intentionally an integration point: configure it only with API permissions granted to your app. Do not scrape LinkedIn or store session cookies. Manual import is the fallback for fields that the API does not expose.

## Setup
1. Install Node.js 20+.
2. Copy `.env.example` to `.env.local` and fill in the values.
3. Create a Supabase project and run `supabase/schema.sql` in the Supabase SQL editor.
4. Install dependencies with `npm install`.
5. Start with `npm run dev`.
6. Create your admin user in Supabase Auth. Add that user's UUID to `ADMIN_USER_IDS` as a comma-separated list.
7. Deploy to Vercel and set the same environment variables in Project Settings.

## Environment variables
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server only; never expose to browser)
- `ADMIN_USER_IDS` (comma-separated Supabase Auth user UUIDs)
- `OPENROUTER_API_KEY` (server only)
- `OPENROUTER_MODEL` (e.g. `openai/gpt-4o-mini`; choose an available model in OpenRouter)
- `GITHUB_USERNAME` (defaults to `costaspinto`)
- `GITHUB_TOKEN` (optional; server-side token can improve API rate limits)
- `LINKEDIN_ACCESS_TOKEN` (only if your app has approved LinkedIn API permissions)
- `LINKEDIN_PROFILE_ENDPOINT` (only an endpoint allowed by your LinkedIn product/permissions)
- `CRON_SECRET` (random secret used to protect scheduled sync routes)

## Before production
- Configure Supabase Auth redirect URLs for your deployed domain.
- Confirm all admin routes use server-side authorization.
- Add rate limiting (e.g. Upstash Redis or provider-level controls) to `/api/chat`.
- Review data retention and privacy notices for chat logs.
- Add real LinkedIn API calls only after verifying the approved product and scopes.
- Add automated tests and monitoring.
