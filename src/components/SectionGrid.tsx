import { motion } from 'framer-motion';
import { Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSections } from '@/hooks/useSections';

const SectionGrid = () => {
  const { data: sections, isLoading } = useSections();

  if (isLoading || !sections || sections.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-4">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collections
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: section.is_coming_soon ? 1 : 1.03, y: section.is_coming_soon ? 0 : -5 }}
            >
              {section.is_coming_soon ? (
                <div className="glass-card relative overflow-hidden aspect-square flex flex-col items-center justify-center text-center opacity-60 cursor-not-allowed">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Lock size={32} className="mb-3 text-muted-foreground" />
                  </motion.div>
                  <h3 className="font-display font-bold text-lg mb-1">{section.name}</h3>
                  <span className="text-xs text-red-accent uppercase tracking-wider">Coming Soon</span>
                </div>
              ) : (
                <Link to={`/section/${section.slug}`}>
                  <div className="glass-card-hover relative overflow-hidden aspect-square flex flex-col items-center justify-center text-center group">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <h3 className="font-display font-bold text-xl mb-2 relative z-10">{section.name}</h3>
                    {section.description && (
                      <p className="text-sm text-muted-foreground relative z-10 px-4 line-clamp-2">
                        {section.description}
                      </p>
                    )}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute bottom-4 flex items-center gap-1 text-sm text-red-accent"
                    >
                      <span>Explore</span>
                      <ArrowRight size={14} />
                    </motion.div>
                  </div>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionGrid;
