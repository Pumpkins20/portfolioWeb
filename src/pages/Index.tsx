import { Navbar } from "@/components/navbar/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { SkillForge } from "@/components/skills/SkillForge";
import { ProjectLab } from "@/components/projects/ProjectLab";
import { HowIBuild } from "@/components/how/HowIBuild";
import { GithubMountain } from "@/components/github/GithubMountain";
import { JourneyPath } from "@/components/journey/JourneyPath";
import { ContactPortal } from "@/components/contact/ContactPortal";
import { Footer } from "@/components/footer/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Fixed top navigation ── */}
      <Navbar />

      <main>
        {/* 🏠 Base Camp — first impression, hero intro */}
        <HeroSection />

        {/* ⚒ Skill Forge — tech stack as forge artifacts */}
        <SkillForge />

        {/* 🧪 Project Lab — portfolio experiments */}
        <ProjectLab />

        {/* 🏗️ How I Build Systems — process / credibility */}
        <HowIBuild />

        {/* ⛰ GitHub Mountain — activity & commit graph */}
        <GithubMountain />

        {/* 🧭 Journey Path — career timeline */}
        <JourneyPath />

        {/* 🌀 Contact Portal — collaboration gateway */}
        <ContactPortal />
      </main>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
};

export default Index;
