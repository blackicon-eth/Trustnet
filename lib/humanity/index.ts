import ky from "ky";
import { env } from "../env";
import {
  Credentials,
  VerifiableCredential,
  VerifyCredentialResponse,
} from "./types";

/**
 * Get the humanity protocol credentials for a user
 * @param ethAddress - The Ethereum address of the user
 * @returns The credentials for the user
 */
export const getUserCredentials = async (ethAddress: string) => {
  const endpoint = `${
    env.NEXT_PUBLIC_HUMANITY_API_BASE_URL
  }/credentials/list?holderDid=did:ethr:${ethAddress.toLowerCase()}`;

  try {
    const humanityRes = await ky
      .get<Credentials>(endpoint, {
        headers: {
          "X-API-Token": env.HUMANITY_API_KEY,
        },
      })
      .json();
    return humanityRes;
  } catch {
    return null;
  }
};

/**
 * Check if a credential is valid
 * @param credential - The credential to check
 * @returns Whether the credential is valid
 */
export const checkCredential = async (
  credential: VerifiableCredential
): Promise<boolean> => {
  const endpoint = `${env.NEXT_PUBLIC_HUMANITY_API_BASE_URL}/credentials/verify`;

  try {
    const humanityRes = await ky
      .post<VerifyCredentialResponse>(endpoint, {
        json: { credential },
        headers: {
          "X-API-Token": env.HUMANITY_API_KEY,
        },
      })
      .json();
    return humanityRes.isValid;
  } catch {
    return false;
  }
};
