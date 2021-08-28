const assert = require('assert');
const app = require('../../src/app');

describe('\'submit_info\' service', () => {
  it('registered the service', () => {
    const service = app.service('submit-info');

    assert.ok(service, 'Registered the service');
  });
});
