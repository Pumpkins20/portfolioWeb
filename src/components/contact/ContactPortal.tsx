import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Linkedin,
  Github,
  Send,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { IllustrationPlaceholder } from "@/components/ui/illustration-placeholder";
import { cn } from "@/lib/utils";

// ── Social / contact links ───────────────────────────────────────
const contactLinks = [
  {
    id: "email",
    label: "Email",
    value: "firdausalamanad90@gmail.com",
    href: "mailto:firdausalamanad90@gmail.com",
    icon: Mail,
    color: "#5B6CFF",
    description: "Best for project inquiries",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/firdausalamanad",
    href: "https://linkedin.com/in/firdausalamanad",
    icon: Linkedin,
    color: "#0077B5",
    description: "Professional background",
  },
  {
    id: "github",
    label: "GitHub",
    value: "github.com/firdausalamanad",
    href: "https://github.com/firdausalamanad",
    icon: Github,
    color: "#181717",
    description: "Code & open source",
  },
];

// ── What I can help with ─────────────────────────────────────────
const services = [
  { emoji: "⚙️", label: "Full-stack web systems" },
  { emoji: "🎨", label: "UI/UX design & implementation" },
  { emoji: "🚀", label: "API design & backend architecture" },
  { emoji: "📱", label: "Mobile app development" },
  { emoji: "🛠️", label: "Website recovery & rebuilds" },
  { emoji: "🤖", label: "Workflow automation (n8n)" },
];

// ── Form types ───────────────────────────────────────────────────
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

// ── Simple validation ────────────────────────────────────────────
function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim() || !emailRe.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.subject.trim() || data.subject.trim().length < 4) {
    errors.subject = "Subject must be at least 4 characters.";
  }

  if (!data.message.trim() || data.message.trim().length < 20) {
    errors.message = "Message must be at least 20 characters.";
  }

  return errors;
}

