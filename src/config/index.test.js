import {build} from '.';

describe('Config builder test', () => {
  it('Is a defined function', () => {
    expect(build).toBeInstanceOf(Function);
  });
});
