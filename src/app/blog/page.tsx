import { listPosts } from '@/lib/posts';
import BlogFilterClient from './BlogFilterClient';

export const metadata = { title: 'Blog' };

export default function BlogIndex(){
  const posts = listPosts(false).map(p => ({
    ...p,
    readingMinutes: Math.max(1, Math.round(((p.summary||'').split(/\s+/).length + 200) / 200))
  }));
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4 text-cyan-400">Blog</h1>
      <BlogFilterClient posts={posts} />
    </div>
  );
}
