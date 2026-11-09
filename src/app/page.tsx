import { HeroSection } from "@/components/home/HeroSection";
import { CouponBanner } from "@/components/home/CouponBanner";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { TrustBadges } from "@/components/home/TrustBadges";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQSection } from "@/components/home/FAQSection";
import { Newsletter } from "@/components/home/Newsletter";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Promotional Coupon Banner */}
      <CouponBanner />

      {/* 3. Product Category Showcase Grid */}
      <CategoryGrid />

      {/* 4. Trust Badges & Quality Indicators */}
      <TrustBadges />

      {/* 5. Featured Products & Best Sellers */}
      <FeaturedProducts />

      {/* 6. Why Choose MyPrintHub Section */}
      <WhyChooseUs />

      {/* 7. How It Works (4-Step Workflow) */}
      <HowItWorks />

      {/* 8. Customer Testimonials */}
      <Testimonials />

      {/* 9. FAQ Accordion */}
      <FAQSection />

      {/* 10. Newsletter */}
      <Newsletter />
    </div>
  );
}
