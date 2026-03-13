import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index?: number;
  variant?: "grid" | "featured";
}

// ── Image / screenshot placeholder ──────────────────────────────
function ProjectImagePlaceholder({
  title,
  color,
  category,
}: {
  title: string;
  color: string;
  category: Project["category"];
}) {
  const categoryEmoji: Record<Project["category"], string> = {
    fullstack: "⚡",
    frontend: "🎨",
    backend: "⚙️",
    mobile: "📱",
    cms: "📰",
  };

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center gap-3 select-none overflow-hidden"
      aria-label={`Project screenshot placeholder for ${title}`}
      role="img"
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${color}18 0%, ${color}08 50%, hsl(246 100% 74% / 0.06) 100%)`,
        }}
      />

      {/* Grid pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={`grid-${title.replace(/\s/g, "")}`}
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke={color}
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#grid-${title.replace(/\s/g, "")})`}
        />
      </svg>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-2">
        {/* Big emoji */}
        <span className="text-4xl leading-none opacity-60">
          {categoryEmoji[category]}
        </span>

        {/* "Screenshot" label */}
        <div
          className="flex items-center gap-1.5 rounded-full px-3 py-1"
          style={{
            background: `${color}18`,
            border: `1px dashed ${color}50`,
          }}
        >
          <span
            className="text-[10px] font-semibold tracking-widest uppercase"
            style={{ color: `${color}` }}
          >
            Project Screenshot
          </span>
        </div>
      </div>

      {/* Decorative corner dots */}
      {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map(
        (pos) => (
          <span
            key={pos}
            className={`absolute ${pos} w-1 h-1 rounded-full`}
            style={{ background: `${color}60` }}
            aria-hidden="true"
          />
        )
      )}
    </div>
  );
}

// ── Category label mapping ───────────────────────────────────────
const categoryLabel: Record<Project["category"], string> = {
  fullstack: "Full Stack",
  frontend: "Frontend",
  backend: "Backend",
  mobile: "Mobile",
  cms: "CMS",
};

// ── Main ProjectCard ─────────────────────────────────────────────
export function ProjectCard({
  project,
  index = 0,
  variant = "grid",
}: ProjectCardProps) {
  const isFeatured = variant === "featured";

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "group relative flex flex-col bg-card rounded-2xl border border-border overflow-hidden",
        "shadow-card hover:shadow-card-hover hover:-translate-y-1.5",
        "transition-all duration-300 ease-out",
        isFeatured && "lg:flex-row lg:min-h-[280px]"
      )}
    >
      {/* ── Accent top border ── */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-[2px] rounded-t-2xl opacity-80 z-10",
          isFeatured && "lg:inset-y-0 lg:inset-x-auto lg:left-0 lg:w-[2px] lg:h-auto lg:rounded-l-2xl lg:rounded-t-none"
        )}
        style={{ background: project.color }}
        aria-hidden="true"
      />

      {/* ── Image area ── */}
      <div
        className={cn(
          "relative overflow-hidden",
          isFeatured
            ? "h-48 lg:h-auto lg:w-72 xl:w-80 flex-shrink-0"
            : "h-44"
        )}
      >
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <ProjectImagePlaceholder
            title={project.title}
            color={project.color}
            category={project.category}
          />
        )}

        {/* Category badge — floats over image */}
        <span
          className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm z-10"
          style={{
            background: `${project.color}22`,
            color: project.color,
            border: `1px solid ${project.color}40`,
          }}
        >
          {categoryLabel[project.category]}
        </span>

        {/* Featured badge */}
        {project.featured && (
          <span
            className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm z-10"
            style={{
              background: "hsl(31 100% 71% / 0.2)",
              color: "hsl(31 100% 45%)",
              border: "1px solid hsl(31 100% 71% / 0.4)",
            }}
          >
            ⭐ Featured
          </span>
        )}
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        {/* Title & subtitle */}
        <div>
          <h3 className="font-heading font-bold text-base leading-snug text-foreground group-hover:text-primary transition-colors duration-200">
            {project.title}
          </h3>
          <p className="font-body text-xs text-foreground/45 mt-0.5 italic">
            {project.subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="font-body text-sm text-foreground/60 leading-relaxed line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Challenge strip (featured only) */}
        {isFeatured && (
          <div
            className="rounded-xl p-3 text-sm"
            style={{
              background: `${project.color}0C`,
              border: `1px solid ${project.color}25`,
            }}
          >
            <p className="font-body text-foreground/55 leading-relaxed">
              <span
                className="font-semibold"
                style={{ color: project.color }}
              >
                Challenge:{" "}
              </span>
              {project.challenge}
            </p>
          </div>
        )}

        {/* Tech stack badges */}
        <div className="flex flex-wrap gap-1.5" aria-label="Tech stack">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border"
              style={{
                background: "hsl(var(--primary) / 0.07)",
                color: "hsl(var(--primary))",
                borderColor: "hsl(var(--primary) / 0.2)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 pt-1 mt-auto">
          {project.liveUrl ? (
            <Button
              size="sm"
              className="flex-1 gap-1.5 text-xs font-semibold border-0 gradient-primary text-white shadow-primary hover:opacity-90 transition-opacity"
              asChild
            >
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                Live Demo
              </a>
            </Button>
          ) : (
            <Button
              size="sm"
              disabled
              className="flex-1 gap-1.5 text-xs font-semibold opacity-40 cursor-not-allowed"
              variant="outline"
            >
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              Private
            </Button>
          )}

          {project.githubUrl ? (
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 text-xs font-semibold border-border hover:border-primary hover:text-primary transition-colors"
              asChild
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} on GitHub`}
              >
                <Github className="w-3.5 h-3.5" aria-hidden="true" />
                Code
              </a>
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 text-xs font-semibold border-border hover:border-primary hover:text-primary transition-colors"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              title="Repository is private — contact me for access"
            >
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              Inquire
            </Button>
          )}
        </div>
      </div>

      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${project.color}07 0%, transparent 65%)`,
        }}
        aria-hidden="true"
      />
    </motion.article>
  );
}

export default ProjectCard;
