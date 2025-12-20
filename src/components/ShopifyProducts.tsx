import { motion } from "framer-motion";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import ShopifyProductCard from "./ShopifyProductCard";
import { Loader2, Package } from "lucide-react";

const ShopifyProducts = () => {
  const { products, loading, error } = useShopifyProducts(10);

  if (loading) {
    return (
      <section id="drops" className="section-padding bg-background">
        <div className="container-wide">
          <div className="text-center mb-16">
            <p className="text-caption mb-4">DROP 001</p>
            <h2 className="text-headline mb-4">Latest Drops</h2>
          </div>
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="drops" className="section-padding bg-background">
        <div className="container-wide text-center">
          <p className="text-destructive">Failed to load products</p>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
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
          </motion.div>
          <div className="glass-card text-center py-16 max-w-xl mx-auto">
            <Package size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-display font-bold mb-2">No Products Yet</h3>
            <p className="text-body">
              Products coming soon. Stay tuned for the first YEOUBI drop!
            </p>
          </div>
        </div>
      </section>
    );
  }

  const badges = ["new", "bestseller", "limited", "new", "bestseller"] as const;

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
            <ShopifyProductCard
              key={product.node.id}
              product={product}
              delay={index * 0.1}
              badge={badges[index % badges.length]}
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

export default ShopifyProducts;
