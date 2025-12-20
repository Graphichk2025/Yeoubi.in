import { motion } from "framer-motion";
import { Instagram, Twitter, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    Shop: ["All Products", "New Arrivals", "Bestsellers", "Limited Edition"],
    Help: ["FAQ", "Shipping", "Returns", "Size Guide"],
    Company: ["About Us", "Contact", "Careers", "Press"],
  };

  return (
    <footer className="glass-strong border-t border-border">
      <div className="container-wide px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-2xl font-display font-bold tracking-[0.2em] mb-4">
              YEOUBI
            </h3>
            <p className="text-body mb-6">
              Crafted for the Fearless. Premium streetwear for those who dare to stand out.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-muted transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-muted transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-muted transition-colors"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="glass-card mb-12">
          <div className="md:flex items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h4 className="font-display font-semibold text-lg mb-1">
                Join the YEOUBI Community
              </h4>
              <p className="text-body text-sm">
                Get early access to drops, exclusive offers, and style inspiration.
              </p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="glass px-4 py-3 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 w-full md:w-auto"
              />
              <button className="glass-btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground mb-4 md:mb-0">
            © 2024 YEOUBI. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <div className="flex items-center gap-1">
              <MapPin size={12} />
              <span>Made in India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
