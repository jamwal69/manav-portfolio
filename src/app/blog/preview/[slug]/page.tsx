import { loadPost } from '@/lib/posts';
import crypto from 'crypto';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface PreviewParams { slug: string }
interface PreviewSearch { token?: string }
interface PreviewProps { params: Promise<PreviewParams>; searchParams: Promise<PreviewSearch> }

function validToken(slug: string, token?: string) {
  if (!token) return false;
  const secret = process.env.REVIEW_SECRET;
  if (!secret) return false;
  const [sig, exp] = token.split('.');
  if (!sig || !exp) return false;
  if (Date.now() > Number(exp)) return false;
  const mac = crypto.createHmac('sha256', secret).update(slug + '.' + exp).digest('hex');
  return mac === sig;
}

export default async function PreviewPage({ params, searchParams }: PreviewProps) {
  const { slug } = await params;
  const { token } = await searchParams;
  const post = loadPost(slug);
  if (!post) return notFound();
  const allowed = validToken(slug, token);
  if (!allowed) return notFound();
  return (
    <article className="max-w-3xl mx-auto px-6 py-16 prose prose-invert border border-yellow-500/30 rounded">
      <div className="text-yellow-400 text-xs font-mono mb-4">[ DRAFT PREVIEW ]</div>
      <h1>{post.title}</h1>
      <p className="text-xs text-slate-500 mb-6 font-mono">{post.date} • status: {post.status}</p>
      <MDXRemote source={post.content} />
    </article>
  );
}
