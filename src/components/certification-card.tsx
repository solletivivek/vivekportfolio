import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  dates: string;
  location: string;
  image?: string;
  links?: readonly {
    icon: React.ReactNode;
    title: string;
    href: string;
  }[];
}

export function CertificationCard({
  title,
  description,
  dates,
  location,
  image,
  links,
}: Props) {
  return (
    <li className="relative ml-10 py-6 group hover:bg-primary/5 rounded-lg px-4 -mx-4 transition-colors duration-300">
      <div className="absolute -left-16 top-3 flex items-center justify-center bg-background rounded-full p-0.5 border border-border/50 shadow-md group-hover:border-primary/30 transition-colors duration-300">
        <Avatar className="border size-12 m-auto bg-secondary/50">
          <AvatarImage src={image} alt={title} className="object-contain p-1" />
          <AvatarFallback className="bg-gradient-to-br from-primary/10 to-primary/5">{title[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-1 flex-col justify-start gap-2">
        {dates && (
          <time className="text-xs text-muted-foreground font-medium">{dates}</time>
        )}
        <h2 className="font-semibold leading-tight text-base group-hover:text-primary transition-colors duration-300">{title}</h2>
        {location && (
          <p className="text-sm text-muted-foreground">
            Issued by: <span className="font-medium">{location}</span>
          </p>
        )}
        {description && (
          <span className="prose dark:prose-invert text-sm text-muted-foreground max-w-full">
            {description}
          </span>
        )}
      </div>
      {links && links.length > 0 && (
        <div className="mt-3 flex flex-row flex-wrap items-start gap-2">
          {links?.map((link, idx) => (
            <Link href={link.href} key={idx} target="_blank" rel="noopener noreferrer">
              <Badge 
                key={idx} 
                title={link.title} 
                className="flex gap-2 px-3 py-1 border border-border/50 hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                variant="outline"
              >
                {link.icon}
                {link.title}
              </Badge>
            </Link>
          ))}
        </div>
      )}
    </li>
  );
} 