import { useClient } from "interactive-elastic-react";
import { useQuery } from "react-query";
import { CatIndicesResponse } from "./types";

export default function useListIndices(retryDelay = 1000) {
    const client = useClient();

    const result = useQuery({
        queryKey: ["listIndices"],
        queryFn: async () => await client.get<CatIndicesResponse>({ path: "/_cat/indices?format=json" }),
        retryDelay,
    })

    return result
}