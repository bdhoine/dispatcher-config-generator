require('mocha');
const expect = require('chai').use(require('chai-fs')).expect;

const DispatcherConfig = require('../../src/dispatcher/dispatcher-config');
const OUTPUT_FILE = './output/dispatcher.any';

describe('dispatcher.any file', function() {
  let config;

  before(function(done) {
    config = new DispatcherConfig();
    const stream = config.generate();
    stream.on('end', function() {
      done();
    });
  });

  it('should generate a \'dispatcher.any\' file', function() {
    expect(OUTPUT_FILE).to.be.a.file();
  });

  it('should have line \'/name dispatcher\'', function() {
    expect(OUTPUT_FILE).to.be.a.file()
        .with.contents.that.match(/\/name dispatcher/);
  });

  it('should have line \'$include "dispatcher.*-*.inc.any"\'', function() {
    expect(OUTPUT_FILE).to.be.a.file()
        .with.contents.that.match(/\$include "dispatcher.\*-\*.inc.any"/);
  });
});
