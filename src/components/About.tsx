import { Code2, Cpu } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto mb-12" />

          <div className="space-y-8">
            <div className="bg-card border border-border rounded-xl p-8 hover:border-primary transition-colors">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Saya adalah seorang mahasiswa S1 Teknik Informatika di Universitas Duta Bangsa. 
                Saya memiliki ketertarikan di bidang Informatika khususnya pada Website Development 
                dan Internet of Things.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-xl p-8 hover:border-primary transition-all hover:shadow-glow-cyan group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Code2 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Website Developer</h3>
                </div>
                <p className="text-muted-foreground">
                  Memiliki ketertarikan serta selalu belajar hal baru mengenai Website Programming 
                  dan memiliki keuletan dalam mengembangkan solusi digital yang inovatif.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-8 hover:border-primary transition-all hover:shadow-glow-cyan group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Cpu className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">IoT Specialist</h3>
                </div>
                <p className="text-muted-foreground">
                  Memiliki basic merancang dan memprogram sistem Internet of Things untuk 
                  menciptakan solusi teknologi yang terhubung dan cerdas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
