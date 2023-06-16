import { BasicAuthorizationOptions } from "interactive-elastic-core";
import { createContext, useState } from "react";

type Authorization = BasicAuthorizationOptions;

interface AppContextType {
    credentials: Authorization | null;
    setCredentials: (credentials: Authorization | null) => void;
}

export const AppContext = createContext<AppContextType>(null as any);

export default function AppProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [credentials, setCredentials] = useState<Authorization | null>(null);

    return (
        <AppContext.Provider value={{ credentials, setCredentials }}>
            {children}
        </AppContext.Provider>
    );
}
