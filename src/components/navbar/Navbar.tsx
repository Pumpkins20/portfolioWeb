import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Activity", href: "#activity" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Track scroll position for glass effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          isScrolled
            ? "glass shadow-card py-3"
            : "bg-transparent py-5"
        )}
      >
        <nav className="container-wide mx-auto flex items-center justify-between">
          {/* ── Logo ── */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 group"
            aria-label="Back to top"
          >
            {/* Logo icon */}
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center gradient-primary shadow-primary transition-transform duration-300 group-hover:scale-110"
            >
              <Coffee className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>

            {/* Logo wordmark */}
            <span
              className="font-heading font-bold text-lg leading-none"
              style={{ color: "hsl(var(--foreground))" }}
            >
              firdaus
              <span className="text-gradient">.dev</span>
            </span>
          </a>

          {/* ── Desktop nav links ── */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={cn(
                      "relative px-4 py-2 rounded-xl text-sm font-medium font-body transition-all duration-200",
                      isActive
                        ? "text-primary"
                        : "text-foreground/60 hover:text-foreground/90"
                    )}
                  >
                    {link.label}
                    {/* Active underline */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: "hsl(234 100% 68% / 0.1)",
                          border: "1px solid hsl(234 100% 68% / 0.2)",
                        }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* ── Right side: Hire Me + mobile toggle ── */}
          <div className="flex items-center gap-3">
            {/* Hire Me CTA */}
            <Button
              size="sm"
              className="hidden md:inline-flex gradient-primary text-white font-semibold shadow-primary hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 border-0"
              onClick={() => handleNavClick("#contact")}
            >
              Hire Me
            </Button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileOpen((v) => !v)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl transition-colors hover:bg-muted"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 45, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-5 h-5 text-foreground" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -45, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-5 h-5 text-foreground" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-foreground/10 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="mobile-drawer"
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-20 inset-x-4 z-50 md:hidden rounded-2xl glass shadow-card-hover overflow-hidden"
            >
              <div className="p-4 flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <motion.button
                      key={link.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.05 }}
                      onClick={() => handleNavClick(link.href)}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-xl text-sm font-medium font-body transition-all duration-200",
                        isActive
                          ? "text-primary bg-primary/10"
                          : "text-foreground/70 hover:text-foreground hover:bg-muted"
                      )}
                    >
                      {link.label}
                    </motion.button>
                  );
                })}

                {/* Hire Me — mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                  className="pt-2 border-t border-border mt-1"
                >
                  <Button
                    className="w-full gradient-primary text-white font-semibold border-0 shadow-primary"
                    onClick={() => handleNavClick("#contact")}
                  >
                    Hire Me ✨
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
