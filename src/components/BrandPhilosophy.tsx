import { motion } from "framer-motion";
import brandBg from "@/assets/brand-bg.jpg";

const statements = [
  "YEOUBI stands for bold individuality.",
  "Minimalism as a statement.",
  "Redefining streetwear beyond stickers.",
];

const BrandPhilosophy = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={brandBg}
          alt="Urban Street"
          className="w-full h-full object-cover opacity-40 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background" />
      </div>

      <div className="relative z-10 container-wide px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-caption mb-8"
          >
            OUR CODE
          </motion.p>

          <div className="space-y-8">
            {statements.map((statement, index) => (
              <motion.h3
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-tight"
              >
                {statement}
              </motion.h3>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <a href="#about" className="glass-btn inline-block">
              Learn More About Us
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandPhilosophy;
