import { API, APIOptions } from "../api";

interface ClientConfig {
    apiOptions: APIOptions;
}

export default abstract class Client {
    protected readonly api: API;

    constructor({
        apiOptions
    }: ClientConfig) {
        this.api = new API(apiOptions)
    }


    public async get<T>({ path }: { path: string }) {
        return this.api.makeRequest<T>(path, {}, null, 'GET');
    }

    public async post<T>({ path, body }: { path: string, body: any }) {
        return this.api.makeRequest<T>(path, {
            'Content-Type': 'application/json'
        }, body, 'POST');
    }

    public async search<T>({ index, body }: { index: string, body: any }) {
        return this.post<T>({ path: `/${index}/_search`, body });
    }


}