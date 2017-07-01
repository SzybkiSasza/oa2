import oauth1Schema from './1';

describe('OAuth 1.0 config schema', () => {
  it('Is a defined object', () => {
    expect(oauth1Schema).toBeInstanceOf(Object);
  });
});
