"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
}

export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
}: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (description) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <Link
      href={href || "#"}
      className="block cursor-pointer"
      onClick={handleClick}
    >
      <Card className="group flex p-2 border rounded-xl hover:border-primary/20 hover:shadow-md transition-all duration-300">
        <div className="flex-none">
          <Avatar className="border size-14 m-auto bg-secondary/50 border-border/50 shadow-sm">
            <AvatarImage
              src={logoUrl}
              alt={altText}
              className="object-contain p-1"
            />
            <AvatarFallback>{altText[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-grow ml-4 flex flex-col justify-center">
          <CardHeader className="p-0 py-1">
            <div className="flex items-center justify-between gap-x-2 text-base">
              <h3 className="inline-flex items-center gap-2 font-semibold leading-tight text-sm sm:text-base group-hover:text-primary transition-colors duration-300">
                {title}
                {badges && badges.length > 0 && (
                  <span className="inline-flex gap-x-1 ml-1">
                    {badges.map((badge, index) => (
                      <Badge
                        variant="secondary"
                        className="align-middle text-xs font-medium bg-secondary/80 text-secondary-foreground"
                        key={index}
                      >
                        {badge}
                      </Badge>
                    ))}
                  </span>
                )}
                <ChevronRightIcon
                  className={cn(
                    "size-4 translate-x-0 transform text-muted-foreground transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:text-foreground",
                    isExpanded ? "rotate-90" : "rotate-0"
                  )}
                />
              </h3>
              <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
                {period}
              </div>
            </div>
            {subtitle && (
              <div className="font-sans text-xs text-muted-foreground mt-0.5">
                {subtitle}
              </div>
            )}
          </CardHeader>
          {description && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isExpanded ? 1 : 0,
                height: isExpanded ? "auto" : 0,
              }}
              transition={{
                duration: 0.5,
                ease: [0.04, 0.62, 0.23, 0.98],
              }}
              className="mt-2 text-xs sm:text-sm px-0 text-muted-foreground"
            >
              {description}
            </motion.div>
          )}
        </div>
      </Card>
    </Link>
  );
};
