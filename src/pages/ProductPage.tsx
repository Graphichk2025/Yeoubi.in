import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Minus, Plus, Heart, Truck, RotateCcw, Ruler, ShoppingBag, Shield, Loader2, Sparkles, ChevronLeft, ChevronRight, Tag, Instagram } from "lucide-react";
import { useProduct } from "@/hooks/useProducts";
import { useCartStore, Product as CartProduct } from "@/stores/cartStore";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import SizeGuide from "@/components/SizeGuide";

const ProductPage = () => {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading } = useProduct(handle || '');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const { addItem, setOpen } = useCartStore();

  // Get all images (use images array if available, fallback to image_url)
  const allImages = product?.images?.length 
    ? product.images 
    : product?.image_url 
      ? [product.image_url] 
      : [];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = async () => {
    if (!product) return;
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    setIsAddingToCart(true);
    await new Promise(resolve => setTimeout(resolve, 300));

    const cartProduct: CartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      original_price: product.original_price,
      image_url: product.image_url,
      sizes: product.sizes || ['S', 'M', 'L', 'XL', 'XXL'],
    };

    addItem({
      product: cartProduct,
      size: selectedSize,
      quantity,
    });

    setIsAddingToCart(false);
    toast.success("Added to cart!", {
      description: `${product.name} × ${quantity}`,
      position: "top-center",
    });
    setOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-12 h-12 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading product...</p>
        </motion.div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card inline-block p-8 mb-6"
          >
            <ShoppingBag size={64} className="text-muted-foreground mx-auto" />
          </motion.div>
          <h1 className="text-2xl font-display font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="glass-btn-primary inline-block">
            Back to Shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const sizes = product.sizes || ['S', 'M', 'L', 'XL', 'XXL'];
  const hasDiscount = product.original_price && product.original_price > product.price;
  const discountPercent = hasDiscount 
    ? Math.round(((product.original_price! - product.price) / product.original_price!) * 100)
    : 0;

  return (
    <>
      <Helmet>
        <title>{product.name} | YEOUBI</title>
        <meta name="description" content={product.description?.slice(0, 160) || `Shop ${product.name} at YEOUBI`} />
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

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Image Gallery */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                {/* Main Image */}
                <div className="glass-card aspect-square overflow-hidden relative group">
                  {hasDiscount && (
                    <div className="absolute top-4 left-4 z-10 bg-red-accent text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Tag size={14} />
                      {discountPercent}% OFF
                    </div>
                  )}
                  
                  {allImages.length > 0 ? (
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImageIndex}
                        src={allImages[currentImageIndex]}
                        alt={product.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </AnimatePresence>
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <ShoppingBag size={64} className="text-muted-foreground" />
                    </div>
                  )}

                  {/* Navigation Arrows */}
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 glass p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 glass p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {allImages.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {allImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          currentImageIndex === index 
                            ? 'border-foreground' 
                            : 'border-transparent hover:border-muted-foreground'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Details - Scrollable */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:max-h-[calc(100vh-200px)] lg:overflow-y-auto lg:pr-4 space-y-6"
              >
                {/* Brand & Title */}
                <div>
                  <p className="text-caption mb-2 flex items-center gap-2">
                    <Sparkles size={14} className="text-red-accent" />
                    YEOUBI
                  </p>
                  <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                    {product.name}
                  </h1>
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-3xl font-display font-bold">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {hasDiscount && (
                      <>
                        <span className="text-xl text-muted-foreground line-through">
                          ₹{product.original_price!.toLocaleString()}
                        </span>
                        <span className="text-red-accent font-semibold">
                          Save ₹{(product.original_price! - product.price).toLocaleString()}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Description */}
                {product.description && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg">Product Details</h3>
                    <p className="text-body leading-relaxed whitespace-pre-wrap">{product.description}</p>
                  </div>
                )}

                {/* Category */}
                {product.category && (
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="glass px-3 py-1 rounded-full text-sm">{product.category}</span>
                  </div>
                )}

                {/* Size Selection */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">
                      Size: <span className="text-muted-foreground">{selectedSize || 'Select'}</span>
                    </span>
                    <button
                      onClick={() => setSizeGuideOpen(true)}
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Ruler size={14} />
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <motion.button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                          selectedSize === size
                            ? 'bg-foreground text-background shadow-lg'
                            : 'glass hover:bg-muted'
                        }`}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <span className="font-medium mb-3 block">Quantity</span>
                  <div className="flex items-center gap-4">
                    <div className="glass rounded-full flex items-center overflow-hidden">
                      <motion.button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 hover:bg-muted transition-colors"
                        disabled={quantity <= 1}
                      >
                        <Minus size={18} />
                      </motion.button>
                      <motion.span 
                        key={quantity}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="w-12 text-center font-medium text-lg"
                      >
                        {quantity}
                      </motion.span>
                      <motion.button
                        onClick={() => setQuantity(quantity + 1)}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 hover:bg-muted transition-colors"
                      >
                        <Plus size={18} />
                      </motion.button>
                    </div>
                    <span className="text-muted-foreground text-sm">
                      Total: ₹{(product.price * quantity).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <motion.button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="glass-btn-primary flex-1 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAddingToCart ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={20} />
                        Add to Cart
                      </>
                    )}
                  </motion.button>
                  <motion.button 
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`glass p-4 rounded-full transition-colors ${
                      isWishlisted ? 'bg-red-accent/20 text-red-accent' : 'hover:bg-muted'
                    }`}
                  >
                    <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                  </motion.button>
                  {product.instagram_url && (
                    <motion.a
                      href={product.instagram_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="glass p-4 rounded-full transition-colors hover:bg-pink-500/20 hover:text-pink-500"
                    >
                      <Instagram size={20} />
                    </motion.a>
                  )}
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                  <div className="glass-card text-center p-4">
                    <Truck size={24} className="mx-auto mb-2 text-muted-foreground" />
                    <p className="text-xs font-medium">Free Shipping</p>
                    <p className="text-xs text-muted-foreground">Over ₹999</p>
                  </div>
                  <div className="glass-card text-center p-4">
                    <RotateCcw size={24} className="mx-auto mb-2 text-muted-foreground" />
                    <p className="text-xs font-medium">Easy Returns</p>
                    <p className="text-xs text-muted-foreground">7 Days</p>
                  </div>
                  <div className="glass-card text-center p-4">
                    <Shield size={24} className="mx-auto mb-2 text-muted-foreground" />
                    <p className="text-xs font-medium">Secure Pay</p>
                    <p className="text-xs text-muted-foreground">100% Safe</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </main>

        <Footer />
        <SizeGuide isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
      </div>
    </>
  );
};

export default ProductPage;
