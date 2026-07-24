"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

type GalleryImage = {
  src: string;
  alt: string;
  title: string;
  category: string;
  size: "large" | "wide" | "tall" | "normal";
  position?: string;
};

const galleryImages: GalleryImage[] = [
  {
    src: "/gallery/gallery-01.jpg.png",
    alt: "Ateşten doğan dürüm lezzeti",
    title: "Ateşten Doğan Lezzet",
    category: "LEZZET",
    size: "large",
    position: "center",
  },
  {
    src: "/gallery/gallery-02.jpg.png",
    alt: "Kuşbaşı et tabağı",
    title: "Kuşbaşı Lezzeti",
    category: "KEBAP",
    size: "tall",
    position: "center",
  },
  {
    src: "/gallery/gallery-03.jpg.png",
    alt: "Karışık et ve meze sofrası",
    title: "Zengin Ocakbaşı Sofrası",
    category: "SOFRA",
    size: "normal",
    position: "center",
  },
  {
    src: "/gallery/gallery-04.jpg.png",
    alt: "Izgara tavuk ve salata tabağı",
    title: "Izgaradan Sofraya",
    category: "IZGARA",
    size: "wide",
    position: "center",
  },
  {
    src: "/gallery/gallery-05.jpg.png",
    alt: "Patlıcan kebabı",
    title: "Patlıcan Kebabı",
    category: "KEBAP",
    size: "normal",
    position: "center",
  },
  {
    src: "/gallery/gallery-06.jpg.png",
    alt: "İçli köfte sunumu",
    title: "İçli Köfte",
    category: "LEZZET",
    size: "normal",
    position: "center",
  },
  {
    src: "/gallery/gallery-07.jpg.png",
    alt: "Gavurdağı ve soğan salatası",
    title: "Sofranın Tazeliği",
    category: "SALATA",
    size: "normal",
    position: "center",
  },
];
const getGridClasses = (size: GalleryImage["size"]) => {
  switch (size) {
    case "large":
      return "md:col-span-2 md:row-span-2";
    case "wide":
      return "md:col-span-2";
    case "tall":
      return "md:row-span-2";
    default:
      return "";
  }
};

const getAspectClasses = (size: GalleryImage["size"]) => {
  switch (size) {
    case "large":
      return "min-h-[28rem] md:min-h-full";
    case "wide":
      return "min-h-[18rem] md:min-h-full";
    case "tall":
      return "min-h-[28rem] md:min-h-full";
    default:
      return "min-h-[18rem] md:min-h-full";
  }
};

