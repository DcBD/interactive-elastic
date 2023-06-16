import { ClusterHealthStatus } from "interactive-elastic-core";

export type CatIndices = {
    health: string;
    status: ClusterHealthStatus;
    index: string;
    uuid: string;
    pri: string;
    rep: string;
    "docs.count": string;
    "docs.deleted": string;
    "store.size": string;
    "pri.store.size": string;
}

export type CatIndicesResponse = CatIndices[]
