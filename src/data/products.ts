import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "prod-frame-1",
    name: "Customized Anniversary & Memory Calendar Photo Frame",
    slug: "customized-anniversary-memory-calendar-photo-frame",
    category: "Custom Photo Frames",
    categorySlug: "custom-photo-frames",
    price: 499,
    originalPrice: 899,
    rating: 4.9,
    reviewsCount: 184,
    image: "/images/products/anniversary-calendar-frame.jpg",
    gallery: [
      "/images/products/anniversary-calendar-frame.jpg",
      "/images/products/birthday-memory-frame.jpg",
      "/images/products/custom-calendar-frame-collection.jpg",
      "/images/products/love-story-timeline-frame.jpg",
      "/images/products/collage-photo-frame.jpg",
    ],
    description: "Celebrate milestones with our bespoke framed photo keepsakes. Features high-definition photo collage printing with your customized month calendar and an engraved heart highlighting your special date. Mounted in a sleek engineered wood frame with anti-glare protective lamination.",
    features: [
      "Custom month calendar with heart-marked anniversary/birthday date",
      "High-definition 1200 DPI archival photo print with zero fade",
      "Anti-glare protective matte lamination (No fragile glass needed)",
      "High-grade composite wood frame with tabletop easel & wall hooks",
      "Personalized with custom couple/family names & heartfelt quotes",
    ],
    colors: [
      { name: "Executive Matte Black", hex: "#1A1A1A" },
      { name: "Pristine White", hex: "#FFFFFF" },
      { name: "Natural Wood Grain", hex: "#8B5A2B" },
    ],
    sizes: ["8 x 12 Inch (A4)", "12 x 18 Inch (A3)", "6 x 8 Inch (Tabletop)"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 4, price: 499, savings: "Standard" },
      { minQty: 5, maxQty: 19, price: 399, savings: "20% Off" },
      { minQty: 20, maxQty: 49, price: 329, savings: "34% Off" },
      { minQty: 50, maxQty: null, price: 269, savings: "46% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Trending Gift",
    customizable: true,
    printArea: "Full Frame Face: 8\" x 12\" / 12\" x 18\"",
  },
  {
    id: "prod-lamp-1",
    name: "Custom Laser Engraved 3D LED Acrylic Heart Lamp",
    slug: "custom-laser-engraved-3d-led-acrylic-heart-lamp",
    category: "Personalized Gifts & LED Lamps",
    categorySlug: "personalized-gifts",
    price: 699,
    originalPrice: 1299,
    rating: 5.0,
    reviewsCount: 226,
    image: "/images/products/led-acrylic-heart-lamp.jpg",
    gallery: [
      "/images/products/led-acrylic-heart-lamp.jpg",
      "/images/products/love-story-timeline-frame.jpg",
    ],
    description: "An enchanting personalized night lamp featuring an optical-grade 5mm cast acrylic heart plate laser engraved with couple names and special celebration text (e.g. Happy Valentine's Day, Anniversary). Emits a warm golden ambient glow from an integrated solid wood base with USB cable.",
    features: [
      "Precision laser-engraved 5mm high-clarity cast acrylic",
      "Custom calligraphy script with couple names & romantic quotes",
      "Warm golden 3000K soothing night LED with 50,000+ hour lifespan",
      "Solid wooden/matte black base with inline on/off USB switch",
      "Delivered in an elegant gift box ready for gifting",
    ],
    colors: [
      { name: "Warm Golden Glow", hex: "#F59E0B" },
      { name: "Multicolor RGB Remote", hex: "#EC4899" },
    ],
    sizes: ["Heart 6 x 7 Inch", "Circle 6 Inch", "Custom Silhouette"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 4, price: 699, savings: "Standard" },
      { minQty: 5, maxQty: 19, price: 549, savings: "21% Off" },
      { minQty: 20, maxQty: 49, price: 449, savings: "36% Off" },
      { minQty: 50, maxQty: null, price: 349, savings: "50% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Best Seller",
    customizable: true,
    printArea: "Laser Engraving Area: 150mm x 160mm",
  },
  {
    id: "prod-leather-1",
    name: "Executive 4-in-1 Personalized Leather Gift Hamper Set",
    slug: "executive-4in1-personalized-leather-gift-hamper-set",
    category: "Corporate Kits & ID Cards",
    categorySlug: "corporate-kits",
    price: 999,
    originalPrice: 1899,
    rating: 4.9,
    reviewsCount: 142,
    image: "/images/products/executive-leather-gift-set.jpg",
    gallery: [
      "/images/products/executive-leather-gift-set.jpg",
      "/images/products/gold-foil-engraved-pens.jpg",
    ],
    description: "The ultimate personalized luxury gift hamper. Crafted from premium cruelty-free vegan leather, this 4-in-1 set includes a customized passport organizer, bi-fold men's wallet, protective eyewear sleeve, and leather keychain. Each item features an embossed metallic charm and customized brass nameplate.",
    features: [
      "Includes 4 essentials: Passport Cover, Wallet, Eyewear Sleeve, Keychain",
      "Custom antique brass nameplate engraved with recipient's name",
      "Metallic design charms (Airplane, Heart, Glasses, Crown, Anchor)",
      "Premium water-resistant textured vegan PU leather with precision stitching",
      "Packaged in an executive matte black foam-padded gift box",
    ],
    colors: [
      { name: "Tan Brown", hex: "#8B4513" },
      { name: "Midnight Black", hex: "#1C1C1E" },
      { name: "Royal Blue", hex: "#1E3A8A" },
      { name: "Olive Green", hex: "#3B4A3F" },
    ],
    sizes: ["Standard 4-in-1 Gift Box Set"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 9, price: 999, savings: "Standard" },
      { minQty: 10, maxQty: 49, price: 799, savings: "20% Off" },
      { minQty: 50, maxQty: 199, price: 649, savings: "35% Off" },
      { minQty: 200, maxQty: null, price: 499, savings: "50% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Executive Set",
    customizable: true,
    printArea: "Engraved Brass Nameplates on all 4 items",
  },
  {
    id: "prod-pen-1",
    name: "Luxury 24K Floating Gold Foil Laser Engraved Pen",
    slug: "luxury-24k-floating-gold-foil-laser-engraved-pen",
    category: "Corporate Kits & ID Cards",
    categorySlug: "corporate-kits",
    price: 199,
    originalPrice: 399,
    rating: 4.9,
    reviewsCount: 310,
    image: "/images/products/gold-foil-engraved-pens.jpg",
    gallery: [
      "/images/products/gold-foil-engraved-pens.jpg",
      "/images/products/executive-leather-gift-set.jpg",
    ],
    description: "A signature statement writing instrument. The clear upper chamber is filled with floating 24K gold foil flakes that catch the light with every stroke. The lower metal barrel is permanently laser engraved with your teacher's, doctor's, executive's, or corporate client's name in lustrous gold.",
    features: [
      "Upper barrel with liquid-suspended 24K genuine gold leaf flakes",
      "Permanent fiber laser engraved personalized name (no fading or rubbing off)",
      "Smooth twist mechanism with German black ballpoint refill (0.7mm)",
      "Balanced ergonomic metallic weight for effortless signature writing",
      "Ideal for Teacher Appreciation, Corporate Welcome Kits, and Festivities",
    ],
    colors: [
      { name: "Gloss Black & Gold", hex: "#000000" },
      { name: "Rose Gold Elegance", hex: "#B76E79" },
      { name: "Pearlescent White", hex: "#F3F4F6" },
      { name: "Regal Indigo Blue", hex: "#1E1B4B" },
    ],
    sizes: ["Standard 140mm Ballpoint"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 9, price: 199, savings: "Standard" },
      { minQty: 10, maxQty: 49, price: 149, savings: "25% Off" },
      { minQty: 50, maxQty: 199, price: 99, savings: "50% Off" },
      { minQty: 200, maxQty: null, price: 75, savings: "62% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Top Pick",
    customizable: true,
    printArea: "Lower barrel laser engraving: 45mm x 5mm",
  },
  {
    id: "prod-badge-btn-1",
    name: "Customized Glossy Wedding & Event Pin Badges",
    slug: "customized-glossy-wedding-event-pin-badges",
    category: "Magnetic & Pin Badges",
    categorySlug: "magnetic-badges",
    price: 39,
    originalPrice: 79,
    rating: 4.8,
    reviewsCount: 420,
    image: "/images/products/wedding-pin-badges.jpg",
    gallery: [
      "/images/products/wedding-pin-badges.jpg",
      "/images/products/custom-quote-keychains.jpg",
    ],
    description: "High-gloss round button badges custom printed with fun wedding caricatures and event designations (e.g., Ladki Wale, Ladke Wale, Bride Squad, Groom Team, Bhai Ki Shaadi). Features water-resistant Mylar coating and rust-free safety pin.",
    features: [
      "Vibrant high-resolution photo print with glossy protective Mylar shield",
      "Sturdy tinplate construction with secure safety pin backing",
      "Available in 44mm and 58mm diameter sizes",
      "Fun cartoon caricatures, customized names, and wedding hashtags",
      "Bulk factory wholesale pricing for sangeet, mehendi, and weddings",
    ],
    colors: [
      { name: "Sky Blue (Ladki Wale)", hex: "#38BDF8" },
      { name: "Blush Pink (Bride Squad)", hex: "#F472B6" },
      { name: "Golden Yellow (Haldi)", hex: "#FACC15" },
      { name: "Royal Purple (Barati)", hex: "#9333EA" },
    ],
    sizes: ["58 mm (Standard Event)", "44 mm (Compact Badge)", "75 mm (Jumbo)"],
    minQuantity: 10,
    tieredPricing: [
      { minQty: 10, maxQty: 49, price: 39, savings: "Standard" },
      { minQty: 50, maxQty: 199, price: 29, savings: "26% Off" },
      { minQty: 200, maxQty: 499, price: 22, savings: "44% Off" },
      { minQty: 500, maxQty: null, price: 16, savings: "59% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Wedding Special",
    customizable: true,
    printArea: "58mm Full Face Round Print",
  },
  {
    id: "prod-frame-2",
    name: "Romantic Love Story & Milestone Wall Photo Frame",
    slug: "romantic-love-story-milestone-wall-photo-frame",
    category: "Custom Photo Frames",
    categorySlug: "custom-photo-frames",
    price: 549,
    originalPrice: 999,
    rating: 5.0,
    reviewsCount: 160,
    image: "/images/products/love-story-timeline-frame.jpg",
    gallery: [
      "/images/products/love-story-timeline-frame.jpg",
      "/images/products/custom-calendar-frame-collection.jpg",
      "/images/products/anniversary-calendar-frame.jpg",
      "/images/products/collage-photo-frame.jpg",
    ],
    description: "Chronicle your journey together with our 'Our Love Story' milestone timeline frame. Highlights your key milestone dates (First Met, Engagement, Marriage) paired with photographs in heart and honeycomb collages.",
    features: [
      "Custom milestone journey timeline with icons & dates",
      "Heart-shaped or hexagonal honeycomb multi-photo collage",
      "High-definition archival photographic paper with matte lamination",
      "Premium black fiber border frame with wall mounting hardware",
      "Personalized with couple names and favorite love quote",
    ],
    colors: [
      { name: "Classic Black", hex: "#1E1E1E" },
      { name: "Clean White", hex: "#FFFFFF" },
    ],
    sizes: ["12 x 18 Inch (Large Wall)", "8 x 12 Inch (A4)", "16 x 24 Inch (Jumbo)"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 4, price: 549, savings: "Standard" },
      { minQty: 5, maxQty: 19, price: 449, savings: "18% Off" },
      { minQty: 20, maxQty: 49, price: 369, savings: "33% Off" },
      { minQty: 50, maxQty: null, price: 299, savings: "45% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Couple Favorite",
    customizable: true,
    printArea: "Full Frame Face: 12\" x 18\"",
  },
  {
    id: "prod-keychain-1",
    name: "Personalized Acrylic & Wooden Quote Keychains",
    slug: "personalized-acrylic-wooden-quote-keychains",
    category: "Personalized Gifts & LED Lamps",
    categorySlug: "personalized-gifts",
    price: 79,
    originalPrice: 149,
    rating: 4.8,
    reviewsCount: 290,
    image: "/images/products/custom-quote-keychains.jpg",
    gallery: [
      "/images/products/custom-quote-keychains.jpg",
      "/images/products/executive-leather-gift-set.jpg",
    ],
    description: "Custom engraved acrylic and wooden keychains printed with inspiring quotes and recipient names (e.g. Teacher Appreciation, Student Farewell, Corporate Giveaways). Double-sided UV scratch-resistant finish with heavy-duty metal split ring.",
    features: [
      "Durable 3mm acrylic or engineered wood composite",
      "Double-sided high-definition permanent UV color print",
      "Smooth laser-cut rounded safety edges",
      "Heavy-duty rust-free chrome split keyring with chain",
      "Bulk customization for schools, institutes, events, and corporate gifts",
    ],
    colors: [
      { name: "Matte Black & White", hex: "#18181B" },
      { name: "Warm Walnut Wood", hex: "#5C3A21" },
      { name: "Floral Pastel Print", hex: "#FBCFE8" },
    ],
    sizes: ["Rectangle 50 x 30 mm", "Square 40 x 40 mm", "Round 45 mm"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 9, price: 79, savings: "Standard" },
      { minQty: 10, maxQty: 49, price: 59, savings: "25% Off" },
      { minQty: 50, maxQty: 199, price: 45, savings: "43% Off" },
      { minQty: 200, maxQty: null, price: 35, savings: "56% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Bulk Saver",
    customizable: true,
    printArea: "Both sides: 48mm x 28mm",
  },
  {
    id: "prod-frame-3",
    name: "Personalized Birthday Milestone & Sibling Photo Frame",
    slug: "personalized-birthday-milestone-sibling-photo-frame",
    category: "Custom Photo Frames",
    categorySlug: "custom-photo-frames",
    price: 499,
    originalPrice: 899,
    rating: 4.9,
    reviewsCount: 110,
    image: "/images/products/birthday-memory-frame.jpg",
    gallery: [
      "/images/products/birthday-memory-frame.jpg",
      "/images/products/custom-calendar-frame-collection.jpg",
      "/images/products/collage-photo-frame.jpg",
    ],
    description: "Cherish baby first year milestones, sibling birthdays, and family memories with our custom themed photo frame. Includes 1-to-12 months milestone cards, calendar date marking, and custom heartfelt messages.",
    features: [
      "Theme choices: Google Search Father theme, Baby Unicorn 12-Month, Sibling Special",
      "High-definition photographic print with anti-glare lamination",
      "Durable frame with wall hanger and desktop back stand",
      "Personalized with recipient name, date, and custom quote",
    ],
    colors: [
      { name: "Classic White", hex: "#FFFFFF" },
      { name: "Deep Charcoal Black", hex: "#1F2937" },
    ],
    sizes: ["8 x 12 Inch (A4)", "12 x 18 Inch (A3)"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 4, price: 499, savings: "Standard" },
      { minQty: 5, maxQty: 19, price: 399, savings: "20% Off" },
      { minQty: 20, maxQty: 49, price: 329, savings: "34% Off" },
      { minQty: 50, maxQty: null, price: 269, savings: "46% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Memories",
    customizable: true,
    printArea: "Full Frame Face: 8\" x 12\"",
  },
  {
    id: "prod-cushion-1",
    name: "Custom Photo Print Heart Collage Satin Cushion",
    slug: "custom-photo-print-heart-collage-satin-cushion",
    category: "Personalized Gifts & LED Lamps",
    categorySlug: "personalized-gifts",
    price: 399,
    originalPrice: 799,
    rating: 4.9,
    reviewsCount: 178,
    image: "/images/products/custom-photo-heart-cushion.jpg",
    gallery: [
      "/images/products/custom-photo-heart-cushion.jpg",
    ],
    description: "Wrap your memories in luxury with our personalized heart collage cushion. Crafted from premium high-sheen duchess satin with ultra-soft hypoallergenic microfiber filling. Features an edge-to-edge sublimation print surrounded by romantic heart motifs, complete with a concealed invisible zipper for easy cleaning.",
    features: [
      "Ultra-soft 100% Duchess satin fabric with luxurious silky sheen",
      "Precision thermal sublimation photo printing with zero color bleeding",
      "Concealed hidden bottom zipper for effortless cover removal and washing",
      "Stuffed with 350g virgin hypoallergenic conjugate microfibre filler",
      "Heart collage layout accommodating 12 to 18 of your favorite photos",
    ],
    colors: [
      { name: "Pristine White Satin", hex: "#FFFFFF" },
      { name: "Romantic Crimson Red", hex: "#DC2626" },
      { name: "Pastel Pink", hex: "#F472B6" },
    ],
    sizes: ["16 x 16 Inch (Square)", "12 x 12 Inch (Compact)"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 4, price: 399, savings: "Standard" },
      { minQty: 5, maxQty: 19, price: 349, savings: "12% Off" },
      { minQty: 20, maxQty: 49, price: 299, savings: "25% Off" },
      { minQty: 50, maxQty: null, price: 249, savings: "38% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Best Seller",
    customizable: true,
    printArea: "Full Cushion Face: 16\" x 16\"",
  },
  {
    id: "prod-frame-num-1",
    name: "Custom Number Photo Collage Milestone Anniversary Frame",
    slug: "custom-number-photo-collage-milestone-anniversary-frame",
    category: "Custom Photo Frames",
    categorySlug: "custom-photo-frames",
    price: 549,
    originalPrice: 999,
    rating: 5.0,
    reviewsCount: 204,
    image: "/images/products/anniversary-number-milestone-frame.jpg",
    gallery: [
      "/images/products/anniversary-number-milestone-frame.jpg",
      "/images/products/love-story-timeline-frame.jpg",
    ],
    description: "Commemorate landmark milestones (1st, 7th, 10th, 25th, or 50th) with our custom number photo collage frame. The prominent numeric cutout is crafted with your favorite relationship photos, accompanied by an exact mathematical time breakdown in years, months, weeks, days, hours, and seconds.",
    features: [
      "Custom number silhouette (1 through 99) filled with your curated photos",
      "Mathematical relationship time breakdown (e.g., 7 Years = 2,557 Days = 61,368 Hours)",
      "High-density archival photo paper with protective matte lamination",
      "Sturdy engineered wood frame with hanging clips and tabletop easel",
      "Personalized with couple names and 'To Infinity and Beyond' inscription",
    ],
    colors: [
      { name: "Executive Matte Black", hex: "#18181B" },
      { name: "Minimalist White", hex: "#FFFFFF" },
    ],
    sizes: ["8 x 12 Inch (A4)", "12 x 18 Inch (A3)", "16 x 24 Inch (Large Wall)"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 4, price: 549, savings: "Standard" },
      { minQty: 5, maxQty: 19, price: 449, savings: "18% Off" },
      { minQty: 20, maxQty: 49, price: 379, savings: "31% Off" },
      { minQty: 50, maxQty: null, price: 299, savings: "45% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Milestone Pick",
    customizable: true,
    printArea: "Full Frame Face: 8\" x 12\" / 12\" x 18\"",
  },
  {
    id: "prod-cap-ved-1",
    name: "Personalized Script Name Embroidered Baseball Cap",
    slug: "personalized-script-name-embroidered-baseball-cap",
    category: "Custom Caps",
    categorySlug: "custom-caps",
    price: 299,
    originalPrice: 499,
    rating: 4.9,
    reviewsCount: 165,
    image: "/images/products/custom-embroidered-ved-cap.jpg",
    gallery: [
      "/images/products/custom-embroidered-ved-cap.jpg",
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Make a bespoke fashion statement with our custom script name embroidered cotton baseball cap. Features premium high-density chain-stitch 3D embroidery on structured heavy-gauge cotton twill with pre-curved visor and adjustable brass tuck-in closure.",
    features: [
      "Heavy brushed 100% cotton twill for all-day comfort and breathability",
      "High-definition 3D script embroidery of your name or monogram",
      "Structured 5-panel crown with reinforced buckram backing",
      "Adjustable metal tuck-in clasp accommodating all head circumferences",
      "Ideal for birthday gifts, street style, influencers, and bridal squads",
    ],
    colors: [
      { name: "Crisp White & Black Script", hex: "#FFFFFF" },
      { name: "Midnight Black & White Script", hex: "#111827" },
      { name: "Regal Navy & Gold Script", hex: "#1E1B4B" },
    ],
    sizes: ["One Size Fits All (Adjustable Clasp)"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 4, price: 299, savings: "Standard" },
      { minQty: 5, maxQty: 19, price: 249, savings: "17% Off" },
      { minQty: 20, maxQty: 49, price: 199, savings: "33% Off" },
      { minQty: 50, maxQty: null, price: 159, savings: "47% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Handcrafted",
    customizable: true,
    printArea: "Front Crown: 4\" x 2.2\" Embroidery",
  },
  {
    id: "prod-mug-dual-1",
    name: "Dual-Tone Inner & Handle Ceramic Sublimation Coffee Mug (330ml)",
    slug: "dual-tone-inner-handle-ceramic-sublimation-coffee-mug",
    category: "Drinkware & Ceramic Mugs",
    categorySlug: "drinkware-mugs",
    price: 189,
    originalPrice: 329,
    rating: 4.9,
    reviewsCount: 388,
    image: "/images/products/dual-tone-ceramic-mugs.jpg",
    gallery: [
      "/images/products/dual-tone-ceramic-mugs.jpg",
      "/images/products/patch-sublimation-ceramic-mugs.jpg",
    ],
    description: "Elevate your morning coffee with our vibrant dual-tone ceramic mugs. Features a crisp glossy white outer sublimation body paired with colored inner walls and matching ergonomic C-handles. Microwave safe, dishwasher safe, and printed with fade-free vibrant inks.",
    features: [
      "Grade AAA non-toxic food-safe ceramic (Lead & Cadmium Free)",
      "High-contrast colored interior & matching comfort-grip C-handle",
      "Wrap-around 360-degree full-color photo and logo sublimation",
      "Microwave and dishwasher friendly (500+ wash resistance)",
      "Packed inside drop-tested thermocol security box for zero breakage",
    ],
    colors: [
      { name: "Navy Blue Inside", hex: "#1E1B4B" },
      { name: "Sunset Orange Inside", hex: "#F95738" },
      { name: "Sunshine Yellow Inside", hex: "#EAB308" },
      { name: "Blush Pink Inside", hex: "#EC4899" },
      { name: "Sky Cyan Inside", hex: "#06B6D4" },
      { name: "Ruby Red Inside", hex: "#DC2626" },
    ],
    sizes: ["330 ml (Standard 11 oz)"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 9, price: 189, savings: "Standard" },
      { minQty: 10, maxQty: 49, price: 149, savings: "21% Off" },
      { minQty: 50, maxQty: 149, price: 119, savings: "37% Off" },
      { minQty: 150, maxQty: null, price: 89, savings: "53% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Popular Pick",
    customizable: true,
    printArea: "Full Wrap Outer Face: 200mm x 95mm",
  },
  {
    id: "prod-frame-google-1",
    name: "Custom 'Google Happiness' Search Theme Photo Frame",
    slug: "custom-google-happiness-search-theme-photo-frame",
    category: "Custom Photo Frames",
    categorySlug: "custom-photo-frames",
    price: 499,
    originalPrice: 899,
    rating: 5.0,
    reviewsCount: 145,
    image: "/images/products/google-search-happiness-frame.jpg",
    gallery: [
      "/images/products/google-search-happiness-frame.jpg",
      "/images/products/birthday-memory-frame.jpg",
    ],
    description: "A creative and viral keepsake frame designed around the iconic Google search interface. Displays 'Google' with a custom search term like 'Happiness', 'World's Best Sister', or 'Best Father' in the search bar, alongside a 6-photo memory grid and touching personalized poetry below.",
    features: [
      "Custom Google search bar with your chosen theme or recipient nickname",
      "6-photo high-resolution gallery grid capturing precious moments",
      "Heartfelt custom Hindi/English emotional message printed at the footer",
      "Protective scratch-resistant matte lamination over composite wood frame",
      "Dual mounting options: Tabletop easel stand and sturdy rear wall hook",
    ],
    colors: [
      { name: "Clean White", hex: "#FFFFFF" },
      { name: "Executive Black", hex: "#18181B" },
    ],
    sizes: ["8 x 12 Inch (A4)", "12 x 18 Inch (A3)"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 4, price: 499, savings: "Standard" },
      { minQty: 5, maxQty: 19, price: 399, savings: "20% Off" },
      { minQty: 20, maxQty: 49, price: 329, savings: "34% Off" },
      { minQty: 50, maxQty: null, price: 269, savings: "46% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Viral Hit",
    customizable: true,
    printArea: "Full Frame Face: 8\" x 12\"",
  },
  {
    id: "prod-frame-king-1",
    name: "'King Landed' Birthday Calendar Milestone Photo Frame",
    slug: "king-landed-birthday-calendar-milestone-photo-frame",
    category: "Custom Photo Frames",
    categorySlug: "custom-photo-frames",
    price: 499,
    originalPrice: 899,
    rating: 4.9,
    reviewsCount: 132,
    image: "/images/products/king-landed-birthday-frame.jpg",
    gallery: [
      "/images/products/king-landed-birthday-frame.jpg",
      "/images/products/anniversary-calendar-frame.jpg",
    ],
    description: "An empowering tribute frame crafted for birthdays. Styled against a sleek midnight black background with a calendar header marking the birth date ('King Landed'), custom badges ('Best Son', 'Best Brother', 'Best CEO'), and a multi-photo collage honoring the birthday star.",
    features: [
      "Birth month calendar with custom crown badge and heart date marker",
      "Honorary badges for 'Best Son', 'Best Brother', 'Best CEO', etc.",
      "Multi-photo collage layout with high-definition deep color saturation",
      "Encased in a premium black wooden frame with crystal-clear finish",
      "Personalized with custom celebratory birthday dedication message",
    ],
    colors: [
      { name: "Midnight Black", hex: "#111827" },
      { name: "Classic White", hex: "#FFFFFF" },
    ],
    sizes: ["8 x 12 Inch (A4)", "12 x 18 Inch (A3)"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 4, price: 499, savings: "Standard" },
      { minQty: 5, maxQty: 19, price: 399, savings: "20% Off" },
      { minQty: 20, maxQty: 49, price: 329, savings: "34% Off" },
      { minQty: 50, maxQty: null, price: 269, savings: "46% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Birthday Special",
    customizable: true,
    printArea: "Full Frame Face: 8\" x 12\"",
  },
  {
    id: "prod-frame-torn-1",
    name: "Aesthetic Torn Paper 'Happy Married Life' Couple Photo Frame",
    slug: "aesthetic-torn-paper-happy-married-life-couple-photo-frame",
    category: "Custom Photo Frames",
    categorySlug: "custom-photo-frames",
    price: 549,
    originalPrice: 999,
    rating: 5.0,
    reviewsCount: 190,
    image: "/images/products/torn-paper-wedding-frame.jpg",
    gallery: [
      "/images/products/torn-paper-wedding-frame.jpg",
      "/images/products/anniversary-calendar-frame.jpg",
    ],
    description: "An elegant contemporary wedding and anniversary frame featuring a chic torn-paper center dividing two romantic couple portraits. Accented with flowing calligraphy reading 'Happy Married Life' and a minimalist heart emblem in a clean Scandinavian white wooden frame.",
    features: [
      "Modern torn paper aesthetic divider separating candid and portrait photos",
      "Handwritten calligraphy typography ('Happy Married Life' / 'Always & Forever')",
      "Printed on archival 300 GSM photo stock with soft-touch matte lamination",
      "Clean white Scandinavian engineered wood frame with mounting clips",
      "Perfect wedding gift for couples, newlyweds, and anniversary celebrations",
    ],
    colors: [
      { name: "Nordic White Frame", hex: "#FFFFFF" },
      { name: "Classic Black Frame", hex: "#1E1E1E" },
      { name: "Natural Pine Wood", hex: "#A87954" },
    ],
    sizes: ["8 x 12 Inch (A4)", "12 x 18 Inch (A3)", "16 x 24 Inch (Large Wall)"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 4, price: 549, savings: "Standard" },
      { minQty: 5, maxQty: 19, price: 449, savings: "18% Off" },
      { minQty: 20, maxQty: 49, price: 369, savings: "33% Off" },
      { minQty: 50, maxQty: null, price: 299, savings: "45% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Wedding Favorite",
    customizable: true,
    printArea: "Full Frame Face: 8\" x 12\" / 12\" x 18\"",
  },
  {
    id: "prod-cushion-led-1",
    name: "Magic LED Glowing Heart Faux Fur Photo Cushion",
    slug: "magic-led-glowing-heart-faux-fur-photo-cushion",
    category: "Personalized Gifts & LED Lamps",
    categorySlug: "personalized-gifts",
    price: 499,
    originalPrice: 999,
    rating: 5.0,
    reviewsCount: 264,
    image: "/images/products/led-fur-heart-cushion.jpg",
    gallery: [
      "/images/products/led-fur-heart-cushion.jpg",
      "/images/products/square-led-fur-cushion.jpg",
      "/images/products/custom-photo-heart-cushion.jpg",
    ],
    description: "Transform your most cherished couple or family photo into a radiant glowing keepsake. Features ultra-soft plush white faux fur in an endearing heart silhouette with integrated warm-golden interior LED string lights (battery operated with a concealed push-button switch) and high-definition thermal sublimation photo print.",
    features: [
      "Ultra-soft plush white faux fur exterior with soothing touch",
      "Integrated warm golden battery-operated fairy LEDs with concealed on/off switch",
      "Vibrant high-definition photo print on center heart satin patch",
      "Concealed hidden zipper for easy battery replacement (AA batteries included)",
      "Unforgettable surprise gift for Valentine's Day, Anniversaries, and Birthdays",
    ],
    colors: [
      { name: "Radiant Warm White Fur", hex: "#FFFDF0" },
      { name: "Blush Pink Fur", hex: "#FDF2F8" },
      { name: "Crimson Red Fur", hex: "#FEF2F2" },
    ],
    sizes: ["Heart 16 x 14 Inch", "Heart 12 x 10 Inch"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 4, price: 499, savings: "Standard" },
      { minQty: 5, maxQty: 19, price: 429, savings: "14% Off" },
      { minQty: 20, maxQty: 49, price: 369, savings: "26% Off" },
      { minQty: 50, maxQty: null, price: 299, savings: "40% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Glowing Hit",
    customizable: true,
    printArea: "Center Heart Photo Area: 220mm x 200mm",
  },
  {
    id: "prod-cushion-led-2",
    name: "Square LED Plush Fur Light-Up Photo Pillow",
    slug: "square-led-plush-fur-light-up-photo-pillow",
    category: "Personalized Gifts & LED Lamps",
    categorySlug: "personalized-gifts",
    price: 479,
    originalPrice: 899,
    rating: 4.9,
    reviewsCount: 188,
    image: "/images/products/square-led-fur-cushion.jpg",
    gallery: [
      "/images/products/square-led-fur-cushion.jpg",
      "/images/products/led-fur-heart-cushion.jpg",
    ],
    description: "16x16 inch square illuminated plush fur photo cushion. Emits a comforting warm golden ambient glow, highlighting your wedding or family portrait printed inside a decorative golden lace border on premium satin.",
    features: [
      "Square 16x16 inch plush faux fur border with golden lace trim",
      "High-output warm amber micro LEDs with internal battery pack",
      "Crisp photo printing on heavy satin center panel",
      "Hypoallergenic conjugate microfiber inner filling included",
      "Ideal bedside lamp substitute and ambient room decor",
    ],
    colors: [
      { name: "Warm Glow White", hex: "#FEFCE8" },
      { name: "Soft Golden Yellow", hex: "#FEF08A" },
    ],
    sizes: ["16 x 16 Inch (Square)"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 4, price: 479, savings: "Standard" },
      { minQty: 5, maxQty: 19, price: 399, savings: "17% Off" },
      { minQty: 20, maxQty: 49, price: 349, savings: "27% Off" },
      { minQty: 50, maxQty: null, price: 289, savings: "40% Off" },
    ],
    inStock: true,
    isBestSeller: false,
    badgeText: "Warm Ambience",
    customizable: true,
    printArea: "Center Photo Panel: 240mm x 240mm",
  },
  {
    id: "prod-cap-multi-1",
    name: "Multi-Color Custom Name 3D Embroidered Cotton Caps",
    slug: "multi-color-custom-name-3d-embroidered-cotton-caps",
    category: "Custom Caps",
    categorySlug: "custom-caps",
    price: 279,
    originalPrice: 499,
    rating: 4.9,
    reviewsCount: 312,
    image: "/images/products/multicolor-embroidered-caps.jpg",
    gallery: [
      "/images/products/multicolor-embroidered-caps.jpg",
      "/images/products/custom-embroidered-ved-cap.jpg",
      "/images/products/kids-cartoon-embroidered-caps.jpg",
    ],
    description: "Personalize your group style with custom stitched names in bold 3D cursive embroidery across structured heavy cotton twill caps. Available in vivid base colors (Royal Blue, Signal Red, Midnight Black, Golden Yellow) with adjustable tuck-in brass strap. Great for reunions, bachelor trips, sports clubs, and custom family names (Vidhath, Anika, Krish, Sanviha, etc.).",
    features: [
      "Structured 5-panel heavy 100% cotton twill profile",
      "Custom name embroidered in high-density 3D puff script stitch",
      "Multi-color palette options: Blue, Red, Black, and Yellow",
      "Adjustable antique brass buckle closure (fits youth to adult)",
      "Sweat-wicking interior padded band for long-wear comfort",
    ],
    colors: [
      { name: "Signal Red", hex: "#DC2626" },
      { name: "Royal Blue", hex: "#1D4ED8" },
      { name: "Midnight Black", hex: "#111827" },
      { name: "Bright Yellow", hex: "#EAB308" },
    ],
    sizes: ["Adult Free Size (Adjustable 54-60cm)", "Youth Size (Adjustable 50-54cm)"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 4, price: 279, savings: "Standard" },
      { minQty: 5, maxQty: 19, price: 229, savings: "18% Off" },
      { minQty: 20, maxQty: 49, price: 189, savings: "32% Off" },
      { minQty: 50, maxQty: null, price: 149, savings: "46% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Best Seller",
    customizable: true,
    printArea: "Front Crown: 110mm x 55mm 3D Embroidery",
  },
  {
    id: "prod-cap-kids-1",
    name: "Personalized Kids Cartoon & Name Embroidered Baseball Cap",
    slug: "personalized-kids-cartoon-name-embroidered-baseball-cap",
    category: "Custom Caps",
    categorySlug: "custom-caps",
    price: 269,
    originalPrice: 449,
    rating: 5.0,
    reviewsCount: 140,
    image: "/images/products/kids-cartoon-embroidered-caps.jpg",
    gallery: [
      "/images/products/kids-cartoon-embroidered-caps.jpg",
      "/images/products/multicolor-embroidered-caps.jpg",
    ],
    description: "Delight your little ones with our sunny canary yellow baseball caps! Embroidered with beloved cartoon companions (Panda with bamboo, Peppa Pig, Baby Dinosaurs) paired with your child's name in crisp white cursive script.",
    features: [
      "Soft breathable 100% natural cotton twill gentle on delicate scalps",
      "Dual embroidery: Colorful cartoon character patch + Custom child name",
      "Curved sun-protective visor safeguarding eyes from UV glare",
      "Easy adjustable velcro or brass back-strap for growing kids",
      "Perfect for birthday party return favors, school picnics, and holidays",
    ],
    colors: [
      { name: "Canary Yellow", hex: "#FACC15" },
      { name: "Sky Blue", hex: "#38BDF8" },
      { name: "Candy Pink", hex: "#F472B6" },
    ],
    sizes: ["Kids Size (Ages 2-8 Years)", "Junior Size (Ages 8-14 Years)"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 4, price: 269, savings: "Standard" },
      { minQty: 5, maxQty: 19, price: 219, savings: "18% Off" },
      { minQty: 20, maxQty: 49, price: 179, savings: "33% Off" },
      { minQty: 50, maxQty: null, price: 139, savings: "48% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Kids Special",
    customizable: true,
    printArea: "Front Crown: Cartoon + Name Embroidery (90mm x 45mm)",
  },
  {
    id: "prod-badge-betiwale-1",
    name: "'Betiwale' Wedding Sangeet & Reception Glossy Pin Badges",
    slug: "betiwale-wedding-sangeet-reception-glossy-pin-badges",
    category: "Magnetic & Pin Badges",
    categorySlug: "magnetic-badges",
    price: 39,
    originalPrice: 79,
    rating: 4.9,
    reviewsCount: 520,
    image: "/images/products/betiwale-wedding-pin-badges.jpg",
    gallery: [
      "/images/products/betiwale-wedding-pin-badges.jpg",
      "/images/products/wedding-pin-badges.jpg",
    ],
    description: "High-gloss 58mm button pin badges showcasing an adorable illustrated traditional Indian dulhan caricature with 'Betiwale' calligraphy and floral wreath borders. A must-have accessory to welcome the bride's side at mehendi, sangeet, and wedding ceremonies.",
    features: [
      "58mm diameter large format with ultra-glossy Mylar protective shield",
      "Vibrant high-resolution illustrated bride caricature with gold floral frame",
      "Sturdy tinplate base with anti-rust stainless steel safety pin fastener",
      "Lightweight and secure on sarees, lehengas, kurtas, and blazers without fabric damage",
      "Bulk wholesale pricing for 50, 100, 200, and 500+ wedding orders",
    ],
    colors: [
      { name: "Ivory & Crimson Bride", hex: "#FFF1F2" },
      { name: "Haldi Yellow", hex: "#FEF08A" },
      { name: "Royal Blue (Barati)", hex: "#DBEAFE" },
    ],
    sizes: ["58 mm (Standard Wedding)", "44 mm (Compact)"],
    minQuantity: 10,
    tieredPricing: [
      { minQty: 10, maxQty: 49, price: 39, savings: "Standard" },
      { minQty: 50, maxQty: 199, price: 29, savings: "26% Off" },
      { minQty: 200, maxQty: 499, price: 22, savings: "44% Off" },
      { minQty: 500, maxQty: null, price: 16, savings: "59% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Wedding Favorite",
    customizable: true,
    printArea: "58mm Full Face Round Graphic",
  },
  {
    id: "prod-frame-mosaic-1",
    name: "Multi-Heart Mosaic Collage Personalized Photo Frame",
    slug: "multi-heart-mosaic-collage-personalized-photo-frame",
    category: "Custom Photo Frames",
    categorySlug: "custom-photo-frames",
    price: 599,
    originalPrice: 1199,
    rating: 5.0,
    reviewsCount: 215,
    image: "/images/products/multi-heart-mosaic-frame.jpg",
    gallery: [
      "/images/products/multi-heart-mosaic-frame.jpg",
      "/images/products/anniversary-calendar-frame.jpg",
    ],
    description: "A breathtaking tribute collage featuring 25+ individual heart-shaped photo cutouts harmoniously arranged to form one grand heart centerpiece on a deep matte black backdrop. Finished with your recipient's name in flowing script (e.g., 'Pavithra') and double heart emojis.",
    features: [
      "25 to 30 individual heart photo tiles composed into one master heart motif",
      "Custom calligraphy recipient name etched in lustrous white script",
      "Archival 1200 DPI photographic printing with anti-scratch matte coat",
      "Composite wood frame in deep matte black with hanging hooks and desktop stand",
      "Spectacular birthday, anniversary, or farewell keepsake for best friends and soulmates",
    ],
    colors: [
      { name: "Executive Matte Black", hex: "#111827" },
      { name: "Pristine White", hex: "#FFFFFF" },
    ],
    sizes: ["12 x 18 Inch (Large Wall)", "8 x 12 Inch (A4)", "16 x 24 Inch (Jumbo Wall)"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 4, price: 599, savings: "Standard" },
      { minQty: 5, maxQty: 19, price: 499, savings: "17% Off" },
      { minQty: 20, maxQty: 49, price: 419, savings: "30% Off" },
      { minQty: 50, maxQty: null, price: 349, savings: "42% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Mosaic Art",
    customizable: true,
    printArea: "Full Frame Face: 12\" x 18\"",
  },
  {
    id: "prod-frame-polaroid-1",
    name: "'Family Memories' Polaroid Grid Collage Photo Frame",
    slug: "family-memories-polaroid-grid-collage-photo-frame",
    category: "Custom Photo Frames",
    categorySlug: "custom-photo-frames",
    price: 649,
    originalPrice: 1299,
    rating: 4.9,
    reviewsCount: 176,
    image: "/images/products/family-memories-polaroid-frame.jpg",
    gallery: [
      "/images/products/family-memories-polaroid-frame.jpg",
      "/images/products/collage-photo-frame.jpg",
    ],
    description: "Celebrate generational love with our 'Family Memories' heirloom frame. Displays 12 vintage polaroid mini photo cards surrounding a grand central arch portrait, framed in textured mahogany wood with a refined inner gold fillet border.",
    features: [
      "12 mini vintage polaroid cards around a central large arch memory photo",
      "Textured wood grain frame accented with a gleaming inner gold beveled rim",
      "'Family Memories' calligraphy header flanked by dual ruby red heart accents",
      "High-clarity protective acrylic glass face with dust-proof rear backing",
      "Pre-installed heavy-duty dual sawtooth hangers for secure wall mounting",
    ],
    colors: [
      { name: "Textured Dark Mahogany & Gold", hex: "#3B1E08" },
      { name: "Classic Black & Gold", hex: "#1A1A1A" },
    ],
    sizes: ["12 x 18 Inch (Standard Wall)", "16 x 24 Inch (Grand Living Room)"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 4, price: 649, savings: "Standard" },
      { minQty: 5, maxQty: 19, price: 549, savings: "15% Off" },
      { minQty: 20, maxQty: 49, price: 469, savings: "28% Off" },
      { minQty: 50, maxQty: null, price: 389, savings: "40% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Family Heirloom",
    customizable: true,
    printArea: "Full Frame Face: 12\" x 18\"",
  },
  {
    id: "prod-frame-brush-1",
    name: "Aesthetic Brush-Stroke Splatter Wedding Milestone Photo Frame",
    slug: "aesthetic-brush-stroke-splatter-wedding-milestone-photo-frame",
    category: "Custom Photo Frames",
    categorySlug: "custom-photo-frames",
    price: 549,
    originalPrice: 999,
    rating: 5.0,
    reviewsCount: 168,
    image: "/images/products/brush-stroke-wedding-frame.jpg",
    gallery: [
      "/images/products/brush-stroke-wedding-frame.jpg",
      "/images/products/torn-paper-wedding-frame.jpg",
    ],
    description: "A contemporary gallery-grade wedding frame with painterly watercolor splatter and ripped-edge artwork. Beautifully balances an intimate portrait with a joyful couple celebration photo, customized with couple names (e.g. 'SARATH & AMRUTHA') and wedding date ('APR/24/2024').",
    features: [
      "Artistic watercolor brush splatter center division separating 2 photographs",
      "Custom cursive 'Wedding' header with clean sans-serif names and date",
      "Printed on 300 GSM velvety museum-grade photographic stock",
      "Textured black composite wood border frame with dual tabletop/wall support",
      "Signature photographer aesthetic that matches modern interior aesthetics",
    ],
    colors: [
      { name: "Textured Black", hex: "#18181B" },
      { name: "Scandinavian White", hex: "#FFFFFF" },
    ],
    sizes: ["8 x 12 Inch (A4)", "12 x 18 Inch (A3)", "16 x 24 Inch (Living Room)"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 4, price: 549, savings: "Standard" },
      { minQty: 5, maxQty: 19, price: 449, savings: "18% Off" },
      { minQty: 20, maxQty: 49, price: 369, savings: "33% Off" },
      { minQty: 50, maxQty: null, price: 299, savings: "45% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Wedding Special",
    customizable: true,
    printArea: "Full Frame Face: 8\" x 12\" / 12\" x 18\"",
  },
  {
    id: "prod-frame-payal-1",
    name: "Personalized Birthday Floral Mandala Calendar Memory Frame",
    slug: "personalized-birthday-floral-mandala-calendar-memory-frame",
    category: "Custom Photo Frames",
    categorySlug: "custom-photo-frames",
    price: 499,
    originalPrice: 899,
    rating: 4.9,
    reviewsCount: 125,
    image: "/images/products/birthday-calendar-heart-frame.jpg",
    gallery: [
      "/images/products/birthday-calendar-heart-frame.jpg",
      "/images/products/birthday-memory-frame.jpg",
    ],
    description: "An evocative midnight black tribute frame combining intricate silver-white floral mandala artwork, custom birth month calendar with heart marker, a 15-photo diamond collage, and emotional friendship quotes dedicated to the birthday star.",
    features: [
      "Custom birth month calendar with date highlighted by a red heart",
      "White lace mandala art header with botanical floral accents at base",
      "15-photo collage arranged in a stylish diamond heart layout",
      "Custom friendship/sisterhood heartfelt poem printed in clean typography",
      "Sleek black frame with non-glare protective lamination and hanging bracket",
    ],
    colors: [
      { name: "Midnight Black", hex: "#111827" },
      { name: "Modern White", hex: "#FFFFFF" },
    ],
    sizes: ["8 x 12 Inch (A4)", "12 x 18 Inch (A3)"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 4, price: 499, savings: "Standard" },
      { minQty: 5, maxQty: 19, price: 399, savings: "20% Off" },
      { minQty: 20, maxQty: 49, price: 329, savings: "34% Off" },
      { minQty: 50, maxQty: null, price: 269, savings: "46% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Friendship Gift",
    customizable: true,
    printArea: "Full Frame Face: 8\" x 12\"",
  },
  {
    id: "prod-pendant-name-1",
    name: "Personalized 18K Gold-Plated Couple Name Mangalsutra & Infinity Pendants",
    slug: "personalized-18k-gold-plated-couple-name-mangalsutra-infinity-pendants",
    category: "Personalized Gifts & LED Lamps",
    categorySlug: "personalized-gifts",
    price: 399,
    originalPrice: 899,
    rating: 4.9,
    reviewsCount: 380,
    image: "/images/products/custom-name-mangalsutra-pendants.jpg",
    gallery: [
      "/images/products/custom-name-mangalsutra-pendants.jpg",
      "/images/products/gold-foil-engraved-pens.jpg",
    ],
    description: "Celebrate sacred bonds with our handcrafted custom couple name pendants and mangalsutras. Precision laser-cut from high-grade brass with a rich 18K micro gold plating that resists tarnishing. Styled with auspicious black faceted beads or a delicate gold chain, tailored with your couple names (e.g. Monika Bhanu in infinity loop, Ankit Priya with crown, Ashok Kamal, or Urdu calligraphy).",
    features: [
      "Custom laser-cut couple names linked in infinity loops, crowns, or peacock feather motifs",
      "Durable 18K micro-gold electroplating with anti-tarnish protective lacquer coat",
      "Choice of traditional black auspicious mangalsutra beads or delicate gold link chain",
      "Skin-friendly, nickel-free and hypoallergenic for comfortable everyday wear",
      "Presented in an executive velvet jewelry gift box ready for gifting",
    ],
    colors: [
      { name: "18K Yellow Gold", hex: "#EAB308" },
      { name: "Rose Gold", hex: "#FB7185" },
      { name: "Silver Rhodium", hex: "#E2E8F0" },
    ],
    sizes: ["Standard 18 Inch Chain", "20 Inch Chain", "16 Inch Choker"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 4, price: 399, savings: "Standard" },
      { minQty: 5, maxQty: 19, price: 349, savings: "12% Off" },
      { minQty: 20, maxQty: 49, price: 299, savings: "25% Off" },
      { minQty: 50, maxQty: null, price: 249, savings: "38% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Jewelry Hit",
    customizable: true,
    printArea: "Pendant Width: 35mm - 50mm Laser Cut",
  },
  {
    id: "prod-frame-jumbo-1",
    name: "Jumbo 24x36\" Heirloom Grandparents Anniversary Calendar Wall Frame",
    slug: "jumbo-24x36-heirloom-grandparents-anniversary-calendar-wall-frame",
    category: "Custom Photo Frames",
    categorySlug: "custom-photo-frames",
    price: 1299,
    originalPrice: 2499,
    rating: 5.0,
    reviewsCount: 94,
    image: "/images/products/jumbo-anniversary-calendar-frame.jpg",
    gallery: [
      "/images/products/jumbo-anniversary-calendar-frame.jpg",
      "/images/products/family-memories-polaroid-frame.jpg",
    ],
    description: "Our grandest living room heirloom frame. Measuring a prominent 24x36 inches, this statement tribute features a textured dark mahogany frame with an inner gold fillet, custom anniversary month calendar with heart date marker, dreamcatcher mandala artwork, a 12-photo family generational grid, and a touching personalized poem ('Happy Anniversary Nana ji & Nani ji').",
    features: [
      "Jumbo 24 x 36 inch statement living room focal piece",
      "12-photo family collage spanning generations and golden memories",
      "Custom anniversary calendar with heart date highlight and dreamcatcher motif",
      "Rich dark mahogany textured composite frame with gold beveled inner rim",
      "Archival matte lamination with 100% UV protection and heavy-duty steel wall anchors",
    ],
    colors: [
      { name: "Textured Mahogany & Gold", hex: "#3B1E08" },
      { name: "Classic Matte Black & Gold", hex: "#18181B" },
    ],
    sizes: ["24 x 36 Inch (Jumbo Wall)", "18 x 24 Inch (Large Wall)"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 2, price: 1299, savings: "Standard" },
      { minQty: 3, maxQty: 9, price: 1099, savings: "15% Off" },
      { minQty: 10, maxQty: null, price: 899, savings: "30% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Jumbo Living Room",
    customizable: true,
    printArea: "Full Frame Face: 24\" x 36\"",
  },
  {
    id: "prod-badge-ladkewale-1",
    name: "'Ladke Wale' Wedding Baarat & Sangeet Glossy Button Pin Badges",
    slug: "ladke-wale-wedding-baarat-sangeet-glossy-button-pin-badges",
    category: "Magnetic & Pin Badges",
    categorySlug: "magnetic-badges",
    price: 39,
    originalPrice: 79,
    rating: 4.9,
    reviewsCount: 460,
    image: "/images/products/ladke-wale-wedding-pin-badges.jpg",
    gallery: [
      "/images/products/ladke-wale-wedding-pin-badges.jpg",
      "/images/products/betiwale-wedding-pin-badges.jpg",
      "/images/products/wedding-pin-badges.jpg",
    ],
    description: "Complete the wedding squad! Mint-green 58mm high-gloss button pin badges featuring a swanky sunglasses-wearing groom's-side boy cartoon character with 'Ladke Wale' calligraphy and playful floating hearts. Pairs seamlessly with our 'Ladki Wale' and 'Betiwale' collections.",
    features: [
      "58mm diameter large format with ultra-glossy scratch-resistant Mylar coat",
      "Vibrant full-color illustration of the groom's team with cool sunglasses",
      "Sturdy tinplate construction with rust-free safety pin backing",
      "Lightweight pin design that sits securely on sherwanis, kurtas, and suits",
      "Wholesale factory batch pricing for 50, 100, 200, and 500+ baarat guests",
    ],
    colors: [
      { name: "Mint Green (Ladke Wale)", hex: "#A7F3D0" },
      { name: "Royal Cyan", hex: "#67E8F9" },
      { name: "Golden Haldi", hex: "#FDE047" },
    ],
    sizes: ["58 mm (Standard Wedding)", "44 mm (Compact)"],
    minQuantity: 10,
    tieredPricing: [
      { minQty: 10, maxQty: 49, price: 39, savings: "Standard" },
      { minQty: 50, maxQty: 199, price: 29, savings: "26% Off" },
      { minQty: 200, maxQty: 499, price: 22, savings: "44% Off" },
      { minQty: 500, maxQty: null, price: 16, savings: "59% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Baarat Special",
    customizable: true,
    printArea: "58mm Full Face Round Graphic",
  },
  {
    id: "prod-cushion-couple-pair-1",
    name: "Personalized Couple Name & 4-Photo Grid Satin Cushion Pair",
    slug: "personalized-couple-name-4-photo-grid-satin-cushion-pair",
    category: "Personalized Gifts & LED Lamps",
    categorySlug: "personalized-gifts",
    price: 699,
    originalPrice: 1499,
    rating: 5.0,
    reviewsCount: 195,
    image: "/images/products/couple-name-photo-cushions.jpg",
    gallery: [
      "/images/products/couple-name-photo-cushions.jpg",
      "/images/products/custom-photo-heart-cushion.jpg",
    ],
    description: "An enchanting pair of matching personalized couple cushions. Each 16x16 inch cushion is tailored with partner names (e.g., 'Shubhi' on one and 'Ekansh' on the other) in bold modern typography, alongside a 4-photo collage grid encased in sleek black film borders. Delivered with 2 plush microfiber cushion inserts.",
    features: [
      "Includes 2 matching cushions (His & Hers) with custom printed names",
      "4-photo filmstrip collage on each cushion (total 8 photos across the pair)",
      "Premium silky-smooth Duchess satin fabric with brilliant color fidelity",
      "Concealed hidden zipper along the bottom edge for easy washing",
      "Includes 2 plump 350g virgin hypoallergenic microfiber cushion inserts",
    ],
    colors: [
      { name: "Classic White Satin & Black Grid", hex: "#FFFFFF" },
      { name: "Blush Pink & Charcoal", hex: "#FCE7F3" },
    ],
    sizes: ["Set of Two 16 x 16 Inch Cushions"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 4, price: 699, savings: "Standard" },
      { minQty: 5, maxQty: 19, price: 599, savings: "14% Off" },
      { minQty: 20, maxQty: null, price: 499, savings: "28% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Pair Special",
    customizable: true,
    printArea: "Both Cushions: 16\" x 16\" Full Face",
  },
  {
    id: "prod-frame-crystal-nikah-1",
    name: "Crystal Diamond Beveled LED Islamic Nikah & Wedding Keepsake Frame",
    slug: "crystal-diamond-beveled-led-islamic-nikah-wedding-keepsake-frame",
    category: "Personalized Gifts & LED Lamps",
    categorySlug: "personalized-gifts",
    price: 899,
    originalPrice: 1699,
    rating: 5.0,
    reviewsCount: 160,
    image: "/images/products/crystal-led-nikah-frame.jpg",
    gallery: [
      "/images/products/crystal-led-nikah-frame.jpg",
      "/images/products/led-acrylic-heart-lamp.jpg",
    ],
    description: "A majestic illuminated keepsake frame crafted for Nikah, anniversaries, and Islamic weddings. Features a luxurious faceted crystal-cut beveled border and a gleaming golden pedestal base with integrated warm ambient perimeter LEDs. Personalized with Bismillah calligraphy, Quranic verse ('And We created you in pairs'), couple names in Urdu/English, marriage date, and floral heart artwork.",
    features: [
      "Faceted diamond-cut crystal acrylic border that refracts ambient light",
      "Integrated warm golden LED perimeter illumination with gold weighted pedestal base",
      "Custom Islamic Bismillah & Quranic verse calligraphy with couple names and Nikah date",
      "Includes USB power cable with inline push button control",
      "Packaged in a luxury satin-lined presentation gift box",
    ],
    colors: [
      { name: "Crystal Gold Glow", hex: "#FDE047" },
      { name: "Warm Amber Rose", hex: "#FDBA74" },
    ],
    sizes: ["7 x 9 Inch Desktop", "8 x 10 Inch Premium"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 4, price: 899, savings: "Standard" },
      { minQty: 5, maxQty: 19, price: 749, savings: "16% Off" },
      { minQty: 20, maxQty: 49, price: 629, savings: "30% Off" },
      { minQty: 50, maxQty: null, price: 499, savings: "44% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Nikah Special",
    customizable: true,
    printArea: "Center Acrylic Plate: 130mm x 180mm",
  },
  {
    id: "prod-lamp-cube-3d-1",
    name: "Motorized Rotating 3D LED Photo Cube Lamp",
    slug: "motorized-rotating-3d-led-photo-cube-lamp",
    category: "Personalized Gifts & LED Lamps",
    categorySlug: "personalized-gifts",
    price: 799,
    originalPrice: 1499,
    rating: 4.9,
    reviewsCount: 210,
    image: "/images/products/rotating-3d-photo-cube-lamp.jpg",
    gallery: [
      "/images/products/rotating-3d-photo-cube-lamp.jpg",
      "/images/products/led-acrylic-heart-lamp.jpg",
    ],
    description: "An interactive, mesmerizing photo lamp that slowly spins 360 degrees on a motorized turntable base while illuminating your photos from within! Features 4 panoramic side photo panels and an illuminated top lid personalized with custom celebration text (e.g., 'Happy Birthday' or 'Happy Anniversary').",
    features: [
      "Motorized silent 360-degree rotating base with smooth continuous glide",
      "Backlit by internal energy-efficient warm LED core that makes photos glow",
      "Displays 5 customized photo surfaces (4 full side panels + 1 top lid)",
      "High-definition translucent acrylic panels with scratch-proof UV print",
      "Powered by standard 12V adapter/USB cable with inline switch",
    ],
    colors: [
      { name: "Executive Matte Black Frame", hex: "#18181B" },
      { name: "Pure White Frame", hex: "#FFFFFF" },
    ],
    sizes: ["Cube 5 x 5 x 6 Inch"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 4, price: 799, savings: "Standard" },
      { minQty: 5, maxQty: 19, price: 689, savings: "13% Off" },
      { minQty: 20, maxQty: 49, price: 589, savings: "26% Off" },
      { minQty: 50, maxQty: null, price: 489, savings: "38% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "360° Rotating",
    customizable: true,
    printArea: "4 Sides: 110mm x 110mm each | Top: 110mm x 110mm",
  },
  {
    id: "prod-wallet-photo-1",
    name: "Custom Personalized Photo & Name Genuine Leather Men's Wallet",
    slug: "custom-personalized-photo-name-genuine-leather-mens-wallet",
    category: "Corporate Kits & ID Cards",
    categorySlug: "corporate-kits",
    price: 499,
    originalPrice: 999,
    rating: 4.9,
    reviewsCount: 275,
    image: "/images/products/custom-photo-leather-wallet.jpg",
    gallery: [
      "/images/products/custom-photo-leather-wallet.jpg",
      "/images/products/executive-leather-gift-set.jpg",
    ],
    description: "A sentimental everyday essential for him. Crafted from supple genuine brown leather with precision yellow stitching, this classic bi-fold wallet features your favorite portrait photo permanently transferred onto the front leather face with torn-paper fade edges, accompanied by the recipient's name (e.g., 'ANSHUL') and twin red hearts.",
    features: [
      "Supple top-grain brown leather with durable reinforced contrast stitching",
      "Permanent scratch-resistant photo heat-transfer on front leather flap",
      "Personalized with recipient's name in bold white typography with twin heart icons",
      "Multiple interior credit card slots, transparent ID window, and dual cash dividers",
      "Delivered in an executive gift box with protective foam cushion",
    ],
    colors: [
      { name: "Rich Cognac Brown", hex: "#78350F" },
      { name: "Midnight Black", hex: "#18181B" },
    ],
    sizes: ["Standard Bi-Fold (11.5 x 9.5 cm closed)"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 4, price: 499, savings: "Standard" },
      { minQty: 5, maxQty: 19, price: 419, savings: "16% Off" },
      { minQty: 20, maxQty: 49, price: 349, savings: "30% Off" },
      { minQty: 50, maxQty: null, price: 279, savings: "44% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Men's Pick",
    customizable: true,
    printArea: "Front Leather Flap: 70mm x 60mm Photo + Name",
  },
  {
    id: "prod-frame-minimal-bw-1",
    name: "Minimalist Black & White Polaroid Aesthetic Memory Wall Frame",
    slug: "minimalist-black-white-polaroid-aesthetic-memory-wall-frame",
    category: "Custom Photo Frames",
    categorySlug: "custom-photo-frames",
    price: 499,
    originalPrice: 899,
    rating: 4.8,
    reviewsCount: 130,
    image: "/images/products/minimalist-bw-polaroid-frame.jpg",
    gallery: [
      "/images/products/minimalist-bw-polaroid-frame.jpg",
      "/images/products/birthday-memory-frame.jpg",
    ],
    description: "Embrace modern European minimalism with our black-and-white aesthetic photo frame. Features 8 candid monochrome polaroid photo tiles thoughtfully arranged around an uplifting cursive quote ('Be yourself, love life') and delicate heart line art, encased in an ultra-slim black matte frame.",
    features: [
      "8-photo monochrome black & white candid polaroid collage layout",
      "Inspirational cursive typography centerpiece with minimalist line art heart",
      "High-contrast 1200 DPI archival grayscale photographic printing",
      "Ultra-slim contemporary black wooden frame with crystal-clear matte coat",
      "Perfect for college dorms, minimalist bedroom walls, and anniversary gifts",
    ],
    colors: [
      { name: "Minimalist Black Frame", hex: "#18181B" },
      { name: "Scandinavian White Frame", hex: "#FFFFFF" },
    ],
    sizes: ["8 x 12 Inch (A4)", "12 x 18 Inch (A3)"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 4, price: 499, savings: "Standard" },
      { minQty: 5, maxQty: 19, price: 399, savings: "20% Off" },
      { minQty: 20, maxQty: 49, price: 329, savings: "34% Off" },
      { minQty: 50, maxQty: null, price: 269, savings: "46% Off" },
    ],
    inStock: true,
    isBestSeller: false,
    badgeText: "Aesthetic B&W",
    customizable: true,
    printArea: "Full Frame Face: 8\" x 12\"",
  },
  {
    id: "prod-frame-led-ring-1",
    name: "Backlit LED Border Ring Ceremony & Engagement Calendar Photo Frame",
    slug: "backlit-led-border-ring-ceremony-engagement-calendar-photo-frame",
    category: "Custom Photo Frames",
    categorySlug: "custom-photo-frames",
    price: 699,
    originalPrice: 1399,
    rating: 5.0,
    reviewsCount: 184,
    image: "/images/products/backlit-led-ring-ceremony-frame.jpg",
    gallery: [
      "/images/products/backlit-led-ring-ceremony-frame.jpg",
      "/images/products/ring-ceremony-calendar-frame.jpg",
      "/images/products/anniversary-calendar-frame.jpg",
    ],
    description: "An awe-inspiring dual-function celebration frame! By day, it displays an exquisite November engagement calendar highlighting the ceremony date with a heart marker, alongside candid couple portraits, family blessings, and 'Gifted by Best Brothers'. By night, flip the switch and the integrated perimeter LED border illuminates the artwork with a warm golden glow, doubling as an ambient night lamp.",
    features: [
      "Dual-mode display: Daytime photo calendar frame + Radiant night-light lamp",
      "Built-in perimeter warm golden LED light strip with plug-and-play adapter cord",
      "Engagement calendar highlighting the special ring ceremony date with a heart",
      "Multi-photo collage capturing engagement moments, couple rituals, and family",
      "Sturdy engineered wood frame with reinforced wall hanging clips and table easel",
    ],
    colors: [
      { name: "Midnight Black Frame & Warm Gold LED", hex: "#18181B" },
      { name: "Pristine White Frame & Warm Gold LED", hex: "#FFFFFF" },
    ],
    sizes: ["8 x 12 Inch (A4)", "12 x 18 Inch (A3)"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 4, price: 699, savings: "Standard" },
      { minQty: 5, maxQty: 19, price: 579, savings: "17% Off" },
      { minQty: 20, maxQty: 49, price: 479, savings: "31% Off" },
      { minQty: 50, maxQty: null, price: 389, savings: "44% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Backlit LED",
    customizable: true,
    printArea: "Full Frame Face: 8\" x 12\" / 12\" x 18\"",
  },
  {
    id: "prod-kit-welcome-3in1",
    name: "Corporate Onboarding Executive 3-in-1 Welcome Gift Kit",
    slug: "corporate-onboarding-executive-3in1-welcome-gift-kit",
    category: "Corporate Kits & ID Cards",
    categorySlug: "corporate-kits",
    price: 699,
    originalPrice: 1299,
    rating: 5.0,
    reviewsCount: 340,
    image: "/images/products/corporate-welcome-3in1-kit.jpg",
    gallery: [
      "/images/products/corporate-welcome-3in1-kit.jpg",
      "/images/products/corporate-onboarding-kit-boat.jpg",
      "/images/products/executive-leather-gift-set.jpg",
    ],
    description: "The gold standard in corporate employee welcome gifts. Features a vacuum-insulated stainless steel temperature flask, an A5 hardbound thermo-PU executive diary notebook with debossed brand logo, and a sleek metal ballpoint twist pen with laser-engraved employee/company name. Presented in an executive presentation display box with magnetic easel flap.",
    features: [
      "Grade 304 stainless steel vacuum flask with permanent laser engraving",
      "A5 Thermo-PU vegan leather diary with 192 ruled bleed-free 80 GSM pages",
      "Weight-balanced metallic ballpoint twist pen with German ink refill",
      "Available in Corporate Navy Blue, Tan Brown (Wipro style), Jet Black (boAt style), and Silver Grey",
      "Custom company logo printing and individualized employee name engraving",
    ],
    colors: [
      { name: "Executive Navy Blue", hex: "#1E1B4B" },
      { name: "Stealth Jet Black", hex: "#18181B" },
      { name: "Classic Tan Brown", hex: "#8B5A2B" },
      { name: "Silver Grey", hex: "#9CA3AF" },
    ],
    sizes: ["Standard 3-in-1 Presentation Gift Box"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 9, price: 699, savings: "Standard" },
      { minQty: 10, maxQty: 49, price: 579, savings: "17% Off" },
      { minQty: 50, maxQty: 199, price: 479, savings: "31% Off" },
      { minQty: 200, maxQty: null, price: 399, savings: "43% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Corporate Hit",
    customizable: true,
    printArea: "Flask: 35mm x 120mm | Diary: 70mm x 70mm | Pen: 40mm x 5mm",
  },
  {
    id: "prod-kit-doctor-caduceus",
    name: "Doctor & Medical Professional Caduceus Executive 4-in-1 Gift Set",
    slug: "doctor-medical-professional-caduceus-executive-4in1-gift-set",
    category: "Corporate Kits & ID Cards",
    categorySlug: "corporate-kits",
    price: 799,
    originalPrice: 1499,
    rating: 5.0,
    reviewsCount: 185,
    image: "/images/products/doctor-caduceus-executive-gift-set.jpg",
    gallery: [
      "/images/products/doctor-caduceus-executive-gift-set.jpg",
      "/images/products/gold-foil-engraved-pens.jpg",
    ],
    description: "An elite personalized gift set designed specifically for doctors, surgeons, and medical practitioners. Includes an A5 hardbound black leather diary custom embossed with the doctor's name, a luxury gold-accented metal pen featuring an ornate Caduceus medical clip laser-engraved with the doctor's name, a matching circular Caduceus gold keychain, a 24K gold foil floating pen, and an engraved metal car keychain.",
    features: [
      "Custom laser engraved doctor's name on diary, Caduceus pen, and keychain",
      "Ornate gold-plated Caduceus medical emblem on metal pen clip and keyring",
      "Executive A5 black notebook with pen loop and ribbon bookmark",
      "Bonus customized automotive metal car silhouette keychain with personalized name",
      "Presented in an elegant Kraft display gift box with molded foam slots",
    ],
    colors: [
      { name: "Executive Doctor Black & Gold", hex: "#18181B" },
    ],
    sizes: ["Executive Medical 4-in-1 Box Set"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 4, price: 799, savings: "Standard" },
      { minQty: 5, maxQty: 19, price: 679, savings: "15% Off" },
      { minQty: 20, maxQty: 49, price: 569, savings: "29% Off" },
      { minQty: 50, maxQty: null, price: 469, savings: "41% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Doctor Special",
    customizable: true,
    printArea: "Diary: 70mm x 25mm | Pen: 40mm x 5mm | Keychains: Both",
  },
  {
    id: "prod-hamper-wellness-buddha",
    name: "Spiritual & Corporate Wellness Hamper with Smart LED Flask & Buddha Idol",
    slug: "spiritual-corporate-wellness-hamper-smart-led-flask-buddha-idol",
    category: "Corporate Kits & ID Cards",
    categorySlug: "corporate-kits",
    price: 899,
    originalPrice: 1599,
    rating: 4.9,
    reviewsCount: 140,
    image: "/images/products/spiritual-wellness-buddha-hamper.jpg",
    gallery: [
      "/images/products/spiritual-wellness-buddha-hamper.jpg",
      "/images/products/executive-leather-gift-set.jpg",
    ],
    description: "A serene and meaningful gifting experience for festivals, corporate milestones, and VIP clients. Features a dual-tone pastel purple/cyan smart vacuum flask with real-time digital LED temperature touch display and personalized name/logo engraving, an auspicious matte black & gold meditational Buddha in blessing palm sculpture, and an acrylic heart box of chocolates nestled in decorative shredded craft paper.",
    features: [
      "Smart LED touch lid temperature display stainless steel vacuum bottle (500ml)",
      "High-detail polyresin meditational Buddha nestled in palm with gold accents",
      "Heart-shaped transparent keepsake container with gourmet chocolates",
      "Permanent precision fiber laser engraving of recipient name or corporate logo",
      "Packaged in an artisanal geometric black & white gift hamper box",
    ],
    colors: [
      { name: "Pastel Lavender & Cyan Flask", hex: "#A78BFA" },
      { name: "Midnight Black & Gold", hex: "#18181B" },
    ],
    sizes: ["Luxury Hamper Box 10 x 8 x 4 Inch"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 4, price: 899, savings: "Standard" },
      { minQty: 5, maxQty: 19, price: 769, savings: "14% Off" },
      { minQty: 20, maxQty: 49, price: 649, savings: "28% Off" },
      { minQty: 50, maxQty: null, price: 539, savings: "40% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "VIP Hamper",
    customizable: true,
    printArea: "Flask: 35mm x 100mm Laser Engraving",
  },
  {
    id: "prod-box-royal-velvet-wedding",
    name: "Royal Red Velvet Wedding Card & Shagun Folio Box with Golden Mirror Monogram",
    slug: "royal-red-velvet-wedding-card-shagun-folio-box-golden-mirror-monogram",
    category: "Personalized Gifts & LED Lamps",
    categorySlug: "personalized-gifts",
    price: 599,
    originalPrice: 1199,
    rating: 5.0,
    reviewsCount: 230,
    image: "/images/products/royal-velvet-wedding-card-box.jpg",
    gallery: [
      "/images/products/royal-velvet-wedding-card-box.jpg",
      "/images/products/royal-velvet-shagun-folio.jpg",
    ],
    description: "Create an unforgettable royal first impression for your wedding celebrations. Hand-upholstered in plush scarlet red velvet, this luxury invitation and shagun folio box is adorned with custom laser-cut 3D golden mirror acrylic monogram initials (e.g. 'SN', 'SS') surrounded by a laurel wreath, ornate golden corner filigrees, and a custom date plaque ('04-September 2025' / '07-September 2025').",
    features: [
      "Ultra-plush scarlet red velvet covering with rich tactile feel",
      "Custom laser-cut 3D golden mirror acrylic monogram initials with laurel wreath",
      "Ornate golden filigree corner guards and customized wedding date plaque",
      "Interior compartment accommodates multi-page inserts, dry fruits, or shagun cards",
      "Handcrafted heirloom quality for weddings, engagements, and royal announcements",
    ],
    colors: [
      { name: "Royal Scarlet Red Velvet", hex: "#DC2626" },
      { name: "Regal Emerald Green Velvet", hex: "#065F46" },
      { name: "Deep Navy Blue Velvet", hex: "#1E1B4B" },
    ],
    sizes: ["Standard Folio 9 x 12 Inch", "Mini Shagun Box 7 x 9 Inch"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 9, price: 599, savings: "Standard" },
      { minQty: 10, maxQty: 49, price: 479, savings: "20% Off" },
      { minQty: 50, maxQty: 199, price: 389, savings: "35% Off" },
      { minQty: 200, maxQty: null, price: 299, savings: "50% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Royal Wedding",
    customizable: true,
    printArea: "Center Golden Mirror Monogram: 100mm x 100mm",
  },
  {
    id: "prod-badge-haldi-floral",
    name: "Haldi Theme 'Ladkiwale & Ladkewale' Floral Wreath Wedding Pin Badges",
    slug: "haldi-theme-ladkiwale-ladkewale-floral-wreath-wedding-pin-badges",
    category: "Magnetic & Pin Badges",
    categorySlug: "magnetic-badges",
    price: 39,
    originalPrice: 79,
    rating: 4.9,
    reviewsCount: 490,
    image: "/images/products/haldi-wedding-pin-badges.jpg",
    gallery: [
      "/images/products/haldi-wedding-pin-badges.jpg",
      "/images/products/betiwale-wedding-pin-badges.jpg",
      "/images/products/ladke-wale-wedding-pin-badges.jpg",
    ],
    description: "Bright, festive, and picture-perfect for Haldi ceremonies! High-gloss 58mm button pin badges designed in auspicious turmeric yellow, featuring traditional Indian bride and groom cartoon caricatures encircled by vibrant floral wreaths with 'Ladkiwale' and 'Ladkewale' Hindi/English calligraphy.",
    features: [
      "58mm round format with high-gloss protective waterproof Mylar lamination",
      "Festive bright yellow Haldi backdrop with detailed traditional caricatures",
      "Sturdy tinplate construction with smooth anti-prick safety pin fastener",
      "Ideal accessory for Haldi, Mehendi, and Phoolon Ki Holi photo-ops",
      "Wholesale volume discounts for orders of 50, 100, 200, and 500+ badges",
    ],
    colors: [
      { name: "Turmeric Haldi Yellow", hex: "#FACC15" },
    ],
    sizes: ["58 mm (Standard Event)", "44 mm (Compact)"],
    minQuantity: 10,
    tieredPricing: [
      { minQty: 10, maxQty: 49, price: 39, savings: "Standard" },
      { minQty: 50, maxQty: 199, price: 29, savings: "26% Off" },
      { minQty: 200, maxQty: 499, price: 22, savings: "44% Off" },
      { minQty: 500, maxQty: null, price: 16, savings: "59% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Haldi Special",
    customizable: true,
    printArea: "58mm Full Face Round Graphic",
  },
  {
    id: "prod-badge-bachelorette-squad",
    name: "Bachelorette & Bride Squad Party Pin Badges Collection",
    slug: "bachelorette-bride-squad-party-pin-badges-collection",
    category: "Magnetic & Pin Badges",
    categorySlug: "magnetic-badges",
    price: 45,
    originalPrice: 89,
    rating: 5.0,
    reviewsCount: 320,
    image: "/images/products/bachelorette-bride-squad-badges.jpg",
    gallery: [
      "/images/products/bachelorette-bride-squad-badges.jpg",
      "/images/products/birthday-girl-party-sash.jpg",
    ],
    description: "The ultimate girls' night celebration badges! Centered around an oversized 75mm 'I'm the Bride' diamond badge in pure white, surrounded by witty blush pink squad badges with hilarious party roles ('I'll bring the wine', 'I'll bring the bail money', 'I'll bring the alibi', 'I'll bring the shots', 'I'll bring the bad decisions', 'I'll bring the snacks').",
    features: [
      "Mix-and-match set: 1x 75mm 'I'm the Bride' centerpiece + 58mm squad badges",
      "Chic millennial blush pink & white color palette with bold script typography",
      "High-gloss waterproof Mylar finish that resists party drink spills",
      "Stainless steel safety pin backing for dresses, jackets, and sashes",
      "Essential party accessory for bachelorettes, bridal showers, and cocktail nights",
    ],
    colors: [
      { name: "Blush Pink & White", hex: "#FCE7F3" },
      { name: "Hot Magenta Pink", hex: "#EC4899" },
    ],
    sizes: ["75mm (Bride) + 58mm (Squad)"],
    minQuantity: 5,
    tieredPricing: [
      { minQty: 5, maxQty: 19, price: 45, savings: "Standard" },
      { minQty: 20, maxQty: 49, price: 35, savings: "22% Off" },
      { minQty: 50, maxQty: null, price: 25, savings: "44% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Bachelorette Hit",
    customizable: true,
    printArea: "Full Face Round Graphic",
  },
  {
    id: "prod-badge-awareness-health",
    name: "Institutional, Hospital & Health Awareness Button Pin Badges",
    slug: "institutional-hospital-health-awareness-button-pin-badges",
    category: "Magnetic & Pin Badges",
    categorySlug: "magnetic-badges",
    price: 29,
    originalPrice: 59,
    rating: 4.8,
    reviewsCount: 410,
    image: "/images/products/institutional-awareness-pin-badges.jpg",
    gallery: [
      "/images/products/institutional-awareness-pin-badges.jpg",
      "/images/products/wedding-pin-badges.jpg",
    ],
    description: "Custom bulk button badges engineered for hospital infection control drives (such as AIIMS Bhubaneswar World Hand Hygiene Day), corporate CSR programs, medical conventions, and NGO campaigns. Features durable gloss finish with precision Pantone color matching.",
    features: [
      "Crisp photo-quality printing with scratch-resistant clear Mylar protection",
      "Standard 58mm and 44mm round formats with smooth beveled safety rims",
      "Available with standard rust-proof safety pin or dual-magnet clothing clip",
      "Pantone color matching for corporate identity and healthcare compliance",
      "Direct factory mass production capacity up to 50,000+ badges with 48h dispatch",
    ],
    colors: [
      { name: "Healthcare Deep Navy & Red", hex: "#1E3A8A" },
      { name: "Custom Pantone Palette", hex: "#0284C7" },
    ],
    sizes: ["58 mm (Standard)", "44 mm (Compact)", "75 mm (Jumbo)"],
    minQuantity: 20,
    tieredPricing: [
      { minQty: 20, maxQty: 99, price: 29, savings: "Standard" },
      { minQty: 100, maxQty: 499, price: 19, savings: "34% Off" },
      { minQty: 500, maxQty: 1999, price: 14, savings: "52% Off" },
      { minQty: 2000, maxQty: null, price: 9, savings: "69% Off" },
    ],
    inStock: true,
    isBestSeller: false,
    badgeText: "Bulk Hospital",
    customizable: true,
    printArea: "58mm Full Face Round Graphic",
  },
  {
    id: "prod-sash-birthday-girl",
    name: "Customized Satin 'Birthday Girl' & 'Bride-to-Be' Celebration Party Sash",
    slug: "customized-satin-birthday-girl-bride-to-be-celebration-party-sash",
    category: "Personalized Gifts & LED Lamps",
    categorySlug: "personalized-gifts",
    price: 199,
    originalPrice: 399,
    rating: 4.9,
    reviewsCount: 160,
    image: "/images/products/birthday-girl-party-sash.jpg",
    gallery: [
      "/images/products/birthday-girl-party-sash.jpg",
      "/images/products/bachelorette-bride-squad-badges.jpg",
    ],
    description: "Make the guest of honor feel like royalty! Silky smooth premium double-face satin sash printed in bold contrast lettering ('Birthday Girl' with twinkle stars, 'Bride to Be', or 'Mom to Be'). Includes a matching safety pin for a customized drape.",
    features: [
      "Ultra-soft 100% polyester satin ribbon with lustrous silky drape",
      "Bold heat-transferred metallic gold or contrast black lettering that won't peel",
      "33-inch length (66-inch total loop) draping flatteringly on any height",
      "Safety pin included to adjust snugness and angle comfortably",
      "Available in Hot Pink, Bridal White, Rose Gold, and Midnight Black",
    ],
    colors: [
      { name: "Vibrant Hot Pink", hex: "#EC4899" },
      { name: "Bridal White & Gold", hex: "#FFFFFF" },
      { name: "Rose Gold Shimmer", hex: "#FB7185" },
    ],
    sizes: ["33 Inch Drop (Universal Fit)"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 4, price: 199, savings: "Standard" },
      { minQty: 5, maxQty: 19, price: 159, savings: "20% Off" },
      { minQty: 20, maxQty: null, price: 119, savings: "40% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Party Essential",
    customizable: true,
    printArea: "Sash Face: 600mm x 75mm",
  },
  {
    id: "prod-hamper-oneplus-buddha",
    name: "Executive OnePlus & Buddha Corporate Wellness Hamper with Tea Candles",
    slug: "executive-oneplus-buddha-corporate-wellness-hamper",
    category: "Corporate Kits & ID Cards",
    categorySlug: "corporate-kits",
    price: 899,
    originalPrice: 1699,
    rating: 5.0,
    reviewsCount: 176,
    image: "/images/products/corporate-oneplus-buddha-hamper.jpg",
    gallery: [
      "/images/products/corporate-oneplus-buddha-hamper.jpg",
      "/images/products/spiritual-wellness-buddha-hamper.jpg",
      "/images/products/corporate-welcome-3in1-kit.jpg",
    ],
    description: "A luxurious corporate appreciation and wellness gift hamper tailored for technology companies, premium startups, and executive milestones. Features a stealth matte black 500ml double-wall insulated vacuum bottle with precision laser-engraved corporate branding (e.g. OnePlus corporate monogram or custom recipient name), an auspicious handcrafted Buddha seated in blessing palm sculpture with gold leaf detailing, and 2 warm flickering LED electric tea lights nestled on shredded pastel paper in a designer geometric gift box.",
    features: [
      "Grade 304 food-grade stainless steel vacuum bottle (500ml) with braided silicone carry cord",
      "Permanent vector fiber laser engraving for razor-sharp company logos or employee names",
      "Artisanal hand-painted polyresin Buddha in blessing hand with gold accent robes",
      "2 smokeless, flameless warm amber LED electric tea light candles included",
      "Presentation-ready geometric black-and-white motif hamper box with paper shred cushioning",
    ],
    colors: [
      { name: "Stealth Matte Black & Gold", hex: "#18181B" },
      { name: "Midnight Navy & Gold", hex: "#1E1B4B" },
    ],
    sizes: ["Executive Hamper Box (10\" x 8\" x 4\")"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 4, price: 899, savings: "Standard" },
      { minQty: 5, maxQty: 19, price: 769, savings: "14% Off" },
      { minQty: 20, maxQty: 49, price: 649, savings: "28% Off" },
      { minQty: 50, maxQty: null, price: 539, savings: "40% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Corporate VIP",
    customizable: true,
    printArea: "Flask: 40mm x 120mm Fiber Laser Engraving",
  },
  {
    id: "prod-kit-vacuum-flask-cups",
    name: "Executive 3-Piece 500ml Thermal Flask & Cup Gift Set (SG 21)",
    slug: "executive-3-piece-500ml-thermal-flask-cup-gift-set-sg21",
    category: "Drinkware & Ceramic Mugs",
    categorySlug: "drinkware-mugs",
    price: 499,
    originalPrice: 999,
    rating: 4.9,
    reviewsCount: 265,
    image: "/images/products/vacuum-flask-cup-gift-set.jpg",
    gallery: [
      "/images/products/vacuum-flask-cup-gift-set.jpg",
      "/images/products/dual-tone-ceramic-mugs.jpg",
      "/images/products/corporate-welcome-3in1-kit.jpg",
    ],
    description: "The versatile 'SG 21' executive travel drinkware set designed for office desks, road trips, and corporate gifting. Includes a 500ml double-wall stainless steel thermal vacuum flask with cup lid plus 2 additional matching insulated steel cups with ergonomic handles. Keeps beverages hot for 12 hours or cold for 24 hours. Available in 6 stunning powder-coated finishes with permanent fiber laser etching of your company logo or personalized name.",
    features: [
      "3-piece set: 500ml insulated vacuum bottle + 2 matching double-wall steel handle cups",
      "Double-wall vacuum insulation maintains hot drinks for 12h, iced cold for 24h",
      "Available in 6 elegant shades: Matte Black, Navy Blue, Space Grey, Steel Silver, Sage Green, and Blush Pink",
      "Leakproof push-button inner stopper with 360-degree precision pouring",
      "Presented in a luxury black satin-lined presentation display gift box with carry handles",
    ],
    colors: [
      { name: "Matte Black", hex: "#18181B" },
      { name: "Navy Blue", hex: "#1E3A8A" },
      { name: "Space Grey", hex: "#4B5563" },
      { name: "Steel Silver", hex: "#E5E7EB" },
      { name: "Sage Green", hex: "#065F46" },
      { name: "Blush Pink", hex: "#F472B6" },
    ],
    sizes: ["500ml Flask + 2x 150ml Cups Set"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 4, price: 499, savings: "Standard" },
      { minQty: 5, maxQty: 19, price: 399, savings: "20% Off" },
      { minQty: 20, maxQty: 49, price: 329, savings: "34% Off" },
      { minQty: 50, maxQty: null, price: 269, savings: "46% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Travel Set",
    customizable: true,
    printArea: "Flask: 40mm x 120mm | Cups: 30mm x 25mm Laser Etch",
  },
  {
    id: "prod-wallet-photo-charm-tan",
    name: "Personalized Dual-Side Photo & Charm Tan Leather Bi-Fold Wallet",
    slug: "personalized-dual-side-photo-charm-tan-leather-bi-fold-wallet",
    category: "Personalized Gifts & LED Lamps",
    categorySlug: "personalized-gifts",
    price: 499,
    originalPrice: 999,
    rating: 5.0,
    reviewsCount: 318,
    image: "/images/products/personalized-photo-charm-leather-wallet.jpg",
    gallery: [
      "/images/products/personalized-photo-charm-leather-wallet.jpg",
      "/images/products/custom-photo-leather-wallet.jpg",
      "/images/products/executive-leather-gift-set.jpg",
    ],
    description: "A heartfelt, heirloom-grade keepsake wallet for husband, boyfriend, father, or couples. Crafted from buttery-soft vegetable-tanned tan leather with golden-yellow perimeter stitching. Fully customizable on both sides: the front face features your choice of antique metallic charm (kissing couple, intertwined hearts, or crown) with a riveted brass nameplate, while the back face is permanently laser-engraved with your favorite high-resolution couple or family photograph.",
    features: [
      "Dual-side personalization: Front brass nameplate & charm + Back high-contrast photo engraving",
      "High-resolution grayscale fiber laser engraving directly into genuine veg-tanned leather",
      "Choice of front metallic charms: Kissing Couple, Intertwined Hearts, King/Queen Crown, or Anchor",
      "Functional interior: 2 full cash compartments, 6 card slots, 2 hidden slip pockets, and ID window",
      "Comes packaged in a signature wooden or craft presentation gift box ready for gifting",
    ],
    colors: [
      { name: "Classic Tan Brown", hex: "#C27835" },
      { name: "Vintage Coffee Brown", hex: "#5C3A21" },
      { name: "Stealth Jet Black", hex: "#18181B" },
    ],
    sizes: ["Standard Bi-Fold (4.5\" x 3.5\" Closed)"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 4, price: 499, savings: "Standard" },
      { minQty: 5, maxQty: 19, price: 419, savings: "16% Off" },
      { minQty: 20, maxQty: 49, price: 349, savings: "30% Off" },
      { minQty: 50, maxQty: null, price: 279, savings: "44% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Dual-Side Engraved",
    customizable: true,
    printArea: "Front Nameplate: 45mm x 10mm | Back Photo: 80mm x 65mm",
  },
  {
    id: "prod-1",
    name: "Executive Brushed Metal Magnetic Name Badge",
    slug: "executive-brushed-metal-magnetic-name-badge",
    category: "Magnetic & Pin Badges",
    categorySlug: "magnetic-badges",
    price: 189,
    originalPrice: 299,
    rating: 4.9,
    reviewsCount: 312,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Premium anodized brushed metallic name badge equipped with a 3-point rare-earth neodymium magnetic back fastener. Eliminates holes or tears in luxury formal shirts, suits, and uniforms. Permanent UV laser-cured print ensures logos and names remain scratch-proof.",
    features: [
      "No-pin ultra-strong 3-magnet neodymium fastener",
      "Premium brushed aluminum finish in Silver & Gold",
      "UV direct permanent scratch-resistant printing",
      "Standard executive dimensions: 70mm x 25mm",
      "Beveled safety edges with anti-glare protective coat",
    ],
    colors: [
      { name: "Brushed Silver", hex: "#D8D8D8" },
      { name: "Champagne Gold", hex: "#D4AF37" },
      { name: "Matte Black", hex: "#222222" },
      { name: "Rose Gold", hex: "#B76E79" },
    ],
    sizes: ["70 x 25 mm", "75 x 30 mm", "Round 50 mm"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 9, price: 189, savings: "Standard" },
      { minQty: 10, maxQty: 49, price: 159, savings: "16% Off" },
      { minQty: 50, maxQty: 199, price: 129, savings: "32% Off" },
      { minQty: 200, maxQty: null, price: 99, savings: "48% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Best Seller",
    customizable: true,
    printArea: "65mm x 20mm (Front face)",
  },
  {
    id: "prod-2",
    name: "Classic Bio-Washed Cotton Crew Neck T-Shirt",
    slug: "classic-bio-washed-cotton-crew-neck-tshirt",
    category: "Custom T-Shirts",
    categorySlug: "custom-t-shirts",
    price: 399,
    originalPrice: 699,
    rating: 4.8,
    reviewsCount: 540,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Crafted from 100% super-combed 180 GSM bio-washed cotton. Provides exceptional softness, color fastness, and breathability. Ideal for corporate branding, hackathons, college fests, or startup team uniforms.",
    features: [
      "180 GSM 100% Combed Compact Cotton",
      "Enzyme bio-washed for velvety hand-feel and anti-pilling",
      "Double-stitched ribbed neckline and reinforced shoulders",
      "Vibrant DTF & High-Density Screen Print options",
      "Pre-shrunk fabric to retain shape after 50+ washes",
    ],
    colors: [
      { name: "Navy Blue", hex: "#1E1B4B" },
      { name: "Jet Black", hex: "#18181B" },
      { name: "Pure White", hex: "#FFFFFF" },
      { name: "Heather Grey", hex: "#9CA3AF" },
      { name: "Vibrant Orange", hex: "#F95738" },
      { name: "Bottle Green", hex: "#1E3A2F" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 9, price: 399, savings: "Standard" },
      { minQty: 10, maxQty: 24, price: 339, savings: "15% Off" },
      { minQty: 25, maxQty: 99, price: 279, savings: "30% Off" },
      { minQty: 100, maxQty: null, price: 219, savings: "45% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Hot Deal",
    customizable: true,
    printArea: "Front Chest: 10\" x 12\" | Back: 11\" x 14\"",
  },
  {
    id: "prod-3",
    name: "Heavyweight 380 GSM Fleece Pullover Hoodie",
    slug: "heavyweight-380-gsm-fleece-pullover-hoodie",
    category: "Hoodies & Sweatshirts",
    categorySlug: "hoodies-sweatshirts",
    price: 899,
    originalPrice: 1599,
    rating: 4.9,
    reviewsCount: 289,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Keep warm and look sharp in our signature 380 GSM brushed fleece hoodie. Featuring a double-layered hood with metallic eyelets, dyed-to-match flat drawstrings, and a spacious front kangaroo pouch.",
    features: [
      "380 GSM Heavyweight Brushed Cotton Fleece",
      "Warm inner lining that doesn't shed lint",
      "Spacious kangaroo pocket with bar-tack reinforcement",
      "Ribbed cuffs and hem with elastane for shape retention",
      "Ideal for HD chest embroidery and back oversized screen print",
    ],
    colors: [
      { name: "Midnight Navy", hex: "#1E1B4B" },
      { name: "Charcoal Black", hex: "#1F2937" },
      { name: "Off White", hex: "#F3F4F6" },
      { name: "Burnt Orange", hex: "#EA580C" },
      { name: "Forest Green", hex: "#064E3B" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 5, price: 899, savings: "Standard" },
      { minQty: 6, maxQty: 19, price: 799, savings: "11% Off" },
      { minQty: 20, maxQty: 49, price: 699, savings: "22% Off" },
      { minQty: 50, maxQty: null, price: 599, savings: "33% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Winter Pick",
    customizable: true,
    printArea: "Center Chest: 10\" x 10\" | Left Chest: 4\" x 4\"",
  },
  {
    id: "prod-4",
    name: "Structured 6-Panel Cotton Twill Baseball Cap",
    slug: "structured-6-panel-cotton-twill-baseball-cap",
    category: "Custom Caps",
    categorySlug: "custom-caps",
    price: 249,
    originalPrice: 449,
    rating: 4.7,
    reviewsCount: 194,
    image: "/images/products/custom-embroidered-ved-cap.jpg",
    gallery: [
      "/images/products/custom-embroidered-ved-cap.jpg",
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Premium 100% heavy brushed cotton twill 6-panel cap with reinforced buckram front for structure. Comes with pre-curved visor, stitched ventilation eyelets, and adjustable antique brass metal buckle back strap.",
    features: [
      "Structured 6-panel profile with high-density buckram",
      "Adjustable metal tuck-in closure (fits all sizes)",
      "Padded moisture-wicking inner sweatband",
      "3D Puff or flat embroidery capable",
      "Fade-resistant reactive dyed cotton",
    ],
    colors: [
      { name: "Navy Blue", hex: "#1E1B4B" },
      { name: "Deep Black", hex: "#111827" },
      { name: "Classic White", hex: "#FFFFFF" },
      { name: "Fire Orange", hex: "#F95738" },
      { name: "Olive Drab", hex: "#4B5320" },
    ],
    sizes: ["One Size (Adjustable)"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 9, price: 249, savings: "Standard" },
      { minQty: 10, maxQty: 49, price: 199, savings: "20% Off" },
      { minQty: 50, maxQty: 199, price: 169, savings: "32% Off" },
      { minQty: 200, maxQty: null, price: 139, savings: "44% Off" },
    ],
    inStock: true,
    isBestSeller: false,
    badgeText: "Popular",
    customizable: true,
    printArea: "Front Crown: 4.5\" x 2.2\" | Back arch: 3\" x 1\"",
  },
  {
    id: "prod-5",
    name: "Dual-Tone Matte Ceramic Coffee Mug (325 ml)",
    slug: "dual-tone-matte-ceramic-coffee-mug",
    category: "Drinkware & Ceramic Mugs",
    categorySlug: "drinkware-mugs",
    price: 199,
    originalPrice: 349,
    rating: 4.9,
    reviewsCount: 420,
    image: "/images/products/dual-tone-ceramic-mugs.jpg",
    gallery: [
      "/images/products/dual-tone-ceramic-mugs.jpg",
      "/images/products/patch-sublimation-ceramic-mugs.jpg",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    ],
    description: "High-grade AAA ceramic coffee mug with premium glossy outer sublimation coat and colored inner interior. Microwave and dishwasher safe with 360-degree wrap-around full-color sublimation print.",
    features: [
      "Grade AAA ceramic, lead-free & BPA-free",
      "Glossy sublimation finish with photo-realistic clarity",
      "Comfortable C-handle grip for daily use",
      "Microwave and dishwasher safe (tested for 500+ cycles)",
      "Secure thermocol foam mailer packaging included",
    ],
    colors: [
      { name: "Navy Inside", hex: "#1E1B4B" },
      { name: "Orange Inside", hex: "#F95738" },
      { name: "Black Inside", hex: "#1E293B" },
      { name: "All White Gloss", hex: "#FFFFFF" },
    ],
    sizes: ["325 ml (11 oz)", "450 ml (15 oz)"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 9, price: 199, savings: "Standard" },
      { minQty: 10, maxQty: 49, price: 159, savings: "20% Off" },
      { minQty: 50, maxQty: 149, price: 129, savings: "35% Off" },
      { minQty: 150, maxQty: null, price: 99, savings: "50% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Best Seller",
    customizable: true,
    printArea: "Full Wrap: 200mm x 95mm",
  },
  {
    id: "prod-6",
    name: "Premium Satin Lanyard with Quick-Release Hook (20mm)",
    slug: "premium-satin-lanyard-quick-release-hook",
    category: "Corporate Kits & ID Cards",
    categorySlug: "corporate-kits",
    price: 49,
    originalPrice: 89,
    rating: 4.8,
    reviewsCount: 380,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Silky smooth 20mm premium multi-color woven satin lanyard with high-tensile metal dog hook and optional safety breakaway clip. Perfect for offices, conferences, tech expos, and campus IDs.",
    features: [
      "Ultra-soft woven polyester satin ribbon (skin friendly)",
      "Vibrant full-color continuous thermal sublimation printing",
      "Sturdy alloy swivel lobster claw hook",
      "Optional quick-release plastic breakaway safety buckle",
      "Standard 36-inch loop length (18 inches drop)",
    ],
    colors: [
      { name: "Navy Blue", hex: "#1E1B4B" },
      { name: "Vibrant Orange", hex: "#F95738" },
      { name: "Jet Black", hex: "#000000" },
      { name: "Royal Blue", hex: "#2563EB" },
    ],
    sizes: ["16mm Width", "20mm Width", "25mm Width"],
    minQuantity: 10,
    tieredPricing: [
      { minQty: 10, maxQty: 49, price: 49, savings: "Standard" },
      { minQty: 50, maxQty: 199, price: 35, savings: "28% Off" },
      { minQty: 200, maxQty: 499, price: 28, savings: "42% Off" },
      { minQty: 500, maxQty: null, price: 22, savings: "55% Off" },
    ],
    inStock: true,
    isBestSeller: false,
    badgeText: "Bulk Saver",
    customizable: true,
    printArea: "Both sides: 900mm x 20mm continuous",
  },
  {
    id: "prod-7",
    name: "Luxury Matte Gold Frame Acrylic Name Badge",
    slug: "luxury-matte-gold-frame-acrylic-name-badge",
    category: "Magnetic & Pin Badges",
    categorySlug: "magnetic-badges",
    price: 219,
    originalPrice: 349,
    rating: 5.0,
    reviewsCount: 167,
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80",
    ],
    description: "High-transparency 3mm crystal-clear acrylic face encased in a refined metallic gold border with laser-etched personalization. Features our heavy-duty anti-spin magnetic backing.",
    features: [
      "Laser polished cast acrylic with 98% optical clarity",
      "Metallic gold electroplated border frame",
      "Anti-tilt dual magnet backing system",
      "Glossy domed 3D resin finish option available",
    ],
    colors: [
      { name: "Gold Frame", hex: "#D4AF37" },
      { name: "Silver Frame", hex: "#C0C0C0" },
      { name: "Black Chrome", hex: "#27272A" },
    ],
    sizes: ["70 x 25 mm", "75 x 30 mm"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 9, price: 219, savings: "Standard" },
      { minQty: 10, maxQty: 49, price: 179, savings: "18% Off" },
      { minQty: 50, maxQty: 199, price: 149, savings: "32% Off" },
      { minQty: 200, maxQty: null, price: 119, savings: "45% Off" },
    ],
    inStock: true,
    isBestSeller: false,
    badgeText: "New",
    isNew: true,
    customizable: true,
    printArea: "68mm x 23mm",
  },
  {
    id: "prod-8",
    name: "Pique Cotton Polo T-Shirt with Collar Tipping",
    slug: "pique-cotton-polo-tshirt-collar-tipping",
    category: "Custom T-Shirts",
    categorySlug: "custom-t-shirts",
    price: 549,
    originalPrice: 899,
    rating: 4.8,
    reviewsCount: 245,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80",
    ],
    description: "240 GSM heavy pique cotton knit with contrasting collar and sleeve tipping. Provides an elegant executive smart-casual look for corporate staff, retail teams, and conference delegations.",
    features: [
      "240 GSM Ring-Spun Pique Cotton Honeycomb Knit",
      "Two-tone ribbed collar & cuffs that resist curling",
      "Laser engraved pearl buttons with spare button attached",
      "Side slits with reinforced twill tape",
      "Perfect for high-density left chest embroidery",
    ],
    colors: [
      { name: "Corporate Navy", hex: "#1E1B4B" },
      { name: "Royal White", hex: "#FFFFFF" },
      { name: "Anthracite Grey", hex: "#374151" },
      { name: "Maroon", hex: "#800000" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 9, price: 549, savings: "Standard" },
      { minQty: 10, maxQty: 24, price: 479, savings: "12% Off" },
      { minQty: 25, maxQty: 99, price: 399, savings: "27% Off" },
      { minQty: 100, maxQty: null, price: 329, savings: "40% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Corporate",
    customizable: true,
    printArea: "Left Chest: 3.5\" x 3.5\" | Back Yoke: 4\" x 2\"",
  },
  {
    id: "prod-9",
    name: "Vacuum Insulated Stainless Steel Flask (750 ml)",
    slug: "vacuum-insulated-stainless-steel-flask-750ml",
    category: "Drinkware & Ceramic Mugs",
    categorySlug: "drinkware-mugs",
    price: 499,
    originalPrice: 899,
    rating: 4.9,
    reviewsCount: 310,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Double-walled grade 304 food-safe stainless steel vacuum flask that keeps beverages hot for 12 hours and iced cold for 24 hours. Matte powder coated exterior ready for permanent silver laser engraving.",
    features: [
      "Grade 304 (18/8) Kitchen Grade Stainless Steel",
      "Copper-lined vacuum insulation technology",
      "Sweat-free condensation-proof powder coat finish",
      "Spill-proof silicone sealed leak-tight bamboo lid",
      "Precision rotary fiber laser engraving of logos & names",
    ],
    colors: [
      { name: "Matte Navy", hex: "#1E1B4B" },
      { name: "Stealth Black", hex: "#1F2937" },
      { name: "Sunset Orange", hex: "#F95738" },
      { name: "Brushed Steel", hex: "#E5E7EB" },
    ],
    sizes: ["500 ml", "750 ml", "1000 ml"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 9, price: 499, savings: "Standard" },
      { minQty: 10, maxQty: 49, price: 429, savings: "14% Off" },
      { minQty: 50, maxQty: 149, price: 369, savings: "26% Off" },
      { minQty: 150, maxQty: null, price: 299, savings: "40% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Eco-Friendly",
    customizable: true,
    printArea: "Vertical Engrave: 35mm x 140mm",
  },
  {
    id: "prod-10",
    name: "Executive Hardbound Vegan Leather Notebook & Pen Set",
    slug: "executive-hardbound-vegan-leather-notebook-pen-set",
    category: "Corporate Kits & ID Cards",
    categorySlug: "corporate-kits",
    price: 389,
    originalPrice: 699,
    rating: 4.8,
    reviewsCount: 156,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    ],
    description: "A5 sized executive diary bound in supple thermo PU vegan leather with 192 ruled pages of 80 GSM natural shade paper. Includes expandable back pocket, satin ribbon bookmark, pen loop, and matching engraved metal stylus pen.",
    features: [
      "A5 format with 192 bleed-free 80 GSM acid-free ivory pages",
      "Thermo PU cover ideal for blind debossing or foil stamping",
      "Built-in elastic band closure and matching pen loop",
      "Includes matte black metal ballpoint twist pen",
      "Presented in a chic corporate gift sleeve box",
    ],
    colors: [
      { name: "Navy Blue", hex: "#1E1B4B" },
      { name: "Classic Tan Brown", hex: "#8B5A2B" },
      { name: "Jet Black", hex: "#111827" },
      { name: "Burnt Orange", hex: "#EA580C" },
    ],
    sizes: ["A5 Size (14.8 x 21 cm)"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 9, price: 389, savings: "Standard" },
      { minQty: 10, maxQty: 49, price: 329, savings: "15% Off" },
      { minQty: 50, maxQty: 199, price: 269, savings: "30% Off" },
      { minQty: 200, maxQty: null, price: 219, savings: "43% Off" },
    ],
    inStock: true,
    isBestSeller: false,
    badgeText: "Gift Box",
    customizable: true,
    printArea: "Cover: 70mm x 70mm Deboss/Print",
  },
  {
    id: "prod-11",
    name: "Oversized Heavyweight Streetwear Tee (240 GSM)",
    slug: "oversized-heavyweight-streetwear-tee-240gsm",
    category: "Custom T-Shirts",
    categorySlug: "custom-t-shirts",
    price: 499,
    originalPrice: 899,
    rating: 4.9,
    reviewsCount: 412,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Trending boxy drop-shoulder relaxed silhouette crafted from 240 GSM combed cotton terry. Designed for youth culture, brand merch, colleges, and streetwear creators.",
    features: [
      "240 GSM Heavy French Terry Cotton",
      "Trendy drop-shoulder boxy oversized cut",
      "Thick 1.25\" ribbed crew neckline that won't sag",
      "High-density puff screen print & DTF compatibility",
      "Soft silicone washed for ultra-plush touch",
    ],
    colors: [
      { name: "Washed Navy", hex: "#1E293B" },
      { name: "Oatmeal Beige", hex: "#D6D3D1" },
      { name: "Pitch Black", hex: "#000000" },
      { name: "Rust Orange", hex: "#C2410C" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 9, price: 499, savings: "Standard" },
      { minQty: 10, maxQty: 24, price: 429, savings: "14% Off" },
      { minQty: 25, maxQty: 99, price: 369, savings: "26% Off" },
      { minQty: 100, maxQty: null, price: 299, savings: "40% Off" },
    ],
    inStock: true,
    isBestSeller: true,
    isNew: true,
    badgeText: "Trending",
    customizable: true,
    printArea: "Back Poster: 14\" x 18\" | Front Chest: 8\" x 6\"",
  },
  {
    id: "prod-12",
    name: "Breathable Mesh Back Trucker Snapback Cap",
    slug: "breathable-mesh-back-trucker-snapback-cap",
    category: "Custom Caps",
    categorySlug: "custom-caps",
    price: 229,
    originalPrice: 399,
    rating: 4.6,
    reviewsCount: 135,
    image: "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Classic American style 5-panel trucker cap with foam front panel and breathable nylon rear mesh netting. Features vintage 7-hole adjustable plastic snapback closure.",
    features: [
      "High-density seamless foam front panel for clean printing",
      "Cooling breathable mesh back panels",
      "Plastic snapback strap for universal head sizes",
      "Inner cotton sweatband for maximum all-day comfort",
    ],
    colors: [
      { name: "Navy / White", hex: "#1E1B4B" },
      { name: "Black / Black", hex: "#111827" },
      { name: "Orange / White", hex: "#F95738" },
    ],
    sizes: ["One Size Fits Most"],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 9, price: 229, savings: "Standard" },
      { minQty: 10, maxQty: 49, price: 189, savings: "17% Off" },
      { minQty: 50, maxQty: 199, price: 159, savings: "30% Off" },
      { minQty: 200, maxQty: null, price: 129, savings: "43% Off" },
    ],
    inStock: true,
    isBestSeller: false,
    badgeText: "Summer Essential",
    customizable: true,
    printArea: "Front Foam: 4\" x 2.5\"",
  },
  {
    id: "prod-drink-kulhad-h723",
    name: "Stainless Steel Vacuum Tea & Coffee Kulhad Mug (360ml) - Model H723",
    slug: "stainless-steel-vacuum-tea-coffee-kulhad-mug-h723",
    category: "Drinkware & Ceramic Mugs",
    categorySlug: "drinkware-mugs",
    price: 399,
    originalPrice: 799,
    rating: 4.9,
    reviewsCount: 168,
    image: "/images/products/vacuum-kulhad-mug-h723-main.jpg",
    gallery: [
          "/images/products/vacuum-kulhad-mug-h723-main.jpg",
          "/images/products/vacuum-kulhad-mug-h723-inside.jpg",
          "/images/products/vacuum-kulhad-mug-h723-black.jpg",
          "/images/products/vacuum-kulhad-mug-h723-blue.jpg"
    ],
    description: "An innovative blend of traditional Indian Kulhad culture and modern thermal engineering. Built with food-grade SUS 304 double-wall vacuum insulation to keep beverages hot or cold for extended hours. Includes a clear leak-resistant sip lid, perfect for office desks, executive gifting, and corporate branding with precision fiber laser engraving.",
    features: [
          "Double-wall vacuum insulation keeps beverages hot or cold for 6+ hours",
          "Traditional Indian Kulhad silhouette with contemporary brushed steel collar",
          "360ml ergonomic handy capacity (11cm height x 8cm diameter, 187g with box)",
          "Food-grade SUS 304 stainless steel interior with zero chemical leaching",
          "Spill-resistant crystal clear acrylic sip-through slide lid",
          "Custom fiber laser engraving or UV color printing with your company logo"
    ],
    colors: [
          {
                "name": "Executive Matte Black",
                "hex": "#1A1A1A"
          },
          {
                "name": "Royal Cobalt Blue",
                "hex": "#1D4ED8"
          }
    ],
    sizes: [
          "360ml Compact Desk Mug"
    ],
    minQuantity: 1,
    tieredPricing: [
          {
                "minQty": 1,
                "maxQty": 4,
                "price": 399,
                "savings": "Standard"
          },
          {
                "minQty": 5,
                "maxQty": 19,
                "price": 329,
                "savings": "18% Off"
          },
          {
                "minQty": 20,
                "maxQty": 49,
                "price": 269,
                "savings": "33% Off"
          },
          {
                "minQty": 50,
                "maxQty": null,
                "price": 199,
                "savings": "50% Off"
          }
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Bestseller",
    customizable: true,
    printArea: "Laser Engraving Area: 45mm x 55mm (Front & Back)",
  },
  {
    id: "prod-drink-smart-led-500",
    name: "Smart LED Temperature Display Vacuum Flask (500ml)",
    slug: "smart-led-temperature-display-vacuum-flask-500ml",
    category: "Drinkware & Ceramic Mugs",
    categorySlug: "drinkware-mugs",
    price: 449,
    originalPrice: 899,
    rating: 4.8,
    reviewsCount: 214,
    image: "/images/products/smart-temperature-display-flask-colors.jpg",
    gallery: [
          "/images/products/smart-temperature-display-flask-colors.jpg",
          "/images/products/smart-temperature-display-flask-specs.jpg"
    ],
    description: "High-tech smart hydration flask featuring an intelligent touch-activated LED temperature display integrated into the waterproof cap. Double-wall SUS 304 stainless steel vacuum construction delivers 24-hour temperature retention. Includes a detachable stainless steel tea infuser filter and non-slip bottom base.",
    features: [
          "Smart touch LED cap displays real-time liquid temperature in Celsius",
          "Food-grade SUS 304 stainless steel with double-wall thermal insulation",
          "Detachable SUS 304 mesh tea & fruit infuser strainer included",
          "24-Hour cold retention & 12-hour hot beverage temperature maintenance",
          "Non-slip silicone bottom base prevents accidental desk slips",
          "Laser engraved logo or personalized executive name on matte bottle body"
    ],
    colors: [
          {
                "name": "Matte Black",
                "hex": "#1A1A1A"
          },
          {
                "name": "Polar White",
                "hex": "#F8FAFC"
          },
          {
                "name": "Cobalt Blue",
                "hex": "#1E40AF"
          },
          {
                "name": "Crimson Red",
                "hex": "#DC2626"
          },
          {
                "name": "Blush Pink",
                "hex": "#F472B6"
          },
          {
                "name": "Champagne Gold",
                "hex": "#D4AF37"
          }
    ],
    sizes: [
          "500ml (23cm x 6.5cm)"
    ],
    minQuantity: 1,
    tieredPricing: [
          {
                "minQty": 1,
                "maxQty": 4,
                "price": 449,
                "savings": "Standard"
          },
          {
                "minQty": 5,
                "maxQty": 19,
                "price": 369,
                "savings": "18% Off"
          },
          {
                "minQty": 20,
                "maxQty": 49,
                "price": 299,
                "savings": "33% Off"
          },
          {
                "minQty": 50,
                "maxQty": null,
                "price": 249,
                "savings": "45% Off"
          }
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Trending Tech",
    customizable: true,
    printArea: "Vertical Bottle Body: 35mm x 120mm",
  },
  {
    id: "prod-drink-tumbler-h717",
    name: "Executive Vacuum Tumbler Cup with Flip Lock & Handle (500ml) - Model H717",
    slug: "executive-vacuum-tumbler-cup-flip-lock-handle-500ml-h717",
    category: "Drinkware & Ceramic Mugs",
    categorySlug: "drinkware-mugs",
    price: 499,
    originalPrice: 999,
    rating: 4.9,
    reviewsCount: 138,
    image: "/images/products/vacuum-tumbler-handle-h717-main.jpg",
    gallery: [
          "/images/products/vacuum-tumbler-handle-h717-main.jpg",
          "/images/products/vacuum-tumbler-handle-h717-trio.jpg"
    ],
    description: "The ultimate commuter and executive coffee tumbler. Engineered with double-wall SUS 304 food-grade stainless steel inside and a leakproof flip-up lock cap with an integrated carry handle. Tapered ergonomic profile fits standard car cup holders effortlessly.",
    features: [
          "100% Leakproof flip-up lock lid with integrated foldable finger handle",
          "SUS 304 stainless steel interior with odorless, stain-resistant electropolished finish",
          "500ml travel capacity (17.7cm height x 8.3cm diameter, 360g weight with box)",
          "Car cup-holder friendly tapered base with rubberized anti-scratch coaster bottom",
          "Thermal vacuum insulation for 8 hours hot coffee or 16 hours iced tea",
          "Permanent laser etched logo branding or corporate personalization"
    ],
    colors: [
          {
                "name": "Matte Black",
                "hex": "#1C1C1E"
          },
          {
                "name": "Gunmetal Titanium",
                "hex": "#4A4D52"
          },
          {
                "name": "Pure White",
                "hex": "#FAFAFA"
          }
    ],
    sizes: [
          "500ml Travel Tumbler"
    ],
    minQuantity: 1,
    tieredPricing: [
          {
                "minQty": 1,
                "maxQty": 4,
                "price": 499,
                "savings": "Standard"
          },
          {
                "minQty": 5,
                "maxQty": 19,
                "price": 419,
                "savings": "16% Off"
          },
          {
                "minQty": 20,
                "maxQty": 49,
                "price": 349,
                "savings": "30% Off"
          },
          {
                "minQty": 50,
                "maxQty": null,
                "price": 279,
                "savings": "44% Off"
          }
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Corporate Favorite",
    customizable: true,
    printArea: "Front Tumbler Face: 40mm x 70mm",
  },
  {
    id: "prod-drink-gym-shaker-h722",
    name: "Heavy-Duty Stainless Steel Gym Shaker Bottle with Whisk Ball (1000ml) - Model H722",
    slug: "stainless-steel-gym-shaker-bottle-whisk-ball-1000ml-h722",
    category: "Drinkware & Ceramic Mugs",
    categorySlug: "drinkware-mugs",
    price: 549,
    originalPrice: 1099,
    rating: 4.8,
    reviewsCount: 97,
    image: "/images/products/steel-gym-shaker-1000ml-h722.jpg",
    gallery: [
          "/images/products/steel-gym-shaker-1000ml-h722.jpg"
    ],
    description: "Built for serious fitness enthusiasts, athletes, and daily hydration. Massive 1000ml (1 Liter) capacity crafted from premium shatterproof stainless steel with embossed measurement marks (oz & ml). Includes a surgical steel wire whisk blender ball for lump-free protein shakes.",
    features: [
          "1000ml (1L) jumbo capacity for gym pre-workouts, protein shakes, and bcaa mixes",
          "Includes food-grade stainless steel wire whisk ball for smooth, lump-free shakes",
          "Embossed internal and external measurement markings in oz and ml",
          "Leakproof snap-lock flip cap with integrated carry loop handle",
          "Odor-resistant steel interior that never retains stale supplement smell",
          "Custom gym name, company logo, or athlete personalization via laser engraving"
    ],
    colors: [
          {
                "name": "Midnight Black",
                "hex": "#111827"
          },
          {
                "name": "Royal Blue",
                "hex": "#1D4ED8"
          },
          {
                "name": "Crimson Red",
                "hex": "#DC2626"
          },
          {
                "name": "Brushed Silver",
                "hex": "#D1D5DB"
          },
          {
                "name": "Arctic White",
                "hex": "#FFFFFF"
          }
    ],
    sizes: [
          "1000ml / 1 Liter (23cm x 8.7cm)"
    ],
    minQuantity: 1,
    tieredPricing: [
          {
                "minQty": 1,
                "maxQty": 4,
                "price": 549,
                "savings": "Standard"
          },
          {
                "minQty": 5,
                "maxQty": 19,
                "price": 469,
                "savings": "15% Off"
          },
          {
                "minQty": 20,
                "maxQty": 49,
                "price": 389,
                "savings": "29% Off"
          },
          {
                "minQty": 50,
                "maxQty": null,
                "price": 319,
                "savings": "42% Off"
          }
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Fitness Essential",
    customizable: true,
    printArea: "Center Bottle Panel: 50mm x 90mm",
  },
  {
    id: "prod-drink-bottle-h055",
    name: "Stainless Steel Water Bottle with Woven Lanyard Strap (750ml) - Model H055",
    slug: "stainless-steel-water-bottle-lanyard-strap-750ml-h055",
    category: "Drinkware & Ceramic Mugs",
    categorySlug: "drinkware-mugs",
    price: 379,
    originalPrice: 749,
    rating: 4.8,
    reviewsCount: 154,
    image: "/images/products/steel-water-bottle-h055-main.jpg",
    gallery: [
          "/images/products/steel-water-bottle-h055-main.jpg",
          "/images/products/steel-bottle-strap-h055-silver.jpg",
          "/images/products/steel-water-bottle-h055-black.jpg",
          "/images/products/steel-water-bottle-h055-white.jpg",
          "/images/products/steel-water-bottle-h055-red.jpg",
          "/images/products/steel-water-bottle-h055-blue.jpg"
    ],
    description: "A lightweight, resilient 750ml single-wall stainless steel water bottle. Features an airtight screw-lock stainless steel cap with a durable braided nylon wrist lanyard for effortless portability. Tailored for corporate giveaways, school merchandise, and everyday travel.",
    features: [
          "750ml single-wall food-grade stainless steel bottle (Height 25.4cm x Dia 6.3cm)",
          "Ultra-lightweight design at just 175g for easy commuter handling",
          "Airtight silicone gasket screw cap with woven nylon lanyard carry strap",
          "Available in 6 vibrant metallic and matte powder-coated finishes",
          "Wide mouth accommodates ice cubes and simplifies thorough cleaning",
          "High-contrast laser engraving or full-color UV screen printing"
    ],
    colors: [
          {
                "name": "Brushed Silver",
                "hex": "#CBD5E1"
          },
          {
                "name": "Matte Black",
                "hex": "#1A1A1A"
          },
          {
                "name": "Pristine White",
                "hex": "#FFFFFF"
          },
          {
                "name": "Metallic Red",
                "hex": "#B91C1C"
          },
          {
                "name": "Cobalt Blue",
                "hex": "#2563EB"
          },
          {
                "name": "Navy Blue",
                "hex": "#1E3A8A"
          }
    ],
    sizes: [
          "750ml Standard (25.4cm x 6.3cm)"
    ],
    minQuantity: 1,
    tieredPricing: [
          {
                "minQty": 1,
                "maxQty": 4,
                "price": 379,
                "savings": "Standard"
          },
          {
                "minQty": 5,
                "maxQty": 19,
                "price": 299,
                "savings": "21% Off"
          },
          {
                "minQty": 20,
                "maxQty": 49,
                "price": 249,
                "savings": "34% Off"
          },
          {
                "minQty": 50,
                "maxQty": null,
                "price": 189,
                "savings": "50% Off"
          }
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Budget Value",
    customizable: true,
    printArea: "Lower Body Area: 40mm x 110mm",
  },
  {
    id: "prod-drink-bottle-h120",
    name: "Stainless Steel Sports Water Bottle with Loop Handle (900ml) - Model H120",
    slug: "stainless-steel-sports-water-bottle-loop-handle-900ml-h120",
    category: "Drinkware & Ceramic Mugs",
    categorySlug: "drinkware-mugs",
    price: 389,
    originalPrice: 799,
    rating: 4.8,
    reviewsCount: 112,
    image: "/images/products/steel-water-bottle-h120-main.jpg",
    gallery: [
          "/images/products/steel-water-bottle-h120-main.jpg",
          "/images/products/steel-water-bottle-h120-colors.jpg",
          "/images/products/steel-water-bottle-h120-silver.jpg",
          "/images/products/steel-water-bottle-h120-whitered.jpg"
    ],
    description: "Generous 900ml single-wall stainless steel sports bottle built for trekking, outdoor activities, gym sessions, and university students. Equipped with a heavy-duty carabiner-ready finger loop cap that seals tightly against leaks.",
    features: [
          "Generous 900ml high-capacity stainless steel body for all-day hydration",
          "Ergonomic leakproof screw cap with finger-loop carry handle",
          "Size: Height 28.7cm x Diameter 7cm (Weight: 167g empty / 213g with box)",
          "High-gloss reflective and durable matte powder-coated finishes",
          "100% BPA-free and rust-resistant food-safe stainless steel",
          "Custom branding with laser etching or silk-screen logo prints"
    ],
    colors: [
          {
                "name": "Glossy Black",
                "hex": "#111827"
          },
          {
                "name": "Royal Blue",
                "hex": "#1D4ED8"
          },
          {
                "name": "Bright White",
                "hex": "#FFFFFF"
          },
          {
                "name": "Metallic Red",
                "hex": "#DC2626"
          },
          {
                "name": "Classic Silver",
                "hex": "#94A3B8"
          }
    ],
    sizes: [
          "900ml High Capacity (28.7cm x 7cm)"
    ],
    minQuantity: 1,
    tieredPricing: [
          {
                "minQty": 1,
                "maxQty": 4,
                "price": 389,
                "savings": "Standard"
          },
          {
                "minQty": 5,
                "maxQty": 19,
                "price": 319,
                "savings": "18% Off"
          },
          {
                "minQty": 20,
                "maxQty": 49,
                "price": 259,
                "savings": "33% Off"
          },
          {
                "minQty": 50,
                "maxQty": null,
                "price": 199,
                "savings": "49% Off"
          }
    ],
    inStock: true,
    isBestSeller: false,
    badgeText: "High Capacity",
    customizable: true,
    printArea: "Vertical Print Zone: 45mm x 130mm",
  },
  {
    id: "prod-drink-bottle-h155",
    name: "Dimple Grip Textured Stainless Steel Water Bottle (750ml) - Model H155",
    slug: "dimple-grip-textured-stainless-steel-water-bottle-750ml-h155",
    category: "Drinkware & Ceramic Mugs",
    categorySlug: "drinkware-mugs",
    price: 369,
    originalPrice: 749,
    rating: 4.7,
    reviewsCount: 86,
    image: "/images/products/steel-water-bottle-dimple-h155-main.jpg",
    gallery: [
          "/images/products/steel-water-bottle-dimple-h155-main.jpg"
    ],
    description: "Unique sports water bottle featuring an all-over tactile honeycomb dimple grip pattern for slip-free handling during intense physical training. Includes a dedicated smooth rectangular front panel engineered specifically for crisp corporate logo branding.",
    features: [
          "Tactile 3D dimple texture ensures non-slip grip even with sweaty hands",
          "Specially milled smooth rectangular window dedicated for company logo branding",
          "750ml capacity with compact 25cm height x 6.5cm diameter (Lightweight 120g)",
          "High-grade stainless steel with airtight silicone ring cap",
          "Available in striking metallic copper bronze, electric blue, red, and silver",
          "Ideal for sports institutes, gym welcome kits, and youth marathons"
    ],
    colors: [
          {
                "name": "Copper Bronze",
                "hex": "#B45309"
          },
          {
                "name": "Electric Blue",
                "hex": "#2563EB"
          },
          {
                "name": "Sport Red",
                "hex": "#DC2626"
          },
          {
                "name": "Titanium Silver",
                "hex": "#94A3B8"
          }
    ],
    sizes: [
          "750ml Dimple Body (25cm x 6.5cm)"
    ],
    minQuantity: 1,
    tieredPricing: [
          {
                "minQty": 1,
                "maxQty": 4,
                "price": 369,
                "savings": "Standard"
          },
          {
                "minQty": 5,
                "maxQty": 19,
                "price": 299,
                "savings": "19% Off"
          },
          {
                "minQty": 20,
                "maxQty": 49,
                "price": 239,
                "savings": "35% Off"
          },
          {
                "minQty": 50,
                "maxQty": null,
                "price": 185,
                "savings": "50% Off"
          }
    ],
    inStock: true,
    isBestSeller: false,
    badgeText: "Grip Tech",
    customizable: true,
    printArea: "Dedicated Smooth Logo Plate: 30mm x 60mm",
  },
  {
    id: "prod-drink-flask-h421",
    name: "Double-Wall Insulated Steel Vacuum Flask Hot & Cold (500ml) - Model H421",
    slug: "double-wall-insulated-steel-vacuum-flask-hot-cold-500ml-h421",
    category: "Drinkware & Ceramic Mugs",
    categorySlug: "drinkware-mugs",
    price: 449,
    originalPrice: 899,
    rating: 4.9,
    reviewsCount: 147,
    image: "/images/products/steel-vacuum-flask-h421-main.jpg",
    gallery: [
          "/images/products/steel-vacuum-flask-h421-main.jpg",
          "/images/products/steel-vacuum-flask-h421-colors.jpg",
          "/images/products/steel-vacuum-flask-h421-black.jpg"
    ],
    description: "Certified BPA-free premium thermal flask with inside SUS 304 stainless steel vacuum insulation. Maintains steaming coffee for 12 hours and refreshing iced drinks for 24 hours. Sleek minimalist silhouette with airtight stopper lid, ideal for boardroom meetings and executive client hampers.",
    features: [
          "Inside food-grade SUS 304 stainless steel with double-wall vacuum insulation",
          "Certified 100% BPA Free, non-toxic, and corrosion-resistant construction",
          "500ml capacity (Height 23cm x Diameter 7.2cm, 320g with packaging box)",
          "Multi-part airtight stopper cap guarantees 100% leakproof seal",
          "Includes executive matte gift box packaging for corporate gifting",
          "Laser etched corporate identity, brand logo, or recipient monogram"
    ],
    colors: [
          {
                "name": "Executive Matte Black",
                "hex": "#18181B"
          },
          {
                "name": "Deep Cobalt Blue",
                "hex": "#1E3A8A"
          },
          {
                "name": "Pure Arctic White",
                "hex": "#FFFFFF"
          },
          {
                "name": "Bold Scarlet Red",
                "hex": "#DC2626"
          },
          {
                "name": "Brushed Chrome Silver",
                "hex": "#CBD5E1"
          }
    ],
    sizes: [
          "500ml Standard Vacuum (23cm x 7.2cm)"
    ],
    minQuantity: 1,
    tieredPricing: [
          {
                "minQty": 1,
                "maxQty": 4,
                "price": 449,
                "savings": "Standard"
          },
          {
                "minQty": 5,
                "maxQty": 19,
                "price": 369,
                "savings": "18% Off"
          },
          {
                "minQty": 20,
                "maxQty": 49,
                "price": 299,
                "savings": "33% Off"
          },
          {
                "minQty": 50,
                "maxQty": null,
                "price": 239,
                "savings": "47% Off"
          }
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "BPA Free",
    customizable: true,
    printArea: "Body Circumference / Front: 40mm x 110mm",
  },
  {
    id: "prod-drink-mug-h701",
    name: "Compact Insulated Steel Tea & Coffee Desk Mug with Lid (200ml) - Model H701",
    slug: "compact-insulated-steel-tea-coffee-desk-mug-lid-200ml-h701",
    category: "Drinkware & Ceramic Mugs",
    categorySlug: "drinkware-mugs",
    price: 249,
    originalPrice: 499,
    rating: 4.7,
    reviewsCount: 124,
    image: "/images/products/steel-tea-coffee-mug-h701-main.jpg",
    gallery: [
          "/images/products/steel-tea-coffee-mug-h701-main.jpg",
          "/images/products/steel-tea-coffee-mug-h701-colors.jpg",
          "/images/products/steel-tea-coffee-mug-h701-black.jpg",
          "/images/products/steel-tea-coffee-mug-h701-group.jpg"
    ],
    description: "Compact 200ml tea and espresso desk mug featuring a food-safe stainless steel inner cup and a colorful heat-shielded outer plastic casing. Features an ergonomic comfort handle and push-on silicone-ring splash lid, perfect for quick chai breaks and office pantries.",
    features: [
          "Dual-material build: Stainless steel interior with protective heat-resistant shell",
          "Compact 200ml volume: Height 8.1cm x Diameter 7.1cm (Weight 125g with box)",
          "Includes snug-fitting splash-proof lid with drinking sip opening",
          "Contoured ergonomic finger-grip handle for effortless sipping",
          "Available in 7 vibrant contemporary desk colors",
          "Front branding plate for company logo screen printing or UV monogramming"
    ],
    colors: [
          {
                "name": "Cyan Sky Blue",
                "hex": "#0EA5E9"
          },
          {
                "name": "Fire Red",
                "hex": "#EF4444"
          },
          {
                "name": "Sunshine Yellow",
                "hex": "#FACC15"
          },
          {
                "name": "Tangerine Orange",
                "hex": "#F97316"
          },
          {
                "name": "Clean White",
                "hex": "#FFFFFF"
          },
          {
                "name": "Midnight Black",
                "hex": "#18181B"
          },
          {
                "name": "Royal Purple",
                "hex": "#7E22CE"
          }
    ],
    sizes: [
          "200ml Tea Cup (8.1cm x 7.1cm)"
    ],
    minQuantity: 1,
    tieredPricing: [
          {
                "minQty": 1,
                "maxQty": 4,
                "price": 249,
                "savings": "Standard"
          },
          {
                "minQty": 5,
                "maxQty": 19,
                "price": 199,
                "savings": "20% Off"
          },
          {
                "minQty": 20,
                "maxQty": 49,
                "price": 159,
                "savings": "36% Off"
          },
          {
                "minQty": 50,
                "maxQty": null,
                "price": 129,
                "savings": "48% Off"
          }
    ],
    inStock: true,
    isBestSeller: false,
    badgeText: "Office Favorite",
    customizable: true,
    printArea: "Mug Body Face: 35mm x 45mm",
  },
  {
    id: "prod-drink-mug-h702",
    name: "Stainless Steel Office Coffee Mug with Splash Lid (400ml) - Model H702",
    slug: "stainless-steel-office-coffee-mug-splash-lid-400ml-h702",
    category: "Drinkware & Ceramic Mugs",
    categorySlug: "drinkware-mugs",
    price: 329,
    originalPrice: 649,
    rating: 4.8,
    reviewsCount: 139,
    image: "/images/products/steel-coffee-mug-h702-main.jpg",
    gallery: [
          "/images/products/steel-coffee-mug-h702-main.jpg",
          "/images/products/steel-coffee-mug-h702-box.jpg",
          "/images/products/steel-coffee-mug-h702-black.jpg",
          "/images/products/steel-coffee-mug-h702-red.jpg",
          "/images/products/steel-coffee-mug-h702-blue.jpg"
    ],
    description: "Generous 400ml executive tea and coffee mug. Combines a polished stainless steel interior liner with a premium matte colored exterior and an angled open-grip handle. Sealed with a push-seal lid, making it a reliable desk companion for long work days.",
    features: [
          "400ml capacity (Height 11.2cm x Diameter 8.5cm, Weight 205g with box)",
          "Polished food-grade stainless steel interior with hygienic rolled lip",
          "Comfort-molded right-angle handle with thumb resting contour",
          "Tight-fitting snap-lock lid with easy-open sip tab",
          "Available in 4 professional shades (Black, Cyan Blue, Scarlet Red, White)",
          "Full custom logo screen printing or UV color branding on mug face"
    ],
    colors: [
          {
                "name": "Executive Black",
                "hex": "#1A1A1A"
          },
          {
                "name": "Cyan Blue",
                "hex": "#0284C7"
          },
          {
                "name": "Vibrant Red",
                "hex": "#DC2626"
          },
          {
                "name": "Classic White",
                "hex": "#FFFFFF"
          }
    ],
    sizes: [
          "400ml Large Mug (11.2cm x 8.5cm)"
    ],
    minQuantity: 1,
    tieredPricing: [
          {
                "minQty": 1,
                "maxQty": 4,
                "price": 329,
                "savings": "Standard"
          },
          {
                "minQty": 5,
                "maxQty": 19,
                "price": 269,
                "savings": "18% Off"
          },
          {
                "minQty": 20,
                "maxQty": 49,
                "price": 219,
                "savings": "33% Off"
          },
          {
                "minQty": 50,
                "maxQty": null,
                "price": 169,
                "savings": "49% Off"
          }
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Desk Essential",
    customizable: true,
    printArea: "Front Face: 45mm x 55mm",
  },
  {
    id: "prod-corp-pen-h264",
    name: "Executive Metallic Click Ball Pen with Chrome Trims - Model H264",
    slug: "executive-metallic-click-ball-pen-chrome-trims-h264",
    category: "Corporate Kits & ID Cards",
    categorySlug: "corporate-kits",
    price: 149,
    originalPrice: 299,
    rating: 4.8,
    reviewsCount: 189,
    image: "/images/products/metal-ball-pen-h264-main.jpg",
    gallery: [
          "/images/products/metal-ball-pen-h264-main.jpg",
          "/images/products/metal-ball-pen-h264-grey.jpg",
          "/images/products/metal-ball-pen-h264-blue.jpg",
          "/images/products/metal-ball-pen-h264-white.jpg",
          "/images/products/metal-ball-pen-h264-black.jpg",
          "/images/products/metal-ball-pen-h264-red.jpg"
    ],
    description: "Refined retractable ballpoint pen crafted from balanced alloy metal with silver chrome trim rings and a sturdy pocket clip. Features a satisfying tik-tik click mechanism and refillable high-capacity blue gel ink for buttery smooth signature writing.",
    features: [
          "Precision-weighted metal barrel with dual silver chrome decorative center rings",
          "Smooth retractable tik-tik push mechanism with heavy-duty pocket clip",
          "High-density Swiss tungsten carbide 0.7mm tip with skip-free German ink",
          "Available in 5 executive shades: Carbon Grey, Midnight Black, Blue, Red, White",
          "Laser engraved golden/silver brand name, corporate slogan, or individual name",
          "Ideal companion for corporate diaries, conference folders, and welcome hampers"
    ],
    colors: [
          {
                "name": "Carbon Grey",
                "hex": "#4B5563"
          },
          {
                "name": "Midnight Black",
                "hex": "#111827"
          },
          {
                "name": "Royal Blue",
                "hex": "#1D4ED8"
          },
          {
                "name": "Executive Red",
                "hex": "#B91C1C"
          },
          {
                "name": "Pure White",
                "hex": "#FFFFFF"
          }
    ],
    sizes: [
          "Standard Metal Ballpoint"
    ],
    minQuantity: 1,
    tieredPricing: [
          {
                "minQty": 1,
                "maxQty": 4,
                "price": 149,
                "savings": "Standard"
          },
          {
                "minQty": 5,
                "maxQty": 19,
                "price": 119,
                "savings": "20% Off"
          },
          {
                "minQty": 20,
                "maxQty": 49,
                "price": 89,
                "savings": "40% Off"
          },
          {
                "minQty": 50,
                "maxQty": null,
                "price": 59,
                "savings": "60% Off"
          }
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Conference Pick",
    customizable: true,
    printArea: "Pen Barrel: 5mm x 45mm",
  },
  {
    id: "prod-corp-pen-h278",
    name: "Executive Matte Metal Capped Rollerball Pen - Model H278",
    slug: "executive-matte-metal-capped-rollerball-pen-h278",
    category: "Corporate Kits & ID Cards",
    categorySlug: "corporate-kits",
    price: 199,
    originalPrice: 399,
    rating: 4.9,
    reviewsCount: 162,
    image: "/images/products/metal-roller-pen-h278-main.jpg",
    gallery: [
          "/images/products/metal-roller-pen-h278-main.jpg",
          "/images/products/metal-roller-pen-h278-blue.jpg",
          "/images/products/metal-roller-pen-h278-black.jpg",
          "/images/products/metal-roller-pen-h278-red.jpg"
    ],
    description: "An understated luxury rollerball pen with a smooth snap-on cap and matte anodized metal finish. Perfectly weighted in the hand for executive signing and daily notes. Custom engraved with laser etching that cuts through the matte coating to reveal gleaming metallic brass/silver letters.",
    features: [
          "Streamlined cylindrical metal construction with tactile matte texture",
          "Secure snap-lock cap with minimalist black spring clip",
          "Balanced center of gravity designed for fatigue-free signature flow",
          "0.5mm precision ceramic rollerball tip with fast-drying archival liquid ink",
          "High-contrast laser engraving of name, title, or company logo on cap or barrel",
          "Ships in an individual protective protective sleeve or gift box"
    ],
    colors: [
          {
                "name": "Matte Black",
                "hex": "#18181B"
          },
          {
                "name": "Matte Navy Blue",
                "hex": "#1E3A8A"
          },
          {
                "name": "Matte Crimson",
                "hex": "#991B1B"
          }
    ],
    sizes: [
          "Standard Capped Rollerball"
    ],
    minQuantity: 1,
    tieredPricing: [
          {
                "minQty": 1,
                "maxQty": 4,
                "price": 199,
                "savings": "Standard"
          },
          {
                "minQty": 5,
                "maxQty": 19,
                "price": 159,
                "savings": "20% Off"
          },
          {
                "minQty": 20,
                "maxQty": 49,
                "price": 119,
                "savings": "40% Off"
          },
          {
                "minQty": 50,
                "maxQty": null,
                "price": 89,
                "savings": "55% Off"
          }
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Executive Choice",
    customizable: true,
    printArea: "Cap & Body: 5mm x 40mm",
  },
  {
    id: "prod-corp-cardholder-h1115",
    name: "Horizontal PU Leather Business Card Holder with Steel Logo Plate - Model H1115",
    slug: "horizontal-pu-leather-business-card-holder-steel-plate-h1115",
    category: "Corporate Kits & ID Cards",
    categorySlug: "corporate-kits",
    price: 299,
    originalPrice: 599,
    rating: 4.8,
    reviewsCount: 105,
    image: "/images/products/card-holder-h1115-main.jpg",
    gallery: [
          "/images/products/card-holder-h1115-main.jpg",
          "/images/products/card-holder-h1115-black.jpg",
          "/images/products/card-holder-h1115-blue.jpg"
    ],
    description: "A pocket-sized statement of professional sophistication. Premium water-resistant PU leather case with soft velvet interior that holds up to 25 visiting cards crisp and unbent. Features a brushed stainless steel accent plate on the magnetic closure flap designed for precision laser logo engraving.",
    features: [
          "Reinforced steel chassis wrapped in rich textured vegan PU leather",
          "Brushed stainless steel front plate dedicated for laser engraved branding",
          "Strong magnetic closure keeps cards securely sealed in your pocket or briefcase",
          "Interior lined with anti-scratch soft microfiber felt (Holds 20-25 cards)",
          "Ultra-compact dimensions: 9.7cm x 6.7cm x 1.2cm (Weight: 80g)",
          "Colors available: Executive Black, Midnight Navy Blue, Classic Tan Brown"
    ],
    colors: [
          {
                "name": "Executive Black",
                "hex": "#111827"
          },
          {
                "name": "Midnight Navy",
                "hex": "#1E3A8A"
          },
          {
                "name": "Tan Brown",
                "hex": "#92400E"
          }
    ],
    sizes: [
          "Pocket Size (9.7cm x 6.7cm)"
    ],
    minQuantity: 1,
    tieredPricing: [
          {
                "minQty": 1,
                "maxQty": 4,
                "price": 299,
                "savings": "Standard"
          },
          {
                "minQty": 5,
                "maxQty": 19,
                "price": 239,
                "savings": "20% Off"
          },
          {
                "minQty": 20,
                "maxQty": 49,
                "price": 189,
                "savings": "37% Off"
          },
          {
                "minQty": 50,
                "maxQty": null,
                "price": 149,
                "savings": "50% Off"
          }
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "New Arrival",
    customizable: true,
    printArea: "Brushed Steel Front Plate: 15mm x 50mm",
  },
  {
    id: "prod-corp-cardholder-h1119",
    name: "Executive Vertical PU Leather Visiting Card Holder with Curved Steel Clasp - Model H1119",
    slug: "executive-vertical-pu-leather-card-holder-curved-steel-clasp-h1119",
    category: "Corporate Kits & ID Cards",
    categorySlug: "corporate-kits",
    price: 319,
    originalPrice: 629,
    rating: 4.9,
    reviewsCount: 94,
    image: "/images/products/card-holder-h1119-main.jpg",
    gallery: [
          "/images/products/card-holder-h1119-main.jpg",
          "/images/products/card-holder-h1119-brown.jpg",
          "/images/products/card-holder-h1119-black.jpg",
          "/images/products/card-holder-h1119-blue.jpg"
    ],
    description: "An elegant vertical flip card case accented with a curved arch stainless steel bottom trim. Made with supple top-grain textured PU leather with magnetic lock. Gives any business card presentation an instant touch of elite executive prestige.",
    features: [
          "Distinguished vertical portrait orientation with curved bottom steel clasp",
          "Laser engraved logo or executive nameplate on the curved steel face",
          "Strong dual-magnet latch snaps shut securely with tactile feedback",
          "Pocket-friendly slim profile: 9.5cm x 6.5cm (Weight: 81.5g)",
          "Available in 4 luxurious textures: Cognac Brown, Obsidian Black, Navy Blue, Slate Grey",
          "Protects credit cards, ATM cards, and business cards from corner fraying"
    ],
    colors: [
          {
                "name": "Cognac Brown",
                "hex": "#78350F"
          },
          {
                "name": "Obsidian Black",
                "hex": "#0F172A"
          },
          {
                "name": "Navy Blue",
                "hex": "#1D4ED8"
          },
          {
                "name": "Slate Grey",
                "hex": "#64748B"
          }
    ],
    sizes: [
          "Vertical Pocket (9.5cm x 6.5cm)"
    ],
    minQuantity: 1,
    tieredPricing: [
          {
                "minQty": 1,
                "maxQty": 4,
                "price": 319,
                "savings": "Standard"
          },
          {
                "minQty": 5,
                "maxQty": 19,
                "price": 259,
                "savings": "19% Off"
          },
          {
                "minQty": 20,
                "maxQty": 49,
                "price": 209,
                "savings": "34% Off"
          },
          {
                "minQty": 50,
                "maxQty": null,
                "price": 159,
                "savings": "50% Off"
          }
    ],
    inStock: true,
    isBestSeller: false,
    badgeText: "Elite Luxury",
    customizable: true,
    printArea: "Curved Steel Clasp: 18mm x 55mm",
  },
  {
    id: "prod-corp-giftset-2in1-h3116",
    name: "Executive 2-in-1 Pen & Metal Keychain Corporate Gift Set - Model H3116",
    slug: "executive-2-in-1-pen-metal-keychain-gift-set-h3116",
    category: "Corporate Kits & ID Cards",
    categorySlug: "corporate-kits",
    price: 349,
    originalPrice: 699,
    rating: 4.9,
    reviewsCount: 178,
    image: "/images/products/giftset-2in1-h3116-main.jpg",
    gallery: [
      "/images/products/giftset-2in1-h3116-main.jpg",
      "/images/products/giftset-2in1-h3116-black.jpg",
      "/images/products/giftset-2in1-h3116-blue.jpg"
    ],
    description: "An executive combo gift box featuring our popular metallic click ball pen with dual chrome rings and a matching dual-sided capsule metal keychain. Neatly housed in a luxury matte black presentation gift box with custom die-cut velvet insert. Both the pen barrel and keychain plate are laser engraved with your corporate logo or employee name.",
    features: [
      "Complete 2-in-1 Set: Executive metallic click pen + dual-sided capsule metal keychain",
      "Precision fiber laser branding on both pen barrel and keychain plate",
      "Includes sleek padded gift box with soft velvet molded bed (Size: 16.5cm x 9.5cm x 1.6cm, 100g)",
      "Pen features 0.7mm Swiss carbide tip with smooth smudge-free blue German ink",
      "Keychain features heavy-duty split ring and dual-sided engraving surface",
      "5 Executive Color Themes: Obsidian Black, Slate Grey, Bold Red, Royal Blue, Pure White",
      "Ideal for corporate welcome kits, employee anniversaries, client gifting, and seminars"
    ],
    colors: [
      { name: "Obsidian Black", hex: "#111827" },
      { name: "Slate Grey", hex: "#4B5563" },
      { name: "Bold Red", hex: "#DC2626" },
      { name: "Royal Blue", hex: "#1D4ED8" },
      { name: "Pure White", hex: "#FFFFFF" }
    ],
    sizes: [
      "Gift Box (16.5cm x 9.5cm x 1.6cm)"
    ],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 4, price: 349, savings: "Standard" },
      { minQty: 5, maxQty: 19, price: 289, savings: "17% Off" },
      { minQty: 20, maxQty: 49, price: 229, savings: "34% Off" },
      { minQty: 50, maxQty: null, price: 169, savings: "51% Off" }
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Corporate Favorite",
    customizable: true,
    printArea: "Pen Barrel: 5mm x 45mm | Keychain Plate: 20mm x 35mm",
  },
  {
    id: "prod-corp-giftset-gold-foil-2in1",
    name: "Luxury 24K Floating Gold Foil Pen & Matching Keychain 2-in-1 Executive Gift Box",
    slug: "luxury-24k-floating-gold-foil-pen-keychain-2in1-gift-box",
    category: "Corporate Kits & ID Cards",
    categorySlug: "corporate-kits",
    price: 449,
    originalPrice: 899,
    rating: 5.0,
    reviewsCount: 142,
    image: "/images/products/giftset-gold-foil-pen-keychain.jpg",
    gallery: [
      "/images/products/giftset-gold-foil-pen-keychain.jpg",
      "/images/products/gold-foil-engraved-pens.jpg"
    ],
    description: "An opulent VIP corporate gift set presented in a custom foam-cushioned black hardbox. Contains a prestigious twist-action metallic ballpoint pen with a clear liquid chamber suspended with genuine 24K gold foil flakes, paired with a matching gold foil crystal prism keychain. Features bespoke laser engraving on both items for a lasting impression.",
    features: [
      "Luxury 2-in-1 VIP Set: 24K floating gold leaf pen + matching 24K gold prism keychain",
      "Suspended in mineral liquid that gently cascades gold foil flakes with movement",
      "Polished 18K gold electroplated trims, spring pocket clip, and high-tension key ring",
      "High-contrast fiber laser engraving of name, designation, or corporate crest",
      "Packaged in a textured matte black gift box with protective charcoal foam bed",
      "Refillable 0.7mm German black ballpoint ink with smooth twist mechanism",
      "Prestigious token for Doctors, Lawyers, CXOs, Board Members, and festive Diwali gifting"
    ],
    colors: [
      { name: "Gloss Black & 24K Gold", hex: "#000000" }
    ],
    sizes: [
      "Executive Presentation Box"
    ],
    minQuantity: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 4, price: 449, savings: "Standard" },
      { minQty: 5, maxQty: 19, price: 369, savings: "18% Off" },
      { minQty: 20, maxQty: 49, price: 299, savings: "33% Off" },
      { minQty: 50, maxQty: null, price: 239, savings: "47% Off" }
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "VIP Luxury",
    customizable: true,
    printArea: "Pen Barrel: 5mm x 40mm | Keychain Base: 8mm x 25mm",
  },
  {
    id: "prod-gift-keychain-home-h575",
    name: "Custom Laser Engraved Home-Shape Metal Keychain (Dual-Sided) - Model H575",
    slug: "custom-laser-engraved-home-shape-metal-keychain-h575",
    category: "Personalized Gifts & LED Lamps",
    categorySlug: "personalized-gifts",
    price: 169,
    originalPrice: 349,
    rating: 4.9,
    reviewsCount: 145,
    image: "/images/products/metal-keychain-home-h575-main.jpg",
    gallery: [
          "/images/products/metal-keychain-home-h575-main.jpg",
          "/images/products/metal-keychain-home-h575-silver.jpg",
          "/images/products/metal-keychain-home-h575-black.jpg"
    ],
    description: "A solid zinc alloy keychain shaped like a house silhouette with front-and-back identical polished design. Highly sought after by real estate agencies, architects, mortgage consultants, and new homeowners. Can be laser engraved with house numbers, family names, or builder logos.",
    features: [
          "Precision die-cast metal alloy with durable electroplated chrome finish",
          "Front and back identical design allowing dual-sided laser engraving",
          "Dimensions: Height 8cm x Width 2.7cm (Weight 15g, includes PP protective pouch)",
          "High-tension flat split key ring holds house and car keys securely",
          "Available in Brushed Silver and High-Gloss Mirror Black",
          "Popular choice for Griha Pravesh gifts, builder handovers, and hotel keytags"
    ],
    colors: [
          {
                "name": "Brushed Silver",
                "hex": "#E2E8F0"
          },
          {
                "name": "Mirror Black",
                "hex": "#0F172A"
          }
    ],
    sizes: [
          "8cm x 2.7cm (15g)"
    ],
    minQuantity: 1,
    tieredPricing: [
          {
                "minQty": 1,
                "maxQty": 4,
                "price": 169,
                "savings": "Standard"
          },
          {
                "minQty": 5,
                "maxQty": 19,
                "price": 129,
                "savings": "24% Off"
          },
          {
                "minQty": 20,
                "maxQty": 49,
                "price": 99,
                "savings": "41% Off"
          },
          {
                "minQty": 50,
                "maxQty": null,
                "price": 79,
                "savings": "53% Off"
          }
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Real Estate Pick",
    customizable: true,
    printArea: "Dual-Sided House Face: 22mm x 22mm",
  },
  {
    id: "prod-gift-keychain-round-h573",
    name: "Custom Dual-Side Laser Engraved Round Metal Keychain - Model H573",
    slug: "custom-dual-side-laser-engraved-round-metal-keychain-h573",
    category: "Personalized Gifts & LED Lamps",
    categorySlug: "personalized-gifts",
    price: 169,
    originalPrice: 349,
    rating: 4.8,
    reviewsCount: 132,
    image: "/images/products/metal-keychain-round-h573-main.jpg",
    gallery: [
          "/images/products/metal-keychain-round-h573-main.jpg",
          "/images/products/metal-keychain-round-h573-pair.jpg",
          "/images/products/metal-keychain-round-h573-keys.jpg"
    ],
    description: "Classic circular medallion metal keychain with rounded pill-link swivel connector. Beautifully polished bevel edge with a brushed center disc made for high-definition laser engraving on both faces. Fits car keys, motorcycle ignitions, and locker keys with timeless style.",
    features: [
          "Circular medallion silhouette with seamless pivot-link connector",
          "Dual-sided identical face allows distinct text/logo on front & back",
          "Dimensions: Height 6.8cm x Diameter 4.3cm (Weight 15g)",
          "High-precision laser etching produces everlasting silver/white mark",
          "Colors: Brushed Silver Stainless and High-Gloss Obsidian Black",
          "Individually packed in clean transparent blister PP packaging"
    ],
    colors: [
          {
                "name": "Brushed Silver",
                "hex": "#CBD5E1"
          },
          {
                "name": "High-Gloss Black",
                "hex": "#111827"
          }
    ],
    sizes: [
          "6.8cm x 4.3cm (15g)"
    ],
    minQuantity: 1,
    tieredPricing: [
          {
                "minQty": 1,
                "maxQty": 4,
                "price": 169,
                "savings": "Standard"
          },
          {
                "minQty": 5,
                "maxQty": 19,
                "price": 129,
                "savings": "24% Off"
          },
          {
                "minQty": 20,
                "maxQty": 49,
                "price": 99,
                "savings": "41% Off"
          },
          {
                "minQty": 50,
                "maxQty": null,
                "price": 79,
                "savings": "53% Off"
          }
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Timeless Classic",
    customizable: true,
    printArea: "Round Face: 30mm Diameter (Dual Sided)",
  },
  {
    id: "prod-gift-keychain-tag-h574",
    name: "Custom Dog-Tag Capsule Metal Keychain (Front & Back Engraved) - Model H574",
    slug: "custom-dog-tag-capsule-metal-keychain-h574",
    category: "Personalized Gifts & LED Lamps",
    categorySlug: "personalized-gifts",
    price: 169,
    originalPrice: 349,
    rating: 4.8,
    reviewsCount: 118,
    image: "/images/products/metal-keychain-tag-h574-main.jpg",
    gallery: [
          "/images/products/metal-keychain-tag-h574-main.jpg",
          "/images/products/metal-keychain-tag-h574-black.jpg",
          "/images/products/metal-keychain-tag-h574-keys.jpg",
          "/images/products/metal-keychain-tag-h574-pair.jpg"
    ],
    description: "Sleek rounded-rectangle dog tag metal keychain featuring a robust elongated link. Double-sided identical design offers plenty of horizontal engraving space for company names, phone numbers, vehicle registration numbers, or inspiring mantras.",
    features: [
          "Rounded-rectangle capsule profile with raised protective chrome bezel",
          "Both front and back share identical design for dual personalization",
          "Size: Height 8cm x Width 2.7cm (Lightweight 15g)",
          "High-grade electroplated alloy resists rust, fading, and pocket scratches",
          "Colors: Brushed Silver and Mirror Black enamel center",
          "Personalized with laser engraving with instant turnaround in Ranchi Hub"
    ],
    colors: [
          {
                "name": "Brushed Silver",
                "hex": "#E2E8F0"
          },
          {
                "name": "Mirror Black",
                "hex": "#0F172A"
          }
    ],
    sizes: [
          "8cm x 2.7cm (15g)"
    ],
    minQuantity: 1,
    tieredPricing: [
          {
                "minQty": 1,
                "maxQty": 4,
                "price": 169,
                "savings": "Standard"
          },
          {
                "minQty": 5,
                "maxQty": 19,
                "price": 129,
                "savings": "24% Off"
          },
          {
                "minQty": 20,
                "maxQty": 49,
                "price": 99,
                "savings": "41% Off"
          },
          {
                "minQty": 50,
                "maxQty": null,
                "price": 79,
                "savings": "53% Off"
          }
    ],
    inStock: true,
    isBestSeller: false,
    badgeText: "Popular Tag",
    customizable: true,
    printArea: "Capsule Plate: 20mm x 35mm (Dual Sided)",
  },
  {
    id: "prod-gift-keychain-opener-h519",
    name: "Heavy-Duty Carabiner Hook Metal Keychain with Built-in Bottle Opener - Model H519",
    slug: "heavy-duty-carabiner-hook-metal-keychain-bottle-opener-h519",
    category: "Personalized Gifts & LED Lamps",
    categorySlug: "personalized-gifts",
    price: 249,
    originalPrice: 499,
    rating: 4.9,
    reviewsCount: 167,
    image: "/images/products/metal-keychain-opener-h519-main.jpg",
    gallery: [
          "/images/products/metal-keychain-opener-h519-main.jpg",
          "/images/products/metal-keychain-opener-h519-brown.jpg",
          "/images/products/metal-keychain-opener-h519-grey.jpg",
          "/images/products/metal-keychain-opener-h519-blue.jpg",
          "/images/products/metal-keychain-opener-h519-black.jpg"
    ],
    description: "The ultimate everyday carry (EDC) utility keychain. Combines a spring-loaded metal carabiner belt loop clip, an integrated cold drink bottle opener, and a genuine textured leather strap connecting to a heavy-duty key ring. The center metal plate offers high-precision laser logo branding.",
    features: [
          "3-in-1 Multi-utility: Spring belt clip, bottle opener & reinforced key ring",
          "Center metal face plate engineered for crisp permanent laser branding",
          "Textured premium vegan leather strap with heavy-duty metal rivets",
          "Dimensions: Height 10cm x Width 3.3cm x Thickness 0.8cm (Weight 29g)",
          "Available in 4 leather strap shades: Saddle Brown, Olive Grey, Navy Blue, Onyx Black",
          "Built for daily commuting, outdoor adventure, camping, and automotive gifting"
    ],
    colors: [
          {
                "name": "Saddle Brown",
                "hex": "#78350F"
          },
          {
                "name": "Olive Grey",
                "hex": "#4B5563"
          },
          {
                "name": "Navy Blue",
                "hex": "#1D4ED8"
          },
          {
                "name": "Onyx Black",
                "hex": "#111827"
          }
    ],
    sizes: [
          "10cm x 3.3cm (29g)"
    ],
    minQuantity: 1,
    tieredPricing: [
          {
                "minQty": 1,
                "maxQty": 4,
                "price": 249,
                "savings": "Standard"
          },
          {
                "minQty": 5,
                "maxQty": 19,
                "price": 199,
                "savings": "20% Off"
          },
          {
                "minQty": 20,
                "maxQty": 49,
                "price": 149,
                "savings": "40% Off"
          },
          {
                "minQty": 50,
                "maxQty": null,
                "price": 119,
                "savings": "52% Off"
          }
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "EDC Bestseller",
    customizable: true,
    printArea: "Center Metal Face: 18mm x 25mm",
  },
  {
    id: "prod-gift-keychain-tyre-h530",
    name: "3D Spinning Alloy Wheel & Real Rubber Tyre Metal Keychain - Model H530",
    slug: "3d-spinning-alloy-wheel-rubber-tyre-metal-keychain-h530",
    category: "Personalized Gifts & LED Lamps",
    categorySlug: "personalized-gifts",
    price: 229,
    originalPrice: 459,
    rating: 4.9,
    reviewsCount: 204,
    image: "/images/products/metal-keychain-tyre-h530-main.jpg",
    gallery: [
          "/images/products/metal-keychain-tyre-h530-main.jpg",
          "/images/products/metal-keychain-tyre-h530-angle.jpg",
          "/images/products/metal-keychain-tyre-h530-pair.jpg",
          "/images/products/metal-keychain-tyre-h530-single.jpg"
    ],
    description: "A dream collectible for car enthusiasts and automotive brands. Features a free-spinning miniature 5-spoke chrome alloy wheel rim enveloped in a genuine textured rubber tire tread. The connecting metal arm is designed for laser engraved car registration numbers or brand logos.",
    features: [
          "Realistic miniature 3D 5-spoke chrome alloy wheel that spins freely on ball axis",
          "Encased in real textured vulcanized black rubber tire with tread grooves",
          "Sturdy metal pivot stem provides laser engraving area for logo or car plate number",
          "Solid chrome split key ring designed for car key fobs and bike keys",
          "The top gift for car showroom deliveries, auto detailing studios, and vehicle owners"
    ],
    colors: [
          {
                "name": "Chrome Silver & Black Rubber",
                "hex": "#E2E8F0"
          }
    ],
    sizes: [
          "Wheel Diameter 3.5cm x Total Length 8cm"
    ],
    minQuantity: 1,
    tieredPricing: [
          {
                "minQty": 1,
                "maxQty": 4,
                "price": 229,
                "savings": "Standard"
          },
          {
                "minQty": 5,
                "maxQty": 19,
                "price": 179,
                "savings": "22% Off"
          },
          {
                "minQty": 20,
                "maxQty": 49,
                "price": 139,
                "savings": "39% Off"
          },
          {
                "minQty": 50,
                "maxQty": null,
                "price": 109,
                "savings": "52% Off"
          }
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Auto Fan Favorite",
    customizable: true,
    printArea: "Wheel Hub & Stem Arm: 10mm x 25mm",
  },
  {
    id: "prod-gift-keychain-home-leather-h589",
    name: "House Silhouette Metal Carabiner Hook Keychain with Leather Strap - Model H589",
    slug: "house-silhouette-metal-carabiner-hook-keychain-leather-strap-h589",
    category: "Personalized Gifts & LED Lamps",
    categorySlug: "personalized-gifts",
    price: 219,
    originalPrice: 449,
    rating: 4.8,
    reviewsCount: 88,
    image: "/images/products/metal-keychain-home-leather-h589-main.jpg",
    gallery: [
          "/images/products/metal-keychain-home-leather-h589-main.jpg",
          "/images/products/metal-keychain-home-leather-h589-brown.jpg",
          "/images/products/metal-keychain-home-leather-h589-grey.jpg",
          "/images/products/metal-keychain-home-leather-h589-black.jpg"
    ],
    description: "An architectural statement piece. Features a spring-gate metal carabiner hook in a house roof silhouette, connected to a textured leather strap and sturdy key ring. Perfect for hanging on wall key racks or clipping onto belt loops.",
    features: [
          "Spring-gate metal carabiner hook designed in charming house silhouette",
          "Black enamel house plate personalized with laser engraved logo or initials",
          "Textured vegan leather strap connecting to heavy-duty flat key ring",
          "Total size: Height 9.7cm x Width 3.2cm (Weight 27g with packing)",
          "Available in 4 strap colors: Warm Brown, Slate Grey, Navy Blue, Classic Black",
          "Ideal gift for home handovers, interior designers, and family housewarming"
    ],
    colors: [
          {
                "name": "Warm Brown",
                "hex": "#78350F"
          },
          {
                "name": "Slate Grey",
                "hex": "#4B5563"
          },
          {
                "name": "Navy Blue",
                "hex": "#1D4ED8"
          },
          {
                "name": "Classic Black",
                "hex": "#111827"
          }
    ],
    sizes: [
          "9.7cm x 3.2cm (27g)"
    ],
    minQuantity: 1,
    tieredPricing: [
          {
                "minQty": 1,
                "maxQty": 4,
                "price": 219,
                "savings": "Standard"
          },
          {
                "minQty": 5,
                "maxQty": 19,
                "price": 169,
                "savings": "23% Off"
          },
          {
                "minQty": 20,
                "maxQty": 49,
                "price": 129,
                "savings": "41% Off"
          },
          {
                "minQty": 50,
                "maxQty": null,
                "price": 99,
                "savings": "55% Off"
          }
    ],
    inStock: true,
    isBestSeller: false,
    badgeText: "New Arrival",
    customizable: true,
    printArea: "House Enamel Face: 15mm x 18mm",
  },
  {
    id: "prod-gift-keychain-bar-tag",
    name: "Personalized Minimalist Metallic Bar Keychain with Round Charm",
    slug: "personalized-minimalist-metallic-bar-keychain-round-charm",
    category: "Personalized Gifts & LED Lamps",
    categorySlug: "personalized-gifts",
    price: 189,
    originalPrice: 379,
    rating: 4.9,
    reviewsCount: 156,
    image: "/images/products/metal-keychain-bar-tag-colors.jpg",
    gallery: [
          "/images/products/metal-keychain-bar-tag-colors.jpg"
    ],
    description: "Chic modern vertical bar pendant keychain accompanied by an accent round coin charm. Crafted from mirror-polished surgical stainless steel with scratch-resistant PVD coating. Can be custom laser engraved on 4 vertical bar sides with dates, coordinates, names, or quotes.",
    features: [
          "4-Sided elongated solid steel bar pendant with matching circular coin charm",
          "Wear-resistant PVD vacuum plating with mirror-reflection polish",
          "Engrave names on side 1, coordinates on side 2, dates on side 3, initial on charm",
          "Available in 4 luxury finishes: Rose Gold, 18K Luxury Gold, Mirror Silver, Bronze",
          "Comes in an elegant velvet jewelry drawstring pouch",
          "Romantic anniversary, couple milestone, and wedding party keepsake"
    ],
    colors: [
          {
                "name": "Rose Gold",
                "hex": "#FB7185"
          },
          {
                "name": "18K Luxury Gold",
                "hex": "#F59E0B"
          },
          {
                "name": "Mirror Silver",
                "hex": "#E2E8F0"
          },
          {
                "name": "Antique Bronze",
                "hex": "#92400E"
          }
    ],
    sizes: [
          "Bar 40mm x 5mm + 12mm Charm"
    ],
    minQuantity: 1,
    tieredPricing: [
          {
                "minQty": 1,
                "maxQty": 4,
                "price": 189,
                "savings": "Standard"
          },
          {
                "minQty": 5,
                "maxQty": 19,
                "price": 149,
                "savings": "21% Off"
          },
          {
                "minQty": 20,
                "maxQty": 49,
                "price": 119,
                "savings": "37% Off"
          },
          {
                "minQty": 50,
                "maxQty": null,
                "price": 89,
                "savings": "53% Off"
          }
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Couple Favorite",
    customizable: true,
    printArea: "4 Bar Sides: 4mm x 35mm each",
  },
  {
    id: "prod-gift-keychain-lawyer-band",
    name: "Advocate Legal Neckband Stainless Steel Keychain",
    slug: "advocate-legal-neckband-stainless-steel-keychain",
    category: "Personalized Gifts & LED Lamps",
    categorySlug: "personalized-gifts",
    price: 199,
    originalPrice: 399,
    rating: 5,
    reviewsCount: 112,
    image: "/images/products/metal-keychain-advocate-band.jpg",
    gallery: [
          "/images/products/metal-keychain-advocate-band.jpg"
    ],
    description: "An exclusive tribute to legal professionals. Precision laser cut from solid stainless steel depicting the iconic advocate neckband collar tie within a protective circular ring with bottom pedestal for personalized lawyer name engraving.",
    features: [
          "Iconic legal advocate white neckband collar insignia laser cut in solid steel",
          "Dedicated lower pedestal bar personalized with Advocate Name or High Court / Supreme Court",
          "Rust-proof brushed stainless steel finish with heavy curb link chain",
          "Sturdy heavy-duty key ring engineered for office keys, court chambers, and car keys",
          "The definitive law graduation, bar council enrollment, and advocate elevation gift"
    ],
    colors: [
          {
                "name": "Brushed Surgical Steel",
                "hex": "#CBD5E1"
          }
    ],
    sizes: [
          "Medallion Height 4.5cm x Width 4cm"
    ],
    minQuantity: 1,
    tieredPricing: [
          {
                "minQty": 1,
                "maxQty": 4,
                "price": 199,
                "savings": "Standard"
          },
          {
                "minQty": 5,
                "maxQty": 19,
                "price": 159,
                "savings": "20% Off"
          },
          {
                "minQty": 20,
                "maxQty": 49,
                "price": 129,
                "savings": "35% Off"
          },
          {
                "minQty": 50,
                "maxQty": null,
                "price": 95,
                "savings": "52% Off"
          }
    ],
    inStock: true,
    isBestSeller: true,
    badgeText: "Legal Special",
    customizable: true,
    printArea: "Lower Name Bar: 5mm x 25mm",
  },
];
