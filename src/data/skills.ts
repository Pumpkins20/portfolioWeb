export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: "master" | "advanced" | "proficient" | "learning";
  levelPercent: number; // 0-100
  description: string;
  // Game / forge concept
  artifactName: string; // what this tool becomes in the forge world
  artifactEmoji: string;
  color: string; // card accent color (hex)
  iconName: string; // lucide icon name or custom key
  yearsExp?: number;
}

export type SkillCategory =
  | "backend"
  | "frontend"
  | "database"
  | "devops"
  | "design"
  | "other";

export interface SkillGroup {
  category: SkillCategory;
  label: string;
  emoji: string;
  description: string;
  color: string;
}

export const skillGroups: SkillGroup[] = [
  {
    category: "backend",
    label: "Backend Engine",
    emoji: "⚙️",
    description: "The powerhouse that drives business logic",
    color: "#5B6CFF",
  },
  {
    category: "frontend",
    label: "UI Builder",
    emoji: "🎨",
    description: "Crafting interfaces users love to interact with",
    color: "#8A7CFF",
  },
  {
    category: "database",
    label: "Data Vault",
    emoji: "🗄️",
    description: "Where data is stored, structured, and retrieved",
    color: "#5ED6A3",
  },
  {
    category: "devops",
    label: "Deploy Forge",
    emoji: "🚀",
    description: "Shipping and running systems in the real world",
    color: "#FFB86B",
  },
  {
    category: "design",
    label: "Design Studio",
    emoji: "✏️",
    description: "Translating ideas into visual experiences",
    color: "#FF7AA2",
  },
  {
    category: "other",
    label: "Utility Belt",
    emoji: "🔧",
    description: "Essential tools that keep everything running",
    color: "#67B7FF",
  },
];

