import { API, APIOptions } from "../api";
interface ClientConfig {
    apiOptions: APIOptions;
}
export default abstract class Client {
    protected readonly api: API;
    constructor({ apiOptions }: ClientConfig);
    get<T>({ path }: {
        path: string;
    }): Promise<T>;
    post<T>({ path, body }: {
        path: string;
        body: any;
    }): Promise<T>;
    search<T>({ index, body }: {
        index: string;
        body: any;
    }): Promise<T>;
}
export {};
