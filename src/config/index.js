import {cloneDeep, defaults} from 'lodash';

import schema1 from './schema/1';

import default1 from './defaults/1';

/**
 * Builds the config for OAuth client
 * @param  {Object} config         Input config
 * @param  {String} [version='1.0'] OAuth version, e.g. 1.0, 2.0
 * @return {Object}                Generated config, merged with defaults
 */
export function build(config, version = '1.0') {
  checkOAuthVersion(version);
  return mergeConfig(config, schema1, default1);
}

/**
 * Checks passed OAuth version and throws an error if
 * the version is not supported
 * @param  {String} version           OAuth version
 */
function checkOAuthVersion(version) {
  const validation = Joi.string().valid(['v1']).required().validate(version);
  if (validation.error) {
    throw new Error(`Wrong OAuth version passed: ${version}`);
  }
}

/**
 * Validates config and merges with defaults
 * @param  {Object} config        Input config
 * @param  {Object} schema        Joi schema to check config against
 * @param  {Object} defaultConfig Config defaults
 * @return {Object|Error}         Built config or thrown error
 */
function mergeConfig(config, schema, defaultConfig) {
  const mergedConfig = defaults(cloneDeep(config), defaultConfig);

  // Validate if config meets the schema

  return mergedConfig;
}
