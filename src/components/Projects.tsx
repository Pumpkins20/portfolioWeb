import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Desa Lebak Website",
    description: "Website landing page yang berisikan profile sebuah Desa yang terletak di Wonogiri. Website ini menyajikan data dari keseluruhan desa termasuk infografis kependudukan, misi desa, dan portofolio.",
    tags: ["Web Development", "Landing Page", "Data Visualization"],
    gradient: "from-cyan-500 to-blue-500",
    url: "https://profil-desa.vercel.app/"
  },
  {
    title: "E-Posyandu",
    description: "Website yang terintegrasi dengan IoT untuk pengukuran berat dan tinggi badan untuk digitalisasi posyandu. Dilengkapi dengan dashboard management user, booking system, dan pencatatan data anak.",
    tags: ["IoT", "Web App", "Healthcare", "Dashboard"],
    gradient: "from-blue-500 to-purple-500",
    url: "https://eposyandu.edutic.id"
  },
  {
    title: "SiHaki - Sistem Informasi HKI",
    description: "Website landing page dengan dashboard untuk pengelolaan SiHAKI (Sistem Informasi Hak Kekayaan Intelektual) di STMIK AMIKOM Surakarta. Fitur lengkap untuk pengajuan, peninjauan, dan manajemen HKI.",
    tags: ["Web Development", "Dashboard", "Management System"],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "LMS Edutic.id Academy",
    description: "Website LMS menggunakan WordPress untuk academy.edutic.id. Platform pembelajaran untuk meningkatkan talenta digital dengan program pelatihan Industrial IoT berbasis proyek dan sertifikasi resmi BNSP.",
    tags: ["WordPress", "LMS", "E-Learning", "IoT Training"],
    gradient: "from-pink-500 to-red-500",
    url: "https://academy.edutic.id"
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
            Featured Projects
          </span>
        </h2>
        <div className="w-20 h-1 bg-gradient-primary mx-auto mb-12" />

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="group bg-card/50 backdrop-blur border border-border rounded-xl overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-glow-cyan"
            >
              {/* Gradient Top Bar */}
              <div className={`w-full h-2 bg-gradient-to-r ${project.gradient}`} />
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors flex items-center gap-2">
                  {project.title}
                  <a
                    href={project.url} // misalnya project.url = "https://noveracode.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                  <ExternalLink className="w-4 h-4" />
                  </a>
                </h3>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/20 rounded-full hover:bg-primary/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
