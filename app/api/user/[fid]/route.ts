import { getUserFromFid } from "@/lib/db/queries/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { fid } }: { params: { fid: string } }
) {
  if (!fid) {
    return NextResponse.json({ user: null }, { status: 404 });
  }

  const user = await getUserFromFid(fid);

  return NextResponse.json({ user }, { status: 200 });
}
