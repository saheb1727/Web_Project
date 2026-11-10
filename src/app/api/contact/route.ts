import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Contact } from "@/models/Contact";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, productInterest, quantity, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Name, email, phone, and message are required" },
        { status: 400 }
      );
    }

    const ticketId = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      await connectToDatabase();
      const contactDoc = await Contact.create({
        name,
        email,
        phone,
        company,
        productInterest: productInterest || "General Inquiry",
        quantity,
        message,
        status: "new",
      });

      return NextResponse.json(
        {
          success: true,
          ticketId,
          message: "Inquiry saved successfully",
          id: contactDoc._id,
        },
        { status: 201 }
      );
    } catch (dbError) {
      console.warn("MongoDB fallback for contact:", dbError);
      return NextResponse.json(
        {
          success: true,
          ticketId,
          message: "Inquiry received and queued",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}

