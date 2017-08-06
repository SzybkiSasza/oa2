import axios from 'axios';
import debugLib from 'debug';
import retry from 'retry';
import qs from 'qs';

const debug = debugLib('request');

/**
 * Performs a backoff request to a given resource
 * @param  {String} url       Resource URL
 * @param  {String} method    HTTP method
 * @param  {Object} params    Additional params to be stringified
 * @param  {Object} backoff   Backoff settings
 * @return {Promise<Object>}  Result of the request
 */
export default function request(url, method, params, backoff) {
  debug(`Trying URL ${method}: ${url}`);

  return new Promise((resolve, reject) => {
    const operation = retry.operation(backoff);

    operation.attempt(function(currentAttempt) {
      debug(`Try number: ${currentAttempt}`);

      return axios({
        url,
        method,
        params,
        paramsSerializer: (params) => qs.stringify(params),
        timeout: 2000, // We wait 2s to realize the request by default...
      }).then((response) => {
        debug(`Got response.`);
        return resolve(response.data);
      }).catch((error) => {
        let shouldRetry = false;

        if (error.response) {
          const statusCode = error.response.status;
          debug(`Response error: ${statusCode}`);

          // These are retryable errors
          if (statusCode === 403 || statusCode >= 500) {
            shouldRetry = true;
          }
        } else if (error.request) {
          // No response, probable timeout (no network). We should try again.
          debug(`No response received`);
          shouldRetry = true;
        }

        if (shouldRetry && operation.retry(error)) {
          debug(`Retrying`);
          return;
        }

        debug(`No more retrying. Throwing the error: ${error.message}`);
        return reject(operation.mainError() || error);
      });
    });
  });
}
