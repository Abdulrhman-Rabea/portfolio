import { siteConfig ,socialLinks} from "@/data/site";
import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.title,
  url: siteConfig.url,
  image: new URL("/portrait.jpg", siteConfig.url).toString(),
  sameAs: socialLinks.map((link) => link.href),
  address: { "@type": "PostalAddress", addressLocality: "Cairo", addressCountry: "EG" },
};
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // Escaping "<" prevents any value from closing the script tag early
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact/>
      </>
  );
}
