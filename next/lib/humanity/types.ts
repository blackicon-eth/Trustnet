export interface CredentialSubject {
  id: string;
  kyc: string;
  farcasterUsername: string;
  farcasterFid: string;
  FarcasterCustodialAddress: string;
}

export interface CredentialStatus {
  type: string;
  chain_id: string;
  revocation_registry_contract_address: string;
  did_registry_contract_address: string;
}

export interface Proof {
  type: string;
  proofPurpose: string;
  verificationMethod: string;
  created: string;
  proofValue: string;
  cryptosuite: string;
}

export interface VerifiableCredential {
  "@context": string[];
  type: string[];
  issuer: string;
  validFrom: string;
  validUntil: string;
  credentialSubject: CredentialSubject;
  id: string;
  credentialStatus: CredentialStatus;
  proof: Proof;
}

export interface CredentialsData {
  data: VerifiableCredential[];
}

export interface Credentials {
  credentials: CredentialsData;
}

export interface VerifyCredentialResponse {
  isValid: boolean;
  message: string;
}
