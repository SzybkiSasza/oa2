jest.mock('axios');
jest.mock('debug', () => {
  const debugMock = jest.fn();

  return () => debugMock;
});

import axios from 'axios';

import debugLib from 'debug';
import request from './request';

const debug = debugLib();

describe('Request handler', () => {
  beforeEach(() => {
      debug.mockClear();
  });

  it('Is a defined function', () => {
    expect(request).toBeInstanceOf(Function);
  });

  it('Retries if the status code is retryable', async() => {
    axios.mockImplementation(() => Promise.reject({
      response: {
        status: 403,
      },
    }));

    try {
      await request('https://some-url.com', 'get', {}, {
        retries: 1,
        minTimeout: 1,
        maxTimeout: 1,
      });
    } catch (err) {
      expect(err.response.status).toEqual(403);
      expect(debug).toHaveBeenCalledWith('Retrying');
      expect(debug).toHaveBeenCalledWith('Try number: 2');
    }
  });

  it('Retries if response was not received', async() => {
    axios.mockImplementation(() => Promise.reject({
      request: {
        some: 'request object',
      },
    }));

    try {
      await request('https://some-url.com', 'get', {}, {
        retries: 1,
        minTimeout: 1,
        maxTimeout: 1,
      });
    } catch (err) {
      expect(err).toEqual({
        request: {
          some: 'request object',
        },
      });
      expect(debug).toHaveBeenCalledWith('Retrying');
      expect(debug).toHaveBeenCalledWith('Try number: 1');
    }
  });

  it('Does not retry on non-retryable error', async() => {
    axios.mockImplementation(() => Promise.reject({
      response: {
        status: 404,
      },
      message: 'abc',
    }));

    try {
      await request('https://some-url.com', 'get', {}, {
        retries: 1,
        minTimeout: 1,
        maxTimeout: 1,
      });
    } catch (err) {
      expect(err).toEqual({
        response: {
          status: 404,
        },
        message: 'abc',
      });
      expect(debug).toHaveBeenCalledWith(
        'No more retrying. Throwing the error: abc');
      expect(debug).toHaveBeenCalledWith('Try number: 1');
    }
  });

  it('Returns the response if correct', async() => {
    axios.mockImplementation(({paramsSerializer}) => {
      paramsSerializer();

      return Promise.resolve({
        data: {
          some: 'response',
        },

      });
    });

    const response = await request('https://some-url.com', 'get', {}, {
      retries: 1,
      minTimeout: 1,
      maxTimeout: 1,
    });

    expect(response).toEqual({
      some: 'response',
    });
  });
});
