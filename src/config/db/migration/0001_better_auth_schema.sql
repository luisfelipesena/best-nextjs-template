-- Better Auth Schema Migration
-- Rename tables to match Better Auth expectations

-- Rename users table to user
ALTER TABLE "users" RENAME TO "user";

-- Rename sessions table to session and update ID type
ALTER TABLE "sessions" RENAME TO "session";
ALTER TABLE "session" ALTER COLUMN "id" TYPE text;

-- Rename accounts table to account and update ID type
ALTER TABLE "accounts" RENAME TO "account";
ALTER TABLE "account" ALTER COLUMN "id" TYPE text;

-- Rename verification_tokens table to verification and update ID type
ALTER TABLE "verification_tokens" RENAME TO "verification";
ALTER TABLE "verification" ALTER COLUMN "id" TYPE text;

-- Update foreign key references in other tables
ALTER TABLE "activity_logs" DROP CONSTRAINT "activity_logs_user_id_users_id_fk";
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "user_preferences" DROP CONSTRAINT "user_preferences_user_id_users_id_fk";
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "orders" DROP CONSTRAINT "orders_user_id_users_id_fk";
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;

-- Update session table foreign key
ALTER TABLE "session" DROP CONSTRAINT "sessions_user_id_users_id_fk";
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;

-- Update account table foreign key
ALTER TABLE "account" DROP CONSTRAINT "accounts_user_id_users_id_fk";
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;

-- Rename image_url column to image in user table
ALTER TABLE "user" RENAME COLUMN "image_url" TO "image";