import { Container } from "@/components/ui/Container";
import { SkillsMotion } from "./SkillsMotion";
import { skillGroups } from "@/data/site";

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="border-border py-section border-t">
      <Container>
        <SkillsMotion className="space-y-16">
          <h2 id="skills-heading" className="text-label text-muted font-mono uppercase">
            Skills
          </h2>

          <ul>
            {skillGroups.map((group) => (
              <li
                key={group.name}
                data-skill-row
                className="relative grid gap-4 py-8 md:grid-cols-12 md:gap-x-8"
              >
                {/* The row's top line. A separate element so GSAP can scale it
                    without scaling the text (you can't animate a border cheaply). */}
                <span
                  data-skill-rule
                  aria-hidden="true"
                  className="bg-border absolute inset-x-0 top-0 h-px origin-left"
                />

                <h3 className="text-label text-muted font-mono uppercase md:col-span-3">
                  {group.name}
                </h3>

                <div className="md:col-span-9">
                  {/* Mask: same padding/negative-margin trick as the Hero lines */}
                  <p className="font-display text-h3 text-foreground -my-[0.1em] overflow-hidden py-[0.1em]">
                    <span data-skill-text className="block">
                      {group.items.join(", ")}
                    </span>
                  </p>

               
                </div>
              </li>
            ))}
          </ul>
        </SkillsMotion>
      </Container>
    </section>
  );
}