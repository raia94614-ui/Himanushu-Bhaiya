/**
 * SMS OTP delivery using Twilio.
 * SMS provider credentials are NEVER exposed to the client.
 */
import { env } from "./env";

let twilioClient: import("twilio").Twilio | null = null;

function getTwilioClient() {
  if (!twilioClient) {
    const twilio = require("twilio");
    twilioClient = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
  }
  return twilioClient!;
}

/**
 * Sends an OTP SMS via Twilio.
 * Does NOT simulate in production.
 */
export async function sendOtpSms(phone: string, otp: string): Promise<void> {
  if (!env.TWILIO_ACCOUNT_SID || !env.TWILIO_AUTH_TOKEN) {
    if (env.isProduction) {
      throw new Error(
        "Twilio credentials are not configured. Cannot send OTP in production."
      );
    }
    // Development fallback: log to console only
    console.log(`[DEV] OTP for ${phone}: ${otp}`);
    return;
  }

  const client = getTwilioClient();
  await client.messages.create({
    body: `Your Himanshu Classes OTP is: ${otp}. Valid for 10 minutes. Do not share this code.`,
    from: env.TWILIO_PHONE_NUMBER,
    to: phone,
  });
}
