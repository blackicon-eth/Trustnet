import { NextRequest } from "next/server";
import {
  ParseWebhookEvent,
  parseWebhookEvent,
  verifyAppKeyWithNeynar,
} from "@farcaster/frame-node";
import { createUser, getUserFromFid } from "@/lib/db/queries/user";
import {
  deleteUserNotificationDetails,
  setUserNotificationDetails,
} from "@/lib/db/queries/notifications";
import { fetchUserFromNeynar } from "@/lib/neynar/index";
import { sendFrameNotification } from "@/lib/notifs";

export async function POST(request: NextRequest) {
  const requestJson = await request.json();

  let data;
  try {
    data = await parseWebhookEvent(requestJson, verifyAppKeyWithNeynar);
  } catch (e: unknown) {
    const error = e as ParseWebhookEvent.ErrorType;

    switch (error.name) {
      case "VerifyJsonFarcasterSignature.InvalidDataError":
      case "VerifyJsonFarcasterSignature.InvalidEventDataError":
        // The request data is invalid
        return Response.json(
          { success: false, error: error.message },
          { status: 400 }
        );
      case "VerifyJsonFarcasterSignature.InvalidAppKeyError":
        // The app key is invalid
        return Response.json(
          { success: false, error: error.message },
          { status: 401 }
        );
      case "VerifyJsonFarcasterSignature.VerifyAppKeyError":
        // Internal error verifying the app key (caller may want to try again)
        return Response.json(
          { success: false, error: error.message },
          { status: 500 }
        );
    }
  }

  const fid = data.fid;
  const event = data.event;

  const user = await getUserFromFid(fid.toString());

  switch (event.event) {
    case "frame_added":
      if (event.notificationDetails) {
        if (!user) {
          const neynarUser = await fetchUserFromNeynar(fid.toString());
          await createUser({
            farcasterFid: neynarUser.fid.toString(),
            humanityCustodialAddress: null,
            farcasterCustodialAddress: neynarUser.custody_address,
            farcasterEvmAddresses: neynarUser.verified_addresses.eth_addresses,
            farcasterPfpUrl: neynarUser.pfp_url,
            farcasterUsername: neynarUser.username,
            farcasterDisplayName: neynarUser.display_name,
            farcasterNotificationDetails: null,
          });
        } else {
          await setUserNotificationDetails(
            fid.toString(),
            event.notificationDetails
          );
        }
        await sendFrameNotification({
          fid,
          title: "Welcome to TrustNest",
          body: "TrustNest is a platform for asking and giving undercollateralized loans.",
        });
        if (!user) {
          break;
        }
      } else {
        await deleteUserNotificationDetails(fid.toString());
      }

      break;
    case "frame_removed":
      await deleteUserNotificationDetails(fid.toString());
      if (!user) {
        break;
      }
      break;
    case "notifications_enabled":
      await setUserNotificationDetails(
        fid.toString(),
        event.notificationDetails
      );
      await sendFrameNotification({
        fid,
        title: "Ding ding dong 🔔",
        body: "Notifications for TrustNest are now enabled",
      });
      if (!user) {
        break;
      }
      break;
    case "notifications_disabled":
      await deleteUserNotificationDetails(fid.toString());
      if (!user) {
        break;
      }
      break;
  }

  return Response.json({ success: true });
}
