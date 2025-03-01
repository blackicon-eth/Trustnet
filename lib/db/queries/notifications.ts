import { db } from "..";
import { eq } from "drizzle-orm";
import { FrameNotificationDetails } from "@farcaster/frame-sdk";
import { userTable } from "../schemas/db.schema";

/**
 * Get the notification details for a user from the database by their Farcaster FID
 * @param fid - The Farcaster FID of the user to get the notification details for
 * @returns The notification details for the user
 */
export const getUserNotificationDetails = async (
  fid: string
): Promise<FrameNotificationDetails | undefined> => {
  const result = await db.query.user.findFirst({
    where: eq(userTable.farcasterFid, fid),
  });
  if (!result || !result.farcasterNotificationDetails) return undefined;

  return result.farcasterNotificationDetails
    ? (JSON.parse(
        result.farcasterNotificationDetails as string
      ) as FrameNotificationDetails)
    : undefined;
};

/**
 * Set the notification details for a user in the database by their Farcaster FID
 * @param fid - The Farcaster FID of the user to set the notification details for
 * @param details - The notification details to set for the user
 */
export const setUserNotificationDetails = async (
  fid: string,
  details: FrameNotificationDetails
) => {
  await db
    .update(userTable)
    .set({ farcasterNotificationDetails: JSON.stringify(details) })
    .where(eq(userTable.farcasterFid, fid));
};

/**
 * Delete the notification details for a user in the database by their Farcaster FID
 * @param fid - The Farcaster FID of the user to delete the notification details for
 */
export const deleteUserNotificationDetails = async (
  fid: string
): Promise<void> => {
  await db
    .update(userTable)
    .set({ farcasterNotificationDetails: null })
    .where(eq(userTable.farcasterFid, fid));
};
