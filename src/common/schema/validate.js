import Ajv from 'ajv';
import {cloneDeep} from 'lodash';

const ajv = new Ajv({
  $data: true,
  useDefaults: true,
});

/**
 * Validates the object against given AJV schema
 * @param  {Object} object Object to be validated
 * @param  {Object} schema JSON Schema definition
 * @return {Object}        Object, enriched with default values
 */
export default function validate(object, schema) {
  // Clone the object, as AJV mutates objects when assigning defaults
  object = cloneDeep(object);

  const result = ajv.validate(schema, object);
  if (!result) {
    throw new Error(ajv.errorsText());
  }

  return object;
}