// ── Input field ──────────────────────────────────────────────────
interface FieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  error?: string;
  required?: boolean;
  onChange: (value: string) => void;
  multiline?: boolean;
  rows?: number;
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
  value,
  error,
  required,
  onChange,
  multiline,
  rows = 4,
}: FieldProps) {
  const baseClass = cn(
    "w-full px-4 py-3 rounded-xl font-body text-sm text-foreground",
    "bg-background border transition-all duration-200 outline-none",
    "placeholder:text-foreground/30",
    "focus:ring-2 focus:ring-primary/30 focus:border-primary",
    error
      ? "border-destructive/50 ring-1 ring-destructive/20"
      : "border-border hover:border-primary/40"
  );

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-body text-sm font-semibold text-foreground/75"
      >
        {label}
        {required && (
          <span className="text-primary ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {multiline ? (
        <textarea
          id={id}
          name={id}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(baseClass, "resize-none")}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseClass}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-center gap-1.5 font-body text-xs text-destructive"
        >
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

// ── Contact form ─────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    budget: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const update = (field: keyof FormData) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear field error on change
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("submitting");

    // ── Replace this with your actual form submission logic ──
    // Options: EmailJS, Formspree, Resend, custom API endpoint, etc.
    // Example using mailto as a fallback:
    try {
      // Simulate a short delay (replace with real API call)
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Open mailto as a simple fallback until a real backend is wired up
      const subject = encodeURIComponent(form.subject);
      const body = encodeURIComponent(
        `Hi Firdaus,\n\nName: ${form.name}\nEmail: ${form.email}\nBudget: ${form.budget || "Not specified"}\n\n${form.message}`
      );
      window.location.href = `mailto:firdausalamanad90@gmail.com?subject=${subject}&body=${body}`;

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "", budget: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-5 py-12 px-6 rounded-2xl bg-card border border-border text-center"
        style={{ minHeight: 360 }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background: "hsl(155 59% 60% / 0.15)",
            border: "2px solid hsl(155 59% 60% / 0.4)",
          }}
        >
          <CheckCircle
            className="w-8 h-8"
            style={{ color: "#5ED6A3" }}
            aria-hidden="true"
          />
        </div>

        <div>
          <h3 className="font-heading font-bold text-xl text-foreground mb-2">
            Message sent! ☕
          </h3>
          <p className="font-body text-sm text-foreground/55 leading-relaxed max-w-xs">
            Thanks for reaching out. I'll review your message and get back to
            you within 1–2 business days.
          </p>
        </div>

        <button
          onClick={() => setStatus("idle")}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold font-body gradient-primary text-white shadow-primary hover:opacity-90 transition-opacity"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          id="name"
          label="Your Name"
          placeholder="John Smith"
          value={form.name}
          error={errors.name}
          required
          onChange={update("name")}
        />
        <Field
          id="email"
          label="Email Address"
          type="email"
          placeholder="john@company.com"
          value={form.email}
          error={errors.email}
          required
          onChange={update("email")}
        />
      </div>

      {/* Subject + Budget row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          id="subject"
          label="Subject"
          placeholder="Web system for my business"
          value={form.subject}
          error={errors.subject}
          required
          onChange={update("subject")}
        />

        {/* Budget selector */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="budget"
            className="font-body text-sm font-semibold text-foreground/75"
          >
            Budget Range{" "}
            <span className="font-normal text-foreground/35">(optional)</span>
          </label>
          <select
            id="budget"
            name="budget"
            value={form.budget}
            onChange={(e) => update("budget")(e.target.value)}
            className={cn(
              "w-full px-4 py-3 rounded-xl font-body text-sm text-foreground",
              "bg-background border border-border transition-all duration-200 outline-none",
              "hover:border-primary/40 focus:ring-2 focus:ring-primary/30 focus:border-primary",
              "appearance-none cursor-pointer"
            )}
          >
            <option value="">Select a range...</option>
            <option value="< $500">Under $500</option>
            <option value="$500 – $2,000">$500 – $2,000</option>
            <option value="$2,000 – $5,000">$2,000 – $5,000</option>
            <option value="$5,000+">$5,000+</option>
            <option value="Let's discuss">Let's discuss</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <Field
        id="message"
        label="Message"
        placeholder="Tell me about your project — what problem does it solve, who are the users, and what's your timeline?"
        value={form.message}
        error={errors.message}
        required
        onChange={update("message")}
        multiline
        rows={5}
      />

      {/* Error banner */}
      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-2.5 p-3 rounded-xl text-sm font-body border"
          style={{
            background: "hsl(0 84% 60% / 0.06)",
            borderColor: "hsl(0 84% 60% / 0.25)",
            color: "hsl(0 60% 45%)",
          }}
          role="alert"
        >
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
          <span>
            Something went wrong. Please try emailing me directly at{" "}
            <a
              href="mailto:firdausalamanad90@gmail.com"
              className="font-semibold underline"
            >
              firdausalamanad90@gmail.com
            </a>
          </span>
        </motion.div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        disabled={status === "submitting"}
        className="w-full gap-2 gradient-primary text-white font-semibold shadow-primary hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 border-0 py-3 h-auto"
        size="lg"
      >
        {status === "submitting" ? (
          <>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
              aria-hidden="true"
            />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" aria-hidden="true" />
            Send Message
          </>
        )}
      </Button>

      {/* Privacy note */}
      <p className="font-body text-xs text-foreground/35 text-center">
        Your information is only used to respond to your inquiry. No spam, ever.
      </p>
    </form>
  );
}

// ── Contact link card ────────────────────────────────────────────
function ContactLinkCard({
  link,
  index,
}: {
  link: (typeof contactLinks)[number];
  index: number;
}) {
  const Icon = link.icon;

  return (
    <motion.a
      href={link.href}
      target={link.id !== "email" ? "_blank" : undefined}
      rel={link.id !== "email" ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ x: 4 }}
      className="group flex items-center gap-4 p-4 rounded-2xl bg-card border border-border shadow-card hover:shadow-card-hover transition-all duration-300"
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{
          background: `${link.color}18`,
          border: `1px solid ${link.color}30`,
        }}
      >
        <Icon
          className="w-5 h-5"
          style={{ color: link.color }}
          strokeWidth={2}
          aria-hidden="true"
        />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="font-heading font-semibold text-sm text-foreground">
          {link.label}
        </p>
        <p className="font-body text-xs text-foreground/45 truncate mt-0.5">
          {link.value}
        </p>
        <p
          className="font-body text-[10px] mt-0.5"
          style={{ color: link.color }}
        >
          {link.description}
        </p>
      </div>

      {/* Arrow */}
      <ExternalLink
        className="w-3.5 h-3.5 flex-shrink-0 text-foreground/25 group-hover:text-foreground/60 transition-colors duration-200"
        aria-hidden="true"
      />
    </motion.a>
  );
}

