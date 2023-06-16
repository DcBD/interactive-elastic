import { Space, Switch, Table, Tag } from "antd";
import useListIndices from "../../hooks/api/use-list-indices";

import { CatIndices, CatIndicesResponse } from "src/hooks/api/types";
import { ColumnGroupType, ColumnType } from "antd/es/table";
import { ClusterHealthStatus } from "interactive-elastic-core";
import { useState } from "react";
import DocumentList from "./document-list";

const colors: Record<ClusterHealthStatus, string> = {
    green: "#06d6a0",
    yellow: "#ffb703",
    red: "#ed1c24",
};

const simplifiedColumns: ColumnType<CatIndices>[] = [
    {
        title: "Index",
        key: "index",
        dataIndex: "index",
    },
    {
        title: "Health",
        key: "health",
        dataIndex: "health",
        render: health => (
            <Tag
                style={{ width: 50, textAlign: "center" }}
                color={colors[health]}
            >
                {health}
            </Tag>
        ),
        width: 55,
    },
    {
        title: "Docs",
        key: "docs.count",
        dataIndex: "docs.count",
        render: (count: number) => count.toLocaleString(),
    },
    {
        title: "Store Size",
        key: "store.size",
        dataIndex: "store.size",
    },
    {
        title: "Primary store size",
        key: "pri.store.size",
        dataIndex: "pri.store.size",
    },
];

const columns: ColumnType<CatIndices>[] = [
    ...simplifiedColumns,
    {
        title: "Status",
        key: "status",
        dataIndex: "status",
    },
    {
        title: "Docs",
        key: "docs.count",
        dataIndex: "docs.count",
        render: (count: number) => count.toLocaleString(),
    },
    {
        title: "Primary Shards",
        key: "pri",
        dataIndex: "pri",
    },
    {
        title: "Replica Shards",
        key: "rep",
        dataIndex: "rep",
    },
];

export default function IndicesList() {
    const { data, isLoading } = useListIndices();
    const [simplifiedViewEnabled, setSimplifiedViewEnabled] = useState(true);
    return (
        <>
            <Space align="center" style={{ marginBottom: 16 }}>
                Simplified:{" "}
                <Switch
                    checked={simplifiedViewEnabled}
                    onChange={setSimplifiedViewEnabled}
                />
            </Space>
            <Table
                loading={isLoading}
                dataSource={data}
                rowKey="index"
                columns={simplifiedViewEnabled ? simplifiedColumns : columns}
                size="small"
                pagination={false}
                scroll={{ x: 500 }}
                expandable={{
                    rowExpandable: record => parseInt(record["docs.count"]) > 0,
                    expandedRowRender: record => (
                        <DocumentList index={record.index} />
                    ),
                    columnTitle: "Show data",
                    columnWidth: 90,
                    fixed: true,
                }}
            />
        </>
    );
}
