export default {
  id: 'OAuth2/client',
  type: 'object',
  properties: {
    client_id: {
      type: 'string',
    },
    client_secret: {
      type: 'string',
    },
    redirect_uri: {
      type: 'string',
      format: 'uri',
    },
  },
  required: ['client_id', 'client_secret', 'redirect_uri'],
};
