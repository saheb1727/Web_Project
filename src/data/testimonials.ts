import { Testimonial, FAQItem, Coupon } from "@/types";

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Vikram Malhotra",
    role: "Head of Operations",
    company: "FinEdge Technologies, Bengaluru",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    comment: "We ordered 250 magnetic name badges and polo t-shirts for our annual tech summit. The neodymium magnets are super strong and didn't damage our blazers! Color accuracy was 100% matched to our brand pantone.",
    productOrdered: "Brushed Metal Magnetic Badges & Polo Tees",
    verified: true,
  },
  {
    id: "test-2",
    name: "Ananya Deshmukh",
    role: "Community Manager",
    company: "DevSprint India",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    comment: "The 380 GSM heavyweight hoodies for our hackathon winners were unbelievable. Thick fleece, premium embroidery, and they arrived in Mumbai within 48 hours. MyPrintHub is now our official swag partner!",
    productOrdered: "Heavyweight 380 GSM Fleece Hoodies",
    verified: true,
  },
  {
    id: "test-3",
    name: "Rohan Singhania",
    role: "Founder & CEO",
    company: "KalaKriti Studios, Delhi",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    comment: "Unlike other print on demand sites that demand 50+ MOQ, MyPrintHub let us order sample 1-piece prototypes before ordering 500 units. The 3D live mockup preview is spot on.",
    productOrdered: "Oversized Streetwear Tees & Ceramic Mugs",
    verified: true,
  },
  {
    id: "test-4",
    name: "Pooja Hegde",
    role: "HR Director",
    company: "NexGen Logistics, Hyderabad",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    comment: "Our new hire onboarding kits arrived neatly packaged in individual gift boxes with personalized laser engraved bottles and notebooks. The employees were ecstatic!",
    productOrdered: "Executive Corporate Welcome Kits",
    verified: true,
  },
];

export const faqs: FAQItem[] = [
  {
    question: "What is the Minimum Order Quantity (MOQ)?",
    answer: "There is NO minimum order quantity for most custom products! You can order just 1 customized T-shirt, mug, cap, or magnetic badge. However, we offer generous tiered discounts that increase as your quantity grows (e.g. up to 48% off for bulk corporate orders).",
    category: "Ordering",
  },
  {
    question: "How do Magnetic Badges work and do they harm clothes?",
    answer: "Our magnetic badges use 3-point rare-earth neodymium magnetic backings that hold firmly through formal shirts, blazers, lab coats, and sweaters without piercing any fabric. Zero pinholes, zero snags, and 100% reusable.",
    category: "Products",
  },
  {
    question: "What file formats can I upload for my logo or artwork?",
    answer: "We support high-resolution PNG, JPG, SVG, AI, and PDF files. For the sharpest embroidery and print quality, we recommend transparent background vector files (SVG/PDF) or 300 DPI high-resolution images.",
    category: "Customization",
  },
  {
    question: "How long does production and doorstep delivery take?",
    answer: "Standard orders are printed and dispatched within 24 to 48 hours. Metro deliveries across India (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata, Pune) take 2-4 business days. Express next-day dispatch is also available at checkout.",
    category: "Shipping",
  },
  {
    question: "Can I see a preview of my product before placing an order?",
    answer: "Yes! Our interactive Live Mockup Customizer displays your uploaded logo and custom text on the selected product in real time. For bulk orders above 50 pieces, our senior graphic designers also send a digital pre-production proof for your approval.",
    category: "Customization",
  },
  {
    question: "What is your return and quality guarantee policy?",
    answer: "We stand 100% behind our craftsmanship with our 'Print Perfection Guarantee'. If your order arrives with a manufacturing defect, misprint, or damaged goods, we will reprint and ship a replacement immediately free of charge.",
    category: "Guarantee",
  },
];

export const coupons: Coupon[] = [
  {
    code: "PRINT15",
    discountPercent: 15,
    minOrder: 499,
    maxDiscount: 500,
    description: "Flat 15% OFF on your first custom order",
    expiresIn: "Valid for new users",
  },
  {
    code: "BULK25",
    discountPercent: 25,
    minOrder: 2999,
    maxDiscount: 2500,
    description: "Flat 25% OFF on bulk team & corporate orders over ₹2,999",
    expiresIn: "Limited time offer",
  },
  {
    code: "FREESHIP",
    discountPercent: 10,
    minOrder: 999,
    description: "Free Express Shipping + 10% Extra Discount on orders over ₹999",
    expiresIn: "Active today",
  },
];

