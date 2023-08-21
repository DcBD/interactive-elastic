import Authorization from "./authorization";

export interface BasicAuthorizationOptions {
    type: "basic";
    username: string;
    password: string;
}

export default class BasicAuthorization implements Authorization {
    private readonly username: string;
    private readonly password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }


    async getAuthorizationHeader(): Promise<HeadersInit> {
        return {
            'Authorization': 'Basic ' + btoa(this.username + ':' + this.password),
        };
    }

}