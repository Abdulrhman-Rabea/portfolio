import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { Tag } from "@/components/ui/Tag";

export const metadata: Metadata = {
  title: "Style guide",
  robots: { index: false, follow: false },
};

// Full class names must appear in the source so Tailwind generates them.
// Building "bg-" + name dynamically would silently produce nothing.
const swatches = [
  { name: "background", className: "bg-background" },
  { name: "surface", className: "bg-surface" },
  { name: "foreground", className: "bg-foreground" },
  { name: "muted", className: "bg-muted" },
  { name: "border", className: "bg-border" },
  { name: "accent", className: "bg-accent" },
] as const;

export default function StyleGuide() {
  return (
    <Container className="py-section space-y-section">
      <section aria-labelledby="sg-type" className="space-y-6">
        <p className="text-label text-muted font-mono uppercase">Typography</p>
        <h1 id="sg-type" className="sr-only">
          Style guide
        </h1>
        <Heading level={2} size="display">
          Display
        </Heading>
        <Heading level={2} size="h1">
          Heading one
        </Heading>
        <Heading level={2} size="h2">
          Heading two
        </Heading>
        <Heading level={3} size="h3">
          Heading three
        </Heading>
        <p className="text-lead text-muted max-w-2xl">
          Lead paragraph. Editorial layouts rely on a strong contrast between big display type and
          calm, readable body text.
        </p>
        <p className="max-w-2xl">Body text in Geist, the default size for reading.</p>
        <p className="text-label text-muted font-mono uppercase">Label · Mono · 2026</p>
      </section>

      <section aria-labelledby="sg-color" className="space-y-6">
        <Heading id="sg-color" level={2} size="h3">
          Colors
        </Heading>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-6">
          {swatches.map((s) => (
            <li key={s.name} className="space-y-2">
              <div className={`${s.className} border-border h-20 rounded border`} />
              <span className="text-label text-muted font-mono uppercase">{s.name}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="sg-actions" className="space-y-6">
        <Heading id="sg-actions" level={2} size="h3">
          Actions
        </Heading>
        <div className="flex flex-wrap items-center gap-4">
          <Button href="#">Primary link</Button>
          <Button variant="ghost" href="#">
            Ghost link
          </Button>
          <Button>Primary button</Button>
          <TextLink href="https://github.com/Abdulrhman-Rabea">External text link</TextLink>
          <TextLink href="/">Internal text link</TextLink>
        </div>
        <div className="flex flex-wrap gap-2">
          <Tag>Next.js</Tag>
          <Tag>TypeScript</Tag>
          <Tag>GSAP</Tag>
        </div>
      </section>
    </Container>
  );
}
