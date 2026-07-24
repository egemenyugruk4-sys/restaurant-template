"use client";

import { motion } from "framer-motion";
import { restaurant } from "@/data/restaurant";
import Reveal from "./Reveal";

const quickLinks = [
  { label: "Hakkımızda", target: "hakkimizda" },
  { label: "Menü", target: "menu" },
  { label: "Galeri", target: "galeri" },
  { label: "İletişim", target: "iletisim" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-[#080808] via-[#050505] to-black px-6 py-14 text-white">
      <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-[#7B1E22]/15 blur-[110px]" />

      <div className="pointer-events-none absolute -left-24 bottom-[-120px] h-72 w-72 rounded-full bg-[#4A1113]/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-[#7B1E22]/10 blur-[120px]" />

      <Reveal>
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
            <div>
              <button
                type="button"
                onClick={() => scrollToSection("anasayfa")}
                className="group inline-block text-left text-2xl font-black tracking-tight text-white transition-colors duration-300 hover:text-[#B85C5F]"
              >
                <span className="block">01 ADANA</span>

                <span className="block text-[#B85C5F] transition-colors duration-300 group-hover:text-[#E5E4E2]">
                  OCAKBAŞI
                </span>
              </button>

              <p className="mt-5 max-w-md leading-7 text-white/50">
                Adana ocakbaşı kültürünü güçlü lezzetler, sıcak atmosfer ve
                özenli sunumla Kuşadası&apos;nda yaşayın.
              </p>
            </div>

            <div>
              <p className="text-xs font-bold tracking-[0.25em] text-[#B85C5F]">
                HIZLI MENÜ
              </p>

              <div className="mt-5 flex flex-col items-start gap-3">
                {quickLinks.map((link) => (
                  <button
                    key={link.target}
                    type="button"
                    onClick={() => scrollToSection(link.target)}
                    className="text-white/60 transition-colors duration-300 hover:text-[#B85C5F]"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold tracking-[0.25em] text-[#B85C5F]">
                BİZE ULAŞIN
              </p>

              <div className="mt-5 flex flex-col items-start gap-3">
                <a
                  href={restaurant.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 transition-colors duration-300 hover:text-[#B85C5F]"
                >
                  Instagram
                </a>

                <a
                  href="https://wa.me/905551112233"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 transition-colors duration-300 hover:text-[#B85C5F]"
                >
                  WhatsApp
                </a>

                <a
                  href="tel:+905551112233"
                  className="text-white/60 transition-colors duration-300 hover:text-[#B85C5F]"
                >
                  +90 555 111 22 33
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-5 pt-8 text-sm md:flex-row">
            <p className="text-center text-white/40 md:text-left">
              © {currentYear} 01 Adana Ocakbaşı. Tüm hakları saklıdır.
            </p>

            <motion.button
              type="button"
              onClick={() => scrollToSection("anasayfa")}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="group flex items-center gap-3 font-semibold text-white/50 transition-colors duration-300 hover:text-[#B85C5F]"
            >
              <span>Başa dön</span>

              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#7B1E22] bg-[#7B1E22]/10 text-[#B85C5F] shadow-[0_0_24px_rgba(123,30,34,0.15)] transition-all duration-300 group-hover:border-[#B85C5F] group-hover:bg-[#7B1E22]/25 group-hover:text-white">
                ↑
              </span>
            </motion.button>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}