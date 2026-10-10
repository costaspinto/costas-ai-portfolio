import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');
  const allowedIds = (process.env.ADMIN_USER_IDS ?? '').split(',').map((id) => id.trim()).filter(Boolean);
  if (!allowedIds.includes(user.id)) redirect('/unauthorized');
  return user;
}
