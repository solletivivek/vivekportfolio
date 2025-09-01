import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content')

export interface BlogPost {
  slug: string
  title: string
  description?: string
  excerpt?: string
  content: string
  publishedAt: string
  updatedAt?: string
  tags: string[]
  keywords?: string[]
  image?: string
  featured?: boolean
}

// Helper function to extract keywords from content
function extractKeywordsFromContent(content: string, existingKeywords: string[] = []): string[] {
  const commonWords = new Set(['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those', 'a', 'an']);
  
  // Extract words from content, filter out common words and short words
  const words = content.toLowerCase()
    .replace(/[^a-z\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3 && !commonWords.has(word))
    .slice(0, 20); // Limit to first 20 meaningful words
  
  // Combine with existing keywords and remove duplicates
  return [...new Set([...existingKeywords, ...words])];
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const fileNames = fs.readdirSync(contentDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.(md|mdx)$/, '')
      const fullPath = path.join(contentDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      // Extract additional keywords from content
      const dynamicKeywords = extractKeywordsFromContent(content, data.keywords || [])

      return {
        slug,
        title: data.title,
        description: data.description,
        excerpt: data.excerpt || content.slice(0, 160) + '...',
        content,
        publishedAt: data.publishedAt || data.date,
        updatedAt: data.updatedAt,
        tags: data.tags || [],
        keywords: dynamicKeywords,
        image: data.image,
        featured: data.featured || false,
      } as BlogPost
    })

  return allPostsData.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.md`)
    let fileContents: string

    try {
      fileContents = fs.readFileSync(fullPath, 'utf8')
    } catch {
      // Try .mdx extension
      const mdxPath = path.join(contentDirectory, `${slug}.mdx`)
      fileContents = fs.readFileSync(mdxPath, 'utf8')
    }

    const { data, content } = matter(fileContents)

    // Extract additional keywords from content
    const dynamicKeywords = extractKeywordsFromContent(content, data.keywords || [])

    return {
      slug,
      title: data.title,
      description: data.description,
      excerpt: data.excerpt || content.slice(0, 160) + '...',
      content,
      publishedAt: data.publishedAt || data.date,
      updatedAt: data.updatedAt,
      tags: data.tags || [],
      keywords: dynamicKeywords,
      image: data.image,
      featured: data.featured || false,
    }
  } catch (error) {
    return null
  }
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const fileNames = fs.readdirSync(contentDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.(md|mdx)$/, ''))
}
