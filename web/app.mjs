/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
import getArgs from './utils/get_args.js';
import callFn from './utils/call_fn.js';

export const lambdaHandler = async (event, context) => {
  try {
    const input = getArgs(event);
    let { fnName, args } = input;

    const res = await callFn(fnName, args);

    const response = {
      statusCode: 200,
      body: JSON.stringify(res),
    };

    return response;
  } catch (err) {
    console.error(err);
    let error;
    if (err instanceof Error) {
      error = err.message;
    } else {
      error = err;
    }
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error',
        error,
      }),
    }
  }
}

