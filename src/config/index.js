import Ajv from 'ajv';
import {cloneDeep} from 'lodash';

import schema1 from './schema/1';
import schema2 from './schema/2';

const ajv = new Ajv({
  $data: true,
  useDefaults: true,
});

/**
 * Builds the config for OAuth client
 * @param  {Object} config         Input config
 * @param  {String} [version='2.0'] OAuth version, e.g. 1.0, 2.0
 * @return {Object}                Generated config, merged with defaults
 */
export function build(config, version = '2.0') {
  checkOAuthVersion(version);
  const schema = version === '2.0' ? schema2 : schema1;

  return validateConfig(config, schema);
}

/**
 * Checks passed OAuth version and throws an error if
 * the version is not supported
 * @param  {String} version           OAuth version
 */
function checkOAuthVersion(version) {
  // Only 2 versions now available, the fastest check
  if (version !== '2.0' && version !== '1.0') {
    throw new Error(`Unsupported OAuth version passed: ${version}`);
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

  const result = ajv.validate(schema, config);
  if (!result) {
    throw new Error(ajv.errorsText());
  }

  return config;
}
