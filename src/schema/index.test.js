// Simple schema to test getConfig behaviour. Much simpler than the real one
jest.mock('./1/config', () => ({
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

jest.mock('./2/config', () => ({
  type: 'object',
  properties: {
    a: {
      type: 'string',
    },
  },
  required: ['a'],
}));

import {getConfig, validate} from '.';

describe('Schema util functions', () => {
  describe('validate', () => {
    it('Is a defined function', () => {
      expect(validate).toBeInstanceOf(Function);
    });

    it('Returns error text if object does not match the schema', () => {
      const config = {};

      const schema = {
        type: 'object',
        properties: {
          some: {
            type: 'string',
          },
        },
        required: ['some'],
      };

      try {
        validate(config, schema);
        throw new Error('This is not thrown');
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toEqual(
          `data should have required property 'some'`);
      }
    });

    it('Does not mutate original config', () => {
      const config = {};

      const schema = {
        type: 'object',
        properties: {
          some: {
            type: 'string',
            default: 'abcde',
          },
        },
      };

      const validatedConfig = validate(config, schema);
      expect(validatedConfig).not.toEqual(config);
      expect(validatedConfig.some).toEqual('abcde');
    });
  });

  describe('getConfig', () => {
    it('Is a defined function', () => {
      expect(getConfig).toBeInstanceOf(Function);
    });

    it('Accepts only supported versions of OAuth', () => {
      try {
        getConfig({
          some: 'val',
        }, '3.0');
        throw new Error('This is not thrown');
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toEqual('Unsupported OAuth version passed: 3.0');
      }
    });

    it('Sets default OAuth version', () => {
      // We don't pass OAuth version. Since invalid version error is not thrown,
      // It means the default one was used
      const result = getConfig({
        a: 'val',
      });

      expect(result).toEqual(expect.objectContaining({
        a: 'val',
      }));
    });

    it('Throws an error if OAuth 1 config does not match schema', () => {
      const config = {};

      try {
        getConfig(config, '1.0');
        throw new Error('This is not thrown');
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toEqual(
          `data should have required property 'some'`);
      }
    });

    it('Throws an error if OAuth 2 config does not match schema', () => {
      const config = {};

      try {
        getConfig(config, '2.0');
        throw new Error('This is not thrown');
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toEqual(`data should have required property 'a'`);
      }
    });
  });
});
