export default {
  id: '\Backoff',
  type: 'object',
  default: {},
  properties: {
    retries: {
      default: 10,
      type: 'number',
    },
    factor: {
      default: 2,
      type: 'number',
    },
    minTimeout: {
      default: 1000,
      type: 'number',
    },
    maxTimeout: {
      default: 10000,
      type: 'number',
      minimum: {
        $data: '1/minTimeout',
      },
    },
    randomize: {
      default: true,
      type: 'boolean',
    },
  },
};
