# OA2 - OAuth made simple

Simple OAuth library supporting common OAuth scenarios and popular OAuth providers, with understandable API and fully supporting promises.

This library was created as an attempt to modernize existing popular OAuth libraries and simplify their config. What's more, support for retry scenarios (network failure, server reject) was added to make OAuth calls more resilient to failure.

## OAuth support

The library supports only OAuth 1.0 now. OAuth 2.0 support will be added soon.

## Configuration

Library is initialized with the config specific for the particular OAuth version.

After initialization, second part of the config (call-specific, e.g. client credentials) should be passed with each call.

For the details, please refer to each OAuth version section.

### Backoff

Each OAuth call is wrapped in backoff code, to prevent any timeouts or server restrictions from affecting the client. By default, calls default backoff config. However, backoff can be adjusted to a specific needs by providing `backoff` key in module config (next to other, version-specific keys) as follows:

```javascript

const config = {
  accessTokenURL: 'https://oauth-something.com/at',
  // (...) rest of the config
  backoff: {
    retries: 5, // **DEFAULT: 10** Number of retries before throwing an error
    factor: 2 // ** DEFAULT: 2** Exponential backoff factor
    minTimeout: 300 // **DEFAULT: 1000** Minimum time before the next retry
    maxTimeout: 5000 // **DEFAULT: 10000** Maximum time before the next retry, has to be bigger than minimum
    randomize: // **DEFAULT: true** flag depicting whether next backoff time should be randomized or strictly follow exponential curve
  }
}

```

For more details about this config, please refer to the README of the library used for managing the backoff: https://github.com/tim-kos/node-retry

## OAuth 1.0

OAuth 1.0 module fully supports one, two and three-legged authorization. For now, only `HMAC-SHA1` signatures are supported. Other signature support will be added soon.

### Configuration

Basic module configuration includes only two URLs. Config structure for the OAuth 1.0 is presented below:

```javascript

const config = {
  accessTokenURL: 'https://oauth-service/at', // **REQUIRED**. URL used for obtaining access tokens.
  authURL: 'https://oauth-service/auth', // URL used in three-legged auth - redirectURL
  requestTokenURL: 'https://oauth-service/rt', // URL used in two and three-legged auth for obtaining request tokens
  signatureMethod: 'HMAC-SHA1', // **DEFAULT: 'HMAC-SHA1'**. Signature method used.
  version: '1.0' // **DEFAULT: '1.0'**. Protocol version.
}

```

### Usage

## Tests

Tests are run using `jest` framework. To run the tests, type in the CLI:

`npm t`
