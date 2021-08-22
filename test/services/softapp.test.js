const assert = require('assert');
const app = require('../../src/app');

describe('\'softapp\' service', () => {
  it('registered the service', () => {
    const service = app.service('softapp');

    assert.ok(service, 'Registered the service');
  });
});
