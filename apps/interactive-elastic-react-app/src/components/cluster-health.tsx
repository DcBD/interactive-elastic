import { Badge, Card, Spin, Tag } from "antd";
import { useClusterHealth } from "interactive-elastic-react";
import { ClusterHealthStatus } from "interactive-elastic-core";

import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    MinusCircleOutlined,
    SyncOutlined,
} from "@ant-design/icons";
import { ReactNode } from "react";

const colors: Record<ClusterHealthStatus | "loading", string> = {
    green: "#06d6a0",
    yellow: "#ffb703",
    red: "#ed1c24",
    loading: "#323639",
};

const icons: Record<ClusterHealthStatus | "error", ReactNode> = {
    green: <CheckCircleOutlined />,
    yellow: <ExclamationCircleOutlined />,
    red: <MinusCircleOutlined />,
    error: <CloseCircleOutlined />,
};

const selectIcon = (status?: ClusterHealthStatus) =>
    status ? icons[status] : <SyncOutlined spin />;
const selectColor = (status?: ClusterHealthStatus) =>
    status ? colors[status] : "#323639";

export default function ClusterHealth() {
    const { data, isError, failureCount, isLoading } = useClusterHealth();
    const color = isLoading ? colors.loading : selectColor(data?.status);
    const icon = isError ? icons.error : selectIcon(data?.status);

    return (
        <Card>
            <Tag icon={icon} color={color}>
                {failureCount > 0 && <span>({failureCount}) </span>}
                {isError ? "Could not connect" : data?.status ?? "loading.."}
            </Tag>
        </Card>
    );
}
