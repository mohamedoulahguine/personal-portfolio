import { Hero, About, Skills, Projects, Blog, Contact } from "@/sections";
import { JsonLd, getSiteOwnerJsonLd, getWebSiteJsonLd } from "@/lib";

export default function Home() {
  return (
    <>
      <JsonLd data={[getSiteOwnerJsonLd(), getWebSiteJsonLd()]} />
      <>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Blog />
        <Contact />
      </>
    </>
  );
}
