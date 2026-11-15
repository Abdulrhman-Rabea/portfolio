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
             {projects.map((project) => {
  const frame = (
    <div
      data-project-frame
      className="border-border bg-surface relative aspect-[16/10] overflow-hidden border"
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
    <li key={project.slug}>
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

        {/* ...باقي الـ article (العنوان والـ dl واللينكات) زي ما هو بالظبط */}
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