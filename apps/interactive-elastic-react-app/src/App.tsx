import "./App.css";

import { ReadonlyOpensearch } from "interactive-elastic-react/src/main";
import ClusterHealth from "./components/cluster-health";

import { App as AntdApp } from "antd";
import IndicesList from "./components/data-display/indices-list";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
function App() {
    return (
        <AntdApp>
            <QueryClientProvider client={queryClient}>
                <ReadonlyOpensearch
                    endpoint="http://localhost:9200"
                    authorization={{
                        type: "basic",
                        username: "admin",
                        password: "admin",
                    }}
                >
                    <ClusterHealth />
                    <IndicesList />
                </ReadonlyOpensearch>
            </QueryClientProvider>
        </AntdApp>
    );
}

export default App;
