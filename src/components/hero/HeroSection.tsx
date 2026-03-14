import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight, Coffee, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

// ── Floating code symbols that orbit the illustration ──
const floatingSymbols = [
  { symbol: "</>", x: "10%", y: "15%", delay: 0, duration: 7 },
  { symbol: "{ }", x: "80%", y: "10%", delay: 1.2, duration: 6 },
  { symbol: "=>", x: "88%", y: "60%", delay: 0.6, duration: 8 },
  { symbol: "()=>{}", x: "5%", y: "70%", delay: 1.8, duration: 6.5 },
  { symbol: "☕", x: "75%", y: "82%", delay: 0.3, duration: 7.5 },
  { symbol: "[ ]", x: "20%", y: "88%", delay: 2.1, duration: 5.5 },
  { symbol: "#!", x: "50%", y: "5%", delay: 0.9, duration: 9 },
  { symbol: "∞", x: "92%", y: "35%", delay: 1.5, duration: 7 },
];

// ── Top tech badges shown below the tagline ──
const topStack = [
  { label: "Laravel", color: "#FF4B2B" },
  { label: "React", color: "#61DAFB" },
  { label: "PostgreSQL", color: "#336791" },
  { label: "REST API", color: "#5B6CFF" },
  { label: "Docker", color: "#2496ED" },
];

// ── Container animation variants ──
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const rightVariants: Variants = {
  hidden: { opacity: 0, x: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut", delay: 0.35 },
  },
};

