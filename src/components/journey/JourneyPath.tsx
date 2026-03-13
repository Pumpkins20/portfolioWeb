import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { MapPin } from "lucide-react";
import { journey, journeyStats } from "@/data/journey";
import type { JourneyMilestone } from "@/data/journey";
import { IllustrationPlaceholder } from "@/components/ui/illustration-placeholder";
import { cn } from "@/lib/utils";

// ── Type icon mapping ────────────────────────────────────────────
const typeConfig: Record<
  JourneyMilestone["type"],
  { emoji: string; label: string; borderColor: string }
> = {
  education: {
    emoji: "🎓",
    label: "Education",
    borderColor: "#5ED6A3",
  },
  career: {
    emoji: "💼",
    label: "Career",
    borderColor: "#5B6CFF",
  },
  achievement: {
    emoji: "🏆",
    label: "Achievement",
    borderColor: "#FFB86B",
  },
  "turning-point": {
    emoji: "✨",
    label: "Turning Point",
    borderColor: "#FF7AA2",
  },
};

// ── Container / stagger variants ─────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13, delayChildren: 0.05 },
  },
};

const milestoneVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

// ── Stats strip ──────────────────────────────────────────────────
function JourneyStats() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {journeyStats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.09 }}
          className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border border-border shadow-card text-center hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
        >
          <span className="text-2xl leading-none" aria-hidden="true">
            {stat.emoji}
          </span>
          <p className="font-heading font-extrabold text-2xl leading-none text-gradient">
            {stat.value}
          </p>
          <p className="font-body text-xs text-foreground/45">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}

