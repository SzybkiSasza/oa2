import {each, join, union} from 'lodash';
import uri from 'urijs';

import validate from '../common/schema/validate';

import clientSchema from './schema/client';
import configSchema from './schema/config';

/**
 * OAuth 2 handlers
 */
export class O2 {
  /**
   * Initializes instance with the config
   * @param  {Object} config Input config
   */
  constructor(config) {
    this.config = validate(config, configSchema);
  }

  /**
   * Gets URL used for authorizing
   * @param  {Object} client          Client config
   * @param  {Object} optionals       Optional params to be passed to the URL
   * @param  {Object} overrides       Overrides for the default configuration
   * @param  {String} overrides.responseType Flag to overload default resp. type
   * @param  {String} overrides.scope Optional scopes to be merged with defaults
   * @return {String}                 Authorization URL
   */
  getAuthorizeURL(client, optionals = {}, overrides = {}) {
    client = validate(client, clientSchema);

    // Allow for overriding response type per request, if needed
    const responseType = overrides.responseType || this.config.responseType;

    const URL = uri(this.config.authURL)
      .addQuery('client_id', client.client_id)
      .addQuery('redirect_uri', client.redirect_uri)
      .addQuery('response_type', responseType);

    // Build scope, if needed
    const scope = union(overrides.scope || [], this.config.scope || []);
    if (scope.length) {
      URL.addQuery('scope', join(scope, ' '));
    }

    // Add optional parameters as they are
    each(optionals, (param, key) => {
      URL.addQuery(key, param);
    });

    return URL.toString();
  }
}
