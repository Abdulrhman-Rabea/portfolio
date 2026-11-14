import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProjectsMotion } from "@/components/sections/ProjectsMotion";
import { projects } from "@/data/projects";

const textLink =
  "text-label hover:text-accent font-mono uppercase underline underline-offset-4 transition-colors";

export function Projects() {
  return (
    <section id="work" aria-labelledby="work-heading" className="border-border py-section border-t">
      <Container>
        <ProjectsMotion className="space-y-16">
          <h2 id="work-heading" className="text-label text-muted font-mono uppercase">
            Selected work
          </h2>

          <ul className="space-y-24 md:space-y-32">
            {projects.map((project) => (
              <li key={project.slug}>
                <article className="group">
                  {/* Frame is clipped by GSAP (data-project-frame); the inner
                      wrapper (data-project-media) scales down while it opens. */}
                  <div
                    data-project-frame
                    className="border-border bg-surface relative aspect-[16/10] overflow-hidden border"
                  >
                    <div data-project-media className="absolute inset-0">
                      <Image
                        src={project.image.src}
                        alt={project.image.alt}
                        fill
                        sizes="(min-width: 80rem) 80rem, 100vw"
                        className="object-cover object-top transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
                      />
                    </div>
                  </div>

                  <div className="mt-8 grid gap-8 md:grid-cols-12 md:gap-x-8">
                    <h3 className="font-display text-h2 text-foreground md:col-span-7">
                      {project.title}
                    </h3>

                    <div className="space-y-8 md:col-span-5">
                      <p className="text-lead text-muted">{project.tagline}</p>

                      <dl className="text-muted">
                        <div className="border-border grid grid-cols-[6rem_1fr] gap-4 border-t py-4">
                          <dt className="text-label font-mono uppercase">Role</dt>
                          <dd className="text-foreground">{project.role}</dd>
                        </div>
                        <div className="border-border grid grid-cols-[6rem_1fr] gap-4 border-y py-4">
                          <dt className="text-label font-mono uppercase">Stack</dt>
                          <dd className="text-foreground">{project.stack.join(", ")}</dd>
                        </div>
                      </dl>

                      <div className="text-foreground flex flex-wrap gap-x-6 gap-y-3">
                        {project.hasCaseStudy && (
                          <Link href={`/work/${project.slug}`} className={textLink}>
                            Case study
                            <span className="sr-only">: {project.title}</span>
                          </Link>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={textLink}
                          >
                            Visit site <span aria-hidden="true">↗</span>
                            <span className="sr-only">
                              : {project.title} (opens in a new tab)
                            </span>
                          </a>
                        )}
                        {project.repoUrl && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={textLink}
                          >
                            Code <span aria-hidden="true">↗</span>
                            <span className="sr-only">
                              : {project.title} on GitHub (opens in a new tab)
                            </span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </ProjectsMotion>
      </Container>
    </section>
  );
}