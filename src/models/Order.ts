import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrderItem {
  productId: string;
  name: string;
  image: string;
  category: string;
  unitPrice: number;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  customText?: string;
  customImage?: string;
}

export interface ITrackingEvent {
  stage: number;
  title: string;
  desc: string;
  date: string;
  completed: boolean;
}

export interface IOrder extends Document {
  orderId: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: IOrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  couponCode?: string;
  paymentMethod: string;
  paymentStatus: "paid" | "pending";
  status:
    | "Order Placed & Confirmed"
    | "Vector Artwork & Pantone Approval"
    | "Industrial Printing & Quality Inspection"
    | "Dispatched via Express Courier"
    | "Delivered to Doorstep";
  tracking: {
    courier: string;
    awbNumber: string;
    estimatedDelivery: string;
  };
  timeline: ITrackingEvent[];
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    selectedColor: { type: String },
    selectedSize: { type: String },
    customText: { type: String },
    customImage: { type: String },
  },
  { _id: false }
);

const TrackingEventSchema = new Schema<ITrackingEvent>(
  {
    stage: { type: Number, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    date: { type: String, required: true },
    completed: { type: Boolean, required: true, default: false },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    orderId: { type: String, required: true, unique: true, index: true },
    customer: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    items: [OrderItemSchema],
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    shipping: { type: Number, default: 0 },
    total: { type: Number, required: true },
    couponCode: { type: String },
    paymentMethod: { type: String, default: "upi" },
    paymentStatus: { type: String, enum: ["paid", "pending"], default: "paid" },
    status: {
      type: String,
      default: "Order Placed & Confirmed",
    },
    tracking: {
      courier: { type: String, default: "BlueDart Express" },
      awbNumber: { type: String },
      estimatedDelivery: { type: String },
    },
    timeline: [TrackingEventSchema],
  },
  { timestamps: true }
);

export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;

