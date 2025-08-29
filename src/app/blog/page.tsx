import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
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
  const posts = await getBlogPosts();

  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">Blogs</h1>
      </BlurFade>
      {posts
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
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
                <p className="tracking-tight">{post.metadata.title}</p>
                <div className="flex items-center gap-2 h-6">
                  <p className="text-xs text-muted-foreground">
                    {post.metadata.publishedAt}
                  </p>
                  {isNewPost(post.metadata.publishedAt) && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      New
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </BlurFade>
        ))}
    </section>
  );
}
