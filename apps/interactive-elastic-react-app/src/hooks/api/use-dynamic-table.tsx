import { Modal, Typography } from "antd";
import { ColumnsType } from "antd/es/table";

export default function useDynamicTable(
    data: Record<string, number | string | number[] | string[]>[],
    columnWidth = 200
) {
    const [modal, contextHolder] = Modal.useModal();
    const columns: ColumnsType<object> = Object.keys(data[0] ?? {}).map(
        key => ({
            title: key,
            dataIndex: key,
            key: key,
            responsive: ["sm"],
            width: columnWidth,
            ellipsis: true,
            render: (value: any) => (
                <Typography.Text
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                        modal.info({
                            content: JSON.stringify(value),
                            title: key,
                            width: value.length > 500 ? "80%" : undefined,
                        })
                    }
                >
                    {JSON.stringify(value)}
                </Typography.Text>
            ),
        })
    );

    return {
        columns,
        contextHolder,
    };
}
