export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  challenge: string;
  role: string;
  techStack: string[];
  category: "fullstack" | "frontend" | "backend" | "mobile" | "cms";
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string; // leave empty until screenshots are ready
  color: string; // accent color for the card
}

export const projects: Project[] = [
  {
    id: "scada-monitoring",
    title: "SCADA Monitoring Dashboard",
    subtitle: "Industrial System Integration",
    description:
      "Real-time monitoring dashboard for industrial sensors and HMI devices, built to handle high-frequency data streams with low latency.",
    challenge:
      "Client needed a system to monitor industrial sensors and HMI in real-time with minimal delay and maximum reliability.",
    role: "Independently designed backend architecture, structured the database schema, and built a dashboard capable of handling industrial data streams with low latency.",
    techStack: ["Laravel", "React", "PostgreSQL", "WebSocket", "REST API"],
    category: "fullstack",
    featured: true,
    color: "#5B6CFF",
    imageUrl: "/projects/scada-mockup.webp",
  },
  {
    id: "ptpn-radio",
    title: "PTPN Radio Website Recovery & Rebuild",
    subtitle: "Crisis Management & Web Development",
    description:
      "Emergency recovery and complete rebuild of a radio broadcasting company's website after a critical failure disrupted all digital operations.",
    challenge:
      "Client's website experienced a critical error that paralyzed their entire digital operation.",
    role: "Took over troubleshooting quickly and rebuilt the website from scratch using WordPress and Elementor, ensuring future stability and reliability.",
    techStack: ["WordPress", "Elementor", "PHP", "MySQL"],
    category: "cms",
    featured: true,
    color: "#8A7CFF",
    imageUrl: "/projects/ptpn-radio.png",
    liveUrl: "https://ptpnradio.com/",
  },
  {
    id: "hotel-penginapan",
    title: "HOTLE",
    subtitle: "Hospitality Web Design",
    description:
      "Elegant Inn and lodging website built with Webflow, featuring luxury visual design, room showcase, amenities display, and a seamless guest booking experience.",
    challenge:
      "The client needed a professional, visually stunning hotel website to attract guests and showcase their property's elegance and facilities online.",
    role: "Designed and developed a complete hotel website using Webflow — from wireframe to deployment — focusing on luxury aesthetics, responsive layouts, and conversion-optimized pages.",
    techStack: ["Webflow", "HTML", "CSS", "JavaScript"],
    category: "frontend",
    featured: true,
    color: "#FFB86B",
    imageUrl: "/projects/hotel-penginapan.png",
    liveUrl: "https://hotle.webflow.io/",
  },
  // {
  //   id: "si-haki",
  //   title: "Dokumen aproval SIHAKI",
  //   subtitle: "Business Operation Software",
  //   description:
  //     "Custom-built inventory and pricing management system tailored to the specific workflow of a laptop retail business.",
  //   challenge:
  //     "A new laptop sales business needed an accurate stock recording and pricing determination system.",
  //   role: "Built a custom inventory management system from scratch, specifically tailored to the client's workflow and pricing structure.",
  //   techStack: ["Laravel", "MySQL", "REST API", "Bootstrap"],
  //   category: "backend",
  //   featured: false,
  //   color: "#5ED6A3",
  //   githubUrl: "https://github.com/Pumpkins20/siHaki",
  // },
  {
    id: "saestri-mobile",
    title: "Saestri Mobile App",
    subtitle: "Mobile App Development",
    description:
      "Mobile application with revamped UI/UX design and iterative feature improvements to keep users engaged and the app relevant.",
    challenge:
      "Required mobile app development from initial setup through feature updates, with a need for UI/UX improvements.",
    role: "Handled UI/UX design revamp and incremental feature implementation to ensure the app remained relevant and interactive for users.",
    techStack: ["React Native", "REST API", "Figma"],
    category: "mobile",
    featured: false,
    color: "#FF7AA2",
    imageUrl: "/projects/saestri-mobile.webp",
    liveUrl: "https://play.google.com/store/apps/details?id=com.saestri",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const categories = [
  { id: "all", label: "All Projects" },
  { id: "fullstack", label: "Full Stack" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "mobile", label: "Mobile" },
  { id: "cms", label: "CMS" },
] as const;
