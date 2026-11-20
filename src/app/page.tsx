import { HeroSection } from "@/components/home/HeroSection";
import { BrandTrustMarquee } from "@/components/home/BrandTrustMarquee";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WorkshopGallery } from "@/components/home/WorkshopGallery";
import { StudioReelsSection } from "@/components/home/StudioReelsSection";
import { VolumeDiscountCalculator } from "@/components/home/VolumeDiscountCalculator";
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

      {/* 4. Trending & Best Sellers Showcase */}
      <FeaturedProducts />

      {/* 5. Real Customer Workshop Gallery: Fresh from Our Studio */}
      <WorkshopGallery />

      {/* 6. Studio Production Reels: Craftsmanship in Motion */}
      <StudioReelsSection />

      {/* 7. Interactive Bulk Wholesale Savings Calculator */}
      <VolumeDiscountCalculator />

      {/* 8. Why Choose MyPrintHub: Factory Engineering & Technical Pillars */}
      <WhyChooseUs />

      {/* 9. Effortless 4-Step Production Process */}
      <HowItWorks />

      {/* 10. Enterprise Custom Inquiry & First Order Voucher (Matches Reference Spec) */}
      <EnterpriseInquirySection />

      {/* 11. Verified Customer Testimonials */}
      <Testimonials />

      {/* 12. FAQ Accordion */}
      <FAQSection />
    </div>
  );
}
