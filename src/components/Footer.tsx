import { Github, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-background-dark text-primary-foreground py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-4 flex items-center gap-2">
              <Heart className="h-5 w-5 text-secondary" />
              Orphanage Platform
            </h3>
            <p className="text-primary-foreground/80 leading-relaxed">
              Empowering orphanages with technology-driven transparency and organization.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <a href="#features" className="hover:text-secondary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#impact" className="hover:text-secondary transition-colors">
                  Our Impact
                </a>
              </li>
              <li>
                <a href="#demo" className="hover:text-secondary transition-colors">
                  Demo
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-secondary transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Connect With Us</h4>
            <div className="space-y-3">
              <p className="text-primary-foreground/80">
                Questions? Email us at:{" "}
                <a href="mailto:info@orphanageplatform.org" className="text-secondary hover:underline">
                  info@orphanageplatform.org
                </a>
              </p>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-secondary transition-colors"
              >
                <Github className="h-5 w-5" />
                View on GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60 text-sm">
          <p>
            © {new Date().getFullYear()} Orphanage Management Platform. Built with{" "}
            <Heart className="inline h-4 w-4 text-secondary" /> for children in need.
          </p>
          <p className="mt-2">
            Powered by modern web technologies • React • TailwindCSS • Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
};
