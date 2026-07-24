"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Hakkımızda", target: "hakkimizda" },
  { label: "Menü", target: "menu" },
  { label: "Galeri", target: "galeri" },
  { label: "İletişim", target: "iletisim" },
];

const directionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=37.874760006393274%2C27.262825876440708&destination_place_id=ChIJA0SeZ2ypvhQRqC8nI8w0vuY";

const DEFAULT_SCROLL_OFFSET = 90;

/*
  Negatif değer, hedef bölümün başlangıcından daha aşağıya kaydırır.
  -140 = İletişim bölümünün başlangıcından 140 px daha aşağı.
*/
const RESERVATION_SCROLL_OFFSET = -140;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("anasayfa");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sectionIds = [
        "anasayfa",
        "hakkimizda",
        "menu",
        "galeri",
        "iletisim",
      ];

      const scrollPosition = window.scrollY + 160;
      let currentSection = "anasayfa";

      sectionIds.forEach((sectionId) => {
        const section = document.getElementById(sectionId);

        if (!section) return;

        if (section.offsetTop <= scrollPosition) {
          currentSection = sectionId;
        }
      });

      setActiveSection(currentSection);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (
    sectionId: string,
    offset = DEFAULT_SCROLL_OFFSET
  ) => {
    const section = document.getElementById(sectionId);

    if (!section) return;

    const sectionTop =
      section.getBoundingClientRect().top +
      window.scrollY -
      offset;

    window.scrollTo({
      top: Math.max(sectionTop, 0),
      behavior: "smooth",
    });

    setMobileMenuOpen(false);
  };

  const scrollToReservation = () => {
    /*
      Contact bileşenine sonradan id="rezervasyon" eklenirse
      doğrudan o noktaya gider. Şimdilik iletisim bölümünde
      biraz aşağı kaydırarak çalışır.
    */
    const reservationSection = document.getElementById("rezervasyon");

    if (reservationSection) {
      const reservationTop =
        reservationSection.getBoundingClientRect().top +
        window.scrollY -
        DEFAULT_SCROLL_OFFSET;

      window.scrollTo({
        top: Math.max(reservationTop, 0),
        behavior: "smooth",
      });

      setMobileMenuOpen(false);
      return;
    }

    scrollToSection(
      "iletisim",
      RESERVATION_SCROLL_OFFSET
    );
  };

  return (
    <>
      <motion.header
        initial={{
          y: -90,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.85,
          delay: 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`fixed left-0 top-0 z-[100] w-full transition-all duration-500 ${
          scrolled
            ? "border-b border-white/[0.08] bg-[#070707]/85 shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
            : "border-b border-transparent bg-gradient-to-b from-black/65 to-transparent"
        }`}
      >
        <div
          className={`pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-[#7B1E22]/15 blur-[90px] transition-all duration-500 ${
            scrolled
              ? "h-24 w-[34rem] opacity-100"
              : "h-32 w-[42rem] opacity-60"
          }`}
        />

        <nav
          className={`relative mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 sm:px-6 ${
            scrolled ? "py-3" : "py-5"
          }`}
        >
          <button
            type="button"
            onClick={() => scrollToSection("anasayfa")}
            aria-label="Ana sayfaya dön"
            className="group relative z-10 flex flex-col items-start"
          >
            <span className="text-lg font-black leading-none tracking-[0.16em] text-white transition-colors duration-300 group-hover:text-[#E5E4E2] sm:text-xl">
              01 ADANA
            </span>

            <span className="mt-1 text-[9px] font-bold tracking-[0.38em] text-[#B85C5F] transition-colors duration-300 group-hover:text-[#E5E4E2]">
              OCAKBAŞI
            </span>

            <span className="absolute -bottom-2 left-0 h-px w-0 bg-gradient-to-r from-[#B85C5F] via-[#E5E4E2] to-transparent transition-all duration-500 group-hover:w-full" />
          </button>

          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.035] p-1.5 shadow-[0_14px_45px_rgba(0,0,0,0.25)] backdrop-blur-xl lg:flex">
            {navItems.map((item) => {
              const isActive =
                activeSection === item.target;

              return (
                <button
                  key={item.target}
                  type="button"
                  onClick={() =>
                    scrollToSection(item.target)
                  }
                  className={`group relative rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-white/55 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavbarItem"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                      className="absolute inset-0 rounded-full border border-[#7B1E22]/45 bg-[#7B1E22]/20 shadow-[inset_0_0_18px_rgba(123,30,34,0.12),0_0_18px_rgba(123,30,34,0.08)]"
                    />
                  )}

                  <span className="relative z-10">
                    {item.label}
                  </span>

                  {!isActive && (
                    <span className="absolute bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#B85C5F] to-transparent transition-all duration-300 group-hover:w-1/2" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <motion.a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-full border border-white/[0.12] bg-white/[0.045] px-5 text-sm font-semibold text-white/75 shadow-[0_12px_35px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300 hover:border-[#B85C5F]/50 hover:text-white"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="h-4 w-4 text-[#B85C5F]"
                >
                  <path
                    d="M12 21s7-5.25 7-12a7 7 0 1 0-14 0c0 6.75 7 12 7 12Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <circle
                    cx="12"
                    cy="9"
                    r="2.25"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                </svg>

                Yol Tarifi
              </span>

              <span className="absolute inset-0 -translate-x-[120%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
            </motion.a>

            <motion.button
              type="button"
              onClick={scrollToReservation}
              whileHover={{
                y: -2,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-full border border-[#B85C5F]/50 bg-[#7B1E22] px-5 text-sm font-bold text-white shadow-[0_12px_35px_rgba(123,30,34,0.22)] transition-all duration-300 hover:border-[#B85C5F] hover:bg-[#8E252A]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Rezervasyon

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>

              <span className="absolute inset-0 -translate-x-[120%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
            </motion.button>
          </div>

          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen(
                (current) => !current
              )
            }
            aria-label={
              mobileMenuOpen
                ? "Menüyü kapat"
                : "Menüyü aç"
            }
            aria-expanded={mobileMenuOpen}
            className="relative z-[120] flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-black/40 text-white backdrop-blur-xl transition-colors duration-300 hover:border-[#B85C5F]/60 md:hidden"
          >
            <div className="relative h-4 w-5">
              <motion.span
                animate={
                  mobileMenuOpen
                    ? {
                        rotate: 45,
                        y: 7,
                      }
                    : {
                        rotate: 0,
                        y: 0,
                      }
                }
                transition={{
                  duration: 0.25,
                }}
                className="absolute left-0 top-0 h-px w-5 bg-current"
              />

              <motion.span
                animate={
                  mobileMenuOpen
                    ? {
                        opacity: 0,
                        x: 8,
                      }
                    : {
                        opacity: 1,
                        x: 0,
                      }
                }
                transition={{
                  duration: 0.2,
                }}
                className="absolute left-0 top-[7px] h-px w-5 bg-current"
              />

              <motion.span
                animate={
                  mobileMenuOpen
                    ? {
                        rotate: -45,
                        y: -7,
                      }
                    : {
                        rotate: 0,
                        y: 0,
                      }
                }
                transition={{
                  duration: 0.25,
                }}
                className="absolute bottom-0 left-0 h-px w-5 bg-current"
              />
            </div>
          </button>
        </nav>

        <motion.div
          animate={{
            scaleX: scrolled ? 1 : 0,
            opacity: scrolled ? 1 : 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-transparent via-[#7B1E22]/65 to-transparent"
        />
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="fixed inset-0 z-[90] md:hidden"
          >
            <motion.button
              type="button"
              aria-label="Mobil menüyü kapat"
              onClick={() =>
                setMobileMenuOpen(false)
              }
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            <motion.div
              initial={{
                opacity: 0,
                y: -25,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -25,
                scale: 0.96,
              }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute left-4 right-4 top-24 overflow-hidden rounded-[2rem] border border-white/[0.1] bg-[#0A0A0A]/95 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.75)] backdrop-blur-2xl"
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#7B1E22]/20 blur-[80px]" />

              <div className="pointer-events-none absolute -bottom-28 -left-16 h-56 w-56 rounded-full bg-[#4A1113]/20 blur-[90px]" />

              <div className="relative">
                <p className="mb-5 px-3 text-[10px] font-bold tracking-[0.35em] text-[#B85C5F]">
                  MENÜ
                </p>

                <div className="flex flex-col gap-1">
                  {navItems.map(
                    (item, index) => {
                      const isActive =
                        activeSection ===
                        item.target;

                      return (
                        <motion.button
                          key={item.target}
                          type="button"
                          initial={{
                            opacity: 0,
                            x: -20,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            delay:
                              0.08 +
                              index * 0.06,
                            duration: 0.35,
                          }}
                          onClick={() =>
                            scrollToSection(
                              item.target
                            )
                          }
                          className={`group flex items-center justify-between rounded-2xl px-4 py-4 text-left text-lg font-semibold transition-all duration-300 ${
                            isActive
                              ? "border border-[#7B1E22]/45 bg-[#7B1E22]/20 text-white"
                              : "border border-transparent text-white/65 hover:border-white/[0.08] hover:bg-white/[0.04] hover:text-white"
                          }`}
                        >
                          <span>{item.label}</span>

                          <span
                            className={`transition-transform duration-300 group-hover:translate-x-1 ${
                              isActive
                                ? "text-[#B85C5F]"
                                : "text-white/25"
                            }`}
                          >
                            →
                          </span>
                        </motion.button>
                      );
                    }
                  )}
                </div>

                <div className="my-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <div className="grid grid-cols-2 gap-3">
                  <motion.a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{
                      scale: 0.97,
                    }}
                    className="flex min-h-12 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] px-4 text-sm font-semibold text-white/75"
                  >
                    Yol Tarifi
                  </motion.a>

                  <motion.button
                    type="button"
                    onClick={scrollToReservation}
                    whileTap={{
                      scale: 0.97,
                    }}
                    className="flex min-h-12 items-center justify-center rounded-full border border-[#B85C5F]/45 bg-[#7B1E22] px-4 text-sm font-bold text-white shadow-[0_12px_35px_rgba(123,30,34,0.2)]"
                  >
                    Rezervasyon
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}