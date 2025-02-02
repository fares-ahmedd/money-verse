CREATE TABLE IF NOT EXISTS "connected_banks" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text NOT NULL
);
