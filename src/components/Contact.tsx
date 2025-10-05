"use client";

import { socialLinks } from "@/data/portfolio";
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { SiQiita } from "react-icons/si";

export default function Contact() {
  const links = [
    {
      name: "X (Twitter)",
      url: socialLinks.twitter,
      icon: FaTwitter,
      hoverColor: "#1da1f2",
    },
    {
      name: "Instagram",
      url: socialLinks.instagram,
      icon: FaInstagram,
      hoverColor: "#e1306c",
    },
    { name: "GitHub", url: socialLinks.github, icon: FaGithub, hoverColor: "#86868b" },
    { name: "Qiita", url: socialLinks.qiita, icon: SiQiita, hoverColor: "#55c500" },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 px-6 bg-black">
      <div className="max-w-[980px] mx-auto text-center">
        {/* セクションタイトル */}
        <h2 className="text-[48px] md:text-[64px] font-semibold text-center mb-4 leading-[1.08] tracking-[-0.003em] gradient-text">
          メディア・連絡先
        </h2>
        <p className="text-center text-[21px] mb-12 md:mb-16 leading-[1.381] tracking-[-0.022em] gradient-purple">
          お気軽にご連絡ください
        </p>

        {/* SNSリンク */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-card p-8 flex flex-col items-center gap-4 hover:border-white/10 group transition-all duration-300 social-link"
            >
              <link.icon
                size={40}
                className="text-[#a1a1a6] group-hover:scale-110 transition-colors duration-300 social-icon"
                style={
                  {
                    "--icon-hover-color": link.hoverColor,
                  } as React.CSSProperties
                }
              />
              <span className="text-[15px] font-medium text-[#a1a1a6] group-hover:text-[#f5f5f7] transition-colors duration-300 tracking-[-0.022em]">
                {link.name}
              </span>
            </a>
          ))}
        </div>

        {/* フッター */}
        <div className="border-t border-white/5 pt-12">
          <p className="text-[14px] text-[#a1a1a6] mb-2 tracking-[-0.022em]">
            © 2025 Kitayama Shuma. All rights reserved.
          </p>
          <p className="text-[12px] text-[#a1a1a6] tracking-[-0.022em]">
            Made with Next.js & TypeScript
          </p>
        </div>
      </div>
    </section>
  );
}
