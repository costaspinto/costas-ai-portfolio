import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  const endpoint = process.env.LINKEDIN_PROFILE_ENDPOINT;

  if (!token || !endpoint) {
    return NextResponse.json({
      ok: false,
      status: 'not_configured',
      message: 'Configure an approved LinkedIn API endpoint and access token with the required permissions. No scraping is performed.',
    }, { status: 200 });
  }

  // Intentionally do not guess LinkedIn endpoints or fields: APIs and scopes depend on the approved LinkedIn product.
  // Implement the authorized fetch + field mapping here after verifying your app's granted permissions.
  return NextResponse.json({
    ok: false,
    status: 'adapter_required',
    message: 'Credentials are present. Implement the adapter using only your app-approved LinkedIn endpoint, scopes, and response schema.',
  }, { status: 501 });
}
