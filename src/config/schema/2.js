import backoff from './schema-parts/backoff';

export default {
  type: 'object',
  properties: {
    //  URLs
    authURL: {
      type: 'string',
      format: 'url',
    },
    tokenURL: {
      type: 'string',
      format: 'url',
    },

    // Token endpoint parameters
    responseType: {
      type: 'array',
      items: ['token', 'code'],
    },
    scope: {
      type: 'array',
      items: {
        type: 'string',
      },
      minItems: 1,
      uniqueItems: true,
    },

    // Additional, implementation-specific parameters
    custom: {
      type: 'object',
    },

    // Standard backoff schema
    backoff,
  },
  required: ['authURL', 'tokenURL', 'scope'],
};
