import { db } from "../index";
import { eq } from "drizzle-orm";
import { User, userTable } from "../schemas/db.schema";

/**
 * Get a user from their Farcaster FID (which is the primary key)
 * @param fid - The Farcaster FID of the user
 * @returns The user item
 */
export const getUserFromFid = async (
  fid: string
): Promise<User | undefined> => {
  const result = await db.query.user.findFirst({
    where: eq(userTable.farcasterFid, fid),
  });

  return result;
};

/**
 * Get a user from their Farcaster username
 * @param username - The Farcaster username of the user
 * @returns The user item
 */
export const getUserFromUsername = async (
  username: string
): Promise<User | undefined> => {
  const result = await db.query.user.findFirst({
    where: eq(userTable.farcasterUsername, username),
  });

  return result;
};

/**
 * Create a user in the database
 * @param user - The user to create
 * @returns The created user
 */
export const createUser = async (
  user: Omit<User, "id" | "createdAt" | "updatedAt">
): Promise<User> => {
  const result = await db.insert(userTable).values(user).returning();

  return result[0];
};

/**
 * Update a user in the database
 * @param fid - The Farcaster FID of the user
 * @param updates - The updates to apply to the user
 * @returns The updated user
 */
export const updateUser = async (
  fid: string,
  updates: Partial<User>
): Promise<User> => {
  const result = await db
    .update(userTable)
    .set(updates)
    .where(eq(userTable.farcasterFid, fid))
    .returning();

  return result[0];
};
