import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
  farcasterFid: text("farcaster_fid").primaryKey(),

  isHumanityVerified: int("is_humanity_verified").default(0),
  farcasterCustodialAddress: text("farcaster_custodial_address").unique(),

  farcasterEvmAddresses: text("farcaster_evm_addresses", {
    mode: "json",
  }),

  farcasterPfpUrl: text("farcaster_pfp_url"),
  farcasterUsername: text("farcaster_username"),
  farcasterDisplayName: text("farcaster_display_name"),
  farcasterNotificationDetails: text("farcaster_notification_details", {
    mode: "json",
  }),

  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export type User = typeof userTable.$inferSelect;
