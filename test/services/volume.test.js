const assert = require('assert');
const app = require('../../src/app');

describe('\'volume\' service', () => {
  it('registered the service', () => {
    const service = app.service('volume');

    assert.ok(service, 'Registered the service');
  });
});
