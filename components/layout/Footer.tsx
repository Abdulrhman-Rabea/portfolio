import { Container } from "@/components/ui/Container";
import { FooterMotion } from "@/components/layout/FooterMotion";
import { siteConfig, socialLinks } from "@/data/site";
async function getYear() {
  "use cache";
  return new Date().getFullYear();
}
export async function Footer() {
     const year = await getYear();

  return (
    <footer className="border-border border-t">
      <Container>
        <FooterMotion className="text-label text-muted flex flex-col gap-4 py-8 font-mono uppercase md:flex-row md:items-center md:justify-between">
          {/* The year is fixed at build time, which is fine for a footer */}
          <p>
             © {year} {siteConfig.name}
          </p>

          <ul className="flex gap-6">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  {link.label} <span aria-hidden="true">↗</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>

          <a href="#top" className="hover:text-foreground transition-colors">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </FooterMotion>
      </Container>
    </footer>
  );
}