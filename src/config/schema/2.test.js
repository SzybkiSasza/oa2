import Ajv from 'ajv';
const ajv = new Ajv({
  $data: true,
  useDefaults: true,
});

import oauth2Schema from './2';

describe('OAuth 2.0 config schema', () => {
  it('Is a defined object', () => {
    expect(oauth2Schema).toBeInstanceOf(Object);
  });
});
