import Ajv from 'ajv';
const ajv = new Ajv({
  $data: true,
  useDefaults: true,
});

import {cloneDeep} from 'lodash';

import schema1 from './schema/1';

/**
 * Builds the config for OAuth client
 * @param  {Object} config         Input config
 * @param  {String} [version='1.0'] OAuth version, e.g. 1.0, 2.0
 * @return {Object}                Generated config, merged with defaults
 */
export function build(config, version = '1.0') {
  checkOAuthVersion(version);
  return validateConfig(config, schema1);
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
 * Validates the passed config based on the schema
 * @param  {Object} config Input config
 * @param  {Object} schema Schema definition
 * @return {Object}        Resulting config
 */
function validateConfig(config, schema) {
  // Clone the config, as AJV mutates objects when assigning defaults
  config = cloneDeep(config);

  const result = ajv.validate(backoff, config);
  if (!result) {
    throw new Error(ajv.errorsText());
  }

  return config;
}
