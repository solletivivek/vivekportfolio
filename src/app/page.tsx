import { CertificationCard } from "@/components/certification-card";
import { ContactFormDialog } from "@/components/contact-form";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import { NotebookIcon } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-20">
      <section id="hero" className="pt-6">
        <div className="mx-auto w-full max-w-3xl space-y-8">
          <div className="flex gap-4 justify-between items-center">
            <div className="flex-col flex flex-1 space-y-4">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none gradient-text"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]}   `}
              />
              <BlurFadeText
                className="max-w-[600px] text-lg md:text-xl text-muted-foreground"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-28 border border-border/60 shadow-xl animate-float">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>

      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold">About</h2>
            <Separator className="flex-grow" />
          </div>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-full text-pretty font-sans text-base text-muted-foreground dark:prose-invert leading-relaxed">
            {DATA.summary}
          </Markdown>
        </BlurFade>
      </section>

      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-bold">Work Experience</h2>
              <Separator className="flex-grow" />
            </div>
          </BlurFade>
          <div className="space-y-4">
            {DATA.work.map((work, id) => (
              <BlurFade
                key={work.company}
                delay={BLUR_FADE_DELAY * 6 + id * 0.05}
              >
                <ResumeCard
                  key={work.company}
                  logoUrl={work.logoUrl}
                  altText={work.company}
                  title={work.company}
                  subtitle={work.title}
                  href={work.href}
                  badges={work.badges}
                  period={`${work.start} - ${work.end ?? "Present"}`}
                  description={work.description}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-bold">Education</h2>
              <Separator className="flex-grow" />
            </div>
          </BlurFade>
          <div className="space-y-4">
            {DATA.education.map((education, id) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + id * 0.05}
              >
                <ResumeCard
                  key={education.school}
                  href={education.href}
                  logoUrl={education.logoUrl}
                  altText={education.school}
                  title={education.school}
                  subtitle={education.degree}
                  period={`${education.start} - ${education.end}`}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-bold">Skills</h2>
              <Separator className="flex-grow" />
            </div>
          </BlurFade>
          <div className="flex flex-wrap gap-2">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge 
                  key={skill} 
                  className="px-3 py-1 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                  variant="outline"
                >
                  {skill}
                </Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="scroll-mt-16">
        <div className="space-y-12 w-full py-6">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-6 text-center mb-12">
              <div className="space-y-4">
                <div className="inline-block rounded-full bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 text-sm font-medium">
                  My Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-lg/relaxed xl:text-xl/relaxed max-w-2xl mx-auto">
                  I&apos;ve worked on a variety of projects, from simple
                  websites to complex web applications. Here are a few of my
                  favorites.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-[900px] mx-auto">
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <ProjectCard
                  href={project.href}
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  featured={project.featured}
                  links={project.links}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="certifications" className="scroll-mt-16">
        <div className="space-y-12 w-full py-6">
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <div className="flex flex-col items-center justify-center space-y-6 text-center mb-12">
              <div className="space-y-4">
                <div className="inline-block rounded-full bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 text-sm font-medium">
                  Certifications
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Global Achievements
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-lg/relaxed xl:text-xl/relaxed max-w-2xl mx-auto">
                  I&apos;ve earned {DATA.certifications.length}+ industry-recognized certifications that validate my expertise across various domains. These credentials demonstrate my commitment to professional growth and mastery of cutting-edge technologies and methodologies.
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <ul className="mb-4 ml-6 divide-y divide-dashed border-l-2 border-primary/30">
              {DATA.certifications.map((certification, id) => (
                <BlurFade
                  key={certification.title + certification.dates}
                  delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                >
                  <CertificationCard
                    title={certification.title}
                    description={certification.description}
                    location={certification.location}
                    dates={certification.dates}
                    image={certification.image}
                    links={certification.links}
                  />
                </BlurFade>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section>

      <section id="blog-banner" className="scroll-mt-16">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 18}>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-background to-primary/5 border border-primary/20 p-8 md:p-12">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-2xl"></div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                  Latest Blog Posts
                </div>
                
                <div className="space-y-4 max-w-2xl">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                    Explore My <span className="gradient-text">Tech Journey</span>
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Dive into my latest insights on web development, AWS deployments, and tech tutorials. 
                    I share practical guides, coding tips, and lessons learned from building real-world applications.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link
                    href="/blog"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <NotebookIcon className="w-4 h-4" />
                    Read My Blog
                  </Link>
                  <div className="inline-flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>{DATA.blogs?.length || 2}+ Posts</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Weekly Updates</span>
                    </div>
                  </div>
                </div>

                {/* Recent posts preview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl pt-6">
                  <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-4 border border-border/50 hover:border-primary/30 transition-colors group">
                    <div className="space-y-2">
                      <div className="text-xs text-primary font-medium">Latest</div>
                      <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
                        Deploying Portfolio with AWS S3 + CloudFront
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        Complete guide with commands, configs, and CI/CD setup
                      </p>
                    </div>
                  </div>
                  <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-4 border border-border/50 hover:border-primary/30 transition-colors group">
                    <div className="space-y-2">
                      <div className="text-xs text-green-600 font-medium">Popular</div>
                      <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
                        GitHub Pages with Custom Domain
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        Step-by-step guide to professional website hosting
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="contact" className="scroll-mt-16">
        <div className="grid items-center justify-center gap-8 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-6">
              <div className="inline-block rounded-full bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 text-sm font-medium">
                Contact
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-lg/relaxed xl:text-xl/relaxed">
                Want to chat? Just shoot me a dm{" "}
                <Link
                  href={DATA.contact.social.X.url}
                  className="text-primary font-medium hover:underline"
                >
                  with a direct question on twitter
                </Link>{" "}
                and I&apos;ll respond whenever I can. I will ignore all
                soliciting.
              </p>
              <div className="flex justify-center pt-6">
                <BlurFade delay={BLUR_FADE_DELAY * 17}>
                  <ContactFormDialog />
                </BlurFade>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
