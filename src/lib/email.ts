/**
 * Email service using Resend.
 * Provider credentials are NEVER exposed to the client.
 */
import { env } from "./env";

let resendClient: import("resend").Resend | null = null;

function getResendClient() {
  if (!resendClient) {
    const { Resend } = require("resend");
    resendClient = new Resend(env.RESEND_API_KEY);
  }
  return resendClient!;
}

export async function sendPasswordResetEmail(
  email: string,
  resetToken: string
): Promise<void> {
  const resetUrl = `${env.APP_BASE_URL}/reset-password?token=${resetToken}`;

  if (!env.RESEND_API_KEY) {
    if (env.isProduction) {
      throw new Error("Resend API key not configured.");
    }
    console.log(`[DEV] Password reset link for ${email}: ${resetUrl}`);
    return;
  }

  const client = getResendClient();
  await client.emails.send({
    from: env.EMAIL_FROM,
    to: email,
    subject: "Reset your Himanshu Classes password",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af;">Himanshu Classes</h2>
        <p>You requested a password reset. Click the button below to set a new password.</p>
        <a href="${resetUrl}" 
           style="display: inline-block; background: #1e40af; color: white; padding: 12px 24px; 
                  border-radius: 6px; text-decoration: none; margin: 16px 0;">
          Reset Password
        </a>
        <p style="color: #6b7280; font-size: 14px;">
          This link expires in 1 hour. If you did not request a password reset, please ignore this email.
        </p>
        <p style="color: #6b7280; font-size: 12px;">
          If the button doesn't work, copy this link: ${resetUrl}
        </p>
      </div>
    `,
  });
}

export async function sendEmailVerificationEmail(
  email: string,
  verifyToken: string
): Promise<void> {
  const verifyUrl = `${env.APP_BASE_URL}/verify-email?token=${verifyToken}`;

  if (!env.RESEND_API_KEY) {
    if (env.isProduction) {
      throw new Error("Resend API key not configured.");
    }
    console.log(`[DEV] Email verification link for ${email}: ${verifyUrl}`);
    return;
  }

  const client = getResendClient();
  await client.emails.send({
    from: env.EMAIL_FROM,
    to: email,
    subject: "Verify your Himanshu Classes email",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af;">Himanshu Classes</h2>
        <p>Welcome! Please verify your email address.</p>
        <a href="${verifyUrl}" 
           style="display: inline-block; background: #1e40af; color: white; padding: 12px 24px; 
                  border-radius: 6px; text-decoration: none; margin: 16px 0;">
          Verify Email
        </a>
        <p style="color: #6b7280; font-size: 14px;">
          This link expires in 24 hours.
        </p>
      </div>
    `,
  });
}
