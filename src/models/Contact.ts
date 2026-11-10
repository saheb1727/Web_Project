import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  phone: string;
  company?: string;
  productInterest?: string;
  quantity?: string;
  message: string;
  status: "new" | "in_review" | "contacted" | "closed";
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String },
    productInterest: { type: String, default: "General Inquiry" },
    quantity: { type: String },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "in_review", "contacted", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

export const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);

export default Contact;

