import Authorization from "./authorization/authorization";
import BasicAuthorization, { BasicAuthorizationOptions } from "./authorization/basic";


interface APIAuthorization {
    type: 'basic' | 'awsSigned'
}

export interface APIOptions {
    endpoint: string;
    authorization: APIAuthorization | BasicAuthorizationOptions;
}


type RequestPaths = 'msearch' | 'search' | 'clusterHealth';
type RequestMethod = 'GET' | 'POST'


const paths: Record<RequestPaths, string> = {
    msearch: '/_msearch',
    search: '/_search',
    clusterHealth: '/_cluster/health'
}

export class API {

    readonly endpoint: string;
    readonly authorization: Authorization
    constructor({ endpoint, authorization }: APIOptions) {
        this.endpoint = endpoint;

        switch (authorization.type) {
            case 'basic':
                const { username, password } = authorization as BasicAuthorizationOptions;
                this.authorization = new BasicAuthorization(username, password);
                break;
            case 'awsSigned':
                throw new Error('Not implemented');
        }

    }




    public async makeRequest<T>(path: string, headers: HeadersInit = {}, body?: BodyInit | null, method: RequestMethod = 'POST'): Promise<T> {
        const response = await fetch(this.endpoint + path, {
            method,
            headers: {
                ...this.authorization.getAuthorizationHeader(),
                ...headers
            },
            body
        })

        return await response.json() as T;
    }
}