export interface JourneyMilestone {
  id: string;
  year: string;
  period?: string; // e.g. "2021 – 2025"
  title: string;
  subtitle: string;
  description: string;
  type: "education" | "career" | "achievement" | "turning-point";
  emoji: string;
  color: string; // accent color (hex)
  tags?: string[];
  isCurrent?: boolean;
}

export const journey: JourneyMilestone[] = [
  {
    id: "smk-rpl",
    year: "2018",
    period: "2018 – 2021",
    title: "SMK Negeri 2 Surakarta",
    subtitle: "Rekayasa Perangkat Lunak",
    description:
      "Started the journey in software engineering vocational school. First exposure to programming fundamentals, web basics, and desktop application development. This is where the love for building things with code began.",
    type: "education",
    emoji: "🏫",
    color: "#5ED6A3",
    tags: ["HTML", "CSS", "Pascal", "Visual Basic", "Web Basics"],
  },
  {
    id: "first-code",
    year: "2019",
    title: "First Lines of Code",
    subtitle: "The Spark",
    description:
      "Wrote the very first functional web page. A simple HTML/CSS site that felt like magic — seeing something come alive in the browser for the first time is something you never forget.",
    type: "turning-point",
    emoji: "✨",
    color: "#FFB86B",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: "first-project",
    year: "2020",
    title: "First Real Project",
    subtitle: "From Learning to Building",
    description:
      "Completed the first client-facing mini project during vocational training. Learned the difference between writing code for practice and writing code that solves real problems for real people.",
    type: "career",
    emoji: "🚀",
    color: "#67B7FF",
    tags: ["PHP", "MySQL", "Bootstrap"],
  },
  {
    id: "universitas",
    year: "2021",
    period: "2021 – 2025",
    title: "Universitas Duta Bangsa",
    subtitle: "Teknik Informatika",
    description:
      "Pursued a degree in Informatics Engineering to deepen theoretical foundations alongside practical skills. Studied algorithms, software architecture, databases, and systems design while continuously building side projects.",
    type: "education",
    emoji: "🎓",
    color: "#8A7CFF",
    tags: ["Algorithms", "Data Structures", "Software Architecture", "Networking"],
  },
  {
    id: "laravel-react",
    year: "2022",
    title: "Full Stack Journey Begins",
    subtitle: "Laravel + React Stack",
    description:
      "Committed deeply to a full-stack skill set. Laravel became the go-to backend framework for its elegant syntax and powerful ecosystem, paired with React for building dynamic and responsive user interfaces.",
    type: "turning-point",
    emoji: "⚒️",
    color: "#5B6CFF",
    tags: ["Laravel", "React", "REST API", "MySQL", "Tailwind CSS"],
  },
  {
    id: "freelance-start",
    year: "2023",
    title: "Freelance Development",
    subtitle: "Building for Real Clients",
    description:
      "Started taking on freelance projects — from SCADA monitoring dashboards and inventory systems to emergency website recoveries. Each project brought new constraints, deadlines, and lessons that no textbook could teach.",
    type: "career",
    emoji: "💼",
    color: "#FF7AA2",
    tags: ["Laravel", "React", "PostgreSQL", "Docker", "WordPress"],
  },
  {
    id: "systems-mindset",
    year: "2024",
    title: "Systems Thinking",
    subtitle: "Beyond Code — Architecture & Design",
    description:
      "Shifted perspective from just writing code to designing complete systems. Started every project with Figma wireframes, database schema planning, and API contract definitions before touching the keyboard. Code became the last step, not the first.",
    type: "turning-point",
    emoji: "🏗️",
    color: "#FFB86B",
    tags: ["Figma", "System Design", "API Design", "Docker", "n8n"],
  },
  {
    id: "graduation",
    year: "2025",
    title: "Bachelor of Informatics",
    subtitle: "Universitas Duta Bangsa — Graduated",
    description:
      "Completed the degree while actively freelancing. The combination of academic knowledge and real-world project experience created a developer capable of understanding both the business problem and the technical solution.",
    type: "education",
    emoji: "🎓",
    color: "#5ED6A3",
    tags: ["Thesis", "Software Engineering", "Full Stack"],
  },
  {
    id: "now",
    year: "2026",
    title: "Building Scalable Systems",
    subtitle: "Full-Stack Freelancer",
    description:
      "Currently working as an independent full-stack developer, helping startups and businesses turn complex ideas into clean, scalable web systems. From architecture to deployment — handling the entire product lifecycle solo.",
    type: "career",
    emoji: "☕",
    color: "#5B6CFF",
    tags: ["Laravel", "React", "Next.js", "PostgreSQL", "Docker", "REST API"],
    isCurrent: true,
  },
];

export const journeyStats = [
  { label: "Years Coding", value: "6+", emoji: "💻" },
  { label: "Projects Shipped", value: "10+", emoji: "🚀" },
  { label: "Happy Clients", value: "5+", emoji: "🤝" },
  { label: "Cups of Coffee", value: "∞", emoji: "☕" },
];
