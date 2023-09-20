import Authorization, { AuthorizationOptions } from "./authorization";
import { AWSCredentials, AWSCredentialsGetter } from "./types";
export interface AWSAuthorizationOptions {
    type: "awsSigned";
    credentials: AWSCredentials | AWSCredentialsGetter;
}
export interface AWSAuthorizationHeaderOptions extends AuthorizationOptions {
    url: string;
    body?: BodyInit;
}
export default class AWSAuthorization implements Authorization {
    private readonly credentials;
    constructor(credentials: AWSCredentials | AWSCredentialsGetter);
    getAuthorizationHeader(options: AWSAuthorizationHeaderOptions): Promise<{
        [name: string]: any;
    }>;
}
