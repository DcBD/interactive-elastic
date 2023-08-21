import Authorization from "./authorization/authorization";
import BasicAuthorization, {
    BasicAuthorizationOptions,
} from "./authorization/basic";
import AWSAuthorization, { AWSAuthorizationOptions } from "./authorization/aws";

interface APIAuthorization {
    type: "basic" | "awsSigned";
}

export interface APIOptions {
    endpoint: string;
    authorization: APIAuthorization | BasicAuthorizationOptions;
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
        const response = await fetch(this.endpoint + path, {
            method,
            headers: {
                ...(await this.authorization.getAuthorizationHeader()),
                ...headers,
            },
            body,
        });

        return (await response.json()) as T;
    }
}
