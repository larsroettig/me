import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/mdx";
import PostHeader from "@/components/blog/PostHeader";
import AuthorBio from "@/components/blog/AuthorBio";
import RelatedPosts from "@/components/blog/RelatedPosts";
import MermaidDiagram from "@/components/blog/MermaidDiagram";
import { rehypeMermaidComponent } from "@/lib/rehype-mermaid-component";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

const BASE_URL = "https://larsroettig.me";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return {
      title: post.title,
      description: post.excerpt,
      keywords: post.tags,
      openGraph: {
        type: "article",
        url: `${BASE_URL}/blog/${slug}`,
        title: post.title,
        description: post.excerpt,
        publishedTime: post.publishedAt,
        modifiedTime: post.updatedAt ?? post.publishedAt,
        tags: post.tags,
        images: [{ url: `${BASE_URL}/blog/${slug}/opengraph-image`, width: 1200, height: 630 }],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
      },
    };
  } catch {
    return {};
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const related = getRelatedPosts(slug, getAllPosts());

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    keywords: post.tags.join(", "),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    url: `${BASE_URL}/blog/${slug}`,
    image: `${BASE_URL}/blog/${slug}/opengraph-image`,
    author: {
      "@type": "Person",
      name: "Lars Roettig",
      url: BASE_URL,
      description: "Senior Technical Architect at Adobe",
    },
  };

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <PostHeader meta={post} />

      <div className="prose-cyberpunk">
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeMermaidComponent,
                rehypeSlug,
                [rehypeAutolinkHeadings, { behavior: "wrap" }],
                [
                  rehypePrettyCode,
                  {
                    theme: "one-dark-pro",
                    keepBackground: true,
                  },
                ],
              ],
            },
          }}
          components={{
            div: (props) => {
              const diagram = props["data-mermaid-diagram"] as string | undefined;
              if (diagram) {
                return <MermaidDiagram diagram={decodeURIComponent(diagram)} />;
              }
              return <div {...props} />;
            },
          }}
        />
      </div>

      <AuthorBio />

      <RelatedPosts posts={related} />

      <div className="mt-8 pt-8" style={{ borderTop: "1px solid #1a1a2e" }}>
        <Link
          href="/blog"
          className="font-mono text-sm transition-colors duration-200"
          style={{ color: "#7878a0" }}
        >
          ← Back to blog
        </Link>
      </div>
    </article>
  );
}
