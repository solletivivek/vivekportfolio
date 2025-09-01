import { BlogPost } from '@/lib/blog'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { format } from 'date-fns'

interface BlogListProps {
  posts: BlogPost[]
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
      {posts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`}>
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex flex-wrap gap-2 mb-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              <CardDescription className="line-clamp-3">
                {post.description || post.excerpt}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <time className="text-sm text-muted-foreground">
                {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
              </time>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
