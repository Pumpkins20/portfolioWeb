import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { skills, skillGroups, skillLevels, topSkills } from "@/data/skills";
import type { SkillCategory } from "@/data/skills";
import { IllustrationPlaceholder } from "@/components/ui/illustration-placeholder";
import { cn } from "@/lib/utils";

// ── Animation variants ──────────────────────────────────────────
const sectionVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.97,
    transition: { duration: 0.25 },
  },
};

// ── Level indicator dots ─────────────────────────────────────────
function LevelDots({ levelPercent }: { levelPercent: number }) {
  const filled = Math.round((levelPercent / 100) * 5);
  return (
    <div className="flex gap-1" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full transition-colors duration-200"
          style={{
            background:
              i < filled ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.15)",
          }}
        />
      ))}
    </div>
  );
}

// ── Single skill card ────────────────────────────────────────────
function SkillCard({ skill }: { skill: (typeof skills)[number] }) {
  const levelInfo = skillLevels[skill.level];

  return (
    <motion.div
      variants={cardVariants}
      layout
      className="group relative flex flex-col gap-3 p-5 rounded-2xl bg-card border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-250 cursor-default overflow-hidden"
    >
      {/* Accent stripe */}
      <div
        className="absolute top-0 inset-x-0 h-0.5 rounded-t-2xl opacity-70"
        style={{ background: skill.color }}
        aria-hidden="true"
      />

      {/* Top row: emoji + name + level badge */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          {/* Artifact emoji */}
          <span
            className="text-2xl leading-none select-none transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6"
            aria-hidden="true"
          >
            {skill.artifactEmoji}
          </span>

          <div>
            <h4 className="font-heading font-semibold text-sm leading-tight text-foreground">
              {skill.name}
            </h4>
            {skill.yearsExp && (
              <p className="font-body text-[11px] text-foreground/40 mt-0.5">
                {skill.yearsExp}yr{skill.yearsExp > 1 ? "s" : ""} exp
              </p>
            )}
          </div>
        </div>

        {/* Level badge */}
        <span
          className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide whitespace-nowrap flex-shrink-0"
          style={{
            color: levelInfo.color,
            background: levelInfo.bgColor,
            border: `1px solid ${levelInfo.color}35`,
          }}
        >
          {levelInfo.label}
        </span>
      </div>

      {/* Progress bar */}
      <div
        className="h-1 rounded-full overflow-hidden"
        style={{ background: "hsl(var(--primary) / 0.1)" }}
        aria-label={`Proficiency: ${skill.levelPercent}%`}
        role="progressbar"
        aria-valuenow={skill.levelPercent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: skill.color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.levelPercent}%` }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />
      </div>

      {/* Level dots */}
      <div className="flex items-center justify-between">
        <LevelDots levelPercent={skill.levelPercent} />
        <span className="font-body text-[11px] font-semibold text-foreground/40">
          {skill.levelPercent}%
        </span>
      </div>

      {/* Description (shown on hover) */}
      <p className="font-body text-xs text-foreground/55 leading-relaxed line-clamp-2">
        {skill.description}
      </p>

      {/* Artifact name pill */}
      <div className="mt-auto">
        <span
          className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest rounded-full px-2 py-0.5"
          style={{
            color: skill.color,
            background: `${skill.color}18`,
          }}
        >
          ⚒ {skill.artifactName}
        </span>
      </div>

      {/* Subtle hover glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${skill.color}0C 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

// ── Category tab pill ────────────────────────────────────────────
function CategoryTab({
  group,
  isActive,
  count,
  onClick,
}: {
  group: (typeof skillGroups)[number];
  isActive: boolean;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium font-body transition-all duration-200",
        isActive
          ? "text-white shadow-primary"
          : "text-foreground/60 hover:text-foreground hover:bg-muted",
      )}
    >
      {/* Active pill background */}
      {isActive && (
        <motion.span
          layoutId="skill-tab-active"
          className="absolute inset-0 rounded-xl gradient-primary"
          style={{ zIndex: -1 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      <span aria-hidden="true">{group.emoji}</span>
      <span>{group.label}</span>
      <span
        className={cn(
          "text-[11px] font-bold rounded-full px-1.5 py-0.5 min-w-[20px] text-center leading-none",
          isActive ? "bg-white/20 text-white" : "bg-muted text-foreground/50",
        )}
      >
        {count}
      </span>
    </button>
  );
}

// ── Top-skills "featured" strip ──────────────────────────────────
function TopSkillsStrip() {
  const featured = skills.filter((s) => topSkills.includes(s.id));

  return (
    <div className="flex flex-wrap gap-2" aria-label="Featured tech stack">
      {featured.map((skill) => (
        <span
          key={skill.id}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 hover:-translate-y-0.5 cursor-default"
          style={{
            color: skill.color,
            background: `${skill.color}15`,
            borderColor: `${skill.color}30`,
          }}
          title={skill.description}
        >
          <span aria-hidden="true">{skill.artifactEmoji}</span>
          {skill.name}
        </span>
      ))}
    </div>
  );
}

// ── Main SkillForge component ────────────────────────────────────
export function SkillForge() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | "all">(
    "all",
  );

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  const countByCategory = (cat: SkillCategory) =>
    skills.filter((s) => s.category === cat).length;

  return (
    <section
      id="skills"
      className="relative section-padding overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(246 60% 97%) 100%)",
      }}
    >
      {/* ── Background decoration ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, hsl(246 100% 74%) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full opacity-8 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, hsl(31 100% 71%) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container-wide mx-auto relative z-10">
        {/* ── Section header ── */}
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
              <span aria-hidden="true">⚒️</span>
              Skill Forge
            </span>

            <h2 className="font-heading font-bold">
              My <span className="text-gradient">Developer Toolkit</span>
            </h2>

            <p className="font-body text-foreground/60 text-lg leading-relaxed max-w-lg">
              Every tool in this forge has been battle-tested on real projects.
              No tutorial heroes — only tools I&rsquo;ve actually shipped with.
            </p>

            {/* Top stack pills */}
            <TopSkillsStrip />
          </motion.div>

          {/* Right: small mascot illustration placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <IllustrationPlaceholder
              scene="Skill Forge Workshop"
              icon="⚒️"
              description="Tech workshop · Glowing tools · Mascot building artifacts"
              variant="inline"
              height={260}
              className="w-full"
            />
          </motion.div>
        </div>

        {/* ── Category tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-2 mb-8"
          role="tablist"
          aria-label="Filter skills by category"
        >
          {/* "All" tab */}
          <button
            role="tab"
            aria-selected={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
            className={cn(
              "relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium font-body transition-all duration-200",
              activeCategory === "all"
                ? "text-white shadow-primary"
                : "text-foreground/60 hover:text-foreground hover:bg-muted",
            )}
          >
            {activeCategory === "all" && (
              <motion.span
                layoutId="skill-tab-active"
                className="absolute inset-0 rounded-xl gradient-primary"
                style={{ zIndex: -1 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
            🛠️ All Tools
            <span
              className={cn(
                "text-[11px] font-bold rounded-full px-1.5 py-0.5 min-w-[20px] text-center leading-none",
                activeCategory === "all"
                  ? "bg-white/20 text-white"
                  : "bg-muted text-foreground/50",
              )}
            >
              {skills.length}
            </span>
          </button>

          {/* Category tabs */}
          {skillGroups.map((group) => (
            <CategoryTab
              key={group.category}
              group={group}
              isActive={activeCategory === group.category}
              count={countByCategory(group.category)}
              onClick={() => setActiveCategory(group.category)}
            />
          ))}
        </motion.div>

        {/* ── Category description ── */}
        <AnimatePresence mode="wait">
          {activeCategory !== "all" && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mb-6"
            >
              {skillGroups
                .filter((g) => g.category === activeCategory)
                .map((g) => (
                  <p
                    key={g.category}
                    className="font-body text-sm text-foreground/55 flex items-center gap-2"
                  >
                    <span aria-hidden="true">{g.emoji}</span>
                    {g.description}
                  </p>
                ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Skills grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            role="tabpanel"
            aria-label={`${activeCategory === "all" ? "All skills" : activeCategory + " skills"}`}
          >
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center font-body text-sm text-foreground/40"
        >
          Always learning · Currently exploring{" "}
          <span className="font-semibold text-foreground/60">
            AI tooling & automation
          </span>
        </motion.p>
      </div>
    </section>
  );
}

export default SkillForge;
