import { motion } from "framer-motion";
import { Leaf, Shield, Ruler, Sparkles, Shirt, Heart } from "lucide-react";

const qualities = [
  { icon: Shirt, title: "240-260 GSM", desc: "Premium heavyweight fabric" },
  { icon: Leaf, title: "100% Cotton", desc: "Pre-shrunk & breathable" },
  { icon: Ruler, title: "Oversized Fit", desc: "Relaxed contemporary cut" },
  { icon: Shield, title: "Durable Print", desc: "High-quality, long-lasting" },
  { icon: Heart, title: "Skin-Friendly", desc: "Soft & comfortable" },
  { icon: Sparkles, title: "Premium Finish", desc: "Meticulous detailing" },
];

const FabricQuality = () => {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-caption mb-4">QUALITY MATTERS</p>
          <h2 className="text-headline mb-4">Fabric & Craftsmanship</h2>
          <p className="text-body max-w-lg mx-auto">
            Every YEOUBI piece is crafted with premium materials and attention to detail.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {qualities.map((quality, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card text-center group"
            >
              <div className="w-14 h-14 mx-auto mb-4 glass rounded-full flex items-center justify-center 
                            group-hover:scale-110 transition-transform">
                <quality.icon size={24} />
              </div>
              <h3 className="font-display font-semibold mb-1">{quality.title}</h3>
              <p className="text-xs text-muted-foreground">{quality.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FabricQuality;
