import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import SectionGrid from "@/components/SectionGrid";
import ComingSoon from "@/components/ComingSoon";
import BrandPhilosophy from "@/components/BrandPhilosophy";
import AboutBrand from "@/components/AboutBrand";

import LaunchPopup from "@/components/LaunchPopup";
import SocialProof from "@/components/SocialProof";
import FabricQuality from "@/components/FabricQuality";
import FAQ from "@/components/FAQ";
import SizeGuide from "@/components/SizeGuide";
import Footer from "@/components/Footer";
import ContactPopup from "@/components/ContactPopup";
import CartDrawer from "@/components/CartDrawer";

const Index = () => {
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>YEOUBI | Premium Streetwear for the Fearless</title>
        <meta
          name="description"
          content="YEOUBI - Crafted for the Fearless. Premium oversized streetwear, 240+ GSM cotton tees designed for creators, rebels, and culture-makers. Shop the latest drops."
        />
        <meta name="keywords" content="streetwear, oversized tees, premium clothing, urban fashion, YEOUBI" />
        <link rel="canonical" href="https://yeoubi.com" />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Header />
        <CartDrawer />

        <main>
          <Hero />
          <ProductGrid />
          <SectionGrid />
          <ComingSoon />
          <BrandPhilosophy />
          <AboutBrand />

          <SocialProof />
          <FabricQuality />
          <FAQ />
        </main>

        <Footer />

        {/* Floating Elements */}
        <LaunchPopup />
        <ContactPopup />
        <SizeGuide isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
      </div>
    </>
  );
};

export default Index;
