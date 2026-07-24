"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

const googleMapsUrl =
  "https://www.google.com/maps/place/01+ADANA+OCAKBA%C5%9EI+MAR%C4%B0NA/@37.8749751,27.265338,19.75z/data=!4m35!1m26!4m25!1m19!2m2!1d27.2564224!2d37.84704!3m4!1m2!1d27.2688762!2d37.8763909!3s0x14beaeb328ae0cd3:0xe5a324aae13a6b9a!3m4!1m2!1d27.2646488!2d37.8732451!3s0x14bea94ba75c0085:0x8c7481c1fa423fee!3m4!1m2!1d27.2646488!2d37.8732451!3s0x14bea94ba75c0085:0x8c7481c1fa423fee!4e1!1m3!2m2!1d27.2628259!2d37.87476!3e0!3m7!1s0x14bea96c679e3403:0xe6be34cc23272fa8!8m2!3d37.8747558!4d27.2654008!9m1!1b1!16s%2Fg%2F11x03wm9l8?entry=ttu&g_ep=EgoyMDI2MDcyMS4wIKXMDSoASAFQAw%3D%3D";

const reviews = [
  {
    name: "Yusuf",
    initial: "Y",
    date: "7 ay önce",
    rating: 5,
    text: "Adana ve fındık lahmacun yedik. Yediğimiz en iyi kebap ve lahmacundu diyebilirim. Çok lezzetliydi, beğendik. Park sorunu yok. Akşam canlı müzik vardı. Atmosfer güzeldi.",
  },
  {
    name: "Anıl Kaçar",
    initial: "A",
    date: "1 ay önce",
    rating: 5,
    text: "Ankara’dan eşimle beraber tatilimiz sırasında keşfettiğimiz enfes lezzet durağı. Kesinlikle Adana’daki çoğu mekânı aratmayacak kadar başarılıydı.",
  },
  {
    name: "Yandex adlı yorumcu",
    initial: "Y",
    date: "5 ay önce",
    rating: 5,
    text: "Kuşadası’nda Adana’ya gitmeden Adana lezzetlerini en iyi tadabileceğiniz bir mekân. Özellikle karışık tepsiyi ve kuzu şişi tavsiye ederim.",
  },
  {
    name: "Mehmet E.",
    initial: "M",
    date: "Yakın zamanda",
    rating: 5,
    text: "Etlerin lezzeti, servis kalitesi ve marina atmosferi gerçekten çok güzeldi. Ailece keyifli vakit geçirdik, tekrar geleceğiz.",
  },
  {
    name: "Misafir Yorumu",
    initial: "01",
    date: "Google yorumu",
    rating: 5,
    text: "Mezeler taze, kebaplar lezzetli ve porsiyonlar doyurucuydu. Kuşadası’nda ocakbaşı denildiğinde tercih edilebilecek güzel bir mekân.",
  },
];

const ratingBars = [
  { star: 5, percentage: 82 },
  { star: 4, percentage: 11 },
  { star: 3, percentage: 4 },
  { star: 2, percentage: 2 },
  { star: 1, percentage: 1 },
];

