import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const username = process.env.GITHUB_USERNAME ?? 'costaspinto';
  const headers: HeadersInit = { Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100`, {
    headers, next: { revalidate: 0 },
  });
  if (!response.ok) return NextResponse.json({ error: 'GitHub API request failed', status: response.status }, { status: 502 });

  const repos = await response.json();
  // TODO: upsert eligible public repositories into Supabase after schema setup.
  // Keep a curated/featured flag so repository sync does not publish every repo automatically.
  return NextResponse.json({
    ok: true,
    username,
    fetched: Array.isArray(repos) ? repos.length : 0,
    message: 'GitHub data fetched. Configure database upsert and featured-repository rules before publishing.',
  });
}
