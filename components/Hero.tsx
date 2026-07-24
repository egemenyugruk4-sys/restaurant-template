"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  type PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { restaurant } from "@/data/restaurant";

type TrailPoint = {
  x: number;
  y: number;
};

type Spark = {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  life: number;
  maxLife: number;
  size: number;
};

const TRAIL_LENGTH = 24;
const INTRO_DURATION = 2400;

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const [introVisible, setIntroVisible] = useState(true);
  const [introLeaving, setIntroLeaving] = useState(false);

  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const trailRef = useRef<TrailPoint[]>(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: 0, y: 0 }))
  );
  const sparksRef = useRef<Spark[]>([]);
  const lastSparkPositionRef = useRef({ x: 0, y: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, {
    stiffness: 52,
    damping: 20,
    mass: 0.85,
  });

  const smoothMouseY = useSpring(mouseY, {
    stiffness: 52,
    damping: 20,
    mass: 0.85,
  });

  const glowX = useTransform(smoothMouseX, [-700, 700], [-70, 70]);
  const glowY = useTransform(smoothMouseY, [-500, 500], [-45, 45]);
  const imageX = useTransform(smoothMouseX, [-700, 700], [-8, 8]);
  const imageY = useTransform(smoothMouseY, [-500, 500], [-5, 5]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.14]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.65, 1],
    [1, 0.58, 0]
  );
  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.18],
    [1, 0]
  );

  const heroData = restaurant.hero;
  const location = restaurant.location ?? "Kuşadası Marina";
  const instagram = restaurant.contact?.instagram ?? "#";

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const leavingTimer = window.setTimeout(() => {
      setIntroLeaving(true);
    }, INTRO_DURATION - 650);

    const removeTimer = window.setTimeout(() => {
      setIntroVisible(false);
      document.body.style.overflow = previousOverflow;
    }, INTRO_DURATION);

    return () => {
      window.clearTimeout(leavingTimer);
      window.clearTimeout(removeTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;

    if (!canvas || !hero) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const resizeCanvas = () => {
      const rect = hero.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = rect.width * pixelRatio;
      canvas.height = rect.height * pixelRatio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const createSpark = (x: number, y: number) => {
      if (sparksRef.current.length > 72) sparksRef.current.shift();

      const angle = Math.random() * Math.PI * 2;
      const speed = 0.25 + Math.random() * 1.25;
      const maxLife = 24 + Math.random() * 28;

      sparksRef.current.push({
        x,
        y,
        velocityX: Math.cos(angle) * speed,
        velocityY: Math.sin(angle) * speed - 0.35,
        life: maxLife,
        maxLife,
        size: 0.7 + Math.random() * 1.7,
      });
    };

    const drawTrail = () => {
      const points = trailRef.current;
      const pointer = pointerRef.current;

      if (pointer.active) {
        points[0].x += (pointer.x - points[0].x) * 0.36;
        points[0].y += (pointer.y - points[0].y) * 0.36;
      }

      for (let index = 1; index < points.length; index += 1) {
        const current = points[index];
        const previous = points[index - 1];
        current.x += (previous.x - current.x) * 0.3;
        current.y += (previous.y - current.y) * 0.3;
      }

      if (pointer.active) {
        context.save();
        context.lineCap = "round";
        context.lineJoin = "round";

        for (let index = points.length - 1; index > 0; index -= 1) {
          const point = points[index];
          const nextPoint = points[index - 1];
          const progress = 1 - index / points.length;
          const gradient = context.createLinearGradient(
            point.x,
            point.y,
            nextPoint.x,
            nextPoint.y
          );

          gradient.addColorStop(0, `rgba(74,17,19,${progress * 0.06})`);
          gradient.addColorStop(0.48, `rgba(123,30,34,${progress * 0.5})`);
          gradient.addColorStop(1, `rgba(229,228,226,${progress * 0.72})`);

          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(nextPoint.x, nextPoint.y);
          context.lineWidth = 0.55 + progress * 2.6;
          context.strokeStyle = gradient;
          context.shadowColor = "rgba(123,30,34,0.72)";
          context.shadowBlur = 3 + progress * 13;
          context.stroke();
        }

        const head = points[0];
        const glow = context.createRadialGradient(
          head.x,
          head.y,
          0,
          head.x,
          head.y,
          17
        );

        glow.addColorStop(0, "rgba(255,255,255,1)");
        glow.addColorStop(0.18, "rgba(229,228,226,0.92)");
        glow.addColorStop(0.46, "rgba(184,92,95,0.62)");
        glow.addColorStop(1, "rgba(123,30,34,0)");

        context.beginPath();
        context.arc(head.x, head.y, 17, 0, Math.PI * 2);
        context.fillStyle = glow;
        context.fill();

        const distance = Math.hypot(
          head.x - lastSparkPositionRef.current.x,
          head.y - lastSparkPositionRef.current.y
        );

        if (distance > 10) {
          const count = Math.random() > 0.35 ? 2 : 1;
          for (let index = 0; index < count; index += 1) {
            createSpark(
              head.x + (Math.random() - 0.5) * 8,
              head.y + (Math.random() - 0.5) * 8
            );
          }
          lastSparkPositionRef.current = { x: head.x, y: head.y };
        }

        context.restore();
      }

      context.save();
      sparksRef.current = sparksRef.current.filter((spark) => spark.life > 0);

      sparksRef.current.forEach((spark) => {
        spark.x += spark.velocityX;
        spark.y += spark.velocityY;
        spark.velocityX *= 0.985;
        spark.velocityY = spark.velocityY * 0.985 - 0.002;
        spark.life -= 1;

        const opacity = spark.life / spark.maxLife;
        context.beginPath();
        context.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
        context.fillStyle = `rgba(229,228,226,${opacity * 0.72})`;
        context.shadowColor = "rgba(123,30,34,0.9)";
        context.shadowBlur = 8;
        context.fill();
      });

      context.restore();
    };

    const animateCanvas = () => {
      const rect = hero.getBoundingClientRect();
      context.clearRect(0, 0, rect.width, rect.height);
      drawTrail();
      animationFrameRef.current = requestAnimationFrame(animateCanvas);
    };

    resizeCanvas();
    animateCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const setTrailPosition = (
    event: PointerEvent<HTMLElement>,
    resetTrail = false
  ) => {
    const hero = heroRef.current;
    if (!hero) return;

    const rect = hero.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    pointerRef.current = { x, y, active: true };
    mouseX.set(event.clientX - window.innerWidth / 2);
    mouseY.set(event.clientY - window.innerHeight / 2);

    if (resetTrail) {
      trailRef.current.forEach((point) => {
        point.x = x;
        point.y = y;
      });
      lastSparkPositionRef.current = { x, y };
    }
  };

  const handlePointerEnter = (event: PointerEvent<HTMLElement>) => {
    setTrailPosition(event, true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    setTrailPosition(event);
  };

  const handlePointerLeave = () => {
    pointerRef.current.active = false;
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollToSection = (sectionId: string, offset = 90) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const top = section.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <>
      {introVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: introLeaving ? 0 : 1,
            scale: introLeaving ? 1.08 : 1,
            filter: introLeaving ? "blur(18px)" : "blur(0px)",
          }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] overflow-hidden bg-[#050505]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(123,30,34,.22),transparent_60%)]" />

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.03]"
          />

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#7B1E22]/10"
          />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          >
            <motion.p
              animate={{ letterSpacing: [".42em", ".58em", ".42em"] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="text-[10px] font-bold text-[#B85C5F] sm:text-xs"
            >
              KUŞADASI MARİNA
            </motion.p>

            <motion.h1
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mt-6 bg-gradient-to-r from-white via-[#e5e4e2] to-white bg-clip-text text-5xl font-black tracking-tight text-transparent sm:text-6xl md:text-8xl"
            >
              01 ADANA
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 180 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-8 h-px bg-gradient-to-r from-transparent via-[#B85C5F] to-transparent"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-7 text-[10px] tracking-[.28em] text-white/40 sm:text-sm sm:tracking-[.35em]"
            >
              OCAKBAŞI • RESTAURANT
            </motion.p>
          </motion.div>

          <motion.div
            animate={{ opacity: [0.15, 0.35, 0.15], scale: [1, 1.2, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute bottom-[-180px] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#7B1E22] blur-[170px]"
          />
        </motion.div>
      )}

      <section
        ref={heroRef}
        id="anasayfa"
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#070707] px-5 pb-20 pt-28 sm:px-6 lg:px-10"
      >
        <motion.div
          style={{
            y: backgroundY,
            scale: backgroundScale,
            x: imageX,
            translateY: imageY,
          }}
          className="absolute -inset-[8%]"
        >
          <img
            src={heroData.image}
            alt={restaurant.name}
            draggable={false}
            className="h-full w-full select-none object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-black/65 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,transparent_0%,rgba(0,0,0,.08)_38%,rgba(0,0,0,.72)_100%)]" />

        <motion.div
          style={{ x: glowX, y: glowY }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7B1E22]/[0.08] blur-[180px]"
        />

        <div className="pointer-events-none absolute right-[-220px] top-[-180px] h-[520px] w-[520px] rounded-full bg-[#7B1E22]/[0.08] blur-[170px]" />
        <div className="pointer-events-none absolute bottom-[-200px] left-[-160px] h-[460px] w-[460px] rounded-full bg-white/[0.04] blur-[180px]" />

        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 z-[2] hidden md:block"
        />

        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-20 mx-auto w-full max-w-7xl"
        >
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{
                opacity: introVisible ? 0 : 1,
                y: introVisible ? 24 : 0,
              }}
              transition={{
                duration: 0.75,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-7 flex items-center gap-4"
            >
              <span className="h-px w-10 bg-gradient-to-r from-[#B85C5F] to-transparent sm:w-14" />
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#B85C5F] sm:text-xs sm:tracking-[0.42em]">
                {location}
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 55, filter: "blur(14px)" }}
              animate={{
                opacity: introVisible ? 0 : 1,
                y: introVisible ? 55 : 0,
                filter: introVisible ? "blur(14px)" : "blur(0px)",
              }}
              transition={{
                duration: 1,
                delay: 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="overflow-visible pb-5 text-[clamp(3.35rem,10vw,8.5rem)] font-black leading-[0.82] tracking-[-0.055em]"
            >
              <span className="block overflow-visible text-white drop-shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
                {heroData.titleFirst}
              </span>

              <span className="relative block overflow-visible pb-[0.08em]">
                <span className="absolute inset-0 translate-x-[0.025em] translate-y-[0.04em] bg-gradient-to-r from-[#4A1113] via-[#7B1E22] to-[#B85C5F] bg-clip-text text-transparent opacity-45 blur-[13px]">
                  {heroData.titleSecond}
                </span>
                <span className="relative bg-gradient-to-r from-[#e5e4e2] via-white to-[#B85C5F] bg-clip-text text-transparent drop-shadow-[0_8px_35px_rgba(123,30,34,0.32)]">
                  {heroData.titleSecond}
                </span>
              </span>

              <span className="block overflow-visible bg-gradient-to-r from-[#B85C5F] via-[#ccccca] to-white bg-clip-text pb-[0.12em] text-transparent">
                {heroData.titleThird}
              </span>
            </motion.h1>

            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{
                width: introVisible ? 0 : 140,
                opacity: introVisible ? 0 : 1,
              }}
              transition={{
                duration: 0.9,
                delay: 0.32,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-3 h-px bg-gradient-to-r from-[#B85C5F] via-[#8b8b89] to-transparent"
            />

            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={{
                opacity: introVisible ? 0 : 1,
                y: introVisible ? 28 : 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.38,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-7 max-w-2xl text-sm font-medium leading-7 text-white/65 sm:text-lg sm:leading-9"
            >
              {heroData.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{
                opacity: introVisible ? 0 : 1,
                y: introVisible ? 28 : 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.52,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-9 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-center"
            >
              <motion.button
                type="button"
                onClick={() => scrollToSection("menu", 90)}
                whileHover={{ y: -4, scale: 1.025 }}
                whileTap={{ scale: 0.975 }}
                transition={{ duration: 0.2 }}
                className="group relative inline-flex min-h-14 items-center justify-center overflow-hidden rounded-full bg-[#e5e4e2] px-8 font-bold text-black shadow-[0_18px_55px_rgba(229,228,226,0.13)] transition-colors duration-300 hover:bg-white"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Menüyü İncele
                  <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
                <span className="absolute inset-0 -translate-x-[120%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-[#7B1E22]/45 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
                <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/70" />
              </motion.button>

              <motion.a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.025 }}
                whileTap={{ scale: 0.975 }}
                transition={{ duration: 0.2 }}
                className="group relative inline-flex min-h-14 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/[0.045] px-8 font-bold text-white shadow-[0_18px_55px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 hover:border-[#7B1E22]/55 hover:bg-[#7B1E22]/[0.12]"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Instagram
                  <span className="text-[#B85C5F] transition-transform duration-300 group-hover:translate-x-1">
                    ↗
                  </span>
                </span>
                <span className="pointer-events-none absolute -left-24 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-[#7B1E22]/20 blur-3xl transition-transform duration-700 group-hover:translate-x-16" />
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{
                opacity: introVisible ? 0 : 1,
                y: introVisible ? 22 : 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.68,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-[10px] font-semibold tracking-[0.2em] text-white/35 sm:text-xs"
            >
              {[
                ["OCAKBAŞI", true],
                ["KEBAP", false],
                ["MARİNA", false],
              ].map(([label, active]) => (
                <div key={String(label)} className="flex items-center gap-3">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      active
                        ? "bg-[#B85C5F] shadow-[0_0_14px_rgba(184,92,95,0.85)]"
                        : "bg-[#8b8b89]"
                    }`}
                  />
                  {label}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{
            opacity: introVisible ? 0 : 1,
            x: introVisible ? 40 : 0,
          }}
          transition={{
            duration: 0.9,
            delay: 0.62,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute right-8 top-1/2 z-20 hidden -translate-y-1/2 xl:block"
        >
          <div className="flex flex-col items-center gap-5">
            <span className="h-14 w-px bg-gradient-to-b from-transparent via-white/15 to-[#7B1E22]/50" />
            <p className="rotate-180 text-[10px] font-bold tracking-[0.38em] text-white/35 [writing-mode:vertical-rl]">
              ATEŞTEN SOFRAYA
            </p>
            <span className="h-14 w-px bg-gradient-to-b from-[#7B1E22]/50 via-white/15 to-transparent" />
          </div>
        </motion.div>

        <motion.button
          type="button"
          onClick={() => scrollToSection("menu", 90)}
          style={{ opacity: scrollIndicatorOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: introVisible ? 0 : 1 }}
          transition={{ delay: 0.85, duration: 0.7 }}
          className="absolute bottom-8 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-3 text-[9px] font-bold tracking-[0.35em] text-white/35 md:flex"
          aria-label="Menü bölümüne git"
        >
          <span>KEŞFET</span>
          <span className="relative h-14 w-7 rounded-full border border-white/15 bg-white/[0.025] backdrop-blur-sm">
            <motion.span
              animate={{ y: [8, 28, 8], opacity: [0, 1, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#B85C5F] shadow-[0_0_10px_rgba(184,92,95,.8)]"
            />
          </span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{
            opacity: introVisible ? 0 : 1,
            y: introVisible ? 24 : 0,
          }}
          transition={{ delay: 0.72, duration: 0.8 }}
          className="absolute bottom-7 right-6 z-20 hidden max-w-[260px] rounded-2xl border border-white/10 bg-black/25 p-4 shadow-2xl backdrop-blur-xl lg:block"
        >
          <div className="flex items-center gap-3">
            <span className="h-10 w-10 rounded-full border border-[#B85C5F]/30 bg-[#7B1E22]/15 shadow-[inset_0_0_20px_rgba(123,30,34,.2)]" />
            <div>
              <p className="text-[10px] font-bold tracking-[0.24em] text-[#B85C5F]">
                01 ADANA
              </p>
              <p className="mt-1 text-xs leading-5 text-white/50">
                Geleneksel lezzet, modern sunum.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="pointer-events-none absolute inset-0 z-[40] opacity-[0.035] [background-image:url('data:image/svg+xml,%3Csvg_viewBox=%220_0_180_180%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22n%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%22.85%22_numOctaves=%223%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23n)%22_opacity=%221%22/%3E%3C/svg%3E')]" />
        <div className="pointer-events-none absolute inset-0 z-[41] shadow-[inset_0_0_180px_45px_rgba(0,0,0,.72)]" />
      </section>
    </>
  );
}