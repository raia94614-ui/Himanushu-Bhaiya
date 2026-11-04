/**
 * TOTP (Time-based One-Time Password) for Admin 2FA
 * Uses otpauth library (RFC 6238) — compatible with Google Authenticator, Microsoft Authenticator
 * TOTP secrets are AES-256-GCM encrypted at rest.
 */
import { TOTP, Secret } from "otpauth";
import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import { env } from "./env";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12; // 96 bits for GCM
const TAG_LENGTH = 16;

/**
 * Derives a 32-byte key from AUTH_SECRET using SHA-256.
 */
function getEncryptionKey(): Buffer {
  const { createHash } = require("crypto");
  return createHash("sha256")
    .update(env.AUTH_SECRET || "dev-fallback-secret-min-32-chars!!")
    .digest();
}

/**
 * Encrypts a TOTP secret using AES-256-GCM.
 * Returns: base64(iv + authTag + ciphertext)
 */
export function encryptTotpSecret(plaintext: string): string {
  const key = getEncryptionKey();
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();
  return Buffer.concat([iv, authTag, encrypted]).toString("base64");
}

/**
 * Decrypts a TOTP secret.
 */
export function decryptTotpSecret(encryptedBase64: string): string {
  const key = getEncryptionKey();
  const buffer = Buffer.from(encryptedBase64, "base64");
  const iv = buffer.subarray(0, IV_LENGTH);
  const authTag = buffer.subarray(IV_LENGTH, IV_LENGTH + TAG_LENGTH);
  const ciphertext = buffer.subarray(IV_LENGTH + TAG_LENGTH);

  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);
  return decipher.update(ciphertext) + decipher.final("utf8");
}

/**
 * Generates a new TOTP secret and enrollment QR code URI.
 */
export function generateTotpSetup(userLabel: string): {
  secret: string; // plaintext — to be encrypted before DB storage
  uri: string;
} {
  const totp = new TOTP({
    issuer: "Himanshu Classes",
    label: userLabel,
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: new Secret(),
  });

  return {
    secret: totp.secret.base32,
    uri: totp.toString(), // otpauth:// URI for QR code
  };
}

/**
 * Verifies a TOTP code. Allows ±1 window (30s drift).
 * Returns the delta (time step offset) or null if invalid.
 */
export function verifyTotpCode(
  encryptedSecret: string,
  code: string
): boolean {
  try {
    const plainSecret = decryptTotpSecret(encryptedSecret);
    const totp = new TOTP({
      issuer: "Himanshu Classes",
      algorithm: "SHA1",
      digits: 6,
      period: 30,
      secret: Secret.fromBase32(plainSecret),
    });
    const delta = totp.validate({ token: code, window: 1 });
    return delta !== null;
  } catch {
    return false;
  }
}

/**
 * Generates 8 recovery codes, each 10 uppercase alphanumeric chars.
 */
export function generateRecoveryCodes(): string[] {
  const charset = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // unambiguous chars
  return Array.from({ length: 8 }, () =>
    Array.from({ length: 10 }, () =>
      charset[Math.floor(Math.random() * charset.length)]
    ).join("")
  );
}
