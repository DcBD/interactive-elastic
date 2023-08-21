import Authorization, { AuthorizationOptions } from "./authorization/authorization";
import BasicAuthorization, {
    BasicAuthorizationOptions,
} from "./authorization/basic";
import AWSAuthorization, { AWSAuthorizationHeaderOptions, AWSAuthorizationOptions } from "./authorization/aws";

interface APIAuthorization {
    type: "basic" | "awsSigned";
}

export interface APIOptions {
    endpoint: string;
    authorization: APIAuthorization | BasicAuthorizationOptions | AWSAuthorizationOptions;
}

type RequestMethod = "GET" | "POST";

export class API {
    readonly endpoint: string;
    readonly authorization: Authorization;
    constructor({ endpoint, authorization }: APIOptions) {
        this.endpoint = endpoint;

        switch (authorization.type) {
            case "basic":
                const { username, password } =
                    authorization as BasicAuthorizationOptions;
                this.authorization = new BasicAuthorization(username, password);
                break;
            case "awsSigned":
                const { credentials } = authorization as AWSAuthorizationOptions;
                this.authorization = new AWSAuthorization(credentials);
                break;
        }
    }

    public async makeRequest<T>(
        path: string,
        headers: HeadersInit = {},
        body?: BodyInit | null,
        method: RequestMethod = "POST"
    ): Promise<T> {
        const url = this.endpoint + path

        let authorizationOptions: AuthorizationOptions = {}

        if (this.authorization instanceof AWSAuthorization) {

            authorizationOptions = {
                url,
                body
            } as AWSAuthorizationHeaderOptions
        }

        const signedHeaders = await this.authorization.getAuthorizationHeader(authorizationOptions)

        const response = await fetch(url, {
            method,
            headers: {
                ...signedHeaders,
                ...headers,
            },
            body,
        });

        return (await response.json()) as T;
    }
}
