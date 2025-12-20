import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Copy, Check } from "lucide-react";

const LaunchPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("YEO10");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = 'YEO10';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      {/* Floating Button - Always bottom-left */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 glass-strong px-5 py-3 rounded-full flex items-center gap-2 
                   hover:scale-110 transition-all duration-300 shadow-lg border border-red-accent/40 min-h-[48px] min-w-[140px]"
        style={{ boxShadow: '0 0 20px rgba(215, 38, 61, 0.3)' }}
      >
        <Gift size={20} className="text-red-accent" />
        <span className="text-sm font-semibold">Get 10% OFF</span>
      </motion.button>

      {/* Popup Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            >
              <div className="glass-strong rounded-3xl p-8 text-center w-full max-w-md relative">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="w-20 h-20 mx-auto mb-6 glass rounded-full flex items-center justify-center border border-red-accent/30">
                  <Gift size={36} className="text-red-accent" />
                </div>

                <h3 className="text-2xl font-display font-bold mb-2">
                  Launch Offer
                </h3>
                <p className="text-xl font-semibold text-foreground mb-4">
                  Get <span className="text-red-accent">10% OFF</span> Your First Order
                </p>
                <p className="text-body mb-6">
                  Welcome to YEOUBI. Use the code below at checkout.
                </p>

                {/* Code Box */}
                <div className="glass rounded-xl p-4 mb-6 border border-red-accent/20">
                  <p className="text-caption mb-3 text-center">COUPON CODE</p>
                  <div className="flex items-center justify-center gap-4 bg-background/30 rounded-lg px-6 py-3">
                    <span className="text-2xl md:text-3xl font-mono font-bold tracking-[0.2em] text-red-accent">
                      YEO10
                    </span>
                    <button
                      onClick={handleCopy}
                      className="p-2 hover:bg-muted rounded-lg transition-colors border border-border"
                      aria-label="Copy code"
                    >
                      {copied ? (
                        <Check size={18} className="text-green-500" />
                      ) : (
                        <Copy size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <a
                  href="#shop"
                  onClick={() => setIsOpen(false)}
                  className="glass-btn-primary w-full inline-block hover:border-red-accent/50"
                >
                  Start Shopping
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default LaunchPopup;