function Stars({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} yıldız`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={index < rating ? "text-accent-soft" : "text-white/15"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function GoogleLogo() {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white text-xl font-black shadow-lg">
      <span className="bg-gradient-to-r from-blue-500 via-red-500 to-green-500 bg-clip-text text-transparent">
        G
      </span>
    </div>
  );
}

export default function Reviews() {
  const scrollingReviews = [...reviews, ...reviews];

  return (
    <section
      id="yorumlar"
      className="relative overflow-hidden bg-[#090909] py-24 text-white"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-accent/[0.055] blur-[150px]" />

      <div className="pointer-events-none absolute -bottom-52 -left-40 h-[30rem] w-[30rem] rounded-full bg-platinum/[0.025] blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-accent" />

                <p className="text-xs font-black tracking-[0.32em] text-accent-soft">
                  MİSAFİR YORUMLARI
                </p>
              </div>

              <h2 className="mt-5 text-4xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
                Misafirlerimizin
                <span className="block bg-gradient-to-r from-white via-white/55 to-white/20 bg-clip-text text-transparent">
                  deneyimleri.
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/45 sm:text-lg">
                Gerçek lezzet, iyi servis ve marina atmosferiyle ilgili
                misafirlerimizin Google üzerinden paylaştığı deneyimler.
              </p>
            </div>

            <div className="flex lg:justify-end">
              <motion.a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  y: -4,
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="group inline-flex items-center gap-4 rounded-full border border-white/10 bg-white/[0.035] px-5 py-3 backdrop-blur-xl transition-all duration-300 hover:border-accent/35 hover:bg-white/[0.06]"
              >
                <GoogleLogo />

                <div>
                  <p className="text-sm font-black text-white">
                    Google yorumlarını gör
                  </p>

                  <p className="mt-0.5 text-xs text-white/35">
                    Tüm değerlendirmeleri incele
                  </p>
                </div>

                <span className="ml-2 text-xl text-accent-soft transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </motion.a>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.68fr_1.32fr]">
          <Reveal delay={0.08}>
            <div className="relative h-full overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-7 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-9">
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent/[0.1] blur-[80px]" />

              <div className="relative">
                <div className="flex items-start justify-between gap-5">
                  <GoogleLogo />

                  <div className="rounded-full border border-green-400/15 bg-green-400/[0.07] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text
                                    text-green-300">
                    Google değerlendirmeleri
                  </div>
                </div>

                <div className="mt-9 flex items-end gap-4">
                  <p className="text-7xl font-black leading-none tracking-[-0.06em] sm:text-8xl">
                    4,5
                  </p>

                  <div className="pb-1">
                    <Stars />

                    <p className="mt-2 text-sm font-semibold text-white/40">
                      400+ değerlendirme
                    </p>
                  </div>
                </div>

                <div className="mt-9 space-y-3">
                  {ratingBars.map((rating) => (
                    <div
                      key={rating.star}
                      className="grid grid-cols-[20px_1fr_38px] items-center gap-3"
                    >
                      <span className="text-xs font-bold text-white/45">
                        {rating.star}
                      </span>

                      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{
                            width: `${rating.percentage}%`,
                          }}
                          viewport={{
                            once: true,
                            amount: 0.8,
                          }}
                          transition={{
                            duration: 0.9,
                            delay: 0.12 + (5 - rating.star) * 0.08,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="h-full rounded-full bg-gradient-to-r from-accent-dark via-accent to-accent-soft"
                        />
                      </div>

                      <span className="text-right text-xs font-semibold text-white/30">
                        %{rating.percentage}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-9 grid grid-cols-2 gap-3">
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="rounded-2xl border border-white/[0.07] bg-black/20 p-4"
                  >
                    <p className="text-xl font-black text-platinum">
                      400+
                    </p>

                    <p className="mt-1 text-xs leading-5 text-white/35">
                      Google değerlendirmesi
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -3 }}
                    className="rounded-2xl border border-white/[0.07] bg-black/20 p-4"
                  >
                    <p className="text-xl font-black text-platinum">
                      %90+
                    </p>

                    <p className="mt-1 text-xs leading-5 text-white/35">
                      Olumlu misafir deneyimi
                    </p>
                  </motion.div>
                </div>

                <div className="mt-7 flex items-center gap-3 border-t border-white/[0.07] pt-6">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-40" />

                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
                  </span>

                  <p className="text-xs font-semibold tracking-wide text-white/40">
                    Kuşadası Marina&apos;da misafirlerin favorilerinden
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.018] py-7 shadow-[0_30px_100px_rgba(0,0,0,0.28)]">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-[#0b0b0b] to-transparent sm:w-28" />

              <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-[#0b0b0b] to-transparent sm:w-28" />

              <div className="mb-6 flex items-center justify-between px-7">
                <div>
                  <p className="text-xs font-black tracking-[0.24em] text-accent-soft">
                    5 YILDIZLI DENEYİMLER
                  </p>

                  <p className="mt-2 text-sm text-white/35">
                    Kartların üzerine gelince akış durur
                  </p>
                </div>

                <div className="hidden items-center gap-2 sm:flex">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                </div>
              </div>

              <div className="group/marquee overflow-hidden">
                <motion.div
                  className="flex w-max gap-4 px-7 group-hover/marquee:[animation-play-state:paused]"
                  animate={{
                    x: ["0%", "-50%"],
                  }}
                  transition={{
                    duration: 38,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                >
                  {scrollingReviews.map((review, index) => (
                    <motion.article
                      key={`${review.name}-${index}`}
                      whileHover={{
                        y: -8,
                        rotateX: 2,
                        rotateY: -2,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                      className="group relative flex min-h-[310px] w-[310px] shrink-0 flex-col overflow-hidden rounded-[1.7rem] border border-white/[0.08] bg-[#111111] p-6 shadow-[0_22px_70px_rgba(0,0,0,0.28)] transition-all duration-300 hover:border-accent/35 hover:bg-[#151515] sm:w-[360px]"
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-accent/0 blur-3xl transition-all duration-500 group-hover:bg-accent/[0.12]" />

                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/0 to-transparent transition-all duration-500 group-hover:via-accent/55" />

                      <div className="relative flex items-start justify-between gap-4">
                        <Stars rating={review.rating} />

                        <span className="text-5xl font-black leading-none text-white/[0.055]">
                          “
                        </span>
                      </div>

                      <p className="relative mt-6 flex-1 text-sm leading-7 text-white/55 transition-colors duration-300 group-hover:text-white/70">
                        {review.text}
                      </p>                      <div className="relative mt-7 flex items-center justify-between gap-4 border-t border-white/[0.07] pt-5">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-gradient-to-br from-accent/20 to-platinum/[0.04] text-sm font-black text-accent-soft">
                            {review.initial}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-black text-white">
                              {review.name}
                            </p>

                            <p className="mt-1 text-xs text-white/30">
                              {review.date}
                            </p>
                          </div>
                        </div>

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
                          <span className="bg-gradient-to-r from-blue-500 via-red-500 to-green-500 bg-clip-text text-xs font-black text-transparent">
                            G
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              </div>

              <div className="mt-7 px-7">
                <motion.a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    y: -3,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="group flex w-full items-center justify-center gap-3 rounded-full border border-accent/25 bg-accent/[0.08] px-6 py-4 text-sm font-black text-accent-soft transition-all duration-300 hover:border-accent/45 hover:bg-accent/[0.14]"
                >
                  Google&apos;da tüm yorumları gör

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </motion.a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}