import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Heart, Plus, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore, Product as CartProduct } from "@/stores/cartStore";
import { toast } from "sonner";
import { Product } from "@/hooks/useProducts";

interface ProductCardProps {
  product: Product;
  delay?: number;
}

const ProductCard = ({ product, delay = 0 }: ProductCardProps) => {
  const { addItem, setOpen } = useCartStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get all images (prefer images array, fallback to image_url)
  const images = product.images && product.images.length > 0
    ? product.images
    : product.image_url
      ? [product.image_url]
      : [];

  // Auto-scroll images every 3 seconds
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const hasDiscount = product.original_price && product.original_price > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.original_price! - product.price) / product.original_price!) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const cartProduct: CartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      original_price: product.original_price,
      image_url: images[0] || null,
      sizes: product.sizes || ['S', 'M', 'L', 'XL', 'XXL'],
    };

    addItem({
      product: cartProduct,
      size: product.sizes?.[0] || 'M',
      quantity: 1,
    });

    toast.success("Added to cart!", {
      description: product.name,
    });
    setOpen(true);
  };

  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6 }}
        whileHover={{ y: -8 }}
        className="group relative"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-accent/20 to-gold/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
        <div className="glass-card-hover relative overflow-hidden aspect-[3/4] mb-4">
          {/* Special Badge */}
          {product.badge && (
            <div className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground px-2.5 py-1 rounded-full text-xs font-semibold">
              {product.badge}
            </div>
          )}

          {/* Discount Badge */}
          {hasDiscount && !product.badge && (
            <div className="absolute top-4 left-4 z-10 bg-red-accent text-white px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Tag size={12} />
              {discountPercent}% OFF
            </div>
          )}

          {/* Quick Actions */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="glass p-2 rounded-full hover:bg-muted transition-colors"
              onClick={(e) => e.preventDefault()}
            >
              <Heart size={18} />
            </motion.button>
          </div>

          {/* Image Carousel */}
          {images.length > 0 ? (
            <div className="relative w-full h-full">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.name} ${idx + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${idx === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                />
              ))}
              {/* Image Indicators */}
              {images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setCurrentImageIndex(idx);
                      }}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImageIndex
                          ? 'bg-foreground w-4'
                          : 'bg-foreground/40 hover:bg-foreground/60'
                        }`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <ShoppingBag size={48} className="text-muted-foreground" />
            </div>
          )}

          {/* Quick Add */}
          <motion.button
            onClick={handleQuickAdd}
            initial={{ y: "100%" }}
            whileHover={{ scale: 1.02 }}
            className="absolute bottom-0 left-0 right-0 glass-strong py-4 flex items-center justify-center gap-2 
                       opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 
                       transition-all duration-300"
          >
            <Plus size={18} />
            <span className="text-sm font-medium">Quick Add</span>
          </motion.button>
        </div>

        {/* Info */}
        <div className="space-y-2">
          <h3 className="font-display font-bold text-base md:text-lg group-hover:text-red-accent transition-colors line-clamp-1 uppercase tracking-tight">
            {product.name}
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold">₹{product.price.toLocaleString()}</span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.original_price!.toLocaleString()}
              </span>
            )}
          </div>
          {/* Size Options Preview */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex gap-1 pt-1">
              {product.sizes.slice(0, 4).map((size) => (
                <span key={size} className="text-xs text-muted-foreground border border-border px-1.5 py-0.5 rounded">
                  {size}
                </span>
              ))}
              {product.sizes.length > 4 && (
                <span className="text-xs text-muted-foreground">+{product.sizes.length - 4}</span>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;