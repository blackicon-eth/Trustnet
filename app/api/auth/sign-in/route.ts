import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { verifyMessage } from "viem";
import { fetchUserFromNeynar } from "@/lib/neynar/index";
import { createUser, getUserFromFid } from "@/lib/db/queries/user";

export const POST = async (req: NextRequest) => {
  const { signature, message, fid } = await req.json();

  // We need to fetch the user from Neynar for security reasons
  const neynarUser = await fetchUserFromNeynar(fid);
  if (!neynarUser) {
    return NextResponse.json(
      { message: "No Farcaster User found for this FID" },
      { status: 404 }
    );
  }

  // Get the wallet address from the the Neynar user
  const walletAddress = neynarUser?.custody_address;

  // Verify signature matches custody address
  const isValidSignature = await verifyMessage({
    address: walletAddress as `0x${string}`,
    message,
    signature,
  });

  if (!isValidSignature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  // Check if user exists in db
  let user = await getUserFromFid(neynarUser.fid.toString());

  // If user doesn't exist, create them
  if (!user) {
    user = await createUser({
      farcasterFid: neynarUser.fid.toString(),
      humanityCustodialAddress: null,
      farcasterCustodialAddress: walletAddress,
      farcasterEvmAddresses: neynarUser.verified_addresses.eth_addresses,
      farcasterPfpUrl: neynarUser.pfp_url,
      farcasterUsername: neynarUser.username,
      farcasterDisplayName: neynarUser.display_name,
      farcasterNotificationDetails: null,
    });

    console.log("Created new user", user);
  }

  // Generate JWT token
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new jose.SignJWT({
    userFid: user.farcasterFid,
    walletAddress,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  // Create the response
  const response = NextResponse.json({ token, user }, { status: 200 });

  // Set the auth cookie with the JWT token
  response.cookies.set({
    name: "auth_token",
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });

  return response;
};
