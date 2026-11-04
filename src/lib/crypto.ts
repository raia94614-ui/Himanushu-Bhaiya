/**
 * Password hashing using Argon2id
 * Industry-standard resistant to GPU and ASIC attacks.
 */
import argon2 from "argon2";

// Argon2id config — tuned for security vs. performance
const ARGON2_OPTIONS: argon2.Options = {
  type: argon2.argon2id,
  memoryCost: 65536, // 64MB
  timeCost: 3,
  parallelism: 4,
};

export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, ARGON2_OPTIONS);
}

export async function verifyPassword(
  hash: string,
  password: string
): Promise<boolean> {
  try {
    return await argon2.verify(hash, password, { type: argon2.argon2id });
  } catch {
    return false;
  }
}

/**
 * OTP hashing using Argon2id with lighter parameters (OTPs are short-lived).
 */
const OTP_ARGON2_OPTIONS: argon2.Options = {
  type: argon2.argon2id,
  memoryCost: 4096, // 4MB (faster for short-lived OTPs)
  timeCost: 2,
  parallelism: 1,
};

export async function hashOTP(otp: string): Promise<string> {
  return argon2.hash(otp, OTP_ARGON2_OPTIONS);
}

export async function verifyOTP(hash: string, otp: string): Promise<boolean> {
  try {
    return await argon2.verify(hash, otp, { type: argon2.argon2id });
  } catch {
    return false;
  }
}

/**
 * Recovery code hashing (same as OTP — lighter params, single use).
 */
export const hashRecoveryCode = hashOTP;
export const verifyRecoveryCode = verifyOTP;
