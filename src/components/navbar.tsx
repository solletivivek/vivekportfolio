import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-6 flex origin-bottom h-full max-h-14 overflow-hidden px-2">
      <div className="fixed bottom-0 inset-x-0 h-24 w-full bg-gradient-to-t from-background via-background/90 to-transparent"></div>
      
      <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-3 py-1 max-w-[calc(100vw-2rem)]
        bg-background/80 backdrop-blur-lg rounded-full border border-border/30
        [box-shadow:0_8px_20px_-12px_rgba(0,0,0,.2),0_0_1px_rgba(0,0,0,.15)]
        dark:[border:1px_solid_rgba(255,255,255,.1)] 
        dark:[box-shadow:0_-15px_25px_-15px_rgba(255,255,255,.05)_inset,0_1px_1px_rgba(255,255,255,.05)]">
        
        {DATA.navbar.map((item) => (
          <DockIcon key={item.href}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12 rounded-full hover:bg-primary/10 hover:text-primary transition-colors duration-300"
                  )}
                >
                  <item.icon className="size-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top" className="font-medium">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
        
        <Separator orientation="vertical" className="h-8" />
        
        {Object.entries(DATA.contact.social)
          .filter(([_, social]) => social.navbar)
          .map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full hover:bg-primary/10 hover:text-primary transition-colors duration-300"
                    )}
                  >
                    <social.icon className="size-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="top" className="font-medium">
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          
        <Separator orientation="vertical" className="h-8" />
        
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="size-12 flex items-center justify-center">
                <ModeToggle />
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="font-medium">
              <p>Theme</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      </Dock>
    </div>
  );
}
