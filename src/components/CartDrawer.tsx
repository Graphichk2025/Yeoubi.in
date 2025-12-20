import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag, Package, ArrowRight, CreditCard, Check } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import BookingForm from "./BookingForm";

const CartDrawer = () => {
  const { 
    items, 
    isOpen, 
    setOpen, 
    updateQuantity, 
    removeItem, 
    getTotalItems,
    getTotalPrice
  } = useCartStore();

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [removingItem, setRemovingItem] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const handleRemoveItem = async (productId: string, size: string) => {
    setRemovingItem(`${productId}-${size}`);
    await new Promise(resolve => setTimeout(resolve, 200));
    removeItem(productId, size);
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(`${productId}-${size}`);
      return newSet;
    });
    setRemovingItem(null);
  };

  const toggleItemSelection = (productId: string, size: string) => {
    const key = `${productId}-${size}`;
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const selectAllItems = () => {
    if (selectedItems.size === items.length) {
      setSelectedItems(new Set());
    } else {
      const allKeys = items.map(item => `${item.product.id}-${item.size}`);
      setSelectedItems(new Set(allKeys));
    }
  };

  const getSelectedTotal = () => {
    return items
      .filter(item => selectedItems.has(`${item.product.id}-${item.size}`))
      .reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };

  const getSelectedItems = () => {
    return items.filter(item => selectedItems.has(`${item.product.id}-${item.size}`));
  };

  const handleCheckout = () => {
    if (selectedItems.size === 0) {
      // If nothing selected, select all
      const allKeys = items.map(item => `${item.product.id}-${item.size}`);
      setSelectedItems(new Set(allKeys));
    }
    setOpen(false);
    setShowBookingForm(true);
  };

  const subtotal = getTotalPrice();
  const selectedTotal = getSelectedTotal();

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md glass-strong z-50 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <ShoppingBag size={24} />
                    {getTotalItems() > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold"
                      >
                        {getTotalItems()}
                      </motion.span>
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-bold">Your Cart</h2>
                    <p className="text-xs text-muted-foreground">
                      {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Select All */}
              {items.length > 0 && (
                <div className="px-6 py-3 border-b border-border/50">
                  <button
                    onClick={selectAllItems}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      selectedItems.size === items.length ? 'bg-primary border-primary' : 'border-border'
                    }`}>
                      {selectedItems.size === items.length && <Check size={12} className="text-primary-foreground" />}
                    </div>
                    <span>Select All ({selectedItems.size}/{items.length} selected)</span>
                  </button>
                </div>
              )}

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="glass-card mb-6"
                    >
                      <ShoppingBag size={56} className="text-muted-foreground mx-auto" />
                    </motion.div>
                    <p className="text-xl font-display font-bold mb-2">Your cart is empty</p>
                    <p className="text-body mb-6">Discover our collection and add your favorites.</p>
                    <button
                      onClick={() => setOpen(false)}
                      className="glass-btn flex items-center gap-2"
                    >
                      Start Shopping
                      <ArrowRight size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                      {items.map((item, index) => {
                        const itemKey = `${item.product.id}-${item.size}`;
                        const isSelected = selectedItems.has(itemKey);
                        return (
                          <motion.div
                            key={itemKey}
                            layout
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ 
                              opacity: removingItem === itemKey ? 0.5 : 1, 
                              x: 0,
                              scale: removingItem === itemKey ? 0.95 : 1
                            }}
                            exit={{ opacity: 0, x: -100, height: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`glass-card flex gap-4 relative overflow-hidden cursor-pointer transition-all ${
                              isSelected ? 'ring-2 ring-primary' : ''
                            }`}
                            onClick={() => toggleItemSelection(item.product.id, item.size)}
                          >
                            {/* Selection Checkbox */}
                            <div className={`absolute top-4 left-4 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors z-10 ${
                              isSelected ? 'bg-primary border-primary' : 'border-border bg-background/50'
                            }`}>
                              {isSelected && <Check size={12} className="text-primary-foreground" />}
                            </div>
                            
                            <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-muted ml-6">
                              {item.product.image_url ? (
                                <img
                                  src={item.product.image_url}
                                  alt={item.product.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Package size={24} className="text-muted-foreground" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium line-clamp-2">{item.product.name}</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                Size: {item.size}
                              </p>
                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center gap-1 glass rounded-lg" onClick={(e) => e.stopPropagation()}>
                                  <button
                                    onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                                    className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors rounded-l-lg"
                                  >
                                    <Minus size={14} />
                                  </button>
                                  <span className="w-8 text-center text-sm font-medium">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                                    className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors rounded-r-lg"
                                  >
                                    <Plus size={14} />
                                  </button>
                                </div>
                                <span className="font-semibold">
                                  ₹{(item.product.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveItem(item.product.id, item.size);
                              }}
                              disabled={removingItem === itemKey}
                              className="absolute top-4 right-4 p-1.5 hover:bg-destructive/20 hover:text-destructive rounded-full transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-border space-y-4 bg-card/50">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">
                      {selectedItems.size > 0 ? `Selected (${selectedItems.size})` : 'Total'}
                    </span>
                    <span className="text-2xl font-display font-bold">
                      ₹{(selectedItems.size > 0 ? selectedTotal : subtotal).toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="glass-btn-primary w-full flex items-center justify-center gap-2 text-lg"
                  >
                    <CreditCard size={20} />
                    <span>Order Now</span>
                    <span className="font-bold">₹{(selectedItems.size > 0 ? selectedTotal : subtotal).toFixed(2)}</span>
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <BookingForm 
        isOpen={showBookingForm} 
        onClose={() => setShowBookingForm(false)}
        selectedItems={selectedItems.size > 0 ? getSelectedItems() : items}
      />
    </>
  );
};

export default CartDrawer;