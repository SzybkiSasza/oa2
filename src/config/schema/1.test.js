import Ajv from 'ajv';
const ajv = new Ajv({
  $data: true,
  useDefaults: true,
});

import oauth1Schema from './1';

describe('OAuth 1.0 config schema', () => {
  it('Is a defined object', () => {
    expect(oauth1Schema).toBeInstanceOf(Object);
  });

  it('Requires accessTokenURL', () => {
    const config = {
      authURL: 'https://some-url.com/auth',
    };

    const result = ajv.validate(oauth1Schema, config);
    expect(result).toEqual(false);
    expect(ajv.errorsText())
      .toEqual('data should have required property \'accessTokenURL\'');
  });

  it('Requires URLs to be a proper URL', () => {
    const config = {
      accessTokenURL: 'https://some-url.com/at',
      authURL: 'https://some-url.com/auth',
      requestTokenURL: 'some-url.com/rt',
    };

    const result = ajv.validate(oauth1Schema, config);
    expect(result).toEqual(false);
    expect(ajv.errorsText())
      .toEqual('data.requestTokenURL should match format \"url\"');
  });

  it('Sets default signature method, backoff and version', () => {
    const config = {
      accessTokenURL: 'https://some-url.com/at',
      authURL: 'https://some-url.com/auth',
      requestTokenURL: 'https://some-url.com/rt',
    };

    const result = ajv.validate(oauth1Schema, config);
    expect(result).toEqual(true);
    expect(config).toEqual({
      accessTokenURL: 'https://some-url.com/at',
      authURL: 'https://some-url.com/auth',
      requestTokenURL: 'https://some-url.com/rt',
      signatureMethod: 'HMAC-SHA1',
      version: '1.0',
      backoff: {
        factor: 2,
        maxTimeout: 10000,
        minTimeout: 1000,
        randomize: true,
        retries: 10,
      },
    });
  });
});
