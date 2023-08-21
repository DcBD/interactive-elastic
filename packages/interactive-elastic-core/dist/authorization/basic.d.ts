import Authorization from "./authorization";
export interface BasicAuthorizationOptions {
    type: "basic";
    username: string;
    password: string;
}
export default class BasicAuthorization implements Authorization {
    private readonly username;
    private readonly password;
    constructor(username: string, password: string);
    getAuthorizationHeader(): Promise<HeadersInit>;
}
