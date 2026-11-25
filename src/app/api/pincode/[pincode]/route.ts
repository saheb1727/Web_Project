import { NextRequest, NextResponse } from "next/server";
import { lookupPincode } from "@/lib/pincode";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ pincode: string }> }
) {
  try {
    const { pincode } = await params;
    const clean = (pincode || "").replace(/\D/g, "");

    if (clean.length !== 6) {
      return NextResponse.json(
        { success: false, message: "PIN code must be a 6-digit number" },
        { status: 400 }
      );
    }

    const info = await lookupPincode(clean);

    if (!info) {
      return NextResponse.json(
        { success: false, message: "Location not found for this PIN code" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      pincode: info.pincode,
      city: info.city,
      state: info.state,
      district: info.district,
      source: info.source,
    });
  } catch (error) {
    console.error("PIN code lookup error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to detect location for PIN code" },
      { status: 500 }
    );
  }
}
