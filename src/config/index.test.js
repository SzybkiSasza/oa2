// Simple schema to test builder behaviour. Much simpler than the real one
jest.mock('./schema/1', () => ({
  type: 'object',
  properties: {
    some: {
      type: 'string',
    },
    other: {
      type: 'number',
      default: 123,
    },
  },
  required: ['some'],
}));

import {build} from '.';

describe('Config builder test', () => {
  it('Is a defined function', () => {
    expect(build).toBeInstanceOf(Function);
  });

  it('Accepts only supported versions of OAuth', () => {
    try {
      build({
        some: 'val',
      }, '3.0');
      throw new Error('This is not thrown');
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toEqual('Unsupported OAuth version passed: 3.0');
    }
  });

  it('Sets default OAuth version to 1.0', () => {
    // We don't pass OAuth version. Since invalid version error is not thrown,
    // It means the default one was used
    const result = build({
      some: 'val',
    });

    expect(result).toEqual(expect.objectContaining({
      some: 'val',
    }));
  });

  it('Throws an error if config does not match schema', () => {
    const config = {};

    try {
      build(config);
      throw new Error('This is not thrown');
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toEqual(`data should have required property 'some'`);
    }
  });

  it('Does not mutate original config', () => {
    const config = {
      some: 'val',
    };

    const builtConfig = build(config);
    expect(builtConfig).not.toEqual(config);
    expect(builtConfig.other).toEqual(123);
  });
});
