import { motion } from "framer-motion";

const AboutBrand = () => {
  return (
    <section id="about" className="section-padding bg-secondary/10">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card text-center"
          >
            <p className="text-caption mb-6">ABOUT YEOUBI</p>
            <h2 className="text-headline mb-8">Our Story</h2>

            <div className="space-y-6 text-body text-lg leading-relaxed">
              <p>
                <strong className="text-foreground font-display">YEOUBI</strong> — derived from the 
                Korean word for "beauty in rain" — represents the calm within chaos. We believe 
                that true style emerges when you embrace your authentic self, regardless of 
                circumstances.
              </p>
              <p>
                Founded in 2024, YEOUBI was born from a simple vision: to create streetwear 
                that doesn't shout, but speaks. Our pieces are designed for the quiet 
                confident — those who let their presence do the talking.
              </p>
              <p>
                Every garment is crafted with intention. Premium fabrics, meticulous 
                construction, and designs that transcend seasons. This isn't fast fashion. 
                This is slow, deliberate creation for those who value substance over noise.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-border">
              {[
                { value: "240+", label: "GSM Fabric" },
                { value: "100%", label: "Cotton" },
                { value: "Oversized", label: "Relaxed Fit" },
                { value: "∞", label: "Expression" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-display font-bold mb-1">
                    {stat.value}
                  </div>
                  <div className="text-caption">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutBrand;
