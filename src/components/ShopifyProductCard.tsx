import { motion } from "framer-motion";
import { ShoppingBag, Heart } from "lucide-react";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface ShopifyProductCardProps {
  product: ShopifyProduct;
  delay?: number;
  badge?: "new" | "limited" | "bestseller";
}

const ShopifyProductCard = ({ product, delay = 0, badge }: ShopifyProductCardProps) => {
  const { addItem, setOpen } = useCartStore();
  const { node } = product;
  
  const firstImage = node.images?.edges?.[0]?.node;
  const firstVariant = node.variants?.edges?.[0]?.node;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const currency = node.priceRange.minVariantPrice.currencyCode;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant) return;

    addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || [],
    });

    toast.success("Added to cart", {
      description: node.title,
      position: "top-center",
    });
    setOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className="group"
    >
      <Link to={`/product/${node.handle}`}>
        <div className="glass-card-hover relative overflow-hidden aspect-[3/4] mb-4">
          {badge && (
            <div className="absolute top-4 left-4 z-10">
              <span
                className={
                  badge === "limited"
                    ? "badge-limited"
                    : badge === "new"
                    ? "badge-new"
                    : "badge-new"
                }
              >
                {badge === "limited" ? "Limited Stock" : badge === "new" ? "New" : "Bestseller"}
              </span>
            </div>
          )}

          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="glass p-2 rounded-full hover:bg-muted transition-colors">
              <Heart size={18} />
            </button>
          </div>

          {firstImage ? (
            <img
              src={firstImage.url}
              alt={firstImage.altText || node.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <ShoppingBag size={48} className="text-muted-foreground" />
            </div>
          )}

          <motion.button
            onClick={handleAddToCart}
            className="absolute bottom-0 left-0 right-0 glass-strong py-4 flex items-center justify-center gap-2 
                       opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 
                       transition-all duration-300"
          >
            <ShoppingBag size={18} />
            <span className="text-sm font-medium">Quick Add</span>
          </motion.button>
        </div>

        <div className="space-y-2">
          <h3 className="font-display font-medium text-lg group-hover:text-muted-foreground transition-colors">
            {node.title}
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold">
              {currency} {price.toFixed(2)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ShopifyProductCard;
