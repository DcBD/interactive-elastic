import Client from "./client";
import { ClusterHealthResponse } from "./types";



/**
 * Class for OpenSearch and Elasticsearch clients
 */
export default class ReadOnlyClient extends Client {
    public async getClusterHealth(): Promise<ClusterHealthResponse> {
        return this.get<ClusterHealthResponse>({ path: '/_cluster/health' });
    }
}