import Ajv from 'ajv';
import {cloneDeep} from 'lodash';

const ajv = new Ajv({
  $data: true,
  useDefaults: true,
});

import configSchema1 from './1/config';
import configSchema2 from './2/config';

/**
 * Validates the object against given AJV schema
 * @param  {Object} object Object to be validated
 * @param  {Object} schema JSON Schema definition
 * @return {Object}        Object, enriched with default values
 */
export function validate(object, schema) {
  // Clone the object, as AJV mutates objects when assigning defaults
  object = cloneDeep(object);

  const result = ajv.validate(schema, object);
  if (!result) {
    throw new Error(ajv.errorsText());
  }

  return object;
}

/**
 * Builds the config for OAuth client
 * @param  {Object} config         Input config
 * @param  {String} [version='2.0'] OAuth version, e.g. 1.0, 2.0
 * @return {Object}                Generated config, merged with defaults
 */
export function getConfig(config, version = '2.0') {
  checkOAuthVersion(version);
  const schema = version === '2.0' ? configSchema2 : configSchema1;

  return validate(config, schema);
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
