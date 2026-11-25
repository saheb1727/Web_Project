import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { EmailOtp } from "@/models/EmailOtp";
import { verifyMemoryOtp } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and 6-digit verification code are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const cleanOtp = String(otp).trim();

    // 1. Check in-memory verification first
    const memoryVerified = verifyMemoryOtp(normalizedEmail, cleanOtp);

    // 2. Check MongoDB Atlas
    let dbVerified = false;
    try {
      await connectToDatabase();
      const record = await EmailOtp.findOne({
        email: normalizedEmail,
        otp: cleanOtp,
        expiresAt: { $gt: new Date() },
      });

      if (record) {
        dbVerified = true;
        // Mark verified or remove
        await EmailOtp.deleteOne({ _id: record._id });
      }
    } catch (dbErr) {
      console.warn("MongoDB OTP verify warning:", dbErr);
    }

    if (memoryVerified || dbVerified) {
      return NextResponse.json({
        success: true,
        message: "Email successfully verified! Welcome to MyPrintHub.",
      });
    }

    return NextResponse.json(
      {
        error: "Invalid or expired verification code. Please check the code or request a new one.",
      },
      { status: 400 }
    );
  } catch (err: unknown) {
    console.error("Verify OTP error:", err);
    return NextResponse.json(
      { error: "Internal server error while verifying code" },
      { status: 500 }
    );
  }
}
