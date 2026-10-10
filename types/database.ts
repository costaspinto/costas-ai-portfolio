export type Project = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  technologies: string[];
  repository_url: string | null;
  demo_url: string | null;
  featured: boolean;
  is_published: boolean;
  source: 'manual' | 'github' | 'linkedin' | 'import';
};

export type SyncStatus = {
  provider: 'github' | 'linkedin';
  status: 'success' | 'failed' | 'not_configured' | 'partial';
  records_seen: number;
  records_changed: number;
  message?: string;
  finished_at?: string;
};
