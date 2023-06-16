import { useContext } from "react";
import { ClientContext } from "../providers/ReadonlyOpensearch";

export default function useClient() {
    const client = useContext(ClientContext);


    return client
}