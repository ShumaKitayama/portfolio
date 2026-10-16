import { socialLinks } from "@/data/portfolio";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiQiita } from "react-icons/si";
import { SectionHeader } from "./ui";

export default function Contact() {
  const links = [
    { name: "X", handle: "@2005_helloworld", url: socialLinks.twitter, icon: FaXTwitter },
    { name: "GitHub", handle: "Shumakitayama", url: socialLinks.github, icon: FaGithub },
    { name: "Qiita", handle: "baningugozira", url: socialLinks.qiita, icon: SiQiita },
  ];

  return (
    <section id="contact" className="pt-24 md:pt-32 pb-12 px-4 md:px-8">
      <div className="max-w-[1120px] mx-auto">
        <SectionHeader index="06" label="CONTACT" title="連絡先" lead="お気軽にご連絡ください。" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-5">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="window window-hover p-5 md:p-6 flex flex-col gap-6 group"
            >
              <span className="w-11 h-11 rounded-full bg-ink text-white flex items-center justify-center transition-shadow group-hover:shadow-[0_0_0_4px_var(--laser)]">
                <link.icon size={20} />
              </span>
              <span>
                <span className="block text-[18px] font-extrabold tracking-[-0.03em]">
                  {link.name} <span aria-hidden>›</span>
                </span>
                <span className="mono text-muted break-all">{link.handle}</span>
              </span>
            </a>
          ))}
        </div>

        <footer className="mt-24 pt-6 border-t-2 border-stone flex flex-wrap justify-between gap-2">
          <p className="mono text-muted">© {new Date().getFullYear()} Kitayama Shuma</p>
          <p className="mono text-muted">Made with Next.js & TypeScript</p>
        </footer>
      </div>
    </section>
  );
}
