// Create Context and Provider that will be used to wrap the app and provide the client to all components
import { APIOptions, ReadOnlyClient } from "interactive-elastic-core/src/main";
import { createContext, useContext, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const ClientContext = createContext<ReadOnlyClient>(null as any);

interface Props extends APIOptions {
    children: React.ReactNode;
    /**
     * If not specified a new instance of query client will be created.
     * If your application uses reactQueryClient, you should pass it here.
     */
    reactQueryClient?: QueryClient;
}

export default function ReadOnlyOpensearch({
    authorization,
    endpoint,
    children,
    reactQueryClient,
}: Props) {
    const client = new ReadOnlyClient({
        apiOptions: {
            authorization,
            endpoint,
        },
    });

    const queryClient = useMemo(
        () => reactQueryClient || new QueryClient(),
        [reactQueryClient]
    );

    return (
        <QueryClientProvider client={queryClient}>
            <ClientContext.Provider value={client} children={children} />
        </QueryClientProvider>
    );
}
