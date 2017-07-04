import backoff from '../../common/schema/backoff';

export default {
  id: 'OAuth2/config',
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
    isRefreshable: {
      type: 'boolean',
      default: false, // By default, we do not allow token refreshing.
    },
    responseType: {
      type: 'string',
      enum: ['token', 'code'],
      default: 'code',
    },
    scope: {
      type: 'array',
      items: {
        type: 'string',
      },
      uniqueItems: true,
    },

    // Additional, implementation-specific parameters
    custom: {
      type: 'object',
    },

    // Standard backoff schema
    backoff,
  },
  required: ['authURL', 'tokenURL', 'isRefreshable', 'responseType', 'scope'],
};
