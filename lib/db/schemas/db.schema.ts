import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";

export const userTable = sqliteTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),

  humanityCustodialAddress: text("humanity_custodial_address").unique(),
  farcasterCustodialAddress: text("farcaster_custodial_address").unique(),

  farcasterEvmAddresses: text("farcaster_evm_addresses", {
    mode: "json",
  }),

  farcasterFid: text("farcaster_fid").unique(),
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
