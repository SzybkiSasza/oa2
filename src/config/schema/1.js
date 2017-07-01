import backoff from './schema-parts/backoff';

export default {
  type: 'object',
  properties: {
    accessTokenURL: {
      type: 'string',
      format: 'url',
    },
    authURL: {
      type: 'string',
      format: 'url',
    },
    requestTokenURL: {
      type: 'string',
      format: 'url',
    },
    signatureMethod: {
      type: 'string',
      default: 'HMAC-SHA1',
    },
    version: {
      type: 'string',
      default: '1.0',
    },
    backoff,
  },
  required: ['accessTokenURL', 'authURL', 'requestTokenURL'],
};
