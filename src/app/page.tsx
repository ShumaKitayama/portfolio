import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Profile from "@/components/Profile";
import Skills from "@/components/Skills";
import Works from "@/components/Works";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Profile />
      <Skills />
      <Works />
      <Contact />
    </main>
  );
}
