import Authorization, { AuthorizationOptions } from "./authorization";
import { AWSCredentials } from "./types";
export interface AWSAuthorizationOptions {
    type: "awsSigned";
    credentials: AWSCredentials;
}
export interface AWSAuthorizationHeaderOptions extends AuthorizationOptions {
    url: string;
    body?: BodyInit;
}
export default class AWSAuthorization implements Authorization {
    private readonly credentials;
    constructor(credentials: AWSCredentials);
    getAuthorizationHeader(options: AWSAuthorizationHeaderOptions): Promise<HeadersInit>;
}
