CREATE TABLE "admin_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"admin_id" integer NOT NULL,
	"token_hash" varchar(64) NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"user_agent" text,
	CONSTRAINT "admin_sessions_token_hash_unique" UNIQUE("token_hash")
);
--> statement-breakpoint
CREATE TABLE "admins" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(160) NOT NULL,
	"password_hash" text NOT NULL,
	"role" varchar(20) DEFAULT 'editor' NOT NULL,
	"two_factor_secret" text,
	CONSTRAINT "admins_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "apps" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(120) NOT NULL,
	"name" text NOT NULL,
	"aliases" text[] DEFAULT '{}' NOT NULL,
	"developer" text,
	"category_id" integer,
	"legal_status" varchar(30) NOT NULL,
	"official_url" text,
	"price_model" varchar(20),
	"min_android" varchar(20),
	"language" text,
	"icon" text,
	"screenshots" text[] DEFAULT '{}' NOT NULL,
	"description_id" text,
	"pros" text[] DEFAULT '{}' NOT NULL,
	"cons" text[] DEFAULT '{}' NOT NULL,
	"permissions" jsonb,
	"safety_score" integer,
	"safety_breakdown" jsonb,
	"verified_at" timestamp,
	"published_at" timestamp,
	"status" varchar(20) DEFAULT 'draft' NOT NULL,
	"source" varchar(20) DEFAULT 'editorial' NOT NULL,
	"content" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "apps_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(80) NOT NULL,
	"name_id" text NOT NULL,
	"description_id" text,
	"icon" text,
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "comparisons" (
	"id" serial PRIMARY KEY NOT NULL,
	"app_a" integer NOT NULL,
	"app_b" integer NOT NULL,
	"verdict_id" text,
	"table" jsonb,
	"faq" jsonb
);
--> statement-breakpoint
CREATE TABLE "guides" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(140) NOT NULL,
	"title" text NOT NULL,
	"body_id" text,
	"type" varchar(20) NOT NULL,
	"related_app_ids" integer[] DEFAULT '{}' NOT NULL,
	"faq" jsonb,
	"published_at" timestamp,
	CONSTRAINT "guides_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "keywords" (
	"id" serial PRIMARY KEY NOT NULL,
	"keyword" text NOT NULL,
	"cluster" text,
	"intent" varchar(30),
	"target_url" text,
	"volume" integer,
	"volume_source" text,
	"status" varchar(20) DEFAULT 'planned' NOT NULL,
	"risk" varchar(10) DEFAULT 'green' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" varchar(20) NOT NULL,
	"target_url" text,
	"payload" jsonb,
	"status" varchar(20) DEFAULT 'open' NOT NULL,
	"handled_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tools" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(80) NOT NULL,
	"type" varchar(40) NOT NULL,
	"config" jsonb,
	"content_id" text,
	"faq" jsonb,
	CONSTRAINT "tools_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "versions" (
	"id" serial PRIMARY KEY NOT NULL,
	"app_id" integer NOT NULL,
	"version" varchar(40) NOT NULL,
	"release_date" timestamp,
	"changelog_id" text,
	"size" varchar(30),
	"sha256" varchar(64),
	"source_url" text,
	"is_current" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "admin_sessions" ADD CONSTRAINT "admin_sessions_admin_id_admins_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."admins"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "apps" ADD CONSTRAINT "apps_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comparisons" ADD CONSTRAINT "comparisons_app_a_apps_id_fk" FOREIGN KEY ("app_a") REFERENCES "public"."apps"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comparisons" ADD CONSTRAINT "comparisons_app_b_apps_id_fk" FOREIGN KEY ("app_b") REFERENCES "public"."apps"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "versions" ADD CONSTRAINT "versions_app_id_apps_id_fk" FOREIGN KEY ("app_id") REFERENCES "public"."apps"("id") ON DELETE no action ON UPDATE no action;