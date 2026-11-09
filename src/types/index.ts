export interface TieredPrice {
  minQty: number;
  maxQty: number | null; // null means and above
  price: number;
  savings: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  colors: ProductColor[];
  sizes?: string[];
  minQuantity: number;
  tieredPricing: TieredPrice[];
  inStock: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  badgeText?: string;
  customizable: boolean;
  printArea?: string; // e.g., "Left Chest: 3.5\" x 3.5\""
}

export interface CartItem {
  id: string; // unique item id (e.g. product.id + selectedColor + selectedSize)
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  customText?: string;
  customImage?: string; // base64 preview
  unitPrice: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
  badge?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  comment: string;
  productOrdered: string;
  verified: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  maxDiscount?: number;
  minOrder: number;
  description: string;
  expiresIn?: string;
}

