import { motion } from "framer-motion";
import { Flame, ShoppingBag } from "lucide-react";
import product1 from "@/assets/product-1.jpg";
import product4 from "@/assets/product-4.jpg";

const hotProducts = [
  {
    id: 1,
    image: product1,
    name: "Obsidian Oversized Tee",
    price: 1499,
    sold: 243,
  },
  {
    id: 2,
    image: product4,
    name: "Abstract Print Tee",
    price: 1699,
    sold: 187,
  },
];

const HotSelling = () => {
  return (
    <section className="section-padding bg-secondary/20">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <Flame className="text-destructive" size={28} />
          <h2 className="text-headline">Customer Favorites</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-10 max-w-5xl mx-auto">
          {hotProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: index === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="glass-card-hover group flex flex-col md:flex-row gap-6"
            >
              <div className="relative w-full md:w-48 h-64 md:h-auto overflow-hidden rounded-xl flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="badge-limited">Limited Stock</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-caption mb-2">BESTSELLER</p>
                <h3 className="font-display text-2xl font-semibold mb-2">
                  {product.name}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {product.sold}+ sold this month
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <button className="glass-btn-primary flex items-center gap-2">
                    <ShoppingBag size={18} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotSelling;
