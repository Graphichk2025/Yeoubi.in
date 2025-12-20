import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ShoppingBag } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { Link } from "react-router-dom";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const { data: products, isLoading } = useProducts();

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description?.toLowerCase().includes(query.toLowerCase()) ||
    product.category?.toLowerCase().includes(query.toLowerCase())
  ) || [];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 z-[60] p-4 pt-20"
          >
            <div className="max-w-2xl mx-auto glass-strong rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                    className="w-full pl-12 pr-4 py-3 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-accent/50"
                  />
                </div>
                <button
                  onClick={onClose}
                  className="p-3 hover:bg-muted rounded-xl transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto">
                {isLoading ? (
                  <p className="text-center text-muted-foreground py-8">Loading...</p>
                ) : query.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Start typing to search products</p>
                ) : filteredProducts.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No products found for "{query}"</p>
                ) : (
                  <div className="space-y-3">
                    {filteredProducts.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        onClick={onClose}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted transition-colors"
                      >
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                            <ShoppingBag size={24} className="text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className="font-medium">{product.name}</h4>
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-foreground font-semibold">
                              ₹{product.price.toLocaleString()}
                            </p>
                            {product.original_price && product.original_price > product.price && (
                              <p className="text-sm text-muted-foreground line-through">
                                ₹{product.original_price.toLocaleString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
