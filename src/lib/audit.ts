/**
 * Audit logging — records security events.
 * NEVER logs passwords, OTP values, or authentication secrets.
 */
import { prisma } from "./prisma";
import { AuditAction } from "@prisma/client";

export interface AuditLogParams {
  actorId?: string | null;
  targetId?: string | null;
  action: AuditAction;
  resource?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  success?: boolean;
}

export async function createAuditLog(params: AuditLogParams): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        actorId: params.actorId ?? null,
        targetId: params.targetId ?? null,
        action: params.action,
        resource: params.resource,
        metadata: params.metadata as never,
        ipAddress: params.ipAddress,
        userAgent: params.userAgent,
        success: params.success ?? true,
      },
    });
  } catch (err) {
    // Audit log failures must never break the main flow
    console.error("[AuditLog] Failed to write audit log:", err);
  }
}

/**
 * Helper to extract IP and User-Agent from Next.js Request headers.
 */
export function extractRequestMeta(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
  const userAgent = request.headers.get("user-agent") ?? "unknown";
  return { ipAddress: ip, userAgent };
}
