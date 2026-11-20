"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Maximize2,
  X,
  Heart,
  CheckCircle2,
  Camera,
} from "lucide-react";

interface GalleryPhoto {
  id: string;
  title: string;
  category: "frames" | "gifts" | "badges" | "leather";
  categoryLabel: string;
  image: string;
  tag: string;
  productLink: string;
  productName: string;
  priceNote: string;
  description: string;
}

export const WorkshopGallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<GalleryPhoto | null>(null);

  const photos: GalleryPhoto[] = [
    {
      id: "photo-1",
      title: "Customized Anniversary Calendar Keepsake Frame",
      category: "frames",
      categoryLabel: "Photo Frames",
      image: "/images/products/anniversary-calendar-frame.jpg",
      tag: "Customer Favorite",
      productLink: "/products/prod-frame-1",
      productName: "Anniversary & Memory Calendar Frame",
      priceNote: "₹499 (Free Personalization)",
      description: "Custom December anniversary calendar with heart marker on wedding date and photo memories.",
    },
    {
      id: "photo-2",
      title: "Laser Engraved 3D LED Acrylic Heart Lamp",
      category: "gifts",
      categoryLabel: "LED Lamps",
      image: "/images/products/led-acrylic-heart-lamp.jpg",
      tag: "Valentine Special",
      productLink: "/products/prod-lamp-1",
      productName: "3D LED Acrylic Heart Lamp",
      priceNote: "₹699 (Warm Ambient LED)",
      description: "Precision laser engraved optical acrylic with couple calligraphy script on solid wood base.",
    },
    {
      id: "photo-3",
      title: "Personalized Birthday Milestone & Sibling Frame",
      category: "frames",
      categoryLabel: "Photo Frames",
      image: "/images/products/birthday-memory-frame.jpg",
      tag: "Birthday Keepsake",
      productLink: "/products/prod-frame-3",
      productName: "Birthday Milestone Memory Frame",
      priceNote: "₹499 (Matte Glass Finish)",
      description: "Custom sister birthday photo frame with November calendar marker and emotional quote.",
    },
    {
      id: "photo-4",
      title: "Executive 4-in-1 Personalized Leather Gift Hamper",
      category: "leather",
      categoryLabel: "Leather & Pens",
      image: "/images/products/executive-leather-gift-set.jpg",
      tag: "Executive Hamper",
      productLink: "/products/prod-leather-1",
      productName: "Executive 4-in-1 Leather Gift Set",
      priceNote: "₹999 (Luxury Boxed)",
      description: "Includes custom passport cover, wallet, eyewear pouch, and keychain with engraved brass nameplates.",
    },
    {
      id: "photo-5",
      title: "Floating 24K Gold Foil Laser Engraved Pens",
      category: "leather",
      categoryLabel: "Leather & Pens",
      image: "/images/products/gold-foil-engraved-pens.jpg",
      tag: "Teacher Appreciation",
      productLink: "/products/prod-pen-1",
      productName: "24K Floating Gold Foil Pen",
      priceNote: "₹199 / pc (Wholesale Tier)",
      description: "Liquid-suspended 24K gold foil flakes with permanent fiber laser engraved recipient names.",
    },
    {
      id: "photo-6",
      title: "Customized Glossy Wedding Pin Badges (Ladki Wale)",
      category: "badges",
      categoryLabel: "Badges & Keychains",
      image: "/images/products/wedding-pin-badges.jpg",
      tag: "Wedding Special",
      productLink: "/products/prod-badge-btn-1",
      productName: "Custom Event Pin Badges",
      priceNote: "₹39 / pc (Bulk Tier)",
      description: "58mm high-gloss cartoon caricature pin badges for wedding sangeet, mehendi, and barati.",
    },
    {
      id: "photo-7",
      title: "Our Love Story Milestone Timeline Wall Frame",
      category: "frames",
      categoryLabel: "Photo Frames",
      image: "/images/products/love-story-timeline-frame.jpg",
      tag: "Milestone Wall Art",
      productLink: "/products/prod-frame-2",
      productName: "Love Story Milestone Frame",
      priceNote: "₹549 (A3 / A4 Sizes)",
      description: "Timeline collage marking First Met, Engagement, and Marriage dates with heart photo grid.",
    },
    {
      id: "photo-8",
      title: "Bulk Personalized Quote & Teacher Keychains",
      category: "badges",
      categoryLabel: "Badges & Keychains",
      image: "/images/products/custom-quote-keychains.jpg",
      tag: "Bulk Saver",
      productLink: "/products/prod-keychain-1",
      productName: "Acrylic & Wooden Keychains",
      priceNote: "₹79 / pc (Wholesale Tier)",
      description: "Double-sided UV scratch-resistant keychains with inspiring quotes and customized names.",
    },
    {
      id: "photo-9",
      title: "Baby Milestone & Google Search Father Frame",
      category: "frames",
      categoryLabel: "Photo Frames",
      image: "/images/products/custom-calendar-frame-collection.jpg",
      tag: "New Design",
      productLink: "/products/prod-frame-1",
      productName: "Custom Calendar Frame Collection",
      priceNote: "₹499 (Multiple Layouts)",
      description: "Creative Google search theme and 12-month baby milestone memory collage frames.",
    },
    {
      id: "photo-10",
      title: "Custom Photo Print Heart Collage Satin Cushion",
      category: "gifts",
      categoryLabel: "Personalized Gifts",
      image: "/images/products/custom-photo-heart-cushion.jpg",
      tag: "Best Seller",
      productLink: "/products/prod-cushion-1",
      productName: "Custom Heart Satin Cushion",
      priceNote: "₹399 (Virgin Fiber Fill)",
      description: "Luxurious Duchess satin cushion printed with romantic heart collage and concealed zipper.",
    },
    {
      id: "photo-11",
      title: "Custom Number Photo Collage Milestone Frame",
      category: "frames",
      categoryLabel: "Photo Frames",
      image: "/images/products/anniversary-number-milestone-frame.jpg",
      tag: "Anniversary Special",
      productLink: "/products/prod-frame-num-1",
      productName: "Number Milestone Anniversary Frame",
      priceNote: "₹549 (Time Breakdown)",
      description: "Numeric photo collage with mathematical time breakdown in years, months, weeks, and hours.",
    },
    {
      id: "photo-12",
      title: "Personalized Script Name Embroidered White Cap",
      category: "badges",
      categoryLabel: "Caps & Merch",
      image: "/images/products/custom-embroidered-ved-cap.jpg",
      tag: "New Arrival",
      productLink: "/products/prod-cap-ved-1",
      productName: "Custom Script Embroidered Cap",
      priceNote: "₹299 (Pure Cotton Twill)",
      description: "Structured white cotton baseball cap with high-density 3D script embroidery and brass clasp.",
    },
    {
      id: "photo-13",
      title: "Dual-Tone Inner & Handle Ceramic Sublimation Mugs",
      category: "gifts",
      categoryLabel: "Drinkware",
      image: "/images/products/dual-tone-ceramic-mugs.jpg",
      tag: "Vibrant Colors",
      productLink: "/products/prod-mug-dual-1",
      productName: "Dual-Tone Ceramic Coffee Mug",
      priceNote: "₹189 (AAA Grade)",
      description: "High-contrast colorful interior ceramic mugs with 360-degree wrap-around sublimation printing.",
    },
    {
      id: "photo-14",
      title: "Custom 'Google Happiness' Search Theme Photo Frame",
      category: "frames",
      categoryLabel: "Photo Frames",
      image: "/images/products/google-search-happiness-frame.jpg",
      tag: "Viral Hit",
      productLink: "/products/prod-frame-google-1",
      productName: "Google Happiness Search Frame",
      priceNote: "₹499 (6-Photo Grid)",
      description: "Iconic Google search layout with custom keyword, 6-photo memory grid, and heartfelt dedication.",
    },
    {
      id: "photo-15",
      title: "'King Landed' Birthday Calendar Milestone Frame",
      category: "frames",
      categoryLabel: "Photo Frames",
      image: "/images/products/king-landed-birthday-frame.jpg",
      tag: "Birthday Keepsake",
      productLink: "/products/prod-frame-king-1",
      productName: "King Landed Birthday Frame",
      priceNote: "₹499 (Gold & Black)",
      description: "Birth calendar date marker with honorary badges and multi-photo celebration tribute collage.",
    },
    {
      id: "photo-16",
      title: "Aesthetic Torn Paper Wedding Couple Photo Frame",
      category: "frames",
      categoryLabel: "Photo Frames",
      image: "/images/products/torn-paper-wedding-frame.jpg",
      tag: "Wedding Special",
      productLink: "/products/prod-frame-torn-1",
      productName: "Aesthetic Wedding Couple Frame",
      priceNote: "₹549 (Scandinavian White)",
      description: "Contemporary torn-paper aesthetic split design with calligraphy script in a pristine white frame.",
    },
    {
      id: "photo-17",
      title: "Magic LED Glowing Heart Faux Fur Photo Cushion",
      category: "gifts",
      categoryLabel: "LED Cushions",
      image: "/images/products/led-fur-heart-cushion.jpg",
      tag: "Glowing Hit",
      productLink: "/products/prod-cushion-led-1",
      productName: "Magic LED Glowing Fur Cushion",
      priceNote: "₹499 (Warm Ambient Light)",
      description: "Plush white faux fur cushion with internal warm golden fairy lights and center heart photo print.",
    },
    {
      id: "photo-18",
      title: "Square LED Plush Fur Light-Up Photo Pillow",
      category: "gifts",
      categoryLabel: "LED Cushions",
      image: "/images/products/square-led-fur-cushion.jpg",
      tag: "Night Glow",
      productLink: "/products/prod-cushion-led-2",
      productName: "Square LED Plush Photo Pillow",
      priceNote: "₹479 (16x16 Inch)",
      description: "Illuminated plush fur photo cushion with decorative golden lace border and built-in micro LEDs.",
    },
    {
      id: "photo-19",
      title: "Multi-Color Custom Name 3D Embroidered Cotton Caps",
      category: "badges",
      categoryLabel: "Custom Caps",
      image: "/images/products/multicolor-embroidered-caps.jpg",
      tag: "Group Merch",
      productLink: "/products/prod-cap-multi-1",
      productName: "3D Embroidered Cotton Caps",
      priceNote: "₹279 / pc (Vibrant Colors)",
      description: "Custom stitched names in raised 3D script embroidery on red, blue, black, and yellow cotton caps.",
    },
    {
      id: "photo-20",
      title: "Kids Cartoon & Name Embroidered Canary Yellow Caps",
      category: "badges",
      categoryLabel: "Kids Merch",
      image: "/images/products/kids-cartoon-embroidered-caps.jpg",
      tag: "Kids Favorite",
      productLink: "/products/prod-cap-kids-1",
      productName: "Kids Cartoon Embroidered Cap",
      priceNote: "₹269 / pc (Panda & Peppa)",
      description: "Sunny yellow kids caps with custom embroidered cartoon characters and personalized names.",
    },
    {
      id: "photo-21",
      title: "'Betiwale' Wedding Sangeet & Reception Glossy Pin Badges",
      category: "badges",
      categoryLabel: "Wedding Badges",
      image: "/images/products/betiwale-wedding-pin-badges.jpg",
      tag: "Wedding Special",
      productLink: "/products/prod-badge-betiwale-1",
      productName: "Betiwale Wedding Pin Badges",
      priceNote: "₹39 / pc (58mm Glossy)",
      description: "High-gloss round button badges featuring illustrated bride caricature for sangeet and wedding events.",
    },
    {
      id: "photo-22",
      title: "Multi-Heart Mosaic 25-Photo Collage Memory Frame",
      category: "frames",
      categoryLabel: "Photo Frames",
      image: "/images/products/multi-heart-mosaic-frame.jpg",
      tag: "Mosaic Art",
      productLink: "/products/prod-frame-mosaic-1",
      productName: "Multi-Heart Mosaic Frame",
      priceNote: "₹599 (25 Photos In One)",
      description: "Grand master heart mosaic formed from 25+ individual heart photo tiles on matte black background.",
    },
    {
      id: "photo-23",
      title: "'Family Memories' Polaroid Grid Arch Collage Frame",
      category: "frames",
      categoryLabel: "Photo Frames",
      image: "/images/products/family-memories-polaroid-frame.jpg",
      tag: "Family Heirloom",
      productLink: "/products/prod-frame-polaroid-1",
      productName: "Family Memories Polaroid Frame",
      priceNote: "₹649 (Gold-Trimmed Frame)",
      description: "Textured dark wood and gold frame displaying 12 mini polaroid prints surrounding a central arch photo.",
    },
    {
      id: "photo-24",
      title: "Aesthetic Brush-Stroke Splatter Wedding Milestone Frame",
      category: "frames",
      categoryLabel: "Photo Frames",
      image: "/images/products/brush-stroke-wedding-frame.jpg",
      tag: "Photographer Pick",
      productLink: "/products/prod-frame-brush-1",
      productName: "Brush-Stroke Wedding Frame",
      priceNote: "₹549 (Textured Black)",
      description: "Artistic watercolor brush-stroke edge divide with custom couple names and wedding milestone date.",
    },
    {
      id: "photo-25",
      title: "Personalized Birthday Floral Mandala Calendar Memory Frame",
      category: "frames",
      categoryLabel: "Photo Frames",
      image: "/images/products/birthday-calendar-heart-frame.jpg",
      tag: "Friendship Keepsake",
      productLink: "/products/prod-frame-payal-1",
      productName: "Floral Mandala Birthday Frame",
      priceNote: "₹499 (15-Photo Diamond)",
      description: "Midnight black frame with white lace mandala artwork, birth calendar date highlight, and dedication.",
    },
    {
      id: "photo-26",
      title: "Personalized 18K Gold Couple Name Mangalsutras & Pendants",
      category: "gifts",
      categoryLabel: "Name Jewelry",
      image: "/images/products/custom-name-mangalsutra-pendants.jpg",
      tag: "18K Gold Plated",
      productLink: "/products/prod-pendant-name-1",
      productName: "Couple Name Mangalsutra Pendant",
      priceNote: "₹399 (Velvet Gift Box)",
      description: "Laser-cut couple names in infinity loops, crowns, and peacock feathers with auspicious black beads.",
    },
    {
      id: "photo-27",
      title: "Jumbo 24x36\" Grandparents Anniversary Living Room Wall Frame",
      category: "frames",
      categoryLabel: "Photo Frames",
      image: "/images/products/jumbo-anniversary-calendar-frame.jpg",
      tag: "Jumbo Focal Piece",
      productLink: "/products/prod-frame-jumbo-1",
      productName: "Jumbo Grandparents Anniversary Frame",
      priceNote: "₹1299 (24x36 Inch)",
      description: "Textured dark mahogany frame with inner gold fillet, dreamcatcher art, and 12-photo family grid.",
    },
    {
      id: "photo-28",
      title: "'Ladke Wale' Wedding Baarat Glossy Button Pin Badges",
      category: "badges",
      categoryLabel: "Wedding Badges",
      image: "/images/products/ladke-wale-wedding-pin-badges.jpg",
      tag: "Baarat Special",
      productLink: "/products/prod-badge-ladkewale-1",
      productName: "Ladke Wale Wedding Pin Badges",
      priceNote: "₹39 / pc (58mm Glossy)",
      description: "Mint-green 58mm button pin badges with groom-squad cartoon boy wearing sunglasses.",
    },
    {
      id: "photo-29",
      title: "Personalized Couple Name 4-Photo Satin Cushion Pair",
      category: "gifts",
      categoryLabel: "Couple Cushions",
      image: "/images/products/couple-name-photo-cushions.jpg",
      tag: "Pair of Two",
      productLink: "/products/prod-cushion-couple-pair-1",
      productName: "Couple Name Satin Cushion Pair",
      priceNote: "₹699 (Set of 2 Cushions)",
      description: "His & Hers matching couple cushions with custom printed names and 4-photo filmstrip collages.",
    },
    {
      id: "photo-30",
      title: "Crystal Diamond Beveled LED Islamic Nikah Keepsake Frame",
      category: "gifts",
      categoryLabel: "LED Keepsakes",
      image: "/images/products/crystal-led-nikah-frame.jpg",
      tag: "Nikah Special",
      productLink: "/products/prod-frame-crystal-nikah-1",
      productName: "Crystal LED Nikah Keepsake Frame",
      priceNote: "₹899 (Illuminated Base)",
      description: "Faceted crystal cut beveled border with gold pedestal base and warm perimeter LED illumination.",
    },
    {
      id: "photo-31",
      title: "Motorized Rotating 360° 3D LED Photo Cube Lamp",
      category: "gifts",
      categoryLabel: "3D Lamps",
      image: "/images/products/rotating-3d-photo-cube-lamp.jpg",
      tag: "360° Rotating",
      productLink: "/products/prod-lamp-cube-3d-1",
      productName: "Motorized Rotating Photo Cube Lamp",
      priceNote: "₹799 (5 Photo Panels)",
      description: "Motorized turntable lamp that slowly spins while illuminating 4 side photos and 1 top lid panel.",
    },
    {
      id: "photo-32",
      title: "Custom Photo & Name Men's Genuine Leather Bi-Fold Wallet",
      category: "leather",
      categoryLabel: "Leather & Pens",
      image: "/images/products/custom-photo-leather-wallet.jpg",
      tag: "Men's Special",
      productLink: "/products/prod-wallet-photo-1",
      productName: "Custom Photo Men's Leather Wallet",
      priceNote: "₹499 (Executive Box)",
      description: "Supple cognac brown leather wallet with high-definition photo print and custom recipient name.",
    },
    {
      id: "photo-33",
      title: "Minimalist Black & White Polaroid Aesthetic Memory Frame",
      category: "frames",
      categoryLabel: "Photo Frames",
      image: "/images/products/minimalist-bw-polaroid-frame.jpg",
      tag: "Monochrome Art",
      productLink: "/products/prod-frame-minimal-bw-1",
      productName: "Minimalist B&W Polaroid Frame",
      priceNote: "₹499 (8-Photo Grid)",
      description: "Scandinavian minimalist black frame with 8 monochrome candid polaroids and cursive center quote.",
    },
    {
      id: "photo-34",
      title: "Backlit LED Border Ring Ceremony Engagement Calendar Frame",
      category: "frames",
      categoryLabel: "Photo Frames",
      image: "/images/products/backlit-led-ring-ceremony-frame.jpg",
      tag: "Dual-Mode Night Lamp",
      productLink: "/products/prod-frame-led-ring-1",
      productName: "Backlit LED Engagement Calendar Frame",
      priceNote: "₹699 (Built-In LED Strip)",
      description: "Daytime engagement photo calendar that transforms into an ambient warm night lamp when switched on.",
    },
  ];

  const filteredPhotos =
    activeFilter === "all"
      ? photos
      : photos.filter((p) => p.category === activeFilter);

  return (
    <>
      <section className="py-20 bg-slate-50/60 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E1B4B] text-[#F95738] text-xs font-bold uppercase tracking-wider mb-2">
                <Camera className="w-3.5 h-3.5" />
                <span>Real Customer Creations</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1E1B4B] tracking-tight">
                Fresh from Our Studio Workshop
              </h2>
              <p className="text-sm text-slate-500 mt-1 max-w-xl">
                Real photographs of personalized photo frames, 3D LED lamps, executive hampers, and custom badges crafted for our clients.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              {[
                { id: "all", label: "All Items" },
                { id: "frames", label: "Photo Frames" },
                { id: "gifts", label: "3D LED Lamps" },
                { id: "leather", label: "Leather & Pens" },
                { id: "badges", label: "Badges & Keychains" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    activeFilter === tab.id
                      ? "bg-[#1E1B4B] text-white shadow-xs"
                      : "bg-white text-slate-600 hover:bg-slate-200/80 border border-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry / Responsive Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedImage(photo)}
                className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-400 transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Photo Container */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                    <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#1E1B4B] text-[10px] font-extrabold shadow-sm">
                      {photo.categoryLabel}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#F95738] text-white text-[9px] font-black uppercase">
                      {photo.tag}
                    </span>
                  </div>

                  {/* Expand Zoom Icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Bottom Meta */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 bg-white">
                  <div>
                    <h3 className="text-base font-extrabold text-[#1E1B4B] group-hover:text-[#F95738] transition-colors leading-snug">
                      {photo.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {photo.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 block">Pricing</span>
                      <span className="text-xs font-black text-[#1E1B4B]">
                        {photo.priceNote}
                      </span>
                    </div>

                    <Link
                      href={photo.productLink}
                      onClick={(e) => e.stopPropagation()}
                      className="px-3.5 py-1.5 bg-[#1E1B4B] hover:bg-[#F95738] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <span>Customize</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col md:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 hover:bg-[#F95738] text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left: Big Image */}
            <div className="md:w-3/5 relative aspect-square sm:aspect-auto sm:min-h-[400px] bg-slate-100">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-contain p-4"
              />
            </div>

            {/* Right: Info & CTA */}
            <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-slate-50 overflow-y-auto">
              <div className="space-y-4">
                <span className="px-2.5 py-1 rounded-full bg-[#F95738]/10 text-[#F95738] text-xs font-bold">
                  {selectedImage.categoryLabel}
                </span>

                <h3 className="text-xl font-black text-[#1E1B4B] tracking-tight">
                  {selectedImage.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedImage.description}
                </p>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Product Price</div>
                  <div className="text-lg font-black text-[#1E1B4B]">{selectedImage.priceNote}</div>
                  <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Free Proof Approval Before Final Production</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 space-y-2">
                <Link
                  href={selectedImage.productLink}
                  onClick={() => setSelectedImage(null)}
                  className="w-full py-3.5 bg-[#F95738] hover:bg-[#e04526] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Order Custom {selectedImage.productName}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="w-full py-2 text-xs text-slate-500 hover:text-slate-800 text-center cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
