import backoff from './schema-parts/backoff';

export default {
  type: 'object',
  properties: {
    accessTokenURL: {
      type: 'url',
    },
    authURL: {
      type: 'url',
    },
    requestTokenURL: {
      type: 'url',
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
