import useClient from "./use-client";
import { useQuery } from "@tanstack/react-query";


export default function useClusterHealth(retryDelay = 1000) {
    const client = useClient();

    const result = useQuery({
        queryKey: ["clusterHealth"],
        queryFn: async () => await client.getClusterHealth(),
        retryDelay,
    })

    return result
}