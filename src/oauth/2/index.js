import getConfig from '../../schema/get-config';

/**
 * OAuth 2 handlers
 */
export class O2 {
  /**
   * Initializes instance with the config
   * @param  {Object} config Input config
   */
  constructor(config) {
    this.config = build(config, '2.0');
  }

  /**
   * Gets URL used for authorizing
   * @param  {Object} client          Client config
   * @param  {Object} optionals       Optional params to be passed to the URL
   * @param  {String} optionals.state Additional state to pass to Auth autority
   * @param  {String} optionals.responseType Flag to overload default resp. type
   * @return {String}                 Authorization URL
   */
  getAuthorizeURL(client, optionals) {
    validateClient(client);
    return '';
  }
}
