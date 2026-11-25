import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { EmailOtp } from "@/models/EmailOtp";
import { sendOtpEmail, storeMemoryOtp } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const recipientName = name ? String(name).trim() : "Valued Customer";

    // Generate secure 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // 1. Store in memory fallback store first
    storeMemoryOtp(normalizedEmail, otp, 10);

    // 2. Try storing in MongoDB Atlas
    try {
      await connectToDatabase();
      // Remove any existing active OTP for this email
      await EmailOtp.deleteMany({ email: normalizedEmail });
      // Create new OTP record
      await EmailOtp.create({
        email: normalizedEmail,
        otp,
        expiresAt,
        verified: false,
      });
    } catch (dbErr) {
      console.warn("MongoDB OTP store warning (relying on memory cache):", dbErr);
    }

    // 3. Send professional email via Nodemailer
    try {
      await sendOtpEmail({
        toEmail: normalizedEmail,
        recipientName,
        otp,
      });

      return NextResponse.json({
        success: true,
        message: `Verification code sent to ${normalizedEmail}`,
      });
    } catch (mailErr: unknown) {
      console.error("Failed to dispatch email via Nodemailer:", mailErr);
      const errorMessage =
        mailErr instanceof Error ? mailErr.message : "Failed to deliver email";

      // If email dispatch fails (e.g., network / auth failure), return informative error
      return NextResponse.json(
        {
          error: "Failed to send verification email. Please check your email configuration.",
          details: errorMessage,
          // In local dev/testing environments, provide the OTP for verification
          devOtp: process.env.NODE_ENV !== "production" ? otp : undefined,
        },
        { status: 500 }
      );
    }
  } catch (err: unknown) {
    console.error("Send OTP route error:", err);
    return NextResponse.json(
      { error: "Internal server error while generating verification code" },
      { status: 500 }
    );
  }
}
