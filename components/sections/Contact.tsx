import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/sections/ContactForm";
import { hero, siteConfig, socialLinks } from "@/data/site";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="border-border py-section border-t">
      <Container>
        <h2 id="contact-heading" className="text-label text-muted font-mono uppercase">
          Contact
        </h2>

        <div className="mt-16 grid gap-16 md:grid-cols-12 md:gap-x-8">
          <div className="space-y-8 md:col-span-5">
            <p className="font-display text-h2 text-foreground">
              Have a project or a role in mind? Let&apos;s talk.
            </p>
            <p className="text-lead text-muted">{hero.availability}</p>

            <a
              href={`mailto:${siteConfig.email}`}
              className="text-foreground hover:text-accent block break-all underline underline-offset-4 transition-colors"
            >
              {siteConfig.email}
            </a>

            <ul className="text-label flex gap-6 font-mono uppercase">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-accent underline underline-offset-4 transition-colors"
                  >
                    {link.label} <span aria-hidden="true">↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-7">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}