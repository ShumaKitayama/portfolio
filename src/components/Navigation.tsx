"use client";

import { useEffect, useState } from "react";

const navItems = [
  { id: "about", label: "About" },
  { id: "career", label: "Career" },
  { id: "research", label: "Research" },
  { id: "works", label: "Works" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      let current = "";
      for (const { id } of navItems) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= 120) current = id;
      }
      // 最下部まで来たら、短い最後のセクションでも選択状態にする
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = navItems[navItems.length - 1].id;
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-4 inset-x-0 z-50 px-4 flex justify-center pointer-events-none">
      <div className="window pointer-events-auto flex items-center gap-1 p-[5px] max-w-full">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="px-3 md:px-4 py-2 text-[14px] font-extrabold tracking-[-0.03em] whitespace-nowrap"
        >
          Kitayama<span className="hidden sm:inline"> Lab</span>
        </button>
        <div className="flex items-center gap-[2px] overflow-x-auto no-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-3 py-2 rounded-[20px] text-[12px] font-extrabold whitespace-nowrap transition-colors duration-200 ${
                activeSection === item.id ? "bg-ink text-white" : "text-muted hover:text-ink"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
