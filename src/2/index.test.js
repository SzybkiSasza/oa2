jest.mock('../common/schema/validate', () => jest.fn((obj) => obj));

import validate from '../common/schema/validate';

import {O2} from '.';

describe('OAuth 2 tests', () => {
  it('Is a defined class', () => {
    expect(O2).toBeInstanceOf(Function);
  });

  it('Validates input config', () => {
    validate.mockClear();

    const config = {
      some: 'config',
    };
    new O2(config);

    expect(validate).toHaveBeenCalledWith(config, expect.any(Object));
  });

  describe('getAuthorizeURL', () => {
    it('Validates input parameters', () => {
      const config = {
        authURL: 'https://some-url',
      };
      const oauth2 = new O2(config);

      validate.mockClear();

      const client = {
        client_id: 'abc',
      };
      oauth2.getAuthorizeURL(client);

      expect(validate).toHaveBeenCalledWith(client, expect.any(Object));
    });

    it('Sets the default response type', () => {
      const config = {
        authURL: 'https://some-url',
        responseType: 'code',
      };
      const client = {
        client_id: 'abc',
        redirect_uri: 'https://redir-uri.net',
      };

      const oauth2 = new O2(config);
      validate.mockClear();

      const URL = oauth2.getAuthorizeURL(client);
      expect(URL).toEqual('https://some-url/?client_id=abc&' +
        'redirect_uri=https%3A%2F%2Fredir-uri.net&response_type=code');
    });

    it('Allows for overriding response type', () => {
      const config = {
        authURL: 'https://some-url',
        responseType: 'code',
      };
      const client = {
        client_id: 'abc',
        redirect_uri: 'https://redir-uri.net',
      };

      const oauth2 = new O2(config);
      validate.mockClear();

      const URL = oauth2.getAuthorizeURL(client, {}, {
        responseType: 'token',
      });
      expect(URL).toEqual('https://some-url/?client_id=abc&' +
        'redirect_uri=https%3A%2F%2Fredir-uri.net&response_type=token');
    });

    it('Builds the scope object', () => {
      const config = {
        authURL: 'https://some-url',
        responseType: 'code',
        scope: [
          'one',
        ],
      };
      const client = {
        client_id: 'abc',
        redirect_uri: 'https://redir-uri.net',
      };

      const oauth2 = new O2(config);
      validate.mockClear();

      const URL = oauth2.getAuthorizeURL(client, {}, {
        responseType: 'token',
        scope: [
          'two',
        ],
      });
      expect(URL).toEqual('https://some-url/?client_id=abc&' +
        'redirect_uri=https%3A%2F%2Fredir-uri.net&response_type=token&' +
        'scope=two+one');
    });

    it('Adds optional parameters as they are', () => {
      const config = {
        authURL: 'https://some-url',
        responseType: 'code',
        scope: [
          'one',
        ],
      };
      const client = {
        client_id: 'abc',
        redirect_uri: 'https://redir-uri.net',
      };

      const oauth2 = new O2(config);
      validate.mockClear();

      const URL = oauth2.getAuthorizeURL(client, {
        optional: 'parameter',
      }, {
        responseType: 'token',
        scope: [
          'two',
        ],
      });
      expect(URL).toEqual('https://some-url/?client_id=abc&' +
        'redirect_uri=https%3A%2F%2Fredir-uri.net&response_type=token&' +
        'scope=two+one&' +
        'optional=parameter');
    });
  });
});
