import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost, getAllBlogSlugs } from "@/lib/blog";
import BlogPost from "@/components/blog-post";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://your-domain.com";
  const url = `${baseUrl}/blog/${slug}`;

  // Generate dynamic keywords from post content and tags
  const baseKeywords = [
    "Solleti Vivek",
    "web development",
    "programming",
    "tech blog",
    "software engineering",
    "tutorial",
    "guide",
    "portfolio",
  ];

  const dynamicKeywords = [
    ...post.tags,
    ...(post.keywords || []),
    ...baseKeywords,
    // Extract meaningful words from title
    ...post.title.toLowerCase().split(' ').filter(word => word.length > 3),
  ].filter(Boolean);

  return {
    title: `${post.title} | Solleti Vivek's Blog`,
    description: post.description || post.excerpt || `Read about ${post.title} and more tech insights.`,
    keywords: dynamicKeywords.join(", "),
    authors: [{ name: "Solleti Vivek" }],
    creator: "Solleti Vivek",
    publisher: "Solleti Vivek",
    openGraph: {
      title: post.title,
      description: post.description || post.excerpt || `Read about ${post.title} and more tech insights.`,
      url,
      siteName: "Solleti Vivek - Tech Blog",
      images: [
        {
          url: post.image || `${baseUrl}/og-blog-default.jpg`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: ["Solleti Vivek"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description || post.excerpt || `Read about ${post.title} and more tech insights.`,
      images: [post.image || `${baseUrl}/og-blog-default.jpg`],
      creator: "@yourtwitterhandle",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: url,
    },
    category: "Technology",
    other: {
      // Add structured data for better SEO
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.description || post.excerpt,
        "image": post.image || `${baseUrl}/og-blog-default.jpg`,
        "author": {
          "@type": "Person",
          "name": "Vivek"
        },
        "publisher": {
          "@type": "Person",
          "name": "Vivek"
        },
        "datePublished": post.publishedAt,
        "dateModified": post.updatedAt || post.publishedAt,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": url
        },
        "keywords": dynamicKeywords.join(", "),
        "articleSection": "Technology",
        "inLanguage": "en-US"
      })
    }
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return <BlogPost post={post} />;
}
