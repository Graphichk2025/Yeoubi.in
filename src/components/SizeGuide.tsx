import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Ruler } from "lucide-react";

const sizes = [
  { size: "S", chest: "44", length: "27", shoulder: "20" },
  { size: "M", chest: "46", length: "28", shoulder: "21" },
  { size: "L", chest: "48", length: "29", shoulder: "22" },
  { size: "XL", chest: "50", length: "30", shoulder: "23" },
  { size: "XXL", chest: "52", length: "31", shoulder: "24" },
];

interface SizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const SizeGuide = ({ isOpen, onClose }: SizeGuideProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg mx-4"
          >
            <div className="glass-strong rounded-3xl p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Ruler size={24} />
                  <h3 className="text-xl font-display font-bold">Size Guide</h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="text-body mb-6">
                All measurements are in inches. Our tees feature an oversized relaxed fit. 
                For a more fitted look, we recommend sizing down.
              </p>

              {/* Size Table */}
              <div className="glass rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-3 px-4 text-left text-caption">Size</th>
                      <th className="py-3 px-4 text-center text-caption">Chest</th>
                      <th className="py-3 px-4 text-center text-caption">Length</th>
                      <th className="py-3 px-4 text-center text-caption">Shoulder</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizes.map((item) => (
                      <tr key={item.size} className="border-b border-border/50 last:border-0">
                        <td className="py-3 px-4 font-semibold">{item.size}</td>
                        <td className="py-3 px-4 text-center text-muted-foreground">{item.chest}"</td>
                        <td className="py-3 px-4 text-center text-muted-foreground">{item.length}"</td>
                        <td className="py-3 px-4 text-center text-muted-foreground">{item.shoulder}"</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 glass rounded-xl">
                <p className="text-xs text-muted-foreground text-center">
                  <strong className="text-foreground">Fit Tip:</strong> Model is 5'11" wearing size L 
                  for a relaxed oversized fit.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SizeGuide;
