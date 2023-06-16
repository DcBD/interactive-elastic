import { useEffect, useRef, useState } from "react";
import useListDocuments from "../../hooks/api/use-list-documents";
import { Table, Tag } from "antd";
import useDynamicTable from "../../hooks/api/use-dynamic-table";
import { styled } from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";

const DOCUMENTS_PER_PAGE = 10;

const Container = styled.div`
    overflow: hidden;
    height: 250px;
    width: 100%;
`;

const Loader = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 5px;
    z-index: 3;
`;
export default function DocumentList({ index }: { index: string }) {
    const [pagination, setPagination] = useState(0);
    const [data, setData] = useState<any[]>([]);

    const {
        getSource,
        isLoading,
        data: rawData,
    } = useListDocuments(index, pagination);

    const { columns, contextHolder } = useDynamicTable(data);

    const loadMoreData = async (pagination = 0) => {
        if (isLoading) {
            return;
        }

        setPagination(pagination);
    };

    useEffect(() => {
        setData([...data, ...getSource(rawData)]);
    }, [rawData?.hits.hits]);

    useEffect(() => {
        loadMoreData();
    }, []);

    const parentRef = useRef<HTMLDivElement | undefined>(null);
    const hasMore = rawData?.hits.total.value
        ? rawData?.hits.total.value > data.length
        : true;
    console.log(parentRef.current?.querySelector(".ant-table-body"));
    return (
        <Container ref={parentRef as any}>
            <InfiniteScroll
                dataLength={data.length}
                next={() => loadMoreData(pagination + DOCUMENTS_PER_PAGE)}
                hasMore={hasMore}
                loader={
                    isLoading ? (
                        <Loader>
                            <Tag color="blue-inverse">Loading...</Tag>
                        </Loader>
                    ) : (
                        <Loader />
                    )
                }
                endMessage={
                    <Loader>
                        <Tag color="orange-inverse">No more data.</Tag>
                    </Loader>
                }
                height={250}
                style={{
                    width: "inherit",
                    overflowY: "auto",
                    overflowX: "hidden",
                }}
            >
                <Table
                    dataSource={data}
                    columns={columns}
                    pagination={false}
                    sticky
                    scroll={{ x: 300 }}
                />
            </InfiniteScroll>
            {contextHolder}
        </Container>
    );
}
