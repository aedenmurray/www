import AWS from 'aws-sdk';

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

    const output = 'xyz';

    await managementAPI
        .postToConnection({
            ConnectionId: connectionId,
            Data: output,
        })
        .promise();

    return {
        statusCode: 200,
    };
};
