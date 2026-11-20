import { HeroSection } from "@/components/home/HeroSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WorkshopGallery } from "@/components/home/WorkshopGallery";
import { StudioReelsSection } from "@/components/home/StudioReelsSection";
import { VolumeDiscountCalculator } from "@/components/home/VolumeDiscountCalculator";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { HowItWorks } from "@/components/home/HowItWorks";
import { EnterpriseInquirySection } from "@/components/home/EnterpriseInquirySection";
import { FAQSection } from "@/components/home/FAQSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section: Panoramic Studio Bento Showcase with Live Keepsake Switcher */}
      <HeroSection />

      {/* 2. Product Categories Bento Grid Showcase */}
      <CategoryGrid />

      {/* 3. Category Shelves & Curated Product Hubs */}
      <FeaturedProducts />

      {/* 4. Real Customer Workshop Gallery: Fresh from Our Studio Floor */}
      <WorkshopGallery />

      {/* 5. Studio Production Reels: Craftsmanship in Motion */}
      <StudioReelsSection />

      {/* 6. Interactive Bulk Wholesale Savings Calculator */}
      <VolumeDiscountCalculator />

      {/* 7. Why Choose MyPrintHub: Factory Engineering & Technical Pillars */}
      <WhyChooseUs />

      {/* 8. Effortless 4-Step Production Process */}
      <HowItWorks />

      {/* 9. Enterprise Custom Inquiry Support */}
      <EnterpriseInquirySection />

      {/* 10. FAQ Accordion */}
      <FAQSection />
    </div>
  );
}
