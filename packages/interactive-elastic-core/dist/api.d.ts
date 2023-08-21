import Authorization from "./authorization/authorization";
import { BasicAuthorizationOptions } from "./authorization/basic";
import { AWSAuthorizationOptions } from "./authorization/aws";
interface APIAuthorization {
    type: "basic" | "awsSigned";
}
export interface APIOptions {
    endpoint: string;
    authorization: APIAuthorization | BasicAuthorizationOptions | AWSAuthorizationOptions;
}
type RequestMethod = "GET" | "POST";
export declare class API {
    readonly endpoint: string;
    readonly authorization: Authorization;
    constructor({ endpoint, authorization }: APIOptions);
    makeRequest<T>(path: string, headers?: HeadersInit, body?: BodyInit | null, method?: RequestMethod): Promise<T>;
}
export { };
