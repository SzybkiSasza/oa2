import Ajv from 'ajv';
const ajv = new Ajv({
  $data: true,
  useDefaults: true,
});

import clientSchema from './client';

describe('OAuth 2.0 client schema', () => {
  it('Is a defined object', () => {
    expect(clientSchema).toBeInstanceOf(Object);
  });

  it('Requires three parameters', () => {
    const client = {
      client_id: 'abc',
      client_secret: 'def',
    };

    const result = ajv.validate(clientSchema, client);
    expect(result).toEqual(false);
    expect(ajv.errorsText())
      .toEqual(`data should have required property 'redirect_uri'`);
  });

  it('Passes if client meets the schema', () => {
    const client = {
      client_id: 'abc',
      client_secret: 'def',
      redirect_uri: 'https://redir-adr.com',
    };

    const result = ajv.validate(clientSchema, client);
    expect(result).toEqual(true);
    expect(ajv.errorsText()).toEqual('No errors');
  });
});
