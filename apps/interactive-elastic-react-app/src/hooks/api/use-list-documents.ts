import { useClient } from "interactive-elastic-react";
import { useQuery } from "react-query";
import esb from 'elastic-builder'
import { SearchResponse } from "interactive-elastic-core";
export default function useListDocuments(index: string, pagination = 0, retryDelay = 1000,) {
    const client = useClient();
    const result = useQuery({
        queryKey: ["listDocuments", index, pagination],
        queryFn: async () => await client.search<SearchResponse<any>>({
            index,
            body: JSON.stringify(esb.requestBodySearch().size(10).from(pagination))
        }),
        retryDelay
    });

    const getSource = (data: SearchResponse<any> | undefined) => data?.hits.hits.map((hit: any) => hit._source) ?? [];

    return {
        getSource,
        ...result
    };
}