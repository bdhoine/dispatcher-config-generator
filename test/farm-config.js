require('mocha');
const expect = require('chai').expect;
const farm = require('../src/farm-config');

const docRoot = '/var/www/html';
const defaults = {
  'priority': 0,
  'client-headers': ['*'],
  'virtual-hosts': ['*'],
  'renderers': [{
    'hostname': 'localhost',
    'port': 4503,
  }],
  'filters': [{
    'type': 'allow',
    'glob': '*',
  }],
  'cache': {
    'doc-root': docRoot,
  },
};

describe('Farm Config', function() {
  it('should throw error without cache.doc-root', function() {
    expect(farm).to.throw('Configuration element \'cache.doc-root\' is mandatory');
  });

  it('data is default when only cache.doc-root is set', function() {
    const config = farm({
      data: {
        cache: {
          'doc-root': docRoot,
        },
      },
    });
    expect(config.data).to.deep.equal(defaults);
  });

  it('priority is \'00\' when set to \'0\'', function() {
    const config = farm({
      data: {
        cache: {
          'doc-root': docRoot,
        }
      }
    });
    expect(config.property('priority')).to.equal('00');
  });

  it('should parse yaml config strings', function() {
    const config = farm({
      config: `
        cache:
          doc-root: ${docRoot}
      `
    });
    expect(config.data).to.deep.equal(defaults);
  });
});
