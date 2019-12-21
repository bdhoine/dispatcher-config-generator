require('mocha');
const expect = require('chai').expect;

const FarmConfig = require('../../src/farm/farm-config');
const defaults = require('../../src/farm/defaults');

describe('farm config', function() {
  let config;

  before(function() {
    config = new FarmConfig();
  });

  it('data is default when no config is set', function() {
    expect(config.data).to.deep.equal(defaults);
  });

  it('priority is \'00\' when set to \'0\'', function() {
    expect(config.property('priority')).to.equal('00');
  });

  it('priority is \'10\' when set to \'10\'', function() {
    config = new FarmConfig({
      data: {
        priority: 10
      }
    });
    expect(config.property('priority')).to.equal('10');
  });

  it('should parse yaml config strings', function() {
    config = new FarmConfig({
      config: `
        priority: 0
      `
    });
    expect(config.data).to.deep.equal(defaults);
  });
});
