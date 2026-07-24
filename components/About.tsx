"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { restaurant } from "@/data/restaurant";

const features = [
  {
    number: "01",
    title: "Köz Ateşi",
    description:
      "Lezzetin karakterini gerçek ocakbaşı ateşi ve doğru pişirme teknikleri belirler.",
  },
  {
    number: "02",
    title: "Usta Dokunuşu",
    description:
      "Her tabak, geleneksel Adana mutfağının güçlü ve kendine özgü lezzet anlayışıyla hazırlanır.",
  },
  {
    number: "03",
    title: "Marina Atmosferi",
    description:
      "Kuşadası Marina’nın seçkin atmosferinde keyifli ve unutulmaz bir sofra deneyimi.",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const visualY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section
      ref={sectionRef}
      id="hakkimizda"
      className="relative isolate overflow-hidden border-t border-white/[0.08] bg-[#080808] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-12 lg:py-40"
    >
      {/* Arka plan efektleri */}
      <motion.div
        style={{ y: backgroundY }}
        className="pointer-events-none absolute inset-0 -z-20"
      >
        <div className="absolute -left-44 top-20 h-[420px] w-[420px] rounded-full bg-[#7B1E22]/15 blur-[130px]" />

        <div className="absolute -right-52 bottom-0 h-[480px] w-[480px] rounded-full bg-[#B85C5F]/10 blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </motion.div>

      <div className="mx-auto max-w-7xl">
        {/* Üst başlık */}
        <div className="grid gap-10 border-b border-white/[0.1] pb-14 lg:grid-cols-[0.8fr_2fr] lg:items-end lg:gap-20 lg:pb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4"
          >
            <span className="h-px w-10 bg-[#B85C5F]" />

            <span className="text-[11px] font-medium tracking-[0.36em] text-[#ccccca] sm:text-xs">
              HAKKIMIZDA
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: 1,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-5xl text-balance text-4xl font-medium uppercase leading-[0.98] tracking-[-0.045em] text-[#f5f5f4] sm:text-6xl lg:text-[5.5rem]"
          >
            {restaurant.about.title}
          </motion.h2>
        </div>

        {/* Ana içerik */}
        <div className="grid gap-16 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24 lg:pt-24">
          {/* Sol görsel alan */}
          <motion.div
            style={{ y: visualY }}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            <div className="relative min-h-[520px] overflow-hidden border border-white/[0.1] bg-[#101010] sm:min-h-[650px]">
              {/* Fotoğraf gelene kadar görünen tasarım */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(184,92,95,0.22),transparent_34%),radial-gradient(circle_at_75%_80%,rgba(123,30,34,0.28),transparent_42%),linear-gradient(145deg,#171717,#080808_70%)]" />

              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(125deg, transparent 0px, transparent 12px, rgba(255,255,255,0.35) 13px)",
                }}
              />

              {/* Dekoratif büyük 01 */}
              <span className="pointer-events-none absolute -bottom-10 -right-3 select-none text-[13rem] font-black leading-none tracking-[-0.1em] text-white/[0.035] sm:text-[18rem]">
                01
              </span>

              {/* Ateş simgesi */}
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    scale: [1, 1.04, 1],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex h-28 w-28 items-center justify-center rounded-full border border-white/[0.1] bg-black/20 backdrop-blur-md"
                >
                  <svg
                    viewBox="0 0 64 64"
                    className="h-12 w-12 text-[#B85C5F]"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M35.5 5C37 15 29 18.5 30.5 27C31.5 32.5 36.5 34 38 39C40 45.5 35.5 52 29 52C20.5 52 15 45.5 16 37.5C17 29.5 22.5 25.5 26 19C28.5 14.5 30 9.5 29 5C35 10 33.5 16 35.5 19C39 15 40 10 35.5 5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M29.5 30C28 35 23.5 37.5 24 43C24.5 47 27.5 49.5 31 49.5C35 49.5 38 46.5 37.5 42.5C37 38.5 33.5 36.5 32 33C31 30.5 31.5 27.5 32.5 25C30.5 26.5 29.5 28 29.5 30Z"
                      fill="currentColor"
                      opacity="0.55"
                    />
                  </svg>
                </motion.div>

                <span className="mt-6 text-center text-[10px] font-medium uppercase tracking-[0.3em] text-white/35">
                  Ateşten sofraya
                </span>
              </div>

              {/* Üst etiket */}
              <div className="absolute left-5 top-5 border border-white/[0.1] bg-black/25 px-4 py-3 backdrop-blur-md sm:left-8 sm:top-8">
                <p className="text-[9px] uppercase tracking-[0.32em] text-white/40">
                  Geleneksel
                </p>

                <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-[#e5e4e2]">
                  Adana Ocakbaşı
                </p>
              </div>

              {/* Alt konum */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between border-t border-white/[0.1] pt-5 sm:bottom-8 sm:left-8 sm:right-8">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/35">
                    Konum
                  </p>

                  <p className="mt-2 text-sm uppercase tracking-[0.16em] text-white/80">
                    Kuşadası Marina
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#B85C5F]" />
                </div>
              </div>
            </div>

            {/* Kenar yazısı */}
            <div className="absolute -left-8 bottom-16 hidden -rotate-90 text-[9px] uppercase tracking-[0.45em] text-white/25 xl:block">
              01 Adana Ocakbaşı
            </div>
          </motion.div>

          {/* Sağ metin alanı */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.9,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#B85C5F]">
                Lezzetin hikâyesi
              </p>

              <p className="mt-7 max-w-xl text-lg leading-8 text-white/60 sm:text-xl sm:leading-9">
                {restaurant.about.description}
              </p>

              <p className="mt-7 max-w-xl text-base leading-8 text-white/40">
                Geleneksel ocakbaşı kültürünü güçlü tatlar, özenli
                sunumlar ve Marina atmosferiyle bir araya getiriyoruz.
              </p>
            </motion.div>

            {/* Özellikler */}
            <div className="mt-14 border-t border-white/[0.1]">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.number}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{
                    duration: 0.75,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group grid grid-cols-[45px_1fr] gap-4 border-b border-white/[0.1] py-7 sm:grid-cols-[55px_150px_1fr] sm:items-start sm:gap-6"
                >
                  <span className="pt-1 text-[10px] tracking-[0.2em] text-[#B85C5F]">
                    {feature.number}
                  </span>

                  <h3 className="text-sm font-medium uppercase tracking-[0.12em] text-[#e5e4e2] transition-colors duration-300 group-hover:text-[#B85C5F]">
                    {feature.title}
                  </h3>

                  <p className="col-start-2 text-sm leading-7 text-white/40 sm:col-start-auto">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Alt imza */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-10 flex items-center gap-5"
            >
              <span className="h-px flex-1 bg-gradient-to-r from-[#7B1E22] to-transparent" />

              <span className="text-[9px] uppercase tracking-[0.32em] text-white/30">
                Gerçek kebap lezzeti
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}