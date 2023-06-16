import { App, Button, Form } from "antd";
import { APIOptions, ReadOnlyClient } from "interactive-elastic-core";
import { useState } from "react";

export default function ConnectionValidator() {
    const { message } = App.useApp();
    const form = Form.useFormInstance();

    const [isLoading, setIsLoading] = useState(false);

    const handleTestConnection = async () => {
        setIsLoading(true);
        let fields: APIOptions | null = null;
        try {
            fields = (await form.validateFields()) as APIOptions;
        } catch (e) {
            message.error("Please fill in all required fields");
        }

        if (!fields) {
            setIsLoading(false);
            return;
        }
        const { endpoint, authorization } = fields;

        console.log(endpoint, authorization);

        const client = new ReadOnlyClient({
            apiOptions: {
                authorization: authorization,
                endpoint: endpoint,
            },
        });

        message.loading({
            content: "Testing connection...",
            key: "loading-test-connection",
            duration: 0,
        });

        await client
            .getClusterHealth()
            .then(res => {
                message.destroy("loading-test-connection");

                message.success("Connected to: " + res.cluster_name);
            })
            .catch(err => {
                message.destroy("loading-test-connection");

                message.error(err.message);
            });

        setIsLoading(false);
    };

    return (
        <Button onClick={handleTestConnection} loading={isLoading}>
            Test
        </Button>
    );
}
