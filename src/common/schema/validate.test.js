
import validate from './validate';

describe('Validate schema', () => {
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
