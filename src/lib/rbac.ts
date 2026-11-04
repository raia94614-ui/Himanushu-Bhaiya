/**
 * Server-side RBAC authorization helpers.
 * Every API/server action must call these — never trust client-side role data.
 */
import { Role } from "@prisma/client";
import { getAuthenticatedUser } from "./session";

export type Permission =
  | "manage:users"
  | "manage:admins"
  | "manage:teachers"
  | "manage:students"
  | "manage:courses"
  | "manage:enrollments"
  | "manage:materials"
  | "manage:enquiries"
  | "view:reports"
  | "view:audit-logs"
  | "manage:settings"
  | "revoke:sessions"
  | "view:own-dashboard"
  | "view:own-courses"
  | "upload:materials"
  | "view:assigned-courses"
  | "view:assigned-students";

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  SUPER_ADMIN: [
    "manage:users",
    "manage:admins",
    "manage:teachers",
    "manage:students",
    "manage:courses",
    "manage:enrollments",
    "manage:materials",
    "manage:enquiries",
    "view:reports",
    "view:audit-logs",
    "manage:settings",
    "revoke:sessions",
    "view:own-dashboard",
    "view:own-courses",
    "upload:materials",
    "view:assigned-courses",
    "view:assigned-students",
  ],
  ADMIN: [
    "manage:teachers",
    "manage:students",
    "manage:courses",
    "manage:enrollments",
    "manage:materials",
    "manage:enquiries",
    "view:reports",
    "view:own-dashboard",
    "upload:materials",
  ],
  TEACHER: [
    "view:own-dashboard",
    "view:assigned-courses",
    "view:assigned-students",
    "upload:materials",
  ],
  STUDENT: [
    "view:own-dashboard",
    "view:own-courses",
  ],
};

export const ROLE_HIERARCHY: Record<Role, number> = {
  SUPER_ADMIN: 4,
  ADMIN: 3,
  TEACHER: 2,
  STUDENT: 1,
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function hasMinimumRole(userRole: Role, minimumRole: Role): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[minimumRole];
}

/**
 * Server-side authorization check. Throws if unauthorized.
 * Use this in API routes and Server Actions.
 */
export async function requireAuth(options?: {
  minimumRole?: Role;
  permission?: Permission;
}): Promise<NonNullable<Awaited<ReturnType<typeof getAuthenticatedUser>>>> {
  const user = await getAuthenticatedUser();

  if (!user) {
    throw new AuthError("UNAUTHENTICATED", "Authentication required.");
  }

  if (!user.isActive) {
    throw new AuthError("FORBIDDEN", "Your account has been disabled.");
  }

  if (options?.minimumRole && !hasMinimumRole(user.role, options.minimumRole)) {
    throw new AuthError(
      "FORBIDDEN",
      "Insufficient permissions for this action."
    );
  }

  if (options?.permission && !hasPermission(user.role, options.permission)) {
    throw new AuthError(
      "FORBIDDEN",
      "You do not have permission for this action."
    );
  }

  return user;
}

export class AuthError extends Error {
  constructor(
    public code: "UNAUTHENTICATED" | "FORBIDDEN" | "PARTIAL_AUTH",
    message: string
  ) {
    super(message);
    this.name = "AuthError";
  }
}

/**
 * Validates that a student can only access their own resources.
 * Prevents IDOR vulnerabilities.
 */
export function assertOwnResource(
  requestingUserId: string,
  resourceOwnerId: string,
  role: Role
): void {
  if (role === "STUDENT" && requestingUserId !== resourceOwnerId) {
    throw new AuthError("FORBIDDEN", "Access denied to this resource.");
  }
}
