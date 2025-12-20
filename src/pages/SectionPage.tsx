import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Package, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/hooks/useProducts";

const SectionPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: section, isLoading: loadingSection } = useQuery({
    queryKey: ['section', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sections')
        .select('*')
        .eq('slug', slug)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  const { data: products, isLoading: loadingProducts } = useQuery({
    queryKey: ['products', 'section', section?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .eq('section_id', section?.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Product[];
    },
    enabled: !!section?.id,
  });

  const isLoading = loadingSection || loadingProducts;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <Loader2 className="animate-spin" size={32} />
          <p className="text-muted-foreground">Loading...</p>
        </motion.div>
      </div>
    );
  }

  if (!section) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 text-center px-4">
          <h1 className="text-2xl font-display font-bold mb-4">Section Not Found</h1>
          <Link to="/" className="glass-btn-primary inline-block">
            Back to Shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{section.name} | YEOUBI</title>
        <meta name="description" content={section.description || `Shop ${section.name} at YEOUBI`} />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <CartDrawer />

        <main className="pt-28 pb-16">
          <div className="container-wide px-4 md:px-8">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Shop</span>
              </Link>
            </motion.div>

            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                {section.name}
              </h1>
              {section.description && (
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {section.description}
                </p>
              )}
            </motion.div>

            {/* Products Grid */}
            {products && products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <ProductCard key={product.id} product={product} delay={index * 0.1} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Package size={64} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-2xl font-display font-bold mb-2">No Products Yet</h3>
                <p className="text-muted-foreground">
                  Check back soon for new additions!
                </p>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SectionPage;
