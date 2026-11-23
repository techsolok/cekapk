// Skema data - PRD section 8. PostgreSQL via Drizzle ORM.
// Jalankan migrasi (Fase 3, setelah DATABASE_URL siap): npm run db:generate && npm run db:push
import { pgTable, serial, text, integer, boolean, timestamp, jsonb, varchar } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(), slug: varchar("slug", { length: 80 }).notNull().unique(),
  nameId: text("name_id").notNull(), descriptionId: text("description_id"), icon: text("icon"),
});
export const apps = pgTable("apps", {
  id: serial("id").primaryKey(), slug: varchar("slug", { length: 120 }).notNull().unique(),
  name: text("name").notNull(), aliases: text("aliases").array().notNull().default([]),
  developer: text("developer"), categoryId: integer("category_id").references(() => categories.id),
  legalStatus: varchar("legal_status", { length: 30 }).notNull(), // play_store|open_source|developer_direct|info_only
  officialUrl: text("official_url"), priceModel: text("price_model"),
  minAndroid: varchar("min_android", { length: 60 }), language: text("language"),
  icon: text("icon"), screenshots: text("screenshots").array().notNull().default([]),
  descriptionId: text("description_id"), pros: text("pros").array().notNull().default([]),
  cons: text("cons").array().notNull().default([]), permissions: jsonb("permissions"),
  safetyScore: integer("safety_score"), safetyBreakdown: jsonb("safety_breakdown"),
  verifiedAt: timestamp("verified_at"), publishedAt: timestamp("published_at"),
  // Fase 3: status publikasi (draft|review|published) + asal konten + konten terstruktur penuh.
  status: varchar("status", { length: 20 }).notNull().default("draft"),
  source: varchar("source", { length: 20 }).notNull().default("editorial"), // editorial|programmatic
  content: jsonb("content"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
export const versions = pgTable("versions", {
  id: serial("id").primaryKey(), appId: integer("app_id").notNull().references(() => apps.id),
  version: varchar("version", { length: 40 }).notNull(), releaseDate: timestamp("release_date"),
  changelogId: text("changelog_id"), size: varchar("size", { length: 30 }),
  sha256: varchar("sha256", { length: 64 }), sourceUrl: text("source_url"),
  isCurrent: boolean("is_current").notNull().default(false),
});
export const guides = pgTable("guides", {
  id: serial("id").primaryKey(), slug: varchar("slug", { length: 140 }).notNull().unique(),
  title: text("title").notNull(), bodyId: text("body_id"),
  type: varchar("type", { length: 20 }).notNull(), // howto|explainer|safety
  relatedAppIds: integer("related_app_ids").array().notNull().default([]), faq: jsonb("faq"),
  publishedAt: timestamp("published_at"),
});
export const comparisons = pgTable("comparisons", {
  id: serial("id").primaryKey(),
  appA: integer("app_a").notNull().references(() => apps.id), appB: integer("app_b").notNull().references(() => apps.id),
  verdictId: text("verdict_id"), table: jsonb("table"), faq: jsonb("faq"),
});
export const tools = pgTable("tools", {
  id: serial("id").primaryKey(), slug: varchar("slug", { length: 80 }).notNull().unique(),
  type: varchar("type", { length: 40 }).notNull(), config: jsonb("config"),
  contentId: text("content_id"), faq: jsonb("faq"),
});
export const keywords = pgTable("keywords", {
  id: serial("id").primaryKey(), keyword: text("keyword").notNull(), cluster: text("cluster"),
  intent: varchar("intent", { length: 30 }), targetUrl: text("target_url"),
  volume: integer("volume"), volumeSource: text("volume_source"),
  status: varchar("status", { length: 20 }).notNull().default("planned"), // planned|live|excluded
  risk: varchar("risk", { length: 10 }).notNull().default("green"),      // green|amber|red
});
export const reports = pgTable("reports", {
  id: serial("id").primaryKey(), type: varchar("type", { length: 20 }).notNull(), // dmca|safety|broken
  targetUrl: text("target_url"), payload: jsonb("payload"),
  status: varchar("status", { length: 20 }).notNull().default("open"), handledAt: timestamp("handled_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
export const admins = pgTable("admins", {
  id: serial("id").primaryKey(), email: varchar("email", { length: 160 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(), role: varchar("role", { length: 20 }).notNull().default("editor"), // admin|editor
  twoFactorSecret: text("two_factor_secret"),
});

// Sesi login admin (Fase 3, FR-ADM-01): hanya HASH token yang disimpan di database.
export const adminSessions = pgTable("admin_sessions", {
  id: serial("id").primaryKey(),
  adminId: integer("admin_id").notNull().references(() => admins.id),
  tokenHash: varchar("token_hash", { length: 64 }).notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  userAgent: text("user_agent"),
});

// Library APK Legal (Fase 4, PRD 7.4 + 14): satu baris per FILE yang diunggah admin.
// File hanya boleh status "published" bila SEMUA langkah pipeline lolos + review manual.
export const libraryFiles = pgTable("library_files", {
  id: serial("id").primaryKey(),
  appSlug: varchar("app_slug", { length: 120 }),
  name: text("name").notNull(), packageName: varchar("package_name", { length: 160 }).notNull(),
  version: varchar("version", { length: 40 }).notNull(),
  sizeBytes: integer("size_bytes").notNull(), sha256: varchar("sha256", { length: 64 }).notNull(),
  signerFingerprint: text("signer_fingerprint"), expectedFingerprint: text("expected_fingerprint"),
  sourceName: text("source_name").notNull(), sourceUrl: text("source_url").notNull(),
  sourceType: varchar("source_type", { length: 20 }).notNull().default("open_source"), // open_source|developer
  licence: text("licence").notNull(), storagePath: text("storage_path").notNull(),
  permissions: jsonb("permissions"), // [{name, meaning, dangerous}]
  pipeline: jsonb("pipeline"),       // [{step, ok, detail}]
  safetyScore: integer("safety_score"), safetyBreakdown: jsonb("safety_breakdown"),
  scanStatus: varchar("scan_status", { length: 20 }).notNull().default("pending"),
  reviewedBy: text("reviewed_by"), reviewedAt: timestamp("reviewed_at"),
  status: varchar("status", { length: 20 }).notNull().default("draft"), // draft|published|flagged|rejected
  uploadedBy: text("uploaded_by"),
  lastCheckedAt: timestamp("last_checked_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  publishedAt: timestamp("published_at"),
});
