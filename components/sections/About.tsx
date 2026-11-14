import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { AboutMotion } from "@/components/sections/AboutMotion";
import { about } from "@/data/site";

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="border-border py-section border-t">
      <Container>
        <AboutMotion className="grid gap-y-12 md:grid-cols-12 md:gap-x-8">
          <div className="space-y-8 md:col-span-3">
            <h2 id="about-heading" className="text-label text-muted font-mono uppercase">
              {about.label}
            </h2>

            <div className="border-border bg-surface relative aspect-[4/5] max-w-60 overflow-hidden border">
              <Image
                src={about.photo.src}
                alt={about.photo.alt}
                fill
                sizes="240px"
                className="object-cover object-top grayscale"
              />
            </div>
          </div>

          <div className="md:col-span-9">
            {/* SplitText splits this into masked lines; leading-[1.15] keeps descenders unclipped */}
            <p
              data-about-statement
              className="font-display text-h2 text-foreground max-w-[22ch] leading-[1.15] md:max-w-none"
            >
              {about.statement}
            </p>

            <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-8">
              <p className="text-lead text-muted max-w-prose">{about.body}</p>

              <dl className="text-muted">
                {about.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="border-border grid grid-cols-[8rem_1fr] gap-4 border-t py-4 last:border-b"
                  >
                    <dt className="text-label font-mono uppercase">{fact.label}</dt>
                    <dd className="text-foreground">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </AboutMotion>
      </Container>
    </section>
  );
}