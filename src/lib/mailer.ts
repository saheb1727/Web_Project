import nodemailer from "nodemailer";

// In-memory fallback cache for OTPs (ensures zero downtime even if database connection is slow/offline)
interface MemoryOtpRecord {
  otp: string;
  expiresAt: number;
  verified: boolean;
}

const memoryOtpStore = new Map<string, MemoryOtpRecord>();

export function storeMemoryOtp(email: string, otp: string, durationMinutes = 10) {
  const normalizedEmail = email.toLowerCase().trim();
  memoryOtpStore.set(normalizedEmail, {
    otp,
    expiresAt: Date.now() + durationMinutes * 60 * 1000,
    verified: false,
  });
}

export function verifyMemoryOtp(email: string, inputOtp: string): boolean {
  const normalizedEmail = email.toLowerCase().trim();
  const record = memoryOtpStore.get(normalizedEmail);

  if (!record) return false;
  if (Date.now() > record.expiresAt) {
    memoryOtpStore.delete(normalizedEmail);
    return false;
  }

  if (record.otp === inputOtp.trim()) {
    record.verified = true;
    memoryOtpStore.delete(normalizedEmail);
    return true;
  }

  return false;
}

// Create reusable nodemailer transporter
export function getMailTransporter() {
  const user = process.env.EMAIL_USER || process.env.SMTP_USER || "saheb8056@gmail.com";
  const pass = process.env.EMAIL_PASS || process.env.SMTP_PASS || process.env.SMTP_PASSWORD;

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });
}

export interface SendOtpEmailParams {
  toEmail: string;
  recipientName?: string;
  otp: string;
}

/**
 * Sends a high-polish, branded HTML email with an OTP code.
 */
export async function sendOtpEmail({
  toEmail,
  recipientName = "Customer",
  otp,
}: SendOtpEmailParams) {
  const transporter = getMailTransporter();
  const fromAddress =
    process.env.EMAIL_FROM ||
    `"MyPrintHub Verification" <${process.env.EMAIL_USER || "saheb8056@gmail.com"}>`;

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your MyPrintHub Verification Code</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f1f5f9;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
    }
    .wrapper {
      width: 100%;
      background-color: #f1f5f9;
      padding: 40px 16px;
      box-sizing: border-box;
    }
    .card {
      max-width: 540px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03);
      border: 1px solid #e2e8f0;
    }
    .header {
      background: linear-gradient(135deg, #0b0f19 0%, #1e1b4b 100%);
      padding: 32px 32px 28px 32px;
      text-align: center;
    }
    .brand-title {
      color: #ffffff;
      font-size: 26px;
      font-weight: 900;
      letter-spacing: -0.5px;
      margin: 0 0 6px 0;
    }
    .brand-subtitle {
      color: #ff4d36;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin: 0;
    }
    .body-content {
      padding: 36px 32px;
    }
    .greeting {
      font-size: 18px;
      font-weight: 800;
      color: #0b0f19;
      margin-bottom: 12px;
    }
    .text {
      font-size: 14px;
      line-height: 1.6;
      color: #475569;
      margin: 0 0 24px 0;
    }
    .otp-box {
      background: #f8fafc;
      border: 2px dashed #ff4d36;
      border-radius: 16px;
      padding: 24px 20px;
      text-align: center;
      margin: 28px 0;
    }
    .otp-label {
      font-size: 11px;
      font-weight: 800;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 10px;
    }
    .otp-code {
      font-size: 38px;
      font-weight: 900;
      color: #0b0f19;
      letter-spacing: 10px;
      font-family: 'Courier New', Courier, monospace;
      margin: 0 0 8px 0;
      padding-left: 10px;
    }
    .otp-expiry {
      font-size: 12px;
      font-weight: 600;
      color: #ff4d36;
      margin: 0;
    }
    .security-note {
      background-color: #fff7ed;
      border-left: 4px solid #ea580c;
      padding: 12px 16px;
      border-radius: 8px;
      margin: 24px 0;
    }
    .security-title {
      font-size: 12px;
      font-weight: 800;
      color: #9a3412;
      margin: 0 0 4px 0;
    }
    .security-desc {
      font-size: 11px;
      color: #c2410c;
      margin: 0;
      line-height: 1.5;
    }
    .footer {
      background-color: #f8fafc;
      border-top: 1px solid #e2e8f0;
      padding: 24px 32px;
      text-align: center;
      font-size: 11px;
      color: #94a3b8;
      line-height: 1.6;
    }
    .footer strong {
      color: #475569;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="header">
        <h1 class="brand-title">MyPrintHub</h1>
        <p class="brand-subtitle">Custom Merchandise Studio</p>
      </div>

      <div class="body-content">
        <div class="greeting">Hi ${recipientName},</div>
        <p class="text">
          Thank you for choosing <strong>MyPrintHub</strong>. Please use the 6-digit one-time verification code below to verify your email address and activate your account.
        </p>

        <div class="otp-box">
          <div class="otp-label">One-Time Verification Code</div>
          <div class="otp-code">${otp}</div>
          <p class="otp-expiry">Expires in 10 minutes</p>
        </div>

        <p class="text" style="font-size: 13px;">
          Enter this code on the registration page to finalize your account and access custom bulk discounts, prototype tracking, and design studio tools.
        </p>

        <div class="security-note">
          <p class="security-title">Security Alert</p>
          <p class="security-desc">
            Never share this OTP with anyone. MyPrintHub representatives will never ask for your verification code or account password. If you did not initiate this request, you can safely ignore this email.
          </p>
        </div>
      </div>

      <div class="footer">
        <p style="margin: 0 0 6px 0;">
          <strong>MyPrintHub Production Lab & HQ</strong><br />
          Dangra toli chowk Purulia road, opposite hyderabadi zaika, Ranchi-834001<br />
          Warehouse: Hosir, Kargil Colony, Kanke, Ranchi-834006
        </p>
        <p style="margin: 0;">
          Need assistance? Reach our dispatch desk at <strong style="color: #ff4d36;">+91 98765 43210</strong> or email <strong style="color: #ff4d36;">support@myprinthub.in</strong>.
        </p>
      </div>
    </div>
  </div>
</body>
</html>
`;

  const info = await transporter.sendMail({
    from: fromAddress,
    to: toEmail,
    subject: `${otp} is your MyPrintHub verification code`,
    text: `Hi ${recipientName},\n\nYour MyPrintHub verification code is: ${otp}\n\nThis code will expire in 10 minutes.\n\nIf you did not request this code, please ignore this email.\n\nMyPrintHub Team`,
    html: htmlContent,
  });

  return info;
}
