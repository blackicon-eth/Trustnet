import { setUserIsHumanityVerified } from "@/lib/db/queries/user";
import { checkCredential, getUserCredentials } from "@/lib/humanity";
import { fetchUserFromNeynar } from "@/lib/neynar/index";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (request: NextRequest) => {
  const userFid = request.headers.get("x-user-fid");
  if (!userFid) {
    console.log("No user FID provided");
    return NextResponse.json(
      { error: "No user FID provided" },
      { status: 404 }
    );
  }

  // We need to fetch the user from Neynar for security reasons
  const neynarUser = await fetchUserFromNeynar(userFid);
  if (!neynarUser) {
    return NextResponse.json(
      { error: "No Farcaster User found for this FID" },
      { status: 404 }
    );
  }

  // Create an array of addresses to check
  const addresses = [
    neynarUser.custody_address.toLowerCase(),
    ...neynarUser.verified_addresses.eth_addresses.map((address) =>
      address.toLowerCase()
    ),
  ];

  // Get the credentials for each address
  const credentialsBatch = await Promise.all(
    addresses.map((address) => getUserCredentials(address))
  );

  // Check if any of the credentials are verified, for each address
  for (const credentials of credentialsBatch) {
    if (credentials) {
      for (const verifiableCredential of credentials.credentials.data) {
        const isValid = await checkCredential(verifiableCredential);
        if (isValid) {
          await setUserIsHumanityVerified(userFid, 1);
          return NextResponse.json({ updated: true }, { status: 200 });
        }
      }
    }
  }

  return NextResponse.json({ updated: false }, { status: 200 });
};
