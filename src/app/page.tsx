import { HeroSection } from "@/components/home/HeroSection";
import { BrandTrustMarquee } from "@/components/home/BrandTrustMarquee";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { VolumeDiscountCalculator } from "@/components/home/VolumeDiscountCalculator";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { HowItWorks } from "@/components/home/HowItWorks";
import { EnterpriseInquirySection } from "@/components/home/EnterpriseInquirySection";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQSection } from "@/components/home/FAQSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section: Executive Spotlight & Interactive Merch Stage */}
      <HeroSection />

      {/* 2. Enterprise Client Trust Marquee */}
      <BrandTrustMarquee />

      {/* 3. Product Categories Bento Grid Showcase */}
      <CategoryGrid />

      {/* 4. Interactive Bulk Wholesale Savings Calculator */}
      <VolumeDiscountCalculator />

      {/* 5. Trending & Best Sellers Showcase */}
      <FeaturedProducts />

      {/* 6. Why Choose MyPrintHub: Factory Engineering & Technical Pillars */}
      <WhyChooseUs />

      {/* 7. Effortless 4-Step Production Process */}
      <HowItWorks />

      {/* 8. Enterprise Custom Inquiry & First Order Voucher (Matches Reference Spec) */}
      <EnterpriseInquirySection />

      {/* 9. Verified Customer Testimonials */}
      <Testimonials />

      {/* 10. FAQ Accordion */}
      <FAQSection />
    </div>
  );
}
