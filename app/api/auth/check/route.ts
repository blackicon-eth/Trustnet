import { getUserFromFid } from "@/lib/db/queries/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userFid = request.headers.get("x-user-fid");
  if (!userFid) {
    return NextResponse.json({ user: null }, { status: 404 });
  }

  const user = await getUserFromFid(userFid);

  return NextResponse.json({ user }, { status: 200 });
}
