import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const testimonials = [
  { name: "@streetwear_daily", text: "The quality is insane. Best tee I own.", avatar: "SD" },
  { name: "@minimal.fits", text: "YEOUBI gets it. Pure minimalism.", avatar: "MF" },
  { name: "@urban_style", text: "Finally, streetwear with substance.", avatar: "US" },
  { name: "@culture.creators", text: "Obsessed with the oversized fit.", avatar: "CC" },
];

const SocialProof = () => {
  return (
    <section className="section-padding bg-secondary/10">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Instagram size={24} />
            <p className="text-caption">STYLED BY YEOUBI COMMUNITY</p>
          </div>
          <h2 className="text-headline">Real People. Real Style.</h2>
        </motion.div>

        {/* Grid of user content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[1, 2, 3, 4].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card-hover aspect-square flex items-center justify-center"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 glass rounded-full flex items-center justify-center text-2xl font-display font-bold">
                  {testimonials[index].avatar}
                </div>
                <p className="text-sm font-medium">{testimonials[index].name}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card"
            >
              <p className="text-lg mb-4 italic">"{testimonial.text}"</p>
              <p className="text-caption">{testimonial.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