// ── Main ContactPortal component ─────────────────────────────────
export function ContactPortal() {
  return (
    <section
      id="contact"
      className="relative section-padding overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(246 70% 97%) 50%, hsl(var(--background)) 100%)",
      }}
    >
      {/* ── Background decoration ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Glowing portal effect */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-10 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse, hsl(234 100% 68%) 0%, hsl(246 100% 74%) 50%, transparent 70%)",
          }}
        />
        {/* Bottom glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full opacity-15 blur-2xl"
          style={{
            background:
              "radial-gradient(ellipse, hsl(31 100% 71%) 0%, transparent 70%)",
          }}
        />

        {/* Dot grid */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="contact-dots"
              x="0"
              y="0"
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.5" fill="hsl(234 100% 68%)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-dots)" />
        </svg>
      </div>

      <div className="container-wide mx-auto relative z-10">
        {/* ══════════════════════════════════════════
            Section header
        ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-4 text-center mb-14"
        >
          {/* Eyebrow */}
          <span className="section-label">
            <MessageSquare className="w-4 h-4" aria-hidden="true" />
            Contact Portal
          </span>

          <h2 className="font-heading font-bold max-w-2xl">
            Let&rsquo;s build{" "}
            <span className="text-gradient">something together</span>
          </h2>

          <p className="font-body text-foreground/60 text-lg leading-relaxed max-w-xl">
            Have a project in mind, a problem to solve, or just want to talk
            shop? The portal is open. ☕
          </p>
        </motion.div>

        {/* ══════════════════════════════════════════
            Main content grid
        ══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-10 xl:gap-14 items-start">
          {/* ──────────────────────────────────────
              Left column: info panel
          ────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            {/* Availability card */}
            <div
              className="p-5 rounded-2xl border flex items-start gap-3"
              style={{
                background: "hsl(155 59% 60% / 0.08)",
                borderColor: "hsl(155 59% 60% / 0.3)",
              }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-0.5 bg-[#5ED6A3] animate-pulse-glow"
                aria-label="Available"
              />
              <div>
                <p className="font-heading font-semibold text-sm text-foreground">
                  Available for new projects
                </p>
                <p className="font-body text-xs text-foreground/50 mt-0.5 leading-relaxed">
                  Currently accepting freelance work. Typical response time is
                  within 24 hours on business days.
                </p>
              </div>
            </div>

            {/* Illustration placeholder */}
            <IllustrationPlaceholder
              scene="Contact Portal"
              icon="🌀"
              description="Glowing portal · Mascot inviting collaboration · Floating message icons · Code symbols"
              variant="scene"
              height={260}
              className="w-full"
            />

            {/* Contact links */}
            <div className="flex flex-col gap-3">
              {contactLinks.map((link, i) => (
                <ContactLinkCard key={link.id} link={link} index={i} />
              ))}
            </div>

            {/* Services I offer */}
            <div className="p-5 rounded-2xl bg-card border border-border shadow-card">
              <h3 className="font-heading font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                <span aria-hidden="true">🛠️</span>
                What I can help with
              </h3>
              <ul className="flex flex-col gap-2">
                {services.map((service) => (
                  <li
                    key={service.label}
                    className="flex items-center gap-2.5 font-body text-sm text-foreground/65"
                  >
                    <span className="text-base leading-none flex-shrink-0" aria-hidden="true">
                      {service.emoji}
                    </span>
                    {service.label}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* ──────────────────────────────────────
              Right column: contact form
          ────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="p-6 md:p-8 rounded-2xl bg-card border border-border shadow-card"
          >
            {/* Form header */}
            <div className="flex flex-col gap-1.5 mb-6">
              <h3 className="font-heading font-bold text-xl text-foreground">
                Start a conversation
              </h3>
              <p className="font-body text-sm text-foreground/50">
                Fill in the details below and I'll get back to you with a plan.
              </p>
            </div>

            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactPortal;