// ─────────────────────────────────────────────────────────────
// ── Typing Animation + Blinking Cursor ──
// ─────────────────────────────────────────────────────────────
function TypingText({
  text,
  startDelay = 0.9,
}: {
  text: string;
  startDelay?: number;
}) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    const startTimer = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, 72);
      return () => clearInterval(interval);
    }, startDelay * 1000);

    return () => clearTimeout(startTimer);
  }, [text, startDelay]);

  return (
    <span>
      {displayed}
      {/* Blinking cursor — always visible after typing starts */}
      <motion.span
        aria-hidden="true"
        style={{
          display: "inline-block",
          width: "2px",
          height: "0.85em",
          background: "currentColor",
          verticalAlign: "text-bottom",
          marginLeft: "2px",
          borderRadius: "1px",
        }}
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{
          duration: 1.05,
          repeat: Infinity,
          times: [0, 0.45, 0.5, 0.95],
          ease: "linear",
        }}
      />
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// ── Steam Effect — floats above the Laravel coffee mug ──
// ─────────────────────────────────────────────────────────────
function SteamEffect() {
  // Three wiggly steam strands with staggered delays
  const strands = [
    { xOffset: -8, delay: 0, duration: 2.4 },
    { xOffset: 4, delay: 0.75, duration: 2.8 },
    { xOffset: -1, delay: 1.45, duration: 2.15 },
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute"
      // Cup is ~78% from left / ~78% from top of the 1:1 mascot image.
      // right ≈ 22%  |  bottom ≈ 26% puts the steam just above the cup opening.
      style={{ right: "22%", bottom: "25%", width: 44, height: 64 }}
    >
      {strands.map((strand, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0"
          style={{ left: "50%", marginLeft: strand.xOffset }}
          initial={{ opacity: 0 }}
          animate={{
            y: [0, -20, -44, -62],
            opacity: [0, 0.75, 0.5, 0],
            x: [0, strand.xOffset > 0 ? 4 : -4, strand.xOffset > 0 ? -3 : 3, 0],
            scaleX: [0.9, 1.25, 0.75, 0.6],
          }}
          transition={{
            duration: strand.duration,
            delay: strand.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          <svg width="11" height="32" viewBox="0 0 11 32" fill="none">
            <path
              d="M5.5 30 C2 24 9 19 5.5 13 C2 7 9 2 5.5 0"
              stroke="rgba(220, 228, 255, 0.62)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ── Main Section ──
// ─────────────────────────────────────────────────────────────
export function HeroSection() {
  const handleScroll = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden gradient-hero"
    >
      {/* ── Background decorative blobs ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, hsl(246 100% 74%) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-[480px] h-[480px] rounded-full opacity-15 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, hsl(234 100% 68%) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-10 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse, hsl(31 100% 71%) 0%, transparent 65%)",
          }}
        />

        {/* Dot grid pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="dot-grid"
              x="0"
              y="0"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.5" fill="hsl(234 100% 68%)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-grid)" />
        </svg>
      </div>

      {/* ── Main content ── */}
      <div className="container-wide mx-auto relative z-10 pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          {/* ────────────────────────────────────────
              LEFT — intro text
          ──────────────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 max-w-xl"
          >
            {/* Eyebrow / tagline — typing animation */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 section-label"
            >
              <Coffee className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              <TypingText text="Turning Coffee Into Code" startDelay={0.9} />
            </motion.div>

            {/* Main headline */}
            <motion.h1
              variants={itemVariants}
              className="font-heading font-extrabold leading-[1.1] tracking-tight"
            >
              Hi, I&rsquo;m <span className="text-gradient">Firdaus</span>
              <br />
              <span
                className="text-foreground/80"
                style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}
              >
                Web Developer
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={itemVariants}
              className="font-body text-foreground/65 text-lg leading-relaxed"
            >
              Building{" "}
              <span className="font-semibold text-foreground/85">
                scalable web systems
              </span>{" "}
              for startups and businesses — from solid backend architecture to
              intuitive user interfaces. End-to-end, solo.
            </motion.p>

            {/* Top tech stack pills */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-2"
            >
              {topStack.map((tech) => (
                <span
                  key={tech.label}
                  className="tech-badge"
                  style={{
                    background: `${tech.color}18`,
                    color: tech.color,
                    borderColor: `${tech.color}35`,
                  }}
                >
                  {tech.label}
                </span>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 pt-2"
            >
              <Button
                size="lg"
                className="gradient-primary text-white font-semibold shadow-primary hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 border-0 gap-2"
                onClick={() => handleScroll("projects")}
              >
                Explore Projects
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="font-semibold border-2 transition-all duration-200 hover:-translate-y-0.5 gap-2"
                style={{
                  borderColor: "hsl(var(--primary) / 0.35)",
                  color: "hsl(var(--primary))",
                  background: "hsl(var(--primary) / 0.05)",
                }}
                onClick={() => handleScroll("contact")}
              >
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                Hire Me
              </Button>
            </motion.div>

            {/* Mini stats row */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-6 pt-2"
            >
              {[
                { value: "10+", label: "Projects" },
                { value: "5+", label: "Clients" },
                { value: "6+", label: "Years" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-4">
                  {i > 0 && (
                    <span aria-hidden="true" className="w-px h-8 bg-border" />
                  )}
                  <div>
                    <p className="font-heading font-bold text-xl leading-none text-gradient">
                      {stat.value}
                    </p>
                    <p className="font-body text-xs text-foreground/50 mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ────────────────────────────────────────
              RIGHT — mascot illustration
          ──────────────────────────────────────── */}
          <motion.div
            variants={rightVariants}
            initial="hidden"
            animate="visible"
            className="relative flex items-center justify-center"
          >
            {/* ── Floating code symbols around the card ── */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
            >
              {floatingSymbols.map((sym) => (
                <motion.span
                  key={sym.symbol}
                  className="absolute font-mono text-xs font-semibold select-none"
                  style={{
                    left: sym.x,
                    top: sym.y,
                    color: "hsl(234 100% 68% / 0.45)",
                  }}
                  animate={{
                    y: ["0px", "-14px", "0px"],
                    opacity: [0.4, 0.8, 0.4],
                    rotate: [0, sym.delay % 2 === 0 ? 8 : -8, 0],
                  }}
                  transition={{
                    duration: sym.duration,
                    delay: sym.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {sym.symbol}
                </motion.span>
              ))}
            </div>

            {/* Glow ring behind the mascot */}
            <div
              aria-hidden="true"
              className="absolute inset-8 rounded-3xl blur-2xl opacity-20"
              style={{
                background:
                  "radial-gradient(circle, hsl(234 100% 68%) 0%, hsl(246 100% 74%) 100%)",
              }}
            />

            {/* Main mascot illustration */}
            <img
              src="/mascot/mascot-character.png"
              alt="Firdaus — developer mascot character"
              className="relative w-full max-w-lg object-contain drop-shadow-2xl select-none"
              style={{ minHeight: 440 }}
              draggable={false}
            />

            {/* ── Steam rising from the coffee mug ──
                Mug is at ~78% from left / ~78% from top of the 1:1 image.
                right ≈ 21%  |  bottom ≈ 25% positions the steam just
                above the rim of the Laravel coffee cup.               */}
            <SteamEffect />

            {/* Small mascot corner thumbnail */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl overflow-hidden shadow-card border border-border/60 bg-card/80 backdrop-blur-sm">
              <img
                src="/mascot/mascot-character.png"
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover object-top select-none"
                draggable={false}
              />
            </div>
          </motion.div>
        </div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="font-body text-xs text-foreground/40 tracking-widest uppercase">
            Scroll to explore
          </span>
          <div
            className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1.5"
            style={{ borderColor: "hsl(var(--primary) / 0.3)" }}
          >
            <motion.div
              className="w-1 h-2 rounded-full"
              style={{ background: "hsl(var(--primary))" }}
              animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
