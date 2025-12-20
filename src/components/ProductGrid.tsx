import { motion } from 'framer-motion';
import { Package, Loader2 } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from './ProductCard';

const ProductGrid = () => {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) {
    return (
      <section className="py-20 px-4">
        <div className="container-wide">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin" size={32} />
          </div>
        </div>
      </section>
    );
  }

  if (error || !products || products.length === 0) {
    return (
      <section className="py-20 px-4">
        <div className="container-wide">
          <div className="text-center py-20">
            <Package size={64} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-2xl font-display font-bold mb-2">Coming Soon</h3>
            <p className="text-muted-foreground">
              New products will be available shortly. Stay tuned!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="drops" className="py-20 px-4">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Our Collection
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Premium streetwear crafted for the fearless
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
