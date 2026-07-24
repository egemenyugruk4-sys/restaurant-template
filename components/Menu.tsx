"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

import { restaurant } from "@/data/restaurant";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(
    restaurant.menu[0]?.category ?? ""
  );

  const activeMenu = useMemo(
    () =>
      restaurant.menu.find(
        (menuCategory) =>
          menuCategory.category === activeCategory
      ),
    [activeCategory]
  );

  const totalProductCount = useMemo(
    () =>
      restaurant.menu.reduce(
        (total, category) =>
          total + category.items.length,
        0
      ),
    []
  );

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <section
      id="menu"
      className="relative scroll-mt-24 overflow-hidden bg-[#0B0B0B] px-5 py-24 text-white sm:px-6 sm:py-28 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(123,30,34,0.12),transparent_34%)]" />

        <div className="absolute left-1/2 top-32 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[#7B1E22]/10 blur-[160px]" />

        <div className="absolute -bottom-56 -right-40 h-[34rem] w-[34rem] rounded-full bg-[#E5E4E2]/[0.025] blur-[150px]" />

        <div className="absolute -left-40 top-[45%] h-[28rem] w-[28rem] rounded-full bg-[#4A1113]/10 blur-[150px]" />

        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionTitle
            eyebrow="MENÜ"
            title="Ocakbaşından sofranıza"
            description="Özenle hazırlanan kebaplarımızı, ızgaralarımızı, mezelerimizi ve diğer lezzetlerimizi keşfedin."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 py-4 backdrop-blur-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#B85C5F]">
                Kategori
              </p>

              <p className="mt-2 text-2xl font-black text-white">
                {restaurant.menu.length}
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 py-4 backdrop-blur-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#B85C5F]">
                Toplam Lezzet
              </p>

              <p className="mt-2 text-2xl font-black text-white">
                {totalProductCount}
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 py-4 backdrop-blur-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#B85C5F]">
                Hazırlanış
              </p>

              <p className="mt-2 text-lg font-black text-white">
                Günlük & Taze
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative mt-10">
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-gradient-to-r from-[#0B0B0B] to-transparent sm:hidden" />

            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l from-[#0B0B0B] to-transparent sm:hidden" />

            <div className="overflow-x-auto px-1 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex min-w-max items-center gap-2 rounded-[1.4rem] border border-white/[0.07] bg-black/25 p-2 backdrop-blur-xl">
                {restaurant.menu.map(
                  (menuCategory, categoryIndex) => {
                    const isActive =
                      activeCategory ===
                      menuCategory.category;

                    return (
                      <motion.button
                        key={menuCategory.category}
                        type="button"
                        onClick={() =>
                          setActiveCategory(
                            menuCategory.category
                          )
                        }
                        whileHover={{
                          y: -2,
                        }}
                        whileTap={{
                          scale: 0.97,
                        }}
                        transition={{
                          duration: 0.2,
                        }}
                        className={`group relative min-h-12 overflow-hidden rounded-2xl px-5 py-3 text-sm font-bold transition-colors duration-300 ${
                          isActive
                            ? "text-white"
                            : "text-white/45 hover:text-white"
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="active-menu-category"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 32,
                            }}
                            className="absolute inset-0 rounded-2xl border border-[#B85C5F]/45 bg-[#7B1E22] shadow-[0_12px_35px_rgba(123,30,34,0.22)]"
                          />
                        )}

                        {!isActive && (
                          <span className="absolute inset-0 rounded-2xl border border-transparent bg-white/0 transition-all duration-300 group-hover:border-white/[0.08] group-hover:bg-white/[0.035]" />
                        )}

                        <span className="relative z-10 flex items-center gap-2.5">
                          <span
                            className={`text-[10px] font-black ${
                              isActive
                                ? "text-white/55"
                                : "text-[#B85C5F]/65"
                            }`}
                          >
                            {String(
                              categoryIndex + 1
                            ).padStart(2, "0")}
                          </span>

                          {menuCategory.category}
                        </span>
                      </motion.button>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          {activeMenu && (
            <motion.div
              key={activeMenu.category}
              initial={{
                opacity: 0,
                y: 28,
                filter: "blur(7px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                y: -18,
                filter: "blur(5px)",
              }}
              transition={{
                duration: 0.42,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-10"
            >
              <div className="mb-7 flex flex-col justify-between gap-5 border-b border-white/[0.07] pb-7 sm:flex-row sm:items-end">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="h-px w-9 bg-[#7B1E22]" />

                    <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#B85C5F]">
                      01 Adana Ocakbaşı
                    </p>
                  </div>

                  <h3 className="mt-3 text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
                    {activeMenu.category}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-white/[0.08] bg-white/[0.035] px-4 py-2 text-xs font-bold text-white/45">
                    {activeMenu.items.length} ürün
                  </span>

                  <span className="hidden rounded-full border border-[#7B1E22]/35 bg-[#7B1E22]/10 px-4 py-2 text-xs font-bold text-[#B85C5F] sm:inline-flex">
                    Taze hazırlanır
                  </span>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                {activeMenu.items.map(
                  (item, itemIndex) => (
                    <motion.article
                      key={`${activeMenu.category}-${item.name}`}
                      initial={{
                        opacity: 0,
                        y: 22,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.38,
                        delay: Math.min(
                          itemIndex * 0.05,
                          0.25
                        ),
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={{
                        y: -5,
                      }}
                      className="group relative overflow-hidden rounded-[1.75rem] border border-white/[0.075] bg-[#111111]/90 p-5 shadow-[0_20px_65px_rgba(0,0,0,0.24)] transition-all duration-500 hover:border-[#7B1E22]/45 hover:bg-[#141414] hover:shadow-[0_28px_85px_rgba(0,0,0,0.4)] sm:p-6"
                    >
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.025] via-transparent to-transparent" />

                      <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#7B1E22]/0 blur-[70px] transition-all duration-700 group-hover:bg-[#7B1E22]/15" />

                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B85C5F]/0 to-transparent transition-all duration-500 group-hover:via-[#B85C5F]/65" />

                      <motion.div
                        initial={{
                          x: "-140%",
                        }}
                        whileHover={{
                          x: "180%",
                        }}
                        transition={{
                          duration: 1,
                          ease: "easeInOut",
                        }}
                        className="pointer-events-none absolute inset-y-0 z-10 w-24 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"
                      />

                      <div className="relative z-20 flex h-full flex-col">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2.5">
                              <h4 className="text-lg font-black tracking-tight text-white transition-colors duration-300 group-hover:text-[#E5E4E2] sm:text-xl">
                                {item.name}
                              </h4>

                              {item.badge && (
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#B85C5F]/35 bg-[#7B1E22]/15 px-3 py-1 text-[9px] font-black uppercase tracking-[0.15em] text-[#B85C5F] shadow-[0_0_25px_rgba(123,30,34,0.12)]">
                                  <span className="h-1.5 w-1.5 rounded-full bg-[#B85C5F] shadow-[0_0_10px_rgba(184,92,95,0.75)]" />

                                  {item.badge}
                                </span>
                              )}
                            </div>

                            {item.description && (
                              <p className="mt-3 max-w-xl text-sm leading-6 text-white/40 transition-colors duration-300 group-hover:text-white/55">
                                {item.description}
                              </p>
                            )}
                          </div>

                          <motion.div
                            whileHover={{
                              scale: 1.04,
                            }}
                            className="shrink-0 rounded-2xl border border-[#E5E4E2]/10 bg-[#E5E4E2]/[0.055] px-3.5 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.22)] transition-all duration-300 group-hover:border-[#B85C5F]/35 group-hover:bg-[#7B1E22]/15"
                          >
                            <p className="whitespace-nowrap text-sm font-black text-[#E5E4E2] transition-colors duration-300 group-hover:text-[#B85C5F] sm:text-base">
                              {formatPrice(
                                item.price
                              )}
                            </p>
                          </motion.div>
                        </div>

                        <div className="mt-auto pt-6">
                          <div className="flex items-center gap-3">
                            <span className="h-px flex-1 bg-white/[0.06] transition-colors duration-300 group-hover:bg-[#7B1E22]/30" />

                            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-white/18 transition-colors duration-300 group-hover:text-[#B85C5F]/65">
                              Ocakbaşı lezzeti
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Reveal delay={0.15}>
          <div className="relative mt-10 overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-white/[0.025] px-5 py-5 backdrop-blur-md sm:px-6">
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#7B1E22]/15 blur-[55px]" />

            <div className="relative flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
              <div>
                <p className="text-sm font-bold text-white/65">
                  Menü ve fiyatlar değişiklik
                  gösterebilir.
                </p>

                <p className="mt-1 text-xs leading-5 text-white/35">
                  Güncel bilgi, ürün içeriği ve
                  alerjen detayları için işletmeyle
                  iletişime geçebilirsiniz.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const contactSection =
                    document.getElementById(
                      "iletisim"
                    );

                  if (!contactSection) return;

                  const targetTop =
                    contactSection.getBoundingClientRect()
                      .top +
                    window.scrollY -
                    90;

                  window.scrollTo({
                    top: targetTop,
                    behavior: "smooth",
                  });
                }}
                className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-[#B85C5F]/35 bg-[#7B1E22]/15 px-5 text-sm font-bold text-[#B85C5F] transition-all duration-300 hover:border-[#B85C5F]/60 hover:bg-[#7B1E22] hover:text-white"
              >
                Güncel bilgi al

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}