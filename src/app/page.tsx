import { HeroSection } from "@/components/home/HeroSection";
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
      {/* 1. Hero Section (Matching PrintMine Reference with 2x2 showcase & top coupon) */}
      <HeroSection />

      {/* 2. Product Category Showcase Grid */}
      <CategoryGrid />

      {/* 3. Trust Badges & Quality Indicators */}
      <TrustBadges />

      {/* 4. Featured Products & Best Sellers */}
      <FeaturedProducts />

      {/* 5. Why Choose MyPrintHub Section */}
      <WhyChooseUs />

      {/* 6. How It Works (4-Step Workflow) */}
      <HowItWorks />

      {/* 7. Customer Testimonials */}
      <Testimonials />

      {/* 8. FAQ Accordion */}
      <FAQSection />

      {/* 9. Newsletter */}
      <Newsletter />
    </div>
  );
}