export const skills: Skill[] = [
  // ── Backend ──────────────────────────────────────────────────
  {
    id: "laravel",
    name: "Laravel",
    category: "backend",
    level: "master",
    levelPercent: 90,
    description:
      "Primary backend framework — used for building REST APIs, web systems, and business logic layers.",
    artifactName: "Backend Engine",
    artifactEmoji: "⚙️",
    color: "#FF4B2B",
    iconName: "laravel",
    yearsExp: 3,
  },
  {
    id: "php",
    name: "PHP",
    category: "backend",
    level: "master",
    levelPercent: 88,
    description:
      "Foundation language behind Laravel — solid understanding of OOP, design patterns, and server-side logic.",
    artifactName: "Script Core",
    artifactEmoji: "📜",
    color: "#787CB5",
    iconName: "php",
    yearsExp: 3,
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    level: "proficient",
    levelPercent: 65,
    description:
      "Used for real-time features and event-driven services, including WebSocket integrations.",
    artifactName: "Real-time Core",
    artifactEmoji: "⚡",
    color: "#68A063",
    iconName: "nodejs",
    yearsExp: 1,
  },
  {
    id: "rest-api",
    name: "REST API",
    category: "backend",
    level: "master",
    levelPercent: 92,
    description:
      "Designing and building clean, versioned, and documented REST APIs for web and mobile clients.",
    artifactName: "API Gateway",
    artifactEmoji: "🔌",
    color: "#5B6CFF",
    iconName: "api",
    yearsExp: 3,
  },

  // ── Frontend ─────────────────────────────────────────────────
  {
    id: "react",
    name: "React",
    category: "frontend",
    level: "advanced",
    levelPercent: 82,
    description:
      "Building component-driven UIs, SPAs, and dashboards with React and its ecosystem.",
    artifactName: "UI Builder",
    artifactEmoji: "🎨",
    color: "#61DAFB",
    iconName: "react",
    yearsExp: 2,
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "frontend",
    level: "proficient",
    levelPercent: 70,
    description:
      "Server-rendered React apps with App Router, SSG, and API routes for full-stack projects.",
    artifactName: "SSR Engine",
    artifactEmoji: "🌐",
    color: "#000000",
    iconName: "nextjs",
    yearsExp: 1,
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    level: "proficient",
    levelPercent: 72,
    description:
      "Type-safe development across frontend and backend for more reliable, maintainable codebases.",
    artifactName: "Type Shield",
    artifactEmoji: "🛡️",
    color: "#3178C6",
    iconName: "typescript",
    yearsExp: 2,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    level: "advanced",
    levelPercent: 85,
    description:
      "Utility-first CSS framework — fast, consistent, and maintainable UI styling.",
    artifactName: "Style Anvil",
    artifactEmoji: "🎭",
    color: "#06B6D4",
    iconName: "tailwind",
    yearsExp: 2,
  },

  // ── Database ─────────────────────────────────────────────────
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "database",
    level: "advanced",
    levelPercent: 80,
    description:
      "Primary relational database — complex queries, schema design, and performance optimization.",
    artifactName: "Data Vault",
    artifactEmoji: "🗄️",
    color: "#336791",
    iconName: "postgresql",
    yearsExp: 2,
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "database",
    level: "advanced",
    levelPercent: 82,
    description:
      "Extensive usage in business applications, inventory systems, and CMS backends.",
    artifactName: "Data Vault",
    artifactEmoji: "🗃️",
    color: "#4479A1",
    iconName: "mysql",
    yearsExp: 3,
  },

  // ── DevOps ───────────────────────────────────────────────────
  {
    id: "docker",
    name: "Docker",
    category: "devops",
    level: "proficient",
    levelPercent: 68,
    description:
      "Containerizing applications for consistent environments from development to production.",
    artifactName: "Container Ship",
    artifactEmoji: "🐳",
    color: "#2496ED",
    iconName: "docker",
    yearsExp: 1,
  },
  {
    id: "git",
    name: "Git",
    category: "devops",
    level: "advanced",
    levelPercent: 85,
    description:
      "Version control, branching strategies, and collaborative workflows for every project.",
    artifactName: "Time Machine",
    artifactEmoji: "⏳",
    color: "#F05032",
    iconName: "git",
    yearsExp: 4,
  },
  {
    id: "github",
    name: "GitHub",
    category: "devops",
    level: "advanced",
    levelPercent: 83,
    description:
      "Repository management, CI/CD with GitHub Actions, and open-source collaboration.",
    artifactName: "Code Archive",
    artifactEmoji: "🗂️",
    color: "#181717",
    iconName: "github",
    yearsExp: 4,
  },

  // ── Design ───────────────────────────────────────────────────
  {
    id: "figma",
    name: "Figma",
    category: "design",
    level: "advanced",
    levelPercent: 80,
    description:
      "UI/UX design, wireframing, and design system creation before a single line of code is written.",
    artifactName: "Design Blueprint",
    artifactEmoji: "📐",
    color: "#F24E1E",
    iconName: "figma",
    yearsExp: 2,
  },

  // ── Other ────────────────────────────────────────────────────
  {
    id: "wordpress",
    name: "WordPress",
    category: "other",
    level: "advanced",
    levelPercent: 78,
    description:
      "Rapid site recovery, custom theme development, and CMS-based business websites.",
    artifactName: "CMS Forge",
    artifactEmoji: "📰",
    color: "#21759B",
    iconName: "wordpress",
    yearsExp: 3,
  },
  {
    id: "n8n",
    name: "n8n",
    category: "other",
    level: "proficient",
    levelPercent: 65,
    description:
      "Workflow automation — connecting systems, triggering events, and reducing manual processes.",
    artifactName: "Auto Engine",
    artifactEmoji: "🤖",
    color: "#EA4B71",
    iconName: "n8n",
    yearsExp: 1,
  },
  {
    id: "react-native",
    name: "React Native",
    category: "other",
    level: "proficient",
    levelPercent: 62,
    description:
      "Cross-platform mobile development with shared React knowledge and native performance.",
    artifactName: "Mobile Forge",
    artifactEmoji: "📱",
    color: "#61DAFB",
    iconName: "react-native",
    yearsExp: 1,
  },
];

export const skillLevels: Record<
  Skill["level"],
  { label: string; color: string; bgColor: string }
> = {
  master: {
    label: "Master",
    color: "#5B6CFF",
    bgColor: "hsl(234 100% 68% / 0.12)",
  },
  advanced: {
    label: "Advanced",
    color: "#5ED6A3",
    bgColor: "hsl(155 59% 60% / 0.12)",
  },
  proficient: {
    label: "Proficient",
    color: "#FFB86B",
    bgColor: "hsl(31 100% 71% / 0.12)",
  },
  learning: {
    label: "Learning",
    color: "#FF7AA2",
    bgColor: "hsl(342 100% 74% / 0.12)",
  },
};

// Skills to highlight in the hero / overview (top picks)
export const topSkills = ["laravel", "react", "postgresql", "rest-api", "docker", "git"];
