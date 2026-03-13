import { motion } from "framer-motion";
import { Coffee, Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";

// ── Nav links (mirrors Navbar) ───────────────────────────────────
const footerLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Activity", href: "#activity" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

// ── Social links ─────────────────────────────────────────────────
const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/firdausalamanad",
    icon: Github,
    color: "#181717",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/firdausalamanad",
    icon: Linkedin,
    color: "#0077B5",
  },
  {
    label: "Email",
    href: "mailto:firdausalamanad90@gmail.com",
    icon: Mail,
    color: "#5B6CFF",
  },
];

// ── Scroll to top ────────────────────────────────────────────────
function ScrollToTopButton() {
  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      whileHover={{ y: -3, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-200 hover:shadow-card"
      style={{
        background: "hsl(234 100% 68% / 0.08)",
        borderColor: "hsl(234 100% 68% / 0.2)",
        color: "hsl(234 100% 68%)",
      }}
      aria-label="Scroll back to top"
    >
      <ArrowUp className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
    </motion.button>
  );
}

// ── Main Footer ──────────────────────────────────────────────────
export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer
      className="relative overflow-hidden border-t"
      style={{
        background:
          "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(227 60% 96%) 100%)",
        borderColor: "hsl(var(--border))",
      }}
    >
      {/* ── Subtle top glow ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[120px] rounded-full opacity-10 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse, hsl(234 100% 68%) 0%, transparent 70%)",
        }}
      />

      <div className="container-wide mx-auto relative z-10">
        {/* ══════════════════════════════════════════
            Main footer content
        ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="pt-12 pb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-10 md:gap-16 mb-10">
            {/* ──────────────────────────────────────
                Brand column
            ────────────────────────────────────── */}
            <div className="flex flex-col gap-4 max-w-sm">
              {/* Logo */}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center gap-2.5 group w-fit"
                aria-label="Back to top"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center gradient-primary shadow-primary transition-transform duration-300 group-hover:scale-110"
                >
                  <Coffee className="w-4.5 h-4.5 text-white" strokeWidth={2.5} aria-hidden="true" />
                </div>
                <span className="font-heading font-bold text-xl leading-none">
                  firdaus
                  <span className="text-gradient">.dev</span>
                </span>
              </a>

              {/* Tagline */}
              <p className="font-body text-sm text-foreground/55 leading-relaxed">
                Full-Stack Developer crafting clean, scalable web systems for
                startups and businesses.{" "}
                <span className="font-medium text-foreground/70">
                  Turning Coffee Into Code ☕
                </span>
              </p>

              {/* Social links */}
              <div className="flex items-center gap-2.5" aria-label="Social media links">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target={link.label !== "Email" ? "_blank" : undefined}
                      rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                      whileHover={{ y: -2, scale: 1.08 }}
                      transition={{ duration: 0.15 }}
                      className="w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-200"
                      style={{
                        background: `${link.color}12`,
                        borderColor: `${link.color}25`,
                        color: link.color,
                      }}
                      aria-label={`Visit ${link.label}`}
                    >
                      <Icon className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* ──────────────────────────────────────
                Navigation column
            ────────────────────────────────────── */}
            <div className="flex flex-col gap-3">
              <h3 className="font-heading font-semibold text-sm text-foreground/70 uppercase tracking-widest">
                Navigate
              </h3>
              <nav aria-label="Footer navigation">
                <ul className="flex flex-col gap-2">
                  {footerLinks.map((link) => (
                    <li key={link.href}>
                      <button
                        onClick={() => handleNavClick(link.href)}
                        className="font-body text-sm text-foreground/55 hover:text-primary transition-colors duration-200 text-left"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* ──────────────────────────────────────
                Quick contact column
            ────────────────────────────────────── */}
            <div className="flex flex-col gap-3">
              <h3 className="font-heading font-semibold text-sm text-foreground/70 uppercase tracking-widest">
                Get in Touch
              </h3>
              <div className="flex flex-col gap-2">
                <a
                  href="mailto:firdausalamanad90@gmail.com"
                  className="font-body text-sm text-foreground/55 hover:text-primary transition-colors duration-200 break-all"
                >
                  firdausalamanad90@gmail.com
                </a>
                <a
                  href="https://linkedin.com/in/firdausalamanad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-foreground/55 hover:text-primary transition-colors duration-200"
                >
                  LinkedIn Profile
                </a>
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="font-body text-sm font-semibold text-left transition-all duration-200 hover:-translate-y-0.5 w-fit"
                  style={{ color: "hsl(234 100% 68%)" }}
                >
                  Start a Project →
                </button>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════
              Divider
          ══════════════════════════════════════════ */}
          <div
            className="h-px w-full mb-6"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, hsl(var(--border)) 20%, hsl(var(--border)) 80%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          {/* ══════════════════════════════════════════
              Bottom bar
          ══════════════════════════════════════════ */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-1.5 text-center sm:text-left">
              <p className="font-body text-xs text-foreground/40">
                &copy; {currentYear} Firdaus Alamanda. All rights reserved.
              </p>
              <span
                className="hidden sm:inline text-foreground/25 text-xs"
                aria-hidden="true"
              >
                ·
              </span>
              <p className="font-body text-xs text-foreground/35 flex items-center gap-1">
                Built with
                <Heart
                  className="w-3 h-3 inline text-pink-400"
                  fill="currentColor"
                  aria-hidden="true"
                />
                using React &amp; Tailwind CSS
              </p>
            </div>

            {/* Right: badge + scroll-to-top */}
            <div className="flex items-center gap-3">
              {/* "Open to work" badge */}
              <div
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold"
                style={{
                  background: "hsl(155 59% 60% / 0.12)",
                  color: "hsl(155 59% 40%)",
                  border: "1px solid hsl(155 59% 60% / 0.3)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#5ED6A3] animate-pulse"
                  aria-hidden="true"
                />
                Open to freelance work
              </div>

              <ScrollToTopButton />
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
