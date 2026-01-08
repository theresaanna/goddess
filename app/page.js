import Link from 'next/link';
import { getAllPosts } from '../lib/posts';

export default function Home() {
  const posts = getAllPosts();

  return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">My Blog</h1>
        <div className="space-y-6">
          {posts.map((post) => (
              <article key={post.slug} className="border-b pb-6">
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-semibold hover:text-blue-600">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-600 text-sm mt-1">{post.date}</p>
                <p className="mt-2">{post.excerpt}</p>
              </article>
          ))}
        </div>
      </main>
  );
}