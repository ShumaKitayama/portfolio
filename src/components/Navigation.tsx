"use client";

import { useEffect, useState } from "react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // アクティブセクションの検出
      const sections = ["about", "profile", "skills", "works", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80; // ナビゲーションバーの高さ分のオフセット
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    { id: "about", label: "About" },
    { id: "profile", label: "Profile" },
    { id: "skills", label: "Skills" },
    { id: "works", label: "Works" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[rgba(0,0,0,0.8)] backdrop-blur-xl shadow-sm border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[980px] mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-12 md:h-14">
          {/* ロゴ */}
          <button
            onClick={scrollToTop}
            className="text-[21px] font-semibold text-[#f5f5f7] hover:text-white transition-colors duration-300 tracking-tight"
          >
            Kitayama Lab
          </button>

          {/* ナビゲーションメニュー - デスクトップ */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-[12px] font-normal transition-all duration-300 tracking-wide uppercase ${
                  activeSection === item.id
                    ? "text-white opacity-100"
                    : "text-[#f5f5f7] opacity-80 hover:opacity-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* モバイルメニュー */}
          <div className="md:hidden flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-all duration-300 rounded-full ${
                  activeSection === item.id
                    ? "bg-white w-6 h-1.5"
                    : "bg-white/30 w-1.5 h-1.5 hover:bg-white/50"
                }`}
                aria-label={item.label}
              />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
