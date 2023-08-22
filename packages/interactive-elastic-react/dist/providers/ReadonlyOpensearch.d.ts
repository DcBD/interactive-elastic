/// <reference types="react" />
import { APIOptions, ReadOnlyClient } from "interactive-elastic-core";
export declare const ClientContext: import("react").Context<ReadOnlyClient>;
interface Props extends APIOptions {
    children: React.ReactNode;
}
export default function ReadOnlyOpensearch({ authorization, endpoint, children }: Props): import("react/jsx-runtime").JSX.Element;
export {};
