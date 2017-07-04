import {cloneDeep} from 'lodash';

import Ajv from 'ajv';
const ajv = new Ajv({
  $data: true,
  useDefaults: true,
});

import backoff from './backoff';

describe('Backoff schema part tests', () => {
  it('Is a defined object', () => {
    expect(backoff).toBeInstanceOf(Object);
  });

  it('Assigns default values', () => {
    const config = {};
    const result = ajv.validate(backoff, config);

    expect(result).toEqual(true);
    expect(config).toEqual({
      retries: 10,
      factor: 2,
      minTimeout: 1000,
      maxTimeout: 10000,
      randomize: true,
    });
  });

  it('Requires randomize to be boolean', () => {
    const config = {
      randomize: 'abc',
    };

    const result = ajv.validate(backoff, config);
    expect(result).toEqual(false);
    expect(ajv.errorsText()).toEqual('data.randomize should be boolean');
  });

  it('Passes if all the parameters are present', () => {
    const config = {
      retries: 11,
      factor: 3,
      minTimeout: 100,
      maxTimeout: 1000,
      randomize: false,
    };
    const originalConfig = cloneDeep(config);

    const result = ajv.validate(backoff, config);
    expect(result).toEqual(true);
    expect(config).toEqual(originalConfig);
  });
});
