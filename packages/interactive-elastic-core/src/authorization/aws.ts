import Authorization, { AuthorizationOptions } from "./authorization";
import { AWSCredentials } from "./types";
// @ts-ignore
import { AwsV4Signer } from 'aws4fetch';


export interface AWSAuthorizationOptions {
    type: "awsSigned";
    credentials: AWSCredentials
}

export interface AWSAuthorizationHeaderOptions extends AuthorizationOptions {
    url: string
    body?: BodyInit
}

export default class AWSAuthorization implements Authorization {
    private readonly credentials: AWSCredentials;

    constructor(credentials: AWSCredentials) {
        this.credentials = credentials
    }


    async getAuthorizationHeader(options: AWSAuthorizationHeaderOptions): Promise<{ [name: string]: any }> {
        const aws4Signer = new AwsV4Signer({
            ...this.credentials,
            headers: {
                'Content-Type': 'application/x-ldjson'
            },
            url: options.url,
            body: options.body,
        })

        const { headers } = await aws4Signer.sign()

        return {
            authorization: headers.get('authorization'),
            'x-amz-date': headers.get('x-amz-date'),
            'x-amz-security-token': headers.get('x-amz-security-token'),
            'Content-Type': 'application/x-ndjson',
        }
    }
} 