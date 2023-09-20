export interface AWSCredentials {
    accessKeyId: string;
    sessionToken: string;
    secretAccessKey: string;
    identityId: string;
    authenticated: boolean;
    expiration?: Date;
}
export type AWSCredentialsGetter = (() => Promise<AWSCredentials>);
