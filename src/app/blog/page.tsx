import { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/blog";
import BlogList from "@/components/blog-list";
import BlurFade from "@/components/magicui/blur-fade";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tech Blog | Vivek Portfolio - Web Development & Programming Insights",
  description:
    "Explore my latest articles on web development, AWS deployments, React, Next.js, and programming tutorials. Learn from real-world projects and technical insights.",
  keywords:
    "web development blog, programming tutorials, React, Next.js, AWS, deployment guides, tech insights, software engineering, JavaScript, TypeScript, coding tips, portfolio deployment, CloudFront, S3",
  authors: [{ name: "Vivek" }],
  creator: "Vivek",
  publisher: "Vivek",
  openGraph: {
    title: "Tech Blog | Vivek Portfolio",
    description:
      "Explore my latest articles on web development, AWS deployments, React, Next.js, and programming tutorials.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://your-domain.com"}/blog`,
    siteName: "Vivek Portfolio - Tech Blog",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://your-domain.com"}/og-blog.jpg`,
        width: 1200,
        height: 630,
        alt: "Vivek Tech Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Blog | Vivek Portfolio",
    description:
      "Explore my latest articles on web development, AWS deployments, React, Next.js, and programming tutorials.",
    images: [
      `${process.env.NEXT_PUBLIC_BASE_URL || "https://your-domain.com"}/og-blog.jpg`,
    ],
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
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || "https://your-domain.com"}/blog`,
  },
};

const BLUR_FADE_DELAY = 0.04;

// Helper function to check if a post is new (within last 7 days)
const isNewPost = (publishedAt: string) => {
  const postDate = new Date(publishedAt);
  const currentDate = new Date();
  const daysDifference =
    (currentDate.getTime() - postDate.getTime()) / (1000 * 3600 * 24);
  return daysDifference <= 7;
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Tech Blog
            </h1>
          </BlurFade>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Insights on web development, cloud deployments, and programming
            tutorials
          </p>
        </div>
        <div>
          {posts
            .sort((a, b) => {
              if (
                new Date(a.publishedAt) > new Date(b.publishedAt)
              ) {
                return -1;
              }
              return 1;
            })
            .map((post, id) => (
              <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
                <Link
                  className="flex flex-col space-y-1 mb-4"
                  href={`/blog/${post.slug}`}
                >
                  <div className="w-full flex flex-col">
                    <p className="tracking-tight">{post.title}</p>
                    <div className="flex items-center gap-2 h-6">
                      <p className="text-xs text-muted-foreground">
                        {post.publishedAt}
                      </p>
                      {isNewPost(post.publishedAt) && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </BlurFade>
            ))}
        </div>
      </div>
    </div>
  );
}
