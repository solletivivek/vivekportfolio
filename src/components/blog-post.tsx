import { type BlogPost } from '@/lib/blog'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { format } from 'date-fns'
import 'highlight.js/styles/github-dark.css'

interface BlogPostProps {
  post: BlogPost
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
            {post.description && (
              <p className="text-xl text-muted-foreground">{post.description}</p>
            )}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <time dateTime={post.publishedAt}>
                {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
              </time>
              {post.updatedAt && (
                <>
                  <Separator orientation="vertical" className="h-4" />
                  <span>Updated {format(new Date(post.updatedAt), 'MMMM d, yyyy')}</span>
                </>
              )}
            </div>
          </div>
        </header>
        
        <Separator className="mb-8" />
        
        <div className="prose prose-gray dark:prose-invert max-w-none prose-pre:bg-muted prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
          <Markdown 
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              // Custom rendering for better styling
              h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
              h2: ({ children }) => <h2 className="text-2xl font-semibold mt-6 mb-3">{children}</h2>,
              h3: ({ children }) => <h3 className="text-xl font-semibold mt-4 mb-2">{children}</h3>,
              code: ({ className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '')
                return match ? (
                  <code className={className} {...props}>
                    {children}
                  </code>
                ) : (
                  <code className="bg-muted px-1 py-0.5 rounded text-sm" {...props}>
                    {children}
                  </code>
                )
              }
            }}
          >
            {post.content}
          </Markdown>
        </div>
      </article>
    </div>
  )
}
