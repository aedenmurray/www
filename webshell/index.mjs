import AWS from 'aws-sdk';
import { spawn } from 'child_process';

const { API_ID, API_STAGE, AWS_REGION } = process.env;
const managementAPI = new AWS.ApiGatewayManagementApi({
    endpoint: `${API_ID}.execute-api.${AWS_REGION}.amazonaws.com/${API_STAGE}`,
});

export const handler = async (event) => {
    const { body: command, requestContext } = event;
    const { connectionId, eventType } = requestContext;

    if (eventType !== 'MESSAGE') {
        return {
            statusCode: 200,
        };
    }

    const post = (data) =>
        managementAPI
            .postToConnection({
                ConnectionId: connectionId,
                Data: data,
            })
            .promise();

    console.log(`Received command: ${command}`);
    const child = spawn(command, { shell: true });

    const promises = [];
    await new Promise((resolve) => {
        child.stdout.on('data', (data) => {
            promises.push(
                post(
                    JSON.stringify({
                        pid: child.pid,
                        data: data.toString(),
                        type: 'stdout',
                        done: false,
                    }),
                ),
            );
        });

        child.stderr.on('data', (data) => {
            promises.push(
                post(
                    JSON.stringify({
                        pid: child.pid,
                        data: data.toString(),
                        type: 'stderr',
                        done: false,
                    }),
                ),
            );
        });

        child.on('close', async (code) => {
            await Promise.all(promises);
            await post(
                JSON.stringify({
                    pid: child.pid,
                    done: true,
                    code,
                }),
            );

            resolve();
        });
    });

    return {
        statusCode: 200,
    };
};
