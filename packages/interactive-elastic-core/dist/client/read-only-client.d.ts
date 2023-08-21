import Client from "./client";
import { ClusterHealthResponse } from "./types";
/**
 * Class for OpenSearch and Elasticsearch clients
 */
export default class ReadOnlyClient extends Client {
    getClusterHealth(): Promise<ClusterHealthResponse>;
}
