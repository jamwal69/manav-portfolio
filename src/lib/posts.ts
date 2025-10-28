import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface PostMeta {
  title: string;
  slug: string;
  summary?: string;
  date: string;
  tags?: string[];
  status: 'draft' | 'published' | 'pending-review' | string;
  mitre?: string[];
  tools?: string[];
  reviewers?: string[];
}

export interface PostData extends PostMeta { content: string; }

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export function getAllPostFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'));
}

type FrontMatter = Partial<Omit<PostMeta, 'slug' | 'status' | 'title' | 'date'>> & {
  title?: string; date?: string; slug?: string; status?: string;
};

export function loadPost(slug: string): PostData | null {
  const files = getAllPostFiles();
  const fileName = files.find(f => f.includes(slug));
  if (!fileName) return null;
  const fullPath = path.join(BLOG_DIR, fileName);
  const raw = fs.readFileSync(fullPath, 'utf-8');
  const parsed = matter(raw);
  const fm = parsed.data as FrontMatter;
  if (!fm.title || !fm.date) return null;
  const status = (fm.status as PostMeta['status']) || 'draft';
  return { ...(fm as PostMeta), status, slug: fm.slug || slug, title: fm.title, date: fm.date, content: parsed.content };
}

export function listPosts(includeDraft = false): PostMeta[] {
  return getAllPostFiles()
    .map(f => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, f), 'utf-8');
      const parsed = matter(raw);
      const fm = parsed.data as FrontMatter;
      const slug = fm.slug || f.replace(/\.mdx$/, '');
      return {
        title: fm.title || slug,
        date: fm.date || '1970-01-01',
        slug,
        summary: fm.summary,
        tags: fm.tags,
        status: (fm.status as PostMeta['status']) || 'draft',
        mitre: fm.mitre,
        tools: fm.tools,
        reviewers: fm.reviewers
      } as PostMeta;
    })
    .filter(p => includeDraft || p.status === 'published')
    .sort((a,b) => (a.date < b.date ? 1 : -1));
}
