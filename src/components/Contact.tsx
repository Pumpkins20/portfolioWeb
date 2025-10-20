import { Mail, Instagram, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactInfo = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Firdaus Alamanda",
    href: "https://www.linkedin.com/in/firdaus-alamanda-9b33b0263",
  },
  {
    icon: Mail,
    label: "Email",
    value: "firdausalamanda90@gmail.com",
    href: "mailto:firdausalamanda90@gmail.com",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@daus_dhas",
    href: "https://instagram.com/daus_dhas",
  },
  {
    icon: Github,
    label: "Github",
    value: "Pumpkins20",
    href: "https://github.com/Pumpkins20",
  },
];

export const Contact = () => {
  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
            Let's Work Together
          </span>
        </h2>
        <div className="w-20 h-1 bg-gradient-primary mx-auto mb-12" />

        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-8 hover:border-primary transition-all hover:shadow-glow-cyan">
            <p className="text-center text-lg text-muted-foreground mb-8">
              Interested in working together? Feel free to reach out through any of the following channels:
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <a
                    key={index}
                    href={contact.href}
                    target={contact.href.startsWith("http") ? "_blank" : undefined}
                    rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group"
                  >
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-primary/10 border border-border hover:border-primary transition-all">
                      <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-muted-foreground">{contact.label}</p>
                        <p className="font-medium truncate group-hover:text-primary transition-colors">
                          {contact.value}
                        </p>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <Button 
                size="lg"
                className="bg-gradient-primary hover:opacity-90 transition-opacity"
                asChild
              >
                <a href="mailto:firdausalamanda90@gmail.com">
                  Send Email
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
