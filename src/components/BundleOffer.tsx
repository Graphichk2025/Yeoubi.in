import { motion } from "framer-motion";
import { Gift, Check } from "lucide-react";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";

const BundleOffer = () => {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card max-w-5xl mx-auto overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Images */}
            <div className="relative">
              <div className="absolute top-4 left-4 z-10">
                <span className="badge-limited flex items-center gap-2">
                  <Gift size={14} />
                  Limited Launch Bundle
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <img
                  src={product1}
                  alt="Bundle Item 1"
                  className="w-full aspect-square object-cover rounded-xl"
                />
                <img
                  src={product2}
                  alt="Bundle Item 2"
                  className="w-full aspect-square object-cover rounded-xl"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-4 md:p-8">
              <p className="text-caption mb-2">SPECIAL OFFER</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                YEOUBI Essentials Pack
              </h2>
              <p className="text-body mb-6">
                Get 2 premium tees for a special bundle price. Mix and match from our 
                Essentials collection.
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {[
                  "Choose any 2 T-Shirts",
                  "Save ₹500 on the bundle",
                  "Free express shipping",
                  "Premium gift packaging",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm">
                    <Check size={18} className="text-foreground" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Pricing */}
              <div className="flex items-end gap-4 mb-6">
                <div>
                  <span className="text-muted-foreground line-through text-lg">₹2,998</span>
                </div>
                <div className="text-4xl font-display font-bold">₹2,498</div>
                <span className="badge-new">Save 17%</span>
              </div>

              <button className="glass-btn-primary w-full md:w-auto">
                Get the Bundle
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BundleOffer;
