// Create Context and Provider that will be used to wrap the app and provide the client to all components
import { APIOptions, ReadOnlyClient } from "interactive-elastic-core";
import { createContext } from "react";


export const ClientContext = createContext<ReadOnlyClient>(null as any);

interface Props extends APIOptions {
    children: React.ReactNode;
}

export default function ReadOnlyOpensearch({
    authorization,
    endpoint,
    children
}: Props) {
    const client = new ReadOnlyClient({
        apiOptions: {
            authorization,
            endpoint,
        },
    });

    return (
        <ClientContext.Provider value={client} children={children} />
    );
}
