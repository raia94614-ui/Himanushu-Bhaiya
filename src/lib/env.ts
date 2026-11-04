/**
 * Environment variable validation
 * Fails fast on missing critical variables in production
 */

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value && process.env.NODE_ENV === "production") {
    throw new Error(
      `Missing required environment variable: ${key}. Check your .env file.`
    );
  }
  return value ?? "";
}

export const env = {
  DATABASE_URL: requireEnv("DATABASE_URL"),
  AUTH_SECRET: requireEnv("AUTH_SECRET"),

  // SMS (Twilio)
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID ?? "",
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN ?? "",
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER ?? "",

  // Email (Resend)
  RESEND_API_KEY: process.env.RESEND_API_KEY ?? "",
  EMAIL_FROM: process.env.EMAIL_FROM ?? "noreply@himanshuclasses.in",

  // App
  APP_BASE_URL: process.env.APP_BASE_URL ?? "http://localhost:3000",
  NODE_ENV: process.env.NODE_ENV ?? "development",

  get isProduction() {
    return this.NODE_ENV === "production";
  },
};
