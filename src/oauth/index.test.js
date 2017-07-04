import index from './';

const requireIndex = require('./');

describe('Main lib entrypoint', () => {
  it('Is a defined ES6 default export', () => {
    expect(Object.keys(index)).toEqual(['O1', 'O2']);
  });

  it('Is a defined node export', () => {
    // Default coming from ES6 exports
    expect(Object.keys(requireIndex)).toEqual(['O1', 'O2', 'default']);
  });
});
