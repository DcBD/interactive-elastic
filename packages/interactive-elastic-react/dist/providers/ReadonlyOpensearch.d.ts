/// <reference types="react" />
import { APIOptions, ReadOnlyClient } from "interactive-elastic-core";
import { QueryClient } from "@tanstack/react-query";
export declare const ClientContext: import("react").Context<ReadOnlyClient>;
interface Props extends APIOptions {
    children: React.ReactNode;
    /**
     * If not specified a new instance of query client will be created.
     * If your application uses reactQueryClient, you should pass it here.
     */
    reactQueryClient?: QueryClient;
}
export default function ReadOnlyOpensearch({ authorization, endpoint, children, reactQueryClient, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
