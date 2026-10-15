import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LocalTime } from "@/components/ui/LocalTime";
import { HeroMotion } from "@/components/sections/HeroMotion";
import { hero, siteConfig } from "@/data/site";

export function Hero() {
  return (
    <section aria-label="Introduction">
      <Container>
        <HeroMotion className="flex min-h-svh flex-col justify-between pt-32 pb-8">
          {/* Top: availability */}
          <p
            data-hero-fade
            className="text-label text-muted flex items-center gap-3 font-mono uppercase"
          >
            <span className="relative flex size-2" aria-hidden="true">
              <span className="bg-accent absolute inline-flex size-full rounded-full opacity-75 motion-safe:animate-ping" />
              <span className="bg-accent relative inline-flex size-2 rounded-full" />
            </span>
            {hero.availability}
          </p>

          {/* Middle: name + promise */}
          <div>
            <h1 className="font-display text-display text-foreground" aria-label={siteConfig.name}>
              {hero.nameLines.map((line) => (
                // Each line is a mask. The padding/negative margin stops the
                // overflow clip from cutting off letter tops and descenders.
                <span key={line} className="-my-[0.1em] block overflow-hidden py-[0.1em]">
                  <span data-hero-line className="block" aria-hidden="true">
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <div className="mt-10 grid gap-8 md:grid-cols-12">
              <div className="space-y-8 md:col-span-6 md:col-start-7">
                <p data-hero-fade className="text-lead text-muted">
                  {hero.headline}
                </p>
                <div data-hero-fade className="flex flex-wrap gap-4">
                  <Button href="#work">View work</Button>
                  <Button variant="ghost" href="#contact">
                    Get in touch
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: location + scroll cue */}
          <div
            data-hero-fade
            className="text-label text-muted flex items-end justify-between font-mono uppercase"
          >
            <span>
              {siteConfig.location} · <LocalTime />
            </span>
            <span aria-hidden="true">Scroll ↓</span>
          </div>
        </HeroMotion>
      </Container>
    </section>
  );
}