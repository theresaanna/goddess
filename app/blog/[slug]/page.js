import { getPostBySlug, getAllPosts } from '../../../lib/posts';

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function Post({ params }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            <article className="prose lg:prose-xl">
                <h1>{post.title}</h1>
                <p className="text-gray-600">{post.date}</p>
                <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
            </article>
        </main>
    );
}