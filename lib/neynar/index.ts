import { env } from "@/lib/env";
import ky from "ky";

interface Address {
  city: string;
  state: string;
  country: string;
  country_code: string;
}

export interface NeynarUser {
  object: string;
  fid: number;
  username: string;
  display_name: string;
  pfp_url: string;
  custody_address: string;
  profile: {
    bio: {
      text: string;
    };
    location: {
      latitude: number;
      longitude: number;
      address: Address;
    };
  };
  follower_count: number;
  following_count: number;
  verifications: string[];
  verified_addresses: {
    eth_addresses: string[];
    sol_addresses: string[];
  };
  verified_accounts: {
    platform: string;
    username: string;
  }[];
}

export const fetchUserFromNeynar = async (fid: string): Promise<NeynarUser> => {
  const data = await ky
    .get<{ users: NeynarUser[] }>(
      `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`,
      {
        headers: {
          "x-api-key": env.NEYNAR_API_KEY,
        },
      }
    )
    .json();

  return data.users[0];
};

export const fetchUsersFollowedBy = async (
  fid: string,
  limit: number = 300,
  sortType: "algorithmic" | "desc_chron" = "algorithmic"
): Promise<NeynarUser[]> => {
  const allUsers: NeynarUser[] = [];
  let cursor = null;

  while (allUsers.length < limit) {
    const data = (await ky
      .get(
        `https://api.neynar.com/v2/farcaster/following?fid=${fid}&limit=100${
          cursor ? `&cursor=${cursor}` : ""
        }&sort_type=${sortType}`,
        {
          headers: {
            "x-api-key": env.NEYNAR_API_KEY,
          },
        }
      )
      .json()) as {
      next: { cursor: string };
      users: { object: "follow"; user: NeynarUser }[];
    };

    if (data.users.length === 0) {
      break;
    }

    allUsers.push(
      ...data.users.map((o: { object: "follow"; user: NeynarUser }) => o.user)
    );

    if (!data.next) {
      break;
    }
    cursor = data.next.cursor;
  }

  return allUsers.slice(0, limit);
};