// ── Single milestone card ────────────────────────────────────────
function MilestoneCard({
  milestone,
  isLeft,
}: {
  milestone: JourneyMilestone;
  isLeft: boolean;
}) {
  const type = typeConfig[milestone.type];

  return (
    <motion.div
      variants={milestoneVariants}
      className={cn(
        "relative flex gap-4 md:gap-6",
        isLeft ? "flex-row" : "flex-row-reverse",
      )}
    >
      {/* ── Timeline node ── */}
      <div className="flex flex-col items-center flex-shrink-0 relative z-10">
        {/* Year badge */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center flex-shrink-0 shadow-card cursor-default"
          style={{
            background: `linear-gradient(135deg, ${milestone.color}20 0%, ${milestone.color}0C 100%)`,
            border: `2px solid ${milestone.color}40`,
          }}
          aria-label={`Year: ${milestone.year}`}
        >
          <span
            className="font-heading font-extrabold text-xs leading-none"
            style={{ color: milestone.color }}
          >
            {milestone.year}
          </span>
          <span className="text-base leading-none mt-0.5" aria-hidden="true">
            {milestone.emoji}
          </span>
        </motion.div>

        {/* "Current" pulse ring */}
        {milestone.isCurrent && (
          <span
            className="absolute inset-0 w-14 h-14 rounded-2xl animate-ping opacity-25"
            style={{ background: milestone.color }}
            aria-label="Current position"
            aria-hidden="true"
          />
        )}
      </div>

      {/* ── Content card ── */}
      <div
        className={cn(
          "group relative flex-1 mb-6 p-5 rounded-2xl bg-card border border-border shadow-card",
          "hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden",
          isLeft ? "mr-0" : "ml-0",
        )}
      >
        {/* Top accent stripe */}
        <div
          className="absolute top-0 inset-x-0 h-0.5 rounded-t-2xl"
          style={{ background: milestone.color }}
          aria-hidden="true"
        />

        {/* Watermark year */}
        <span
          className="absolute top-2 right-4 font-heading font-black text-6xl leading-none select-none pointer-events-none"
          style={{ color: `${milestone.color}08` }}
          aria-hidden="true"
        >
          {milestone.year}
        </span>

        {/* Header row */}
        <div className="flex items-start gap-3 mb-2.5">
          {/* Type badge */}
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase flex-shrink-0 mt-0.5"
            style={{
              color: type.borderColor,
              background: `${type.borderColor}15`,
              border: `1px solid ${type.borderColor}30`,
            }}
          >
            {type.emoji} {type.label}
          </span>

          {/* Current indicator */}
          {milestone.isCurrent && (
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase"
              style={{
                color: "#5ED6A3",
                background: "hsl(155 59% 60% / 0.12)",
                border: "1px solid hsl(155 59% 60% / 0.3)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#5ED6A3] animate-pulse"
                aria-hidden="true"
              />
              Now
            </span>
          )}
        </div>

        {/* Title & subtitle */}
        <div className="mb-2">
          <h3
            className="font-heading font-bold text-base leading-snug"
            style={{ color: "hsl(var(--foreground))" }}
          >
            {milestone.title}
          </h3>
          <p
            className="font-body text-xs mt-0.5 font-medium"
            style={{ color: milestone.color }}
          >
            {milestone.subtitle}
          </p>
          {milestone.period && (
            <p className="font-body text-[11px] text-foreground/40 mt-0.5">
              {milestone.period}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="font-body text-sm text-foreground/60 leading-relaxed mb-3">
          {milestone.description}
        </p>

        {/* Tags */}
        {milestone.tags && milestone.tags.length > 0 && (
          <div
            className="flex flex-wrap gap-1.5"
            aria-label="Skills and technologies"
          >
            {milestone.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border"
                style={{
                  color: "hsl(var(--primary))",
                  background: "hsl(var(--primary) / 0.07)",
                  borderColor: "hsl(var(--primary) / 0.2)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(ellipse at 0% 50%, ${milestone.color}07 0%, transparent 65%)`,
          }}
          aria-hidden="true"
        />
      </div>
    </motion.div>
  );
}

// ── Timeline connector line ──────────────────────────────────────
function TimelineConnector({ color }: { color: string }) {
  return (
    <div className="flex justify-start pl-[26px] mb-0" aria-hidden="true">
      <motion.div
        className="w-0.5 h-6 rounded-full"
        style={{
          background: `linear-gradient(180deg, ${color}50 0%, transparent 100%)`,
        }}
        initial={{ scaleY: 0, originY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </div>
  );
}

// ── Main JourneyPath component ───────────────────────────────────
export function JourneyPath() {
  return (
    <section
      id="journey"
      className="relative section-padding overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(227 80% 97%) 40%, hsl(246 60% 97%) 70%, hsl(var(--background)) 100%)",
      }}
    >
      {/* ── Background decoration ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Left glow */}
        <div
          className="absolute top-1/4 -left-32 w-[400px] h-[500px] rounded-full opacity-8 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, hsl(155 59% 60%) 0%, transparent 70%)",
          }}
        />
        {/* Right glow */}
        <div
          className="absolute bottom-1/4 -right-32 w-[350px] h-[400px] rounded-full opacity-8 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, hsl(31 100% 71%) 0%, transparent 70%)",
          }}
        />

        {/* Path / road decorative SVG */}
        <svg
          className="absolute left-1/2 top-0 -translate-x-1/2 h-full opacity-[0.03] pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          aria-hidden="true"
        >
          <line
            x1="60"
            y1="0"
            x2="60"
            y2="100%"
            stroke="hsl(234 100% 68%)"
            strokeWidth="2"
            strokeDasharray="8 6"
          />
        </svg>
      </div>

      <div className="container-wide mx-auto relative z-10">
        {/* ══════════════════════════════════════════
            Section header + illustration
        ══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            {/* Eyebrow */}
            <span className="section-label">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              Developer Journey
            </span>

            <h2 className="font-heading font-bold">
              The road that built{" "}
              <span className="text-gradient">this developer</span>
            </h2>

            <p className="font-body text-foreground/60 text-lg leading-relaxed max-w-lg">
              Every milestone is a checkpoint on the map. From the first
              confused HTML tag to shipping production systems — this is the
              path, unfiltered.
            </p>

            {/* Stats */}
            <JourneyStats />
          </motion.div>

          {/* Right: illustration placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 32, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.65,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="hidden lg:block"
          >
            <IllustrationPlaceholder
              scene="Journey Path"
              icon="🧭"
              description="Adventure path road · Milestone signs · Code flags · Career progression map"
              variant="scene"
              height={320}
              className="w-full"
            />
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════
            Timeline
        ══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 items-start">
          {/* ── Milestones list ── */}
          <motion.div
            variants={containerVariants as import("framer-motion").Variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {journey.map((milestone, i) => (
              <div key={milestone.id}>
                <MilestoneCard milestone={milestone} isLeft={true} />
                {/* Connector between milestones */}
                {i < journey.length - 1 && (
                  <TimelineConnector color={journey[i + 1].color} />
                )}
              </div>
            ))}

            {/* "To be continued..." end node */}
            <motion.div
              variants={milestoneVariants as import("framer-motion").Variants}
              className="flex items-center gap-4 pl-1"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border-2 border-dashed"
                style={{ borderColor: "hsl(var(--primary) / 0.3)" }}
                aria-hidden="true"
              >
                <span className="text-xl leading-none opacity-40">🔮</span>
              </div>
              <div>
                <p className="font-heading font-semibold text-sm text-foreground/40">
                  To be continued...
                </p>
                <p className="font-body text-xs text-foreground/30">
                  The journey is still being written ☕
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Sticky sidebar ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:sticky lg:top-28 flex flex-col gap-6"
          >
            {/* Timeline overview card */}
            <div className="p-6 rounded-2xl bg-card border border-border shadow-card">
              <h3 className="font-heading font-bold text-base text-foreground mb-4 flex items-center gap-2">
                <span aria-hidden="true">🗺️</span>
                Quick Map
              </h3>

              <ol
                className="flex flex-col gap-2.5"
                aria-label="Journey overview"
              >
                {journey.map((m) => (
                  <li
                    key={m.id}
                    className="flex items-center gap-2.5 group cursor-default"
                  >
                    {/* Colour dot */}
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0 transition-transform duration-200 group-hover:scale-150"
                      style={{ background: m.color }}
                      aria-hidden="true"
                    />
                    {/* Year */}
                    <span
                      className="font-heading font-bold text-[11px] tabular-nums flex-shrink-0 w-8"
                      style={{ color: m.color }}
                    >
                      {m.year}
                    </span>
                    {/* Title */}
                    <span className="font-body text-xs text-foreground/60 leading-tight truncate group-hover:text-foreground/85 transition-colors duration-200">
                      {m.title}
                    </span>
                    {/* Current dot */}
                    {m.isCurrent && (
                      <span
                        className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#5ED6A3] animate-pulse"
                        aria-label="Current"
                      />
                    )}
                  </li>
                ))}
              </ol>
            </div>

            {/* Type legend */}
            <div className="p-5 rounded-2xl bg-card border border-border shadow-card">
              <h3 className="font-heading font-semibold text-sm text-foreground mb-3">
                Milestone Types
              </h3>
              <div className="flex flex-col gap-2">
                {(
                  Object.entries(typeConfig) as [
                    JourneyMilestone["type"],
                    (typeof typeConfig)[JourneyMilestone["type"]],
                  ][]
                ).map(([key, config]) => (
                  <div key={key} className="flex items-center gap-2.5">
                    <span className="text-base leading-none" aria-hidden="true">
                      {config.emoji}
                    </span>
                    <span className="font-body text-xs text-foreground/60">
                      {config.label}
                    </span>
                    <span
                      className="ml-auto w-6 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: config.borderColor }}
                      aria-hidden="true"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Coffee counter widget */}
            <div
              className="p-5 rounded-2xl border flex flex-col items-center gap-3 text-center"
              style={{
                background:
                  "linear-gradient(135deg, hsl(31 100% 71% / 0.08) 0%, hsl(234 100% 68% / 0.06) 100%)",
                borderColor: "hsl(31 100% 71% / 0.3)",
              }}
            >
              <span className="text-3xl leading-none" aria-hidden="true">
                ☕
              </span>
              <div>
                <p className="font-heading font-bold text-lg text-gradient-accent">
                  Fuelled by coffee
                </p>
                <p className="font-body text-xs text-foreground/45 mt-1 leading-relaxed">
                  Every line of code in this journey was written with a cup
                  nearby. Some habits are non-negotiable.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default JourneyPath;
