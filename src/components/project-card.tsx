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
  links,
  className,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  return (
    <Card
      ref={cardRef}
      className={cn(
        "flex flex-col overflow-hidden border rounded-xl group hover-lift hover:border-primary/20 hover:shadow-xl transition-all duration-300 h-full relative",
        className
      )}
    >
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-primary/10 to-transparent transition-opacity duration-500"></div>
      
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
      </Link>
      <CardHeader className="px-4 pb-0 pt-4">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors duration-300">{title}</CardTitle>
          <time className="font-sans text-xs text-muted-foreground">{dates}</time>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            {description}
          </Markdown>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-4 pt-2">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tags?.map((tag) => (
              <Badge
                className="px-1.5 py-0 text-[10px] font-medium transition-colors bg-secondary/80 text-secondary-foreground"
                variant="secondary"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-4 pb-4">
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
                  className="flex items-center gap-3 px-3.5 py-1.5 text-sm font-medium border border-border hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
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
