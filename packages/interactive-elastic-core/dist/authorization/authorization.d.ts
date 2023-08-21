export interface AuthorizationOptions {
    [key: string]: any;
}
export default abstract class Authorization {
    abstract getAuthorizationHeader(options?: AuthorizationOptions): Promise<HeadersInit>;
}
