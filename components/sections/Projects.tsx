import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { TextLink } from "@/components/ui/TextLink";
import { ProjectsMotion } from "@/components/sections/ProjectsMotion";
import { projects } from "@/data/projects";

export function Projects() {
  
      return (
        <section id="work" aria-labelledby="work-heading" className="border-border py-section border-t">
          <Container>
            <ProjectsMotion className="space-y-16">
              <h2 id="work-heading" className="text-label text-muted font-mono uppercase">
                Selected work
              </h2>

              <ul className="space-y-24 md:space-y-32">
                {projects.map((project) => {
                  const frame = (
                    <div
                      data-project-frame
                      data-project-tilt
                      className="border-border bg-surface relative aspect-[16/10] overflow-hidden border [perspective:1000px] [transform-style:preserve-3d]"
                    >
                      <div data-project-media className="absolute inset-0">
                        {/* 8% taller than the frame at the top and bottom, so it can slide
                            for the parallax without ever showing an empty edge */}
                        <div data-project-parallax className="absolute inset-x-0 -inset-y-[8%]">
                          <Image
                            src={project.image.src}
                            alt={project.image.alt}
                            fill
                            sizes="(min-width: 80rem) 80rem, 100vw"
                            className="object-cover object-top transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
                          />
                        </div>
                      </div>
                    </div>
                  );

                  return (
                    <li key={project.slug} data-project-card className="bg-background relative">
                      <article className="group">
                        {project.liveUrl ? (
                          // Mouse-only shortcut: keyboard and screen reader users get the real
                          // "Visit site" link below, so this one is hidden from them
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-project-link
                            className="block"
                          >
                            {frame}
                          </a>
                        ) : (
                          frame
                        )}

                        <div className="mt-8 grid gap-6 md:grid-cols-12 md:gap-x-8">
                          <div className="space-y-3 md:col-span-7">
                            <h3 className="font-display text-h3 text-foreground">{project.title}</h3>
                            <p className="text-lead text-muted">{project.tagline}</p>
                          </div>

                          <div className="space-y-4 md:col-span-5">
                            <p className="text-label text-muted font-mono uppercase">{project.role}</p>

                            <ul className="flex flex-wrap gap-2">
                              {project.stack.map((tech) => (
                                <li key={tech}>
                                  <Tag>{tech}</Tag>
                                </li>
                              ))}
                            </ul>

                            <ul className="text-label flex gap-6 font-mono uppercase">
                              {project.liveUrl && (
                                <li>
                                  <TextLink href={project.liveUrl}>
                                    Visit site <span aria-hidden="true">↗</span>
                                  </TextLink>
                                </li>
                              )}
                              {project.repoUrl && (
                                <li>
                                  <TextLink href={project.repoUrl}>
                                    Source <span aria-hidden="true">↗</span>
                                  </TextLink>
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
            </ProjectsMotion>
          </Container>
        </section>
      );
    }