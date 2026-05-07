export const ADMIN_EMAILS = ["rso10041@gmail.com", "djmonnar4@gmail.com"] as const;

export function normalizeEmail(email?: string | null) {
  return email?.trim().toLowerCase() ?? "";
}

export function isAdminEmail(email?: string | null) {
  const normalizedEmail = normalizeEmail(email);
  return ADMIN_EMAILS.some((adminEmail) => adminEmail === normalizedEmail);
}