export default function Gallery() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const selectedImage =
    selectedImageIndex !== null
      ? galleryImages[selectedImageIndex]
      : null;

  useEffect(() => {
    if (selectedImageIndex === null) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImageIndex(null);
      }

      if (event.key === "ArrowRight") {
        setSelectedImageIndex((current) => {
          if (current === null) return 0;
          return (current + 1) % galleryImages.length;
        });
      }

      if (event.key === "ArrowLeft") {
        setSelectedImageIndex((current) => {
          if (current === null) return galleryImages.length - 1;

          return (
            (current - 1 + galleryImages.length) %
            galleryImages.length
          );
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImageIndex]);

  const showPreviousImage = () => {
    setSelectedImageIndex((current) => {
      if (current === null) return galleryImages.length - 1;

      return (
        (current - 1 + galleryImages.length) %
        galleryImages.length
      );
    });
  };

  const showNextImage = () => {
    setSelectedImageIndex((current) => {
      if (current === null) return 0;

      return (current + 1) % galleryImages.length;
    });
  };

  return (
    <>
      <section
        id="galeri"
        className="relative scroll-mt-24 overflow-hidden bg-[#080808] px-5 py-24 text-white sm:px-6 sm:py-28 lg:py-32"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(123,30,34,0.12),transparent_34%)]" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_70%,rgba(229,228,226,0.035),transparent_30%)]" />

          <div className="absolute -left-48 top-20 h-[32rem] w-[32rem] rounded-full bg-[#7B1E22]/10 blur-[160px]" />

          <div className="absolute -bottom-52 -right-44 h-[32rem] w-[32rem] rounded-full bg-[#4A1113]/15 blur-[160px]" />

          <div className="absolute inset-0 opacity-[0.018] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:72px_72px]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <SectionTitle
              eyebrow="GALERİ"
              title="Mekândan Kareler"
              description="Ocakbaşının sıcaklığını, marina atmosferini ve sofralarımızın detaylarını keşfedin."
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-10 flex flex-col justify-between gap-5 border-y border-white/[0.07] py-5 sm:flex-row sm:items-center">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#7B1E22]/35 bg-[#7B1E22]/10 px-4 py-2 text-xs font-bold text-[#B85C5F]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#B85C5F] shadow-[0_0_12px_rgba(184,92,95,0.8)]" />
                  01 ADANA OCAKBAŞI
                </span>

                <span className="rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2 text-xs font-semibold text-white/40">
                  {galleryImages.length} kare
                </span>
              </div>

              <p className="max-w-md text-xs leading-5 text-white/30 sm:text-right">
                Fotoğrafları büyütmek için üzerlerine tıklayın.
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid auto-rows-[17rem] grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[16rem] lg:auto-rows-[18rem]">
            {galleryImages.map((image, index) => (
              <Reveal
                key={`${image.title}-${index}`}
                delay={Math.min(index * 0.07, 0.3)}
                className={`${getGridClasses(image.size)} h-full`}
              >
                <motion.button
                  type="button"
                  onClick={() => setSelectedImageIndex(index)}
                  whileHover={{
                    y: -6,
                  }}
                  whileTap={{
                    scale: 0.985,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`group relative h-full w-full overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#111111] text-left shadow-[0_20px_65px_rgba(0,0,0,0.3)] transition-all duration-500 hover:border-[#7B1E22]/55 hover:shadow-[0_30px_90px_rgba(0,0,0,0.5)] ${getAspectClasses(
                    image.size
                  )}`}
                  aria-label={`${image.title} fotoğrafını büyüt`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                    draggable={false}
                    className="h-full w-full select-none object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.09]"
                    style={{
                      objectPosition: image.position ?? "center",
                    }}
                  />

                  <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/5" />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/10 opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="pointer-events-none absolute -right-28 -top-28 h-64 w-64 rounded-full bg-[#7B1E22]/0 blur-[80px] transition-all duration-700 group-hover:bg-[#7B1E22]/25" />

                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B85C5F]/0 to-transparent transition-all duration-500 group-hover:via-[#B85C5F]/75" />

                  <motion.div
                    initial={{
                      x: "-150%",
                    }}
                    whileHover={{
                      x: "190%",
                    }}
                    transition={{
                      duration: 1.15,
                      ease: "easeInOut",
                    }}
                    className="pointer-events-none absolute inset-y-0 z-10 w-28 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
                  />

                  <div className="absolute left-5 top-5 z-20">
                    <span className="inline-flex rounded-full border border-white/[0.12] bg-black/35 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.22em] text-white/70 backdrop-blur-xl transition-colors duration-300 group-hover:border-[#B85C5F]/40 group-hover:text-[#B85C5F]">
                      {image.category}
                    </span>
                  </div>

                  <div className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-black/30 text-xl text-white/65 opacity-0 backdrop-blur-xl transition-all duration-500 group-hover:rotate-90 group-hover:border-[#B85C5F]/40 group-hover:bg-[#7B1E22]/20 group-hover:text-white group-hover:opacity-100">
                    +
                  </div>

                  <div className="absolute inset-x-0 bottom-0 z-20 p-5 sm:p-6">
                    <div className="translate-y-3 transition-transform duration-500 group-hover:translate-y-0">
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#B85C5F]">
                        01 ADANA
                      </p>

                      <h3 className="mt-2 text-xl font-black tracking-tight text-white sm:text-2xl">
                        {image.title}
                      </h3>

                      <div className="mt-4 flex items-center gap-3 opacity-0 transition-all duration-500 group-hover:opacity-100">
                        <span className="h-px w-10 bg-[#B85C5F]" />

                        <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-white/45">
                          Fotoğrafı İncele
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div className="relative mt-10 overflow-hidden rounded-[1.6rem] border border-white/[0.08] bg-white/[0.025] px-5 py-5 backdrop-blur-md sm:px-6">
              <div className="pointer-events-none absolute -right-16 -top-20 h-44 w-44 rounded-full bg-[#7B1E22]/15 blur-[70px]" />

              <div className="relative flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
                <div>
                  <p className="text-sm font-bold text-white/65">
                    Daha fazlası için bizi Instagram&apos;da takip edin.
                  </p>

                  <p className="mt-1 text-xs leading-5 text-white/35">
                    Güncel lezzetleri, etkinlikleri ve mekândan yeni
                    kareleri keşfedin.
                  </p>
                </div>

                <a
                  href="https://www.instagram.com/01adanamarina?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-[#B85C5F]/35 bg-[#7B1E22]/15 px-5 text-sm font-bold text-[#B85C5F] transition-all duration-300 hover:border-[#B85C5F]/60 hover:bg-[#7B1E22] hover:text-white"
                >
                  Instagram

                  <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && selectedImageIndex !== null && (
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
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 px-4 py-6 backdrop-blur-2xl sm:px-8"
          >
            <button
              type="button"
              onClick={() => setSelectedImageIndex(null)}
              aria-label="Galeriyi kapat"
              className="absolute inset-0 cursor-default"
            />

            <motion.div
              key={selectedImageIndex}
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 25,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 15,
                filter: "blur(8px)",
              }}
              transition={{
                duration: 0.42,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative z-10 flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-white/[0.1] bg-[#0B0B0B] shadow-[0_40px_140px_rgba(0,0,0,0.8)]"
            >
              <div className="relative min-h-0 flex-1 overflow-hidden bg-black">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="h-full max-h-[75vh] w-full object-contain"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15" />

                <button
                  type="button"
                  onClick={() => setSelectedImageIndex(null)}
                  aria-label="Fotoğrafı kapat"
                  className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.15] bg-black/45 text-xl text-white/70 backdrop-blur-xl transition-all duration-300 hover:rotate-90 hover:border-[#B85C5F]/50 hover:bg-[#7B1E22]/30 hover:text-white"
                >
                  ×
                </button>

                <button
                  type="button"
                  onClick={showPreviousImage}
                  aria-label="Önceki fotoğraf"
                  className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.15] bg-black/40 text-xl text-white/70 backdrop-blur-xl transition-all duration-300 hover:border-[#B85C5F]/50 hover:bg-[#7B1E22]/30 hover:text-white sm:left-5"
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={showNextImage}
                  aria-label="Sonraki fotoğraf"
                  className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.15] bg-black/40 text-xl text-white/70 backdrop-blur-xl transition-all duration-300 hover:border-[#B85C5F]/50 hover:bg-[#7B1E22]/30 hover:text-white sm:right-5"
                >
                  →
                </button>
              </div>

              <div className="flex flex-col justify-between gap-4 border-t border-white/[0.08] px-5 py-5 sm:flex-row sm:items-center sm:px-7">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#B85C5F]">
                    {selectedImage.category}
                  </p>

                  <h3 className="mt-2 text-xl font-black text-white sm:text-2xl">
                    {selectedImage.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-white/35">
                    {String(selectedImageIndex + 1).padStart(2, "0")}
                  </span>

                  <span className="h-px w-10 bg-white/10" />

                  <span className="text-xs font-bold text-white/20">
                    {String(galleryImages.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}