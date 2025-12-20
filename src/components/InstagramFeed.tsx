import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

const images = [product1, product2, product3, product4];

const InstagramFeed = () => {
  return (
    <section className="py-16">
      <div className="container-wide px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <a
            href="https://instagram.com/yeoubi.official"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-caption hover:text-foreground transition-colors"
          >
            <Instagram size={20} />
            <span>Follow @yeoubi.official</span>
          </a>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {images.map((image, index) => (
            <motion.a
              key={index}
              href="https://instagram.com/yeoubi.official"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-square overflow-hidden group"
            >
              <img
                src={image}
                alt="Instagram"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 
                            transition-opacity flex items-center justify-center">
                <Instagram size={32} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
