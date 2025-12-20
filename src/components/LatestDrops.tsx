import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";

const products = [
  {
    id: 1,
    image: product1,
    name: "Obsidian Oversized Tee",
    price: 1499,
    badge: "new" as const,
  },
  {
    id: 2,
    image: product2,
    name: "Cloud White Essential",
    price: 1299,
    badge: "bestseller" as const,
  },
  {
    id: 3,
    image: product3,
    name: "Storm Gray Hoodie",
    price: 2499,
    badge: "limited" as const,
  },
  {
    id: 4,
    image: product4,
    name: "Abstract Print Tee",
    price: 1699,
    originalPrice: 1999,
  },
  {
    id: 5,
    image: product5,
    name: "Cream Oversized Fit",
    price: 1399,
    badge: "new" as const,
  },
];

const LatestDrops = () => {
  return (
    <section id="drops" className="section-padding bg-background">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-caption mb-4">DROP 001</p>
          <h2 className="text-headline mb-4">Latest Drops</h2>
          <p className="text-body max-w-lg mx-auto">
            Explore our newest collection. Bold designs crafted for those who dare to stand out.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              {...product}
              delay={index * 0.1}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a href="#shop" className="glass-btn inline-flex items-center gap-2">
            View All Products
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestDrops;
