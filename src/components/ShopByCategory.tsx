import { motion } from "framer-motion";
import { Shirt, Square, Star, Layers, Watch } from "lucide-react";

const categories = [
  { name: "T-Shirts", icon: Shirt, count: 12 },
  { name: "Oversized Fits", icon: Square, count: 8 },
  { name: "Limited Edition", icon: Star, count: 3 },
  { name: "Essentials", icon: Layers, count: 6 },
  { name: "Accessories", icon: Watch, count: 0, comingSoon: true },
];

const ShopByCategory = () => {
  return (
    <section id="shop" className="section-padding">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-caption mb-4">COLLECTIONS</p>
          <h2 className="text-headline">Shop by Category</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.a
              key={category.name}
              href="#"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`glass-card-hover text-center group ${
                category.comingSoon ? "opacity-60 pointer-events-none" : ""
              }`}
            >
              <div className="w-16 h-16 mx-auto mb-4 glass rounded-full flex items-center justify-center 
                            group-hover:scale-110 transition-transform duration-300">
                <category.icon size={28} className="text-foreground" />
              </div>
              <h3 className="font-display font-semibold mb-1">{category.name}</h3>
              {category.comingSoon ? (
                <span className="text-xs text-muted-foreground">Coming Soon</span>
              ) : (
                <span className="text-sm text-muted-foreground">
                  {category.count} items
                </span>
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
