import ky from "ky";
import { env } from "@/lib/env";
import { sendNotificationResponseSchema } from "@farcaster/frame-sdk";
import { getUserNotificationDetails } from "@/lib/db/queries/notifications";

const appUrl = env.NEXT_PUBLIC_URL;

type SendFrameNotificationResult =
  | {
      state: "error";
      error: unknown;
    }
  | { state: "no_token" }
  | { state: "rate_limit" }
  | { state: "success" };

export async function sendFrameNotification({
  fid,
  title,
  body,
}: {
  fid: number;
  title: string;
  body: string;
}): Promise<SendFrameNotificationResult> {
  const notificationDetails = await getUserNotificationDetails(fid.toString());

  if (!notificationDetails) {
    console.log("[Send Frame Notification] notificationDetails is undefined");
    return { state: "no_token" };
  }

  // Parse the JSON string if it's a string
  const parsedDetails =
    typeof notificationDetails === "string"
      ? notificationDetails
      : notificationDetails;

  if (!parsedDetails.token) {
    console.log("[Send Frame Notification] token is missing");
    return { state: "no_token" };
  }

  if (!parsedDetails.url) {
    console.log("[Send Frame Notification] url is missing");
    return { state: "no_token" };
  }

  const response = await ky.post(parsedDetails.url, {
    json: {
      notificationId: crypto.randomUUID(),
      title,
      body,
      targetUrl: appUrl,
      tokens: [parsedDetails.token],
    },
  });

  const responseJson = await response.json();

  if (response.status === 200) {
    const responseBody = sendNotificationResponseSchema.safeParse(responseJson);
    if (responseBody.success === false) {
      // Malformed response
      return { state: "error", error: responseBody.error.errors };
    }

    if (responseBody.data.result.rateLimitedTokens.length) {
      // Rate limited
      return { state: "rate_limit" };
    }

    return { state: "success" };
  } else {
    // Error response
    return { state: "error", error: responseJson };
  }
}
