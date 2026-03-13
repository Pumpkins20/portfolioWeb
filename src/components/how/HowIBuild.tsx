import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Search, Layers, Server, Monitor, Rocket } from "lucide-react";

// ── Step data ────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    icon: Search,
    title: "Understanding the Business Problem",
    description:
      "Before touching the keyboard, I sit with the client to deeply understand the real problem. What's broken? What's the goal? Who are the users? Good code starts with good questions.",
    deliverables: ["Requirements doc", "User flows", "Scope definition"],
    color: "#5B6CFF",
    emoji: "🔍",
  },
  {
    number: "02",
    icon: Layers,
    title: "Designing System Architecture",
    description:
      "I plan the full architecture on paper (or Figma) before writing a single line of code — database schema, API contracts, UI wireframes. This phase saves days of refactoring later.",
    deliverables: ["Figma wireframes", "DB schema", "API contract"],
    color: "#8A7CFF",
    emoji: "🏗️",
  },
  {
    number: "03",
    icon: Server,
    title: "Building the Backend API",
    description:
      "With the blueprint ready, I build the backend first — clean REST APIs, business logic, database migrations, authentication, and validation. The foundation has to be rock-solid.",
    deliverables: ["REST API", "Database", "Auth & security"],
    color: "#5ED6A3",
    emoji: "⚙️",
  },
  {
    number: "04",
    icon: Monitor,
    title: "Building the Frontend Interface",
    description:
      "Once the API is stable, I build the user interface — responsive, accessible, and fast. Every screen is designed to guide users naturally toward their goal without confusion.",
    deliverables: ["React UI", "Responsive design", "API integration"],
    color: "#FFB86B",
    emoji: "🎨",
  },
  {
    number: "05",
    icon: Rocket,
    title: "Deploying to Production",
    description:
      "The final step is shipping it. I handle containerisation with Docker, environment configuration, and deployment to the server. The system goes live tested, documented, and ready to scale.",
    deliverables: ["Docker setup", "Deployment", "Documentation"],
    color: "#FF7AA2",
    emoji: "🚀",
  },
];

