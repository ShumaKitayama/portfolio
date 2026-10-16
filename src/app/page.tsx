import About from "@/components/About";
import Career from "@/components/Career";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Research from "@/components/Research";
import Skills from "@/components/Skills";
import Works from "@/components/Works";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Career />
      <Research />
      <Works />
      <Skills />
      <Contact />
    </main>
  );
}
