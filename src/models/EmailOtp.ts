import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEmailOtp extends Document {
  email: string;
  otp: string;
  expiresAt: Date;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EmailOtpSchema = new Schema<IEmailOtp>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 },
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const EmailOtp: Model<IEmailOtp> =
  mongoose.models.EmailOtp ||
  mongoose.model<IEmailOtp>("EmailOtp", EmailOtpSchema);

export default EmailOtp;
