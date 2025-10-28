import { loadPost } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface PageParams { slug: string }
interface PageProps { params: Promise<PageParams> }

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = loadPost(slug);
  if (!post || post.status !== 'published') return {};
  return { title: post.title, description: post.summary };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = loadPost(slug);
  if (!post || post.status !== 'published') return notFound();
  return (
    <article className="max-w-3xl mx-auto px-6 py-16 prose prose-invert">
      <h1>{post.title}</h1>
      <p className="text-xs text-slate-500 mb-6 font-mono">{post.date}</p>
      <MDXRemote source={post.content} />
    </article>
  );
}