// ── Container / stagger variants ─────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// ── Single step card ─────────────────────────────────────────────
function StepCard({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[number];
  index: number;
  isLast: boolean;
}) {
  const Icon = step.icon;

  return (
    <motion.div
      variants={cardVariants}
      className="relative flex gap-5 md:gap-6"
    >
      {/* ── Left column: number + connector line ── */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Step circle */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.2 }}
          className="relative w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-card z-10"
          style={{
            background: `linear-gradient(135deg, ${step.color}22 0%, ${step.color}10 100%)`,
            border: `2px solid ${step.color}35`,
          }}
        >
          {/* Icon */}
          <Icon
            className="w-5 h-5"
            style={{ color: step.color }}
            aria-hidden="true"
            strokeWidth={2}
          />

          {/* Pulse ring on the active-looking step */}
          {index === 0 && (
            <span
              className="absolute inset-0 rounded-2xl animate-ping opacity-20"
              style={{ background: step.color }}
              aria-hidden="true"
            />
          )}
        </motion.div>

        {/* Connector line */}
        {!isLast && (
          <motion.div
            className="w-0.5 flex-1 mt-2 rounded-full"
            style={{
              background: `linear-gradient(180deg, ${step.color}40 0%, ${steps[index + 1].color}20 100%)`,
            }}
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* ── Right column: card content ── */}
      <div
        className="group relative flex-1 mb-8 p-5 md:p-6 rounded-2xl bg-card border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        style={{ marginTop: "0" }}
      >
        {/* Accent stripe */}
        <div
          className="absolute top-0 inset-x-0 h-0.5 rounded-t-2xl"
          style={{ background: step.color }}
          aria-hidden="true"
        />

        {/* Step number — large watermark */}
        <span
          className="absolute top-3 right-4 font-heading font-black text-5xl leading-none select-none pointer-events-none"
          style={{ color: `${step.color}10` }}
          aria-hidden="true"
        >
          {step.number}
        </span>

        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          {/* Emoji decoration */}
          <span
            className="text-2xl leading-none flex-shrink-0 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6"
            aria-hidden="true"
          >
            {step.emoji}
          </span>

          <div>
            {/* Step label */}
            <span
              className="inline-block text-[10px] font-bold tracking-widest uppercase mb-1 rounded-full px-2 py-0.5"
              style={{
                color: step.color,
                background: `${step.color}15`,
              }}
            >
              Step {step.number}
            </span>

            <h3
              className="font-heading font-bold text-base leading-snug"
              style={{ color: "hsl(var(--foreground))" }}
            >
              {step.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="font-body text-sm text-foreground/60 leading-relaxed mb-4">
          {step.description}
        </p>

        {/* Deliverables */}
        <div
          className="flex flex-wrap gap-2"
          aria-label={`Deliverables for step ${step.number}`}
        >
          {step.deliverables.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold"
              style={{
                color: step.color,
                background: `${step.color}12`,
                border: `1px solid ${step.color}25`,
              }}
            >
              <svg
                className="w-2.5 h-2.5 flex-shrink-0"
                viewBox="0 0 8 8"
                fill="currentColor"
                aria-hidden="true"
              >
                <circle cx="4" cy="4" r="3" />
              </svg>
              {item}
            </span>
          ))}
        </div>

        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(ellipse at 0% 50%, ${step.color}07 0%, transparent 65%)`,
          }}
          aria-hidden="true"
        />
      </div>
    </motion.div>
  );
}

// ── Main component ───────────────────────────────────────────────
export function HowIBuild() {
  return (
    <section
      id="how"
      className="relative section-padding overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(227 80% 97%) 50%, hsl(var(--background)) 100%)",
      }}
    >
      {/* ── Background decoration ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute top-1/4 right-0 w-[320px] h-[320px] rounded-full opacity-10 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, hsl(246 100% 74%) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 left-0 w-[280px] h-[280px] rounded-full opacity-8 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, hsl(155 59% 60%) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container-wide mx-auto relative z-10">
        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-16 items-start">
          {/* ──────────────────────────────────────
              Left: steps timeline
          ────────────────────────────────────── */}
          <div>
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4 mb-10"
            >
              {/* Eyebrow */}
              <span className="section-label">
                <span aria-hidden="true">🏗️</span>
                How I Build Systems
              </span>

              <h2 className="font-heading font-bold">
                Not just code — <span className="text-gradient">a system</span>
              </h2>

              <p className="font-body text-foreground/60 text-lg leading-relaxed max-w-lg">
                Every project follows a deliberate process. This is how I
                approach solving real business problems — from the first
                conversation to the last deployment.
              </p>

              {/* Client trust note */}
              <div
                className="flex items-start gap-3 p-4 rounded-2xl border"
                style={{
                  background: "hsl(234 100% 68% / 0.05)",
                  borderColor: "hsl(234 100% 68% / 0.2)",
                }}
              >
                <span
                  className="text-xl leading-none flex-shrink-0"
                  aria-hidden="true"
                >
                  💡
                </span>
                <p className="font-body text-sm text-foreground/60 leading-relaxed">
                  <span className="font-semibold text-foreground/80">
                    Why does this matter to you?
                  </span>{" "}
                  A clear process means fewer surprises, better communication,
                  and a product that actually solves the problem — not just one
                  that looks good in a demo.
                </p>
              </div>
            </motion.div>

            {/* Steps timeline */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {steps.map((step, i) => (
                <StepCard
                  key={step.number}
                  step={step}
                  index={i}
                  isLast={i === steps.length - 1}
                />
              ))}
            </motion.div>
          </div>

          {/* ──────────────────────────────────────
              Right: sticky summary card
          ────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 32, scale: 0.97 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.65,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:sticky lg:top-28 flex flex-col gap-6"
          >
            {/* Overview card */}
            <div className="p-6 rounded-2xl bg-card border border-border shadow-card">
              <h3 className="font-heading font-bold text-lg mb-4 text-foreground">
                The Process at a Glance
              </h3>

              <ol className="flex flex-col gap-3" aria-label="Process overview">
                {steps.map((step) => (
                  <li key={step.number} className="flex items-center gap-3">
                    {/* Colored dot */}
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: step.color }}
                      aria-hidden="true"
                    />
                    {/* Step number label */}
                    <span
                      className="text-[10px] font-bold tabular-nums flex-shrink-0"
                      style={{ color: step.color, minWidth: "1.5rem" }}
                    >
                      {step.number}
                    </span>
                    {/* Title */}
                    <span className="font-body text-sm text-foreground/70 leading-tight">
                      {step.title}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* "What you get" card */}
            <div
              className="p-6 rounded-2xl border"
              style={{
                background:
                  "linear-gradient(135deg, hsl(234 100% 68% / 0.06) 0%, hsl(246 100% 74% / 0.06) 100%)",
                borderColor: "hsl(234 100% 68% / 0.2)",
              }}
            >
              <p className="font-heading font-semibold text-sm text-foreground mb-3">
                What you get working with me:
              </p>
              <ul className="flex flex-col gap-2" aria-label="Benefits">
                {[
                  { emoji: "✅", text: "Clear communication at every phase" },
                  { emoji: "📋", text: "Documented architecture & APIs" },
                  { emoji: "🔒", text: "Secure, production-ready code" },
                  { emoji: "📱", text: "Responsive across all devices" },
                  { emoji: "🚀", text: "Deployed and ready to scale" },
                ].map((item) => (
                  <li
                    key={item.text}
                    className="flex items-start gap-2.5 font-body text-sm text-foreground/65"
                  >
                    <span className="flex-shrink-0" aria-hidden="true">
                      {item.emoji}
                    </span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="w-full py-3.5 rounded-2xl text-white font-semibold font-body text-sm gradient-primary shadow-primary hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200"
            >
              Start Your Project →
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HowIBuild;
