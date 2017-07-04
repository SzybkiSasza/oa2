# OA2 - OAuth made simple

**PLEASE NOTE - until the 1.0.0 release, the library is not fully working!!! Please relate to GitHub to see the progress**

Simple OAuth library supporting common OAuth scenarios and popular OAuth providers, with understandable API and fully supporting promises.

This library was created as an attempt to modernize existing popular OAuth libraries and simplify their config. What's more, support for retry scenarios (network failure, server reject) was added to make OAuth calls more resilient to failure.

## OAuth support

The library will support OAuth 1.0 and OAuth 2.0 in the final version

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

OAuth 1.0 module fully supports one, two and three-legged authorization. For now, only `HMAC-SHA1` signatures are supported.

*Please create feature request, if any other signatures are needed*

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

## OAuth 2.0

OAuth 2.0 module supports both refreshable (ones having `refresh_token`) and simple services.

### Configuration

Basic configuration is a bit more complicated than for the OAuth 1.0. Apart from the URLs, information about the scope is required.

The scope is a set of permissions the app will have. For the details, please refer to a particular OAuth provider documentation.

```javascript

const config = {
  authURL: 'https://oauth-service/auth', // **REQUIRED** URL used in three-legged auth - redirectURL
  tokenURL: 'https://oauth-service/token', // **REQUIRED** URL used to obtain tokens (access, refresh)
  isrefreshable: true, // **DEFAULT: false** Flag depicting whether the OAuth client should be able to refresh tokens
  responseType: 'code', // **DEFAULT: 'code'** Response type for the auth call, usually set to 'code'
  scope: ['all'], // **REQUIRED** List of scopes to auth against
  custom: { // Custom properties to be attached to every OAuth 2.0 request
    my: 'property'
  }
}

```

### Usage

## Tests

Tests are run using `jest` framework. To run the tests, type in the CLI:

`npm t`
