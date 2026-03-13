import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Beaker, Filter } from "lucide-react";
import { projects, categories } from "@/data/projects";
import type { Project } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { IllustrationPlaceholder } from "@/components/ui/illustration-placeholder";
import { cn } from "@/lib/utils";

// ── Animation variants ───────────────────────────────────────────
const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09 },
  },
  exit: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
};

// ── Category filter button ───────────────────────────────────────
interface FilterButtonProps {
  label: string;
  isActive: boolean;
  count: number;
  onClick: () => void;
}

function FilterButton({ label, isActive, count, onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        "relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium font-body",
        "transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        isActive
          ? "text-white"
          : "text-foreground/55 hover:text-foreground/85 hover:bg-muted",
      )}
    >
      {/* Animated active background */}
      {isActive && (
        <motion.span
          layoutId="project-filter-active"
          className="absolute inset-0 rounded-xl gradient-primary shadow-primary"
          style={{ zIndex: -1 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      {label}

      {/* Count pill */}
      <span
        className={cn(
          "inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold leading-none",
          isActive ? "bg-white/25 text-white" : "bg-muted text-foreground/45",
        )}
      >
        {count}
      </span>
    </button>
  );
}

// ── Empty state ──────────────────────────────────────────────────
function EmptyState({ category }: { category: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="col-span-full flex flex-col items-center justify-center gap-4 py-20 text-center"
    >
      <span className="text-5xl opacity-40" aria-hidden="true">
        🧪
      </span>
      <div>
        <p className="font-heading font-semibold text-foreground/50">
          No experiments found
        </p>
        <p className="font-body text-sm text-foreground/35 mt-1">
          No <span className="font-medium text-foreground/50">{category}</span>{" "}
          projects in the lab yet.
        </p>
      </div>
    </motion.div>
  );
}

// ── Stats strip ──────────────────────────────────────────────────
function LabStats() {
  const stats = [
    { value: projects.length.toString(), label: "Total Projects", emoji: "🧪" },
    {
      value: projects.filter((p) => p.featured).length.toString(),
      label: "Featured",
      emoji: "⭐",
    },
    {
      value: [
        ...new Set(projects.flatMap((p) => p.techStack)),
      ].length.toString(),
      label: "Technologies",
      emoji: "⚡",
    },
    {
      value: [...new Set(projects.map((p) => p.category))].length.toString(),
      label: "Categories",
      emoji: "📂",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="flex flex-col items-center gap-1.5 p-4 rounded-2xl bg-card border border-border shadow-card text-center"
        >
          <span className="text-2xl leading-none" aria-hidden="true">
            {stat.emoji}
          </span>
          <p className="font-heading font-bold text-2xl text-gradient leading-none">
            {stat.value}
          </p>
          <p className="font-body text-xs text-foreground/45">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}

// ── Featured projects row ────────────────────────────────────────
function FeaturedRow() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="flex flex-col gap-4">
      {featured.map((project, i) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={i}
          variant="featured"
        />
      ))}
    </div>
  );
}

// ── Main ProjectLab component ────────────────────────────────────
export function ProjectLab() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  // Filter logic
  const filteredProjects = projects.filter((p: Project) => {
    const categoryMatch =
      activeCategory === "all" || p.category === activeCategory;
    const featuredMatch = !showFeaturedOnly || p.featured;
    return categoryMatch && featuredMatch;
  });

  // Count per category
  const countForCategory = (catId: string) => {
    if (catId === "all") return projects.length;
    return projects.filter((p) => p.category === catId).length;
  };

  return (
    <section
      id="projects"
      className="relative section-padding overflow-hidden bg-card"
      style={{
        background:
          "linear-gradient(180deg, hsl(246 60% 97%) 0%, hsl(var(--background)) 100%)",
      }}
    >
      {/* ── Background decoration ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Top-left blob */}
        <div
          className="absolute -top-20 -left-20 w-[350px] h-[350px] rounded-full opacity-10 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, hsl(234 100% 68%) 0%, transparent 70%)",
          }}
        />
        {/* Bottom-right blob */}
        <div
          className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full opacity-8 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, hsl(31 100% 71%) 0%, transparent 70%)",
          }}
        />

        {/* Subtle dot pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="lab-dots"
              x="0"
              y="0"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.5" fill="hsl(234 100% 68%)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#lab-dots)" />
        </svg>
      </div>

      <div className="container-wide mx-auto relative z-10">
        {/* ══════════════════════════════════════════
            Section header
        ══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
          {/* Left: text */}
          <motion.div
            variants={headerVariants as import("framer-motion").Variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-4"
          >
            {/* Eyebrow */}
            <span className="section-label">
              <Beaker className="w-4 h-4" aria-hidden="true" />
              Project Lab
            </span>

            <h2 className="font-heading font-bold">
              Experiments &{" "}
              <span className="text-gradient">Shipped Systems</span>
            </h2>

            <p className="font-body text-foreground/60 text-lg leading-relaxed max-w-lg">
              Every project here is a real experiment — a business problem
              turned into a working system. No toy apps, only production-grade
              work.
            </p>

            {/* Lab stats */}
            <LabStats />
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
              scene="Project Lab"
              icon="🧪"
              description="Futuristic lab · Holographic screens · Experiment capsules · Project cards"
              variant="scene"
              height={320}
              className="w-full"
            />
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════
            Filter bar
        ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8"
        >
          {/* Category filters */}
          <div
            className="flex flex-wrap gap-2 flex-1"
            role="group"
            aria-label="Filter projects by category"
          >
            {categories.map((cat) => (
              <FilterButton
                key={cat.id}
                label={cat.label}
                isActive={activeCategory === cat.id}
                count={countForCategory(cat.id)}
                onClick={() => setActiveCategory(cat.id)}
              />
            ))}
          </div>

          {/* Featured toggle */}
          <button
            onClick={() => setShowFeaturedOnly((v) => !v)}
            aria-pressed={showFeaturedOnly}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium font-body border transition-all duration-200",
              showFeaturedOnly
                ? "border-amber-300 bg-amber-50 text-amber-700"
                : "border-border text-foreground/55 hover:text-foreground hover:border-border/80",
            )}
          >
            <Filter className="w-3.5 h-3.5" aria-hidden="true" />
            Featured only
          </button>
        </motion.div>

        {/* ══════════════════════════════════════════
            Projects grid
        ══════════════════════════════════════════ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${showFeaturedOnly}`}
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              "grid gap-6",
              filteredProjects.length === 0
                ? "grid-cols-1"
                : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
            )}
            role="list"
            aria-label="Project list"
          >
            {filteredProjects.length === 0 ? (
              <EmptyState category={activeCategory} />
            ) : (
              filteredProjects.map((project, i) => (
                <div key={project.id} role="listitem">
                  <ProjectCard project={project} index={i} variant="grid" />
                </div>
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {/* ══════════════════════════════════════════
            Featured section (separate block)
        ══════════════════════════════════════════ */}
        {activeCategory === "all" && !showFeaturedOnly && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16"
          >
            {/* Sub-header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-border" aria-hidden="true" />
              <span className="section-label">
                <span aria-hidden="true">⭐</span>
                Featured Work — Full Detail
              </span>
              <div className="h-px flex-1 bg-border" aria-hidden="true" />
            </div>

            <FeaturedRow />
          </motion.div>
        )}

        {/* ══════════════════════════════════════════
            Bottom CTA
        ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl border border-border bg-card shadow-card"
        >
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <p className="font-heading font-semibold text-foreground">
              Have a project in mind?
            </p>
            <p className="font-body text-sm text-foreground/50">
              Let&rsquo;s turn your idea into the next experiment in the lab.
            </p>
          </div>

          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm font-body gradient-primary shadow-primary hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200"
          >
            Start a Project
            <span aria-hidden="true">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default ProjectLab;
