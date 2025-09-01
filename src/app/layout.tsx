import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
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
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "googleebc829c18e61bddf", // Your actual verification code
    yandex: "",
  },
  alternates: {
    types: {
      'application/rss+xml': [
        { url: '/feed.xml', title: 'RSS Feed' }
      ]
    }
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Vivek Solleti",
              "alternateName": ["Solleti Vivek", "Vivek Solleti"],
              "url": "https://solletivivek.vercel.app",
              "jobTitle": "Founder & CEO",
              "worksFor": {
                "@type": "Organization",
                "name": "Quick Tap Services Pvt. Ltd."
              },
              "description": "Founder & CEO of Quick Tap Services Pvt. Ltd., building SaaS solutions for restaurants and fintech, and leading a creative agency delivering tech-driven brand experiences.",
              "knowsAbout": ["Web Development", "React", "Next.js", "AWS", "Node.js", "JavaScript", "TypeScript", "Software Engineering", "SaaS", "Fintech"],
              "sameAs": [
                "https://linkedin.com/in/viveksolleti",
                "https://github.com/solletivivek"
              ]
            })
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased max-w-3xl mx-auto py-16 sm:py-32 px-6 selection:bg-primary/10 overflow-x-hidden",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <TooltipProvider delayDuration={0}>
            <div className="relative z-10">
              {children}
              <Navbar />
            </div>
            <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none"></div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
