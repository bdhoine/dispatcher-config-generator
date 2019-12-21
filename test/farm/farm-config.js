require('mocha');
const expect = require('chai').expect;

const FarmConfig = require('../../src/farm/farm-config');
const farmDefaults = require('../../src/farm/defaults');

const docRoot = '/var/www/html';
const defaults = {
  ...farmDefaults,
  'cache': {
    'doc-root': docRoot,
  },
};

describe('farm config', function() {
  it('should throw error without cache.doc-root', function() {
    const config = function() {
      new FarmConfig();
    };
    expect(config).to.throw('Configuration element \'cache.doc-root\' is mandatory');
  });

  it('data is default when only cache.doc-root is set', function() {
    const config = new FarmConfig({
      data: {
        cache: {
          'doc-root': docRoot,
        },
      },
    });
    expect(config.data).to.deep.equal(defaults);
  });

  it('priority is \'00\' when set to \'0\'', function() {
    const config = new FarmConfig({
      data: {
        cache: {
          'doc-root': docRoot,
        }
      }
    });
    expect(config.property('priority')).to.equal('00');
  });

  it('should parse yaml config strings', function() {
    const config = new FarmConfig({
      config: `
        cache:
          doc-root: ${docRoot}
      `
    });
    expect(config.data).to.deep.equal(defaults);
  });
});
