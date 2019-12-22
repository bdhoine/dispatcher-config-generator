require('mocha');
const expect = require('chai').use(require('chai-fs')).expect;

const DispatcherConfig = require('../../src/dispatcher/dispatcher-config');

describe('dispatcher.conf file', function() {
  before(function(done) {
    const config = new DispatcherConfig();
    const stream = config.generate();
    stream.on('end', function() {
      done();
    });
  });

  it('should generate a \'dispatcher.conf\' file', function() {
    expect('./output/dispatcher.conf').to.be.a.file();
  });

  const lines = [
    'DispatcherConfig conf/dispatcher.any',
    'DispatcherLog logs/dispatcher.log',
    'DispatcherLogLevel 3',
    'DispatcherDeclineRoot Off',
    'DispatcherUseProcessedURL On',
    'DispatcherPassError 0',
    'DispatcherKeepAliveTimeout 60',
    'DispatcherSSINoCache Off',
    'DispatcherNoCanonURL Off'
  ];
  lines.forEach(function(line) {
    it(`should have line '${line}'`, function() {
      expect('./output/dispatcher.conf').to.be.a.file()
          .with.contents.that.match(new RegExp(line));
    });
  });
});
