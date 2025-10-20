import { GraduationCap } from "lucide-react";

const education = [
  {
    institution: "Universitas Duta Bangsa",
    degree: "Teknik Informatika",
    period: "2021 - 2025",
    status: "completed",
  },
  {
    institution: "SMK Negeri 2 Surakarta",
    degree: "Rekayasa Perangkat Lunak",
    period: "2018 - 2021",
    status: "completed",
  },
];

export const Education = () => {
  return (
    <section id="education" className="py-24 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
            Education
          </span>
        </h2>
        <div className="w-20 h-1 bg-gradient-primary mx-auto mb-12" />

        <div className="max-w-3xl mx-auto space-y-8">
          {education.map((edu, index) => (
            <div 
              key={index}
              className="relative pl-8 pb-8 border-l-2 border-primary/30 last:pb-0 group hover:border-primary transition-colors"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary group-hover:scale-125 transition-transform" />
              
              <div className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-all hover:shadow-glow-cyan">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{edu.institution}</h3>
                      {edu.status === "current" && (
                        <span className="px-3 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-2">{edu.degree}</p>
                    <p className="text-sm text-primary">{edu.period}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
