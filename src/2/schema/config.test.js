import Ajv from 'ajv';
const ajv = new Ajv({
  $data: true,
  useDefaults: true,
});

import oauth2Schema from './config';

describe('OAuth 2.0 config schema', () => {
  it('Is a defined object', () => {
    expect(oauth2Schema).toBeInstanceOf(Object);
  });

  it('Requires URLs and responseType', () => {
    const config = {
      authURL: 'https://some-url.com/auth',
    };

    const result = ajv.validate(oauth2Schema, config);
    expect(result).toEqual(false);
    expect(ajv.errorsText())
      .toEqual(`data should have required property 'tokenURL'`);
  });

  it('Allows only specific response types', () => {
    const config = {
      authURL: 'https://some-url.com/auth',
      tokenURL: 'https://some-url.com/token',
      responseType: 'randomType',
    };

    const result = ajv.validate(oauth2Schema, config);
    expect(result).toEqual(false);
    expect(ajv.errorsText()).toEqual(
      `data.responseType should be equal to one of the allowed values`);
  });

  it('Sets default values', () => {
    const config = {
      authURL: 'https://some-url.com/auth',
      tokenURL: 'https://some-url.com/token',
      scope: [
        'someScope',
      ],
    };

    const result = ajv.validate(oauth2Schema, config);
    expect(result).toEqual(true);
    expect(config).toEqual(expect.objectContaining({
      isRefreshable: false,
      responseType: 'code',
    }));
  });

  it('Allows passing custom object', () => {
    const config = {
      authURL: 'https://some-url.com/auth',
      tokenURL: 'https://some-url.com/token',
      responseType: 'code',
      scope: [
        'someScope',
      ],
      custom: {
        specific: 'property',
      },
    };

    const result = ajv.validate(oauth2Schema, config);
    expect(result).toEqual(true);
    expect(ajv.errorsText()).toEqual(`No errors`);
  });

  it('Generates default backoff settings', () => {
    const config = {
      authURL: 'https://some-url.com/auth',
      tokenURL: 'https://some-url.com/token',
      scope: [
        'someScope',
      ],
    };

    const result = ajv.validate(oauth2Schema, config);
    expect(result).toEqual(true);
    expect(config).toEqual({
      authURL: 'https://some-url.com/auth',
      tokenURL: 'https://some-url.com/token',
      isRefreshable: false,
      scope: ['someScope'],
      responseType: 'code',
      backoff: {
        retries: 10,
        factor: 2,
        minTimeout: 1000,
        maxTimeout: 10000,
        randomize: true,
      },
    });
  });
});
