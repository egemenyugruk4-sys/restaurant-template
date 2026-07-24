"use client";

import { motion } from "framer-motion";
import { restaurant } from "@/data/restaurant";
import Reveal from "./Reveal";

const mapEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3149.381499335128!2d27.262825876440708!3d37.874760006393274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bea96c679e3403%3A0xe6be34cc23272fa8!2s01%20ADANA%20OCAKBA%C5%9EI%20MAR%C4%B0NA!5e0!3m2!1str!2str!4v1784879098836!5m2!1str!2str";

const fallbackDirectionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=37.874760006393274%2C27.262825876440708&destination_place_id=ChIJA0SeZ2ypvhQRqC8nI8w0vuY";

type IconName = "location" | "clock" | "phone" | "instagram";

type ContactItem = {
  label: string;
  value: string;
  icon: IconName;
  href?: string;
  external?: boolean;
};

function ContactIcon({ name }: { name: IconName }) {
  const commonProps = {
    className: "h-5 w-5",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "location") {
    return (
      <svg {...commonProps}>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    );
  }

  if (name === "clock") {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  if (name === "phone") {
    return (
      <svg {...commonProps}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.8 12.8 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export default function Contact() {
  const contact = restaurant.contact;

  const directionsUrl =
    contact.maps && contact.maps !== "#" ? contact.maps : fallbackDirectionsUrl;

  const instagramUrl =
    contact.instagram && contact.instagram !== "#"
      ? contact.instagram
      : "https://www.instagram.com/01adanamarina/";

  const instagramDisplay = instagramUrl
    .replace("https://www.instagram.com/", "@")
    .replace("http://www.instagram.com/", "@")
    .replace(/\/+$/, "");

  const contactItems: ContactItem[] = [
    {
      label: "Adres",
      value: contact.address,
      icon: "location",
      href: directionsUrl,
      external: true,
    },
    {
      label: "Çalışma Saatleri",
      value: contact.workingHours,
      icon: "clock",
    },
    {
      label: "Telefon",
      value: contact.phoneDisplay,
      icon: "phone",
      href: contact.phoneLink,
    },
    {
      label: "Instagram",
      value: instagramDisplay,
      icon: "instagram",
      href: instagramUrl,
      external: true,
    },
  ];

  return (
    <section
      id="iletisim"
      className="relative isolate overflow-hidden border-t border-white/[0.08] bg-[#080808] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-12 lg:py-40"
    >
      {/* Arka plan ışıkları */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute -left-48 top-32 h-[460px] w-[460px] rounded-full bg-[#7B1E22]/15 blur-[150px]" />

        <div className="absolute -right-52 bottom-0 h-[520px] w-[520px] rounded-full bg-[#B85C5F]/10 blur-[170px]" />

        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Başlık */}
        <div className="grid gap-10 border-b border-white/[0.1] pb-14 lg:grid-cols-[0.8fr_2fr] lg:items-end lg:gap-20 lg:pb-20">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-[#B85C5F]" />

              <span className="text-[11px] font-medium uppercase tracking-[0.36em] text-[#ccccca] sm:text-xs">
                İletişim ve konum
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="max-w-5xl text-balance text-4xl font-medium uppercase leading-[0.98] tracking-[-0.045em] text-[#f5f5f4] sm:text-6xl lg:text-[5.3rem]">
              Bize ulaşın,
              <span className="block text-white/25">
                soframıza ortak olun.
              </span>
            </h2>
          </Reveal>
        </div>

        {/* Ana içerik */}
        <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-[0.82fr_1.18fr]">
          {/* Sol taraf */}
          <div className="flex flex-col gap-6">
            <div className="grid gap-5 sm:grid-cols-2">
              {contactItems.map((item, index) => {
                const content = (
                  <motion.div
                    whileHover={{
                      y: -6,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group relative h-full min-h-[190px] overflow-hidden border border-white/[0.09] bg-white/[0.025] p-7 backdrop-blur-xl transition-all duration-500 hover:border-[#B85C5F]/45 hover:bg-white/[0.045]"
                  >
                    <div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-[#7B1E22]/10 blur-3xl transition-all duration-500 group-hover:bg-[#7B1E22]/25" />

                    <div className="relative flex h-full flex-col">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-black/25 text-[#B85C5F] transition-colors duration-300 group-hover:border-[#B85C5F]/40 group-hover:text-[#e5e4e2]">
                        <ContactIcon name={item.icon} />
                      </div>

                      <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.28em] text-[#B85C5F]">
                        {item.label}
                      </p>

                      <p className="mt-3 text-sm font-medium leading-7 text-white/70 sm:text-base">
                        {item.value}
                      </p>

                      {item.href ? (
                        <div className="mt-auto flex items-center justify-end pt-5 text-white/25 transition-colors duration-300 group-hover:text-[#B85C5F]">
                          <ArrowIcon />
                        </div>
                      ) : null}
                    </div>
                  </motion.div>
                );

                return (
                  <Reveal key={item.label} delay={index * 0.07}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        className="block h-full"
                        aria-label={`${item.label}: ${item.value}`}
                      >
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </Reveal>
                );
              })}
            </div>

            {/* Rezervasyon kartı */}
            <Reveal delay={0.25}>
              <div className="relative overflow-hidden border border-white/[0.09] bg-[#101010] p-7 sm:p-8">
                <div className="pointer-events-none absolute -bottom-28 -right-24 h-64 w-64 rounded-full bg-[#7B1E22]/15 blur-[90px]" />

                <div className="relative">
                  <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#B85C5F]">
                    Rezervasyon
                  </p>

                  <h3 className="mt-4 max-w-sm text-2xl font-medium leading-tight tracking-[-0.025em] text-[#f5f5f4] sm:text-3xl">
                    Masanızı şimdiden ayırtın.
                  </h3>

                  <p className="mt-4 max-w-md text-sm leading-7 text-white/45">
                    Rezervasyon ve bilgi için telefon veya WhatsApp üzerinden
                    bizimle doğrudan iletişime geçebilirsiniz.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <motion.a
                      href={contact.phoneLink}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative inline-flex flex-1 items-center justify-center gap-3 overflow-hidden rounded-full bg-[#e5e4e2] px-6 py-4 text-sm font-semibold text-black transition-colors duration-300 hover:bg-white"
                    >
                      <span className="relative z-10">Telefon Et</span>

                      <span className="relative z-10">
                        <ArrowIcon />
                      </span>

                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#B85C5F]/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    </motion.a>

                    <motion.a
                      href={contact.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      className="group inline-flex flex-1 items-center justify-center gap-3 rounded-full border border-white/[0.14] bg-white/[0.025] px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-[#B85C5F]/50 hover:bg-[#7B1E22]/10"
                    >
                      WhatsApp
                      <ArrowIcon />
                    </motion.a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Harita */}
          <Reveal delay={0.12}>
            <motion.div
              initial="rest"
              animate="rest"
              whileHover="hover"
              className="group relative min-h-[610px] overflow-hidden border border-white/[0.09] bg-[#101010] p-2 shadow-[0_35px_120px_rgba(0,0,0,0.55)]"
            >
              <div className="relative min-h-[594px] overflow-hidden bg-[#111]">
                <motion.div
                  variants={{
                    rest: { scale: 1.01 },
                    hover: { scale: 1.035 },
                  }}
                  transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-0"
                >
                  <iframe
                    src={mapEmbedUrl}
                    title={`${restaurant.name} Google Maps konumu`}
                    className="h-full w-full grayscale transition-all duration-700 group-hover:grayscale-0"
                    style={{
                      border: 0,
                      filter:
                        "brightness(0.58) contrast(1.12) saturate(0.6)",
                    }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </motion.div>

                {/* Harita karartmaları */}
                <div className="pointer-events-none absolute inset-0 bg-black/20 transition-opacity duration-700 group-hover:opacity-0" />

                <div className="pointer-events-none absolute inset-0 bg-[#4A1113]/10 mix-blend-color transition-opacity duration-700 group-hover:opacity-0" />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[330px] bg-gradient-to-t from-black via-black/80 to-transparent" />

                <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 to-transparent" />

                <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/35 to-transparent" />

                {/* Harita üst kart */}
                <div className="pointer-events-none absolute left-5 top-5 z-20 sm:left-7 sm:top-7">
                  <motion.div
                    variants={{
                      rest: { y: 0 },
                      hover: { y: -3 },
                    }}
                    transition={{ duration: 0.3 }}
                    className="border border-white/[0.1] bg-black/75 px-5 py-4 shadow-2xl backdrop-blur-xl"
                  >
                    <div className="flex items-center gap-3">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B85C5F] opacity-50" />

                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#B85C5F]" />
                      </span>

                      <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#B85C5F]">
                        Konumumuz
                      </p>
                    </div>

                    <p className="mt-3 text-base font-semibold text-white sm:text-lg">
                      {restaurant.name}
                    </p>

                    <p className="mt-1 text-xs uppercase tracking-[0.15em] text-white/40">
                      {restaurant.location}
                    </p>
                  </motion.div>
                </div>

                {/* Hover etiketi */}
                <motion.div
                  variants={{
                    rest: {
                      opacity: 0,
                      scale: 0.94,
                    },
                    hover: {
                      opacity: 1,
                      scale: 1,
                    },
                  }}
                  transition={{ duration: 0.35 }}
                  className="pointer-events-none absolute right-6 top-6 z-20 hidden rounded-full border border-[#B85C5F]/30 bg-black/70 px-4 py-3 text-[9px] font-medium uppercase tracking-[0.24em] text-[#e5e4e2] backdrop-blur-xl sm:block"
                >
                  Haritayı incele
                </motion.div>

                {/* Alt içerik */}
                <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-8">
                  <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-sm">
                      <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#B85C5F]">
                        Bizi ziyaret edin
                      </p>

                      <h3 className="mt-4 text-3xl font-medium uppercase leading-[1] tracking-[-0.035em] text-white sm:text-5xl">
                        Kuşadası
                        <span className="block text-white/30">Marina</span>
                      </h3>

                      <p className="mt-5 text-sm leading-7 text-white/50">
                        Haritayı inceleyin veya bulunduğunuz konumdan doğrudan
                        yol tarifi oluşturun.
                      </p>
                    </div>

                    <motion.a
                      href={directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative inline-flex shrink-0 items-center justify-center gap-3 overflow-hidden rounded-full bg-[#e5e4e2] px-7 py-4 text-sm font-semibold text-black transition-colors duration-300 hover:bg-white"
                    >
                      <span className="relative z-10">Yol Tarifi Al</span>

                      <span className="relative z-10">
                        <ArrowIcon />
                      </span>

                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#B85C5F]/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    </motion.a>
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-0 z-30 ring-1 ring-inset ring-white/[0.06] transition-all duration-500 group-hover:ring-[#B85C5F]/30" />
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}