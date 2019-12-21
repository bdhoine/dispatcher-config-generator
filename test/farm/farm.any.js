require('mocha');
const expect = require('chai').use(require('chai-fs')).expect;

const FarmConfig = require('../../src/farm/farm-config');

describe('dispatcher.inc.any file', function() {
  let config;

  before(function(done) {
    config = new FarmConfig({
      data: {
        cache: {
          'doc-root': '/var/www/html',
        },
        name: 'website',
      }});
    const stream = config.generate();
    stream.on('end', function() {
      done();
    });
  });

  it('should generate a \'dispatcher.inc.any\' file', function() {
    expect('./output/dispatcher.00-website.inc.any').to.be.a.file();
  });

  it('should have line \'/website\'', function() {
    expect('./output/dispatcher.00-website.inc.any').to.be.a.file()
        .with.contents.that.match(/\/website/);
  });
});
