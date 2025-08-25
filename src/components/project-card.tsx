"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import Markdown from "react-markdown";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  featured?: boolean;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  featured = false,
  links,
  className,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  return (
    <Card
      ref={cardRef}
      className={cn(
        "flex flex-col overflow-hidden border rounded-xl group hover-lift transition-all duration-300 h-full relative",
        featured 
          ? "bg-gradient-to-br from-primary/5 via-background to-primary/10 border-primary/30 shadow-lg hover:shadow-2xl hover:border-primary/50 animate-pulse-slow" 
          : "hover:border-primary/20 hover:shadow-xl",
        className
      )}
    >
      {/* Shimmer effect for featured card */}
      {featured && (
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
        </div>
      )}
      
      {/* Featured badge */}
      {featured && (
        <div className="absolute top-2 right-2 z-10">
          <Badge className="bg-gradient-to-r from-primary to-blue-500 text-primary-foreground border-0 shadow-md animate-bounce-slow">
            ✨ Featured
          </Badge>
        </div>
      )}
      
      <div className={cn(
        "absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
        featured 
          ? "bg-gradient-to-br from-primary/15 to-blue-500/10" 
          : "bg-gradient-to-br from-primary/10 to-transparent"
      )}></div>
      
      <Link
        href={href || "#"}
        className={cn("block cursor-pointer relative overflow-hidden", className)}
      >
        {video && (
          <div className="relative">
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="pointer-events-none mx-auto h-44 w-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/70"></div>
          </div>
        )}
        {image && (
          <div className="relative">
            <Image
              src={image}
              alt={title}
              width={500}
              height={300}
              className="h-44 w-full overflow-hidden object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/70"></div>
          </div>
        )}
        {/* Placeholder for design portfolio */}
        {featured && !image && !video && (
          <div className="relative h-44 bg-gradient-to-br from-primary/20 via-blue-500/10 to-purple-500/20 flex items-center justify-center">
            <div className="text-6xl opacity-20 animate-pulse">🎨</div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/70"></div>
          </div>
        )}
      </Link>
      <CardHeader className="px-4 pb-0 pt-4 relative z-10">
        <div className="space-y-1">
          <CardTitle className={cn(
            "text-base font-semibold group-hover:text-primary transition-colors duration-300",
            featured && "text-primary font-bold"
          )}>{title}</CardTitle>
          <time className="font-sans text-xs text-muted-foreground">{dates}</time>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            {description}
          </Markdown>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-4 pt-2 relative z-10">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tags?.map((tag) => (
              <Badge
                className={cn(
                  "px-1.5 py-0 text-[10px] font-medium transition-colors",
                  featured 
                    ? "bg-primary/10 text-primary border border-primary/20" 
                    : "bg-secondary/80 text-secondary-foreground"
                )}
                variant={featured ? "outline" : "secondary"}
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-4 pb-4 relative z-10">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1.5">
            {links?.map((link, idx) => (
              <Link 
                href={link?.href} 
                key={idx} 
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="z-10 relative" 
              >
                <Badge 
                  key={idx} 
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-1.5 text-sm font-medium border transition-colors duration-300",
                    featured
                      ? "border-primary/30 bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground shadow-md"
                      : "border-border hover:bg-primary hover:text-primary-foreground"
                  )}
                  variant="outline"
                >
                  <span className="size-4">{link.icon}</span>
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
