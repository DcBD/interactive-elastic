import { Button, Form, Input, Select, Space } from "antd";
import { useClient } from "interactive-elastic-react";

import { styled } from "styled-components";
import ConnectionValidator from "./connection-validator";

const UrlPartContainer = styled(Space)`
    width: 100%;

    > div:first-child {
        display: flex;
        flex: 1;
    }

    > div:first-child > div {
        flex: 1;
    }
`;

export default function LoginForm() {
    const [form] = Form.useForm();
    const authorizationType = Form.useWatch(["authorization", "type"], form);

    return (
        <Form form={form}>
            <UrlPartContainer>
                <Form.Item
                    name="endpoint"
                    label="Endpoint"
                    required
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={["authorization", "type"]}
                    style={{ width: 200 }}
                    required
                    rules={[{ required: true }]}
                >
                    <Select allowClear placeholder="Authorization">
                        <Select.Option value="basic">Basic</Select.Option>
                    </Select>
                </Form.Item>
            </UrlPartContainer>

            {authorizationType === "basic" && (
                <>
                    <Form.Item
                        name={["authorization", "username"]}
                        label="Username"
                        required
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={["authorization", "password"]}
                        label="Password"
                        required
                        rules={[{ required: true }]}
                    >
                        <Input.Password />
                    </Form.Item>
                </>
            )}
            <Space>
                <Button type="primary">Add</Button>
                <ConnectionValidator />
            </Space>
        </Form>
    );
}
