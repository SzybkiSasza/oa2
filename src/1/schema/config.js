import backoff from '../../common/schema/backoff';

export default {
  id: 'OAuth1/config',
  type: 'object',
  properties: {
    // URLs
    accessTokenURL: {
      type: 'string',
      format: 'url',
    },
    authURL: { // Not required, as not needed in one and two legged scenarios
      type: 'string',
      format: 'url',
    },
    requestTokenURL: {
      type: 'string',
      format: 'url',
    },

    // Protocol defaults
    signatureMethod: {
      type: 'string',
      default: 'HMAC-SHA1',
    },
    version: {
      type: 'string',
      default: '1.0',
    },

    // Standard backoff schema
    backoff,
  },
  required: ['accessTokenURL'],
};
